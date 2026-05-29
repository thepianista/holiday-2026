import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const url = process.env.VERIFY_URL ?? "http://localhost:3000";
const defaultChromePaths = {
  darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  linux: "/usr/bin/google-chrome",
  win32: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
};
const chromePath = process.env.CHROME_PATH ?? defaultChromePaths[process.platform];

const viewports = [
  { name: "desktop", width: 1440, height: 1200 },
  { name: "mobile", width: 390, height: 1100 },
];

const pages = [
  {
    path: "/",
    name: "home",
    checks: ["Mexico", "2026", "Next 5 bookings", "World Cup"],
  },
  {
    path: "/itinerary",
    name: "itinerary",
    checks: ["Itinerary", "Mexico City", "World Cup option", "No PNRs"],
  },
];

await mkdir(".next", { recursive: true });

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
});

try {
  for (const target of pages) {
    for (const viewport of viewports) {
      const page = await browser.newPage({ viewport });
      await page.goto(new URL(target.path, url).toString(), { waitUntil: "networkidle" });

      const result = await page.evaluate((checks) => {
        const text = document.body.innerText;

        return {
          innerWidth: window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          bodyScrollWidth: document.body.scrollWidth,
          title: document.title,
          checks: checks.map((check) => ({ check, found: text.includes(check) })),
        };
      }, target.checks);

      await page.screenshot({
        fullPage: false,
        path: `.next/holiday-${target.name}-${viewport.name}-playwright.png`,
      });

      console.log(`${target.name} ${viewport.name}:`, result);

      if (result.checks.some((check) => !check.found)) {
        throw new Error(`${target.name} ${viewport.name} content check failed`);
      }

      if (result.scrollWidth > result.innerWidth || result.bodyScrollWidth > result.innerWidth) {
        throw new Error(`${target.name} ${viewport.name} has horizontal overflow`);
      }

      await page.close();
    }
  }
} finally {
  await browser.close();
}
