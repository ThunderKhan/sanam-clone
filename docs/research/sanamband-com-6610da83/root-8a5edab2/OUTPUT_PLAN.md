# Output Plan — sanamband.com

## Target

| Field | Value |
|---|---|
| Target URL | `https://www.sanamband.com/` |
| Normalized origin | `https://www.sanamband.com` |
| Normalized pathname | `/` |
| `<app-root>` | `D:\Projects\sanamband-clone` (new standalone app, approved by user) |
| `<site-key>` | `sanamband-com-6610da83` (first 8 hex of SHA-256 over normalized origin) |
| `<page-key>` | `root-8a5edab2` (SHA-256 prefix over normalized pathname `/`) |

## Destinations

| Purpose | Path |
|---|---|
| Route | `src/app/page.tsx` (scaffold root page, replaced — untouched template) |
| Artifact root | `docs/research/sanamband-com-6610da83/root-8a5edab2/` |
| Component specs | `docs/research/sanamband-com-6610da83/root-8a5edab2/components/` |
| Screenshot root | `docs/design-references/sanamband-com-6610da83/root-8a5edab2/` |
| Component root | `src/components/sites/sanamband-com-6610da83/root-8a5edab2/` |
| Site shared components | `src/components/sites/sanamband-com-6610da83/shared/` |
| Asset root | `public/sites/sanamband-com-6610da83/root-8a5edab2/` |
| Site shared assets | `public/sites/sanamband-com-6610da83/shared/` |
| Types | `src/types/sites/sanamband-com-6610da83.ts` |
| Asset downloader | `scripts/download-assets-sanamband-com-6610da83-root-8a5edab2.mjs` |

## Foundation files allowed to change

- `src/app/layout.tsx` — fonts + metadata
- `src/app/globals.css` — design tokens
- `src/app/page.tsx` — scaffold page replaced by the clone
- `public/seo/*` — favicons

## Preserved

Only untouched template scaffold routes exist (`/` scaffold, `/_not-found`). The other
clone (`D:\Projects\devrelay-clone`) is a separate app root and is untouched by this run.

## Plan approval

Approved by user: "New separate app: D:\Projects\sanamband-clone at /".

## Base build verification

`npm run build` on the freshly prepared root: PASS (Next.js 16.3.5, static `/`).