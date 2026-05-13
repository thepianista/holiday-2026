# Germany 2026 Family Field Guide

Private family holiday microsite for the Germany 2026 trip. It is a static Next.js app with local editable trip data, a pre-trip itinerary, destination guide cards and placeholder photo diary slots.

## Routes

- `/` is the playful family field guide for places, day trip ideas and the photo diary.
- `/itinerary` is the practical trip list with hotels, trains, costs, cancellation notes and booking status.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- ESLint
- lucide-react icons

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Useful Commands

```bash
npm run lint
npm run build
npm run verify:layout
```

`verify:layout` expects the app to be running locally. Set `VERIFY_URL` if it is not on `http://localhost:3000`. It checks `/` and `/itinerary` on desktop and mobile.

## Edit Trip Content

Most trip content lives in:

```text
src/data/trip.ts
```

Edit city chapters, train legs, hotel notes, activity ideas, source URLs and diary prompts there. Source URLs are kept in the data for maintenance and research traceability, but they are not shown as a public source list in the app.

## Privacy

Do not commit booking confirmation numbers, booking access codes, private email details, phone numbers, home addresses or passport details.

The app includes:

- `robots` metadata with `noindex`
- `src/app/robots.ts` blocking crawlers
- optional basic auth middleware via `HOLIDAY_SITE_PASSWORD`

For Vercel, set an environment variable:

```text
HOLIDAY_SITE_PASSWORD=choose-a-private-password
```

When the variable is set, the site prompts for basic authentication. Any username works. The password must match the environment variable.

For stronger protection, also enable Vercel Deployment Protection or Vercel Authentication in the project settings before sharing the URL.

## Deployment

1. Push the repository to GitHub.
2. Import `web3at50/holiday-2026` into Vercel.
3. Keep the default Next.js build settings.
4. Add `HOLIDAY_SITE_PASSWORD` in Vercel environment variables.
5. Deploy and check the live URL on mobile.

## Future Diary Options

Version one uses local data only. Later options:

- keep editing diary entries through GitHub commits
- Supabase for comments, accounts or shared editing
- Vercel Blob for private photo storage
- Sanity for a more polished edited travel journal

## Research Sources

The destination shortlists were built from official tourism, attraction and operator pages where practical:

- Koblenz tourism, Koblenz cable car, Ehrenbreitstein Fortress and KD cruises
- Heidelberg tourism, Heidelberg Castle and Speyer tourism
- Freiburg tourism, Münstermarkt and Schlossberg
- Gengenbach city tourism and Deutsche Bahn journey planning
- Cologne tourism, Cologne Cathedral, Rheinboulevard and Hilton Cologne dining
