# SiteFooter Specification

## Overview
- **Target file:** `src/components/sites/sanamband-com-6610da83/root-8a5edab2/SiteFooter.tsx`
- **Screenshot:** `docs/design-references/sanamband-com-6610da83/root-8a5edab2/05-footer-desktop.png`, `10-footer-mobile.png`
- **Interaction model:** static. Link hovers only. No state, no accordion.

Fills one Swiper slide. Root element is the `<footer>` itself and must be `h-full w-full`.

## DOM Structure

```
<footer class="bg-neutral-900 text-neutral-300 h-full w-full flex items-center">
  <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">

      <div>
        <div class="flex items-center gap-3">
          <img src=".../images/logo.svg" alt="SANAM logo" class="h-8 w-8" />
          <span class="text-xl font-semibold text-white">SANAM</span>
        </div>
        <p class="mt-4 max-w-xs text-sm">
          Music that bridges hearts and generations. India's most beloved independent band creating authentic connections through melody.
        </p>
        <div class="mt-8 flex gap-4">
          <a href="https://x.com/sanam_official" target="_blank" rel="noopener noreferrer" class="text-neutral-400 hover:text-white">
            <span class="sr-only">X (formerly Twitter)</span>
            <XBrandIcon class="h-7 w-7" />
          </a>
          <a href="https://www.instagram.com/sanamband/" target="_blank" rel="noopener noreferrer" class="text-neutral-400 hover:text-white">
            <span class="sr-only">Instagram</span>
            <InstagramGlyph class="h-7 w-7" />
          </a>
          <a href="https://www.youtube.com/c/SANAM" target="_blank" rel="noopener noreferrer" class="text-neutral-400 hover:text-white">
            <span class="sr-only">YouTube</span>
            <YoutubeBrandIcon class="h-7 w-7" />
          </a>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6 min-[360px]:grid-cols-2 sm:gap-6 lg:gap-10 lg:col-span-2 items-start">
        <div>
          <p class="font-semibold text-white">Quick Links</p>
          <ul class="mt-5 space-y-3 text-sm">
            <li><a class="hover:opacity-75" href="/music">Music</a></li>
            <li><a class="hover:opacity-75" href="/tour">Tour Dates</a></li>
            <li><a class="hover:opacity-75" href="/merchandise">Merchandise</a></li>
            <li><a class="hover:opacity-75" href="/contact">Contact</a></li>
            <li><a class="hover:opacity-75" href="/privacy">Privacy Policy</a></li>
            <li><a class="hover:opacity-75" href="/terms">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <p class="font-semibold text-white">Connect</p>
          <ul class="mt-5 space-y-3 text-sm">
            <li>
              <a href="mailto:wearesanam@gmail.com" class="flex w-full max-w-full flex-wrap items-center gap-2 hover:opacity-75 break-all">
                <span class="min-w-0">wearesanam@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="https://wa.me/919699969940?text=Hi%20SANAM%20team!%20I'd%20love%20to%20talk%20about%20gigs%2C%20collaborations%2C%20or%20media%20enquiries."
                 target="_blank" rel="noopener noreferrer"
                 class="flex items-center gap-2 hover:opacity-75">
                <span>+91 96999 69940</span>
              </a>
            </li>
            <li>Mumbai, India</li>
          </ul>
        </div>
      </div>

    </div>

    <div class="mt-12 border-t border-neutral-800 pt-8">
      <p class="text-center text-xs text-neutral-500">© 2026 SANAM. All Rights Reserved.</p>
    </div>
  </div>
</footer>
```

Use `quickLinks` and `socialLinks` from
`src/components/sites/sanamband-com-6610da83/shared/content` for the two lists (do not
redeclare the arrays), and map `socialLinks[i].icon` to
`XBrandIcon` / `InstagramGlyph` / `YoutubeBrandIcon`.

## Computed styles (measured at 1440×900)

- `<footer>`: `background: #171717` (Tailwind `neutral-900` = `oklch(0.145 0 0)`),
  `color: #d4d4d4` (`neutral-300`), `display: flex`, `align-items: center`,
  `height/width: 100%`. **The footer is vertically centred in its slide**, which is why the
  content occupies y ≈ 285–615 of the 900px slide.
- Inner container: `max-width: 1280px` (`max-w-7xl`), `margin: 0 auto`,
  `padding: 64px 32px` (`py-16 lg:px-8`). Measured 1088 × 448.79px at x 176, y 225.6.
- Top grid: `display: grid`, `grid-template-columns: repeat(3, minmax(0,1fr))` at `lg`,
  `gap: 32px` (`gap-8`).
- Column 1: measured x 208, w 328.
  - Logo row `display:flex; align-items:center; gap: 12px`, logo `h-8 w-8` (32×32),
    wordmark text `font-size: 20px`, `font-weight: 600`, `#ffffff`.
  - Tagline `margin-top: 16px`, `max-width: 320px` (`max-w-xs`), `font-size: 14px`,
    `line-height: 20px`. Measured 3 lines.
  - Social row `margin-top: 32px`, `display: flex`, `gap: 16px`. Icons 28×28.
    Link color `#a3a3a3` (`neutral-400`).
- Columns 2–3 wrapper: `display: grid`, `grid-template-columns: repeat(2, minmax(0,1fr))`,
  `gap: 24px` (`gap-6`) → `lg:gap-10` (40px), `grid-column: span 2` at `lg`,
  `align-items: start`. Measured x 560, w 704, columns 332px each with a 40px gap.
- Column heading `p`: `font-weight: 600` (`font-semibold`), `color: #ffffff`, 16px.
  Measured at y 296.
- `ul`: `margin-top: 20px` (`mt-5`), `display: flex`, `flex-direction: column`,
  `gap: 12px` (`space-y-3`), `font-size: 14px`. Measured first `<li>` baseline y 345,
  last y 504 (≈32px pitch).
- `li > a` color inherits `#d4d4d4`. Mail link is `display:flex; width:100%;
  max-width:100%; flex-wrap:wrap; align-items:center; gap: 8px; word-break: break-all`.
- Bottom bar: `margin-top: 48px` (`mt-12`),
  `border-top: 1px solid #262626` (`border-neutral-800`), `padding-top: 32px` (`pt-8`).
  Measured border at y 561.8.
- Copyright: `text-align: center`, `font-size: 12px`, `color: #737373` (`neutral-500`),
  measured at y 596.

## States & Behaviors
- **Social icon hover:** `color` `#a3a3a3` → `#ffffff` (`hover:text-white`). No transform.
- **Text link hover:** `opacity: 1` → `0.75` (`hover:opacity-75`). No colour change.
- Everything else is static. No click handlers.

## Assets / icons
- Logo: `/sites/sanamband-com-6610da83/root-8a5edab2/images/logo.svg`, plain `<img>`,
  `alt="SANAM logo"`, `class="h-8 w-8"`. (The live `<img>` has no width/height attributes —
  it relies on the Tailwind size classes.)
- `XBrandIcon`, `InstagramGlyph`, `YoutubeBrandIcon` from
  `src/components/sites/sanamband-com-6610da83/shared/icons` — all three are filled,
  `fill="currentColor"`, sized `h-7 w-7`.

## Text content (verbatim)
`SANAM`
`Music that bridges hearts and generations. India's most beloved independent band creating authentic connections through melody.`
`X (formerly Twitter)` (screen-reader only), `Instagram` (sr-only), `YouTube` (sr-only)
`Quick Links`, `Music`, `Tour Dates`, `Merchandise`, `Contact`, `Privacy Policy`, `Terms of Service`
`Connect`, `wearesanam@gmail.com`, `+91 96999 69940`, `Mumbai, India`
`© 2026 SANAM. All Rights Reserved.`

Note the apostrophe in `India's` is a straight `'`; the copyright symbol is `©`.

## Responsive behavior
- **≥1024px (`lg`):** 3-column top grid, 2-column links grid spanning 2 columns, `gap-10`.
- **<1024px:** single-column top grid; the links wrapper is still `grid-cols-2` (the live class
  list includes `grid-cols-2 min-[360px]:grid-cols-2`, i.e. two columns even on small
  screens). Measured at 390px: "Quick Links" column at x 29 and "Connect" at x 207, both
  top-aligned at y 366.
- **<360px:** the `min-[360px]` variant keeps it at two columns as well.
- Padding at 390px: `px-4` (16px) → measured content x 29, w 332 (matches `max-w-7xl` being
  wider than the viewport, minus 32px padding).
- Must fill its Swiper slide: `h-full w-full`, and must not introduce page scroll.

## Verification
Run `npx tsc --noEmit` from the app root. Must pass.