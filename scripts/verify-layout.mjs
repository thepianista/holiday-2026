import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const url = process.env.VERIFY_URL ?? "http://localhost:3000";
const chromePath =
  process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const viewports = [
  { name: "desktop", width: 1440, height: 1200 },
  { name: "mobile", width: 390, height: 1100 },
];

await mkdir(".next", { recursive: true });

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
});

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    await page.goto(url, { waitUntil: "networkidle" });

    const overflow = await page.evaluate(() => ({
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      title: document.title,
      hasGermany: document.body.innerText.includes("Germany") && document.body.innerText.includes("2026"),
      hasKoblenz: document.body.innerText.includes("Koblenz"),
      hasPhotoDiary: document.body.innerText.includes("Photo diary"),
    }));

    await page.screenshot({
      fullPage: false,
      path: `.next/holiday-${viewport.name}-playwright.png`,
    });

    console.log(`${viewport.name}:`, overflow);

    if (!overflow.hasGermany || !overflow.hasKoblenz || !overflow.hasPhotoDiary) {
      throw new Error(`${viewport.name} content check failed`);
    }

    if (overflow.scrollWidth > overflow.innerWidth || overflow.bodyScrollWidth > overflow.innerWidth) {
      throw new Error(`${viewport.name} has horizontal overflow`);
    }

    await page.close();
  }
} finally {
  await browser.close();
}
