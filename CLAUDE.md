# Mileage & Expenses Log

A single-page PWA for logging mileage/expenses, with cloud sync and Excel export.

## Structure
- `mileage_log.html` — the entire app: markup, CSS, and JS in one file. No build step.
- `manifest.json` / `sw.js` — PWA install + service worker (offline caching).
- `icon-192.png` / `icon-512.png` — app icons referenced by the manifest.
- `expense_template.xlsx` / `monthly_mileage_template.xlsx` — Excel templates the app fills in on export.

## Stack (all via CDN `<script>` tags, no npm/build)
- Firebase (Auth, Firestore, Storage) — compat SDK, v10.13.0
- ExcelJS v4.4.0 — generates the Excel export client-side

## Conventions
- Keep everything in the one HTML file unless there's a clear reason to split it out — that's the existing style and it must stay installable as a static PWA (no bundler).
- No test suite currently exists. Verify changes by opening `mileage_log.html` in a browser (see `/run` skill or `preview_start`) and exercising the affected flow manually.
- Since Firebase is used, be careful not to commit real API keys/secrets beyond what's already in the file (client-side Firebase config keys are not secret by design, but double-check before adding anything new).
