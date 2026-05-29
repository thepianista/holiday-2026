# Mexico 2026 Field Guide

Private microsite for the Mexico trip in June–July 2026 (Mexico City + Baja California Sur). Static Next.js app with local editable trip data, a Google Maps KML importer for saved places and a password-gated deploy on Vercel.

## Routes

- `/` — playful field guide: day-by-day plan, flights, stays, things to do, dive/snorkel notes, food and the saved Google Maps places.
- `/itinerary` — operational view: chronological list with statuses, costs and reservation order.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- ESLint
- lucide-react icons

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Useful commands

```bash
npm run lint
npm run build
npm run import:places # sync your Google Maps places (see below)
npm run verify:layout # mobile + desktop layout check (needs the dev server running)
```

## Edit trip content

Most trip content lives in:

```text
src/data/trip.ts
```

Edit stays, flights, ground legs (drives + bus), dive operators, snorkel spots and the day-by-day itinerary array.

## Sync Google Maps saved places

We do not call the Google Maps API — instead we import a snapshot of your saved places and turn it into typed data. Two source formats are supported and the importer reads whichever you provide:

**Option A — Google Takeout GeoJSON (best for your personal "Saved" lists)**

1. Open [takeout.google.com](https://takeout.google.com), deselect everything, then tick only **Maps (your places)** → download the ZIP.
2. Unzip. Each saved list becomes its own JSON file under `Takeout/Maps (your places)/<List name>.json`.
3. Drop the JSON files for the lists you want into `data/places/`. The filename (without `.json`) becomes the folder name on the Map tab.

**Option B — Google Takeout 'Saved' CSV (per-list export)**

1. takeout.google.com → tick only **Saved** → download.
2. Each list becomes `<List name>.csv` (German headers Titel / Notiz / URL / Tags / Kommentar are auto-detected).
3. Drop the CSV(s) into `data/places/`. The importer keeps the place URL even though coordinates are not included in this format, so the Map tab can list entries but cannot draw individual pins.

**Option C — Google My Maps KML (best for curated trip maps)**

1. Open [google.com/maps/d](https://www.google.com/maps/d/) and open the map.
2. Three-dot menu → **Export to KML/KMZ** → tick "Keep as KML" → download.
3. Save the file as `data/places.kml`.

Then:

```bash
npm run import:places
```

The script writes `src/data/places.ts` with a typed `Place[]` array grouped by folder. The `/data` paths are gitignored so the export never leaves your machine. Re-run the script whenever you change a list.

Google Maps saved-list URLs cannot be embedded directly because Google blocks them in iframes. The app embeds a Google Maps route overview and links out to the live shared list.

## Flights

Flights live in `src/data/trip.ts` under the `flights` array. They start as placeholders — fill in airline, flight number, departure/arrival, PNR and seat once each leg is booked. Keep PNRs in your wallet or email; treat the public field as a sanity check only.

## Privacy

- `robots` metadata with `noindex`
- `src/app/robots.ts` blocks crawlers
- Basic-auth middleware via `HOLIDAY_SITE_PASSWORD` env var

For Vercel set:

```text
HOLIDAY_SITE_PASSWORD=choose-a-private-password
```

Any username works; the password must match. For extra protection, enable Vercel Deployment Protection or Vercel Authentication in the project dashboard.

Do not commit booking confirmations, PNRs, passport details or private contact info. The `.gitignore` already excludes `data/places.kml` and `Mexico Holiday 2026 Notes.md`.

## Deployment

1. Push to GitHub.
2. Import the repo into Vercel (default Next.js settings).
3. Add `HOLIDAY_SITE_PASSWORD` in Vercel env vars.
4. Deploy and open the live URL on a phone to spot-check the mobile bottom nav.
