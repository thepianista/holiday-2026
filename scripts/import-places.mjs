#!/usr/bin/env node
// Read Google Maps saved places and emit src/data/places.ts. Two supported sources:
//
// 1. Google Takeout GeoJSON (recommended for the personal "Saved" lists)
//    - takeout.google.com → only tick "Maps (your places)" → download.
//    - Unzip. Each saved list becomes its own .json file under
//      "Takeout/Maps (your places)/<List name>.json".
//    - Drop those JSON files into data/places/ (one file per list). The filename
//      (without .json) becomes the folder name on the Map tab.
//    - Or drop a single file as data/places.json with folder name "Saved".
//
// 2. Google My Maps KML export (use this if you imported your list into My Maps)
//    - google.com/maps/d → open your map → three-dot menu → Export to KML.
//    - Save as data/places.kml.
//
// You can mix both — the script merges every source it finds.
//
// Then:
//   npm run import:places
//
// We deliberately avoid any external XML/JSON deps: zero npm install needed.

import { mkdirSync, readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { dirname, resolve, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");
const dataDir = resolve(repoRoot, "data");
const outPath = resolve(repoRoot, "src/data/places.ts");

const decodeEntities = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");

const stripTags = (s) =>
  decodeEntities(
    s
      .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .trim(),
  );

const firstTagText = (xml, tag) => {
  const m = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i").exec(xml);
  return m ? stripTags(m[1]) : "";
};

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

const places = [];
const seenIds = new Set();

const addPlace = ({ name, description, folder, lat, lon, url }) => {
  if (!name) return;
  let id = slugify(name);
  if (!id) id = `place-${places.length + 1}`;
  if (seenIds.has(id)) id = `${id}-${places.length + 1}`;
  seenIds.add(id);
  places.push({
    id,
    name,
    description: description || "",
    folder: folder || "",
    lat: Number.isFinite(lat) ? lat : null,
    lon: Number.isFinite(lon) ? lon : null,
    url: url || "",
  });
};

const parseKml = (kml) => {
  const folderRe = /<Folder\b[\s\S]*?<\/Folder>/gi;
  const placemarkRe = /<Placemark\b[\s\S]*?<\/Placemark>/gi;
  const coordsRe = /<coordinates[^>]*>([\s\S]*?)<\/coordinates>/i;

  const eatPlacemark = (pm, folderName) => {
    const name = firstTagText(pm, "name");
    if (!name) return;
    const description = firstTagText(pm, "description");
    const coordsMatch = coordsRe.exec(pm);
    let lat = null;
    let lon = null;
    if (coordsMatch) {
      const parts = coordsMatch[1].trim().split(",");
      lon = Number(parts[0]);
      lat = Number(parts[1]);
    }
    addPlace({ name, description, folder: folderName, lat, lon });
  };

  const folders = kml.match(folderRe) || [];
  if (folders.length === 0) {
    for (const pm of kml.match(placemarkRe) || []) eatPlacemark(pm, "");
    return;
  }
  for (const folder of folders) {
    const folderName = firstTagText(folder, "name");
    for (const pm of folder.match(placemarkRe) || []) eatPlacemark(pm, folderName);
  }
  const outsideFolders = kml.replace(folderRe, "");
  for (const pm of outsideFolders.match(placemarkRe) || []) eatPlacemark(pm, "");
};

// Parse a Google Takeout "Saved" CSV. Headers come in the user's locale —
// we match by position with a small set of localised header names.
const parseCsv = (text, folderFromFile) => {
  const rows = [];
  let field = "";
  let row = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      field = "";
      row = [];
    } else {
      field += ch;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  if (rows.length === 0) return;

  const header = rows[0].map((h) => h.toLowerCase().trim());
  const findCol = (...names) => {
    for (const name of names) {
      const idx = header.indexOf(name);
      if (idx >= 0) return idx;
    }
    return -1;
  };
  const colTitle = findCol("title", "titel", "nombre");
  const colNote = findCol("note", "notiz", "nota");
  const colUrl = findCol("url");
  const colComment = findCol("comment", "kommentar", "comentario");

  if (colTitle < 0) {
    console.error(`CSV in ${folderFromFile || "—"}: no title/Titel column found. Skipping.`);
    return;
  }

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const name = (r[colTitle] || "").trim();
    if (!name) continue;
    const noteBits = [
      colNote >= 0 ? r[colNote]?.trim() : "",
      colComment >= 0 ? r[colComment]?.trim() : "",
    ].filter(Boolean);
    addPlace({
      name,
      description: noteBits.join(" · "),
      folder: folderFromFile,
      lat: null,
      lon: null,
      url: colUrl >= 0 ? r[colUrl]?.trim() : undefined,
    });
  }
};

const parseGeoJson = (text, folderFromFile) => {
  let data;
  try {
    data = JSON.parse(text);
  } catch (err) {
    console.error(`Failed to parse JSON: ${err.message}`);
    return;
  }
  const features = Array.isArray(data) ? data : data.features || [];
  for (const feature of features) {
    const props = feature.properties || {};
    const loc = props.location || {};
    const name = loc.name || props.title || props.name || "";
    if (!name) continue;
    const addressBits = [loc.address, loc.country_code].filter(Boolean);
    const description = props.note || props.comment || addressBits.join(" · ");
    let lat = null;
    let lon = null;
    if (feature.geometry?.type === "Point" && Array.isArray(feature.geometry.coordinates)) {
      lon = Number(feature.geometry.coordinates[0]);
      lat = Number(feature.geometry.coordinates[1]);
    }
    addPlace({ name, description, folder: folderFromFile, lat, lon });
  }
};

let sourcesFound = 0;

const kmlPath = resolve(dataDir, "places.kml");
if (existsSync(kmlPath)) {
  parseKml(readFileSync(kmlPath, "utf8"));
  sourcesFound++;
}

const jsonPath = resolve(dataDir, "places.json");
if (existsSync(jsonPath)) {
  parseGeoJson(readFileSync(jsonPath, "utf8"), "Saved");
  sourcesFound++;
}

const placesDir = resolve(dataDir, "places");
if (existsSync(placesDir) && statSync(placesDir).isDirectory()) {
  for (const file of readdirSync(placesDir)) {
    const ext = extname(file).toLowerCase();
    const full = resolve(placesDir, file);
    const folder = basename(file, ext);
    if (ext === ".json") {
      parseGeoJson(readFileSync(full, "utf8"), folder);
      sourcesFound++;
    } else if (ext === ".csv") {
      parseCsv(readFileSync(full, "utf8"), folder);
      sourcesFound++;
    }
  }
}

if (sourcesFound === 0) {
  console.error(
    `\nNo place sources found under ${dataDir}.\n\n` +
      "Expected one of:\n" +
      "  data/places.kml            (Google My Maps KML export)\n" +
      "  data/places.json           (Google Takeout GeoJSON for a single list)\n" +
      "  data/places/<list>.json    (Google Takeout GeoJSON, one file per list)\n" +
      "  data/places/<list>.csv     (Google Takeout 'Saved' CSV, one file per list)\n",
  );
  process.exit(1);
}

mkdirSync(dirname(outPath), { recursive: true });

const banner =
  "// AUTO-GENERATED by scripts/import-places.mjs — do not edit by hand.\n" +
  `// Imported ${places.length} place(s) from ${sourcesFound} source(s) at ${new Date().toISOString()}.\n\n`;

const ts =
  banner +
  "export type Place = {\n" +
  "  id: string;\n" +
  "  name: string;\n" +
  "  description: string;\n" +
  "  folder: string;\n" +
  "  lat: number | null;\n" +
  "  lon: number | null;\n" +
  "  url: string;\n" +
  "};\n\n" +
  "export const places: Place[] = " +
  JSON.stringify(places, null, 2) +
  ";\n";

writeFileSync(outPath, ts, "utf8");
console.log(`Wrote ${places.length} place(s) to ${outPath}`);
