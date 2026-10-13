# HeroCarousel Specification

## Overview
- **Target file:** `src/components/sites/sanamband-com-6610da83/root-8a5edab2/HeroCarousel.tsx`
- **Screenshot:** `docs/design-references/sanamband-com-6610da83/root-8a5edab2/01-hero-desktop.png`, `06-hero-mobile.png`
- **Interaction model:** **time-driven** autoplay (3200 ms) + drag + bullet click. A nested
  horizontal Swiper lives inside the vertical `creative` Swiper that the page owns.

## IMPORTANT — do not build a strip/shutter reveal

The live site configures `effect: 'shutters'` on this carousel, but that effect module is not
registered, so it is a **no-op**. Verified by sampling `transform`, `opacity`, `clip-path`,
`mask-image`, width and height on every slide ten times across a full `slideNext()` cycle: none
of them ever changed. The only motion is the wrapper translate.

So: **a plain horizontal Swiper, looped, 2400 ms transition, auto-advancing every 3200 ms.**
Omit `effect` entirely.

## Swiper configuration (read from the live `element.swiper.params`)

```ts
{
  direction: "horizontal",
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  speed: 2400,
  grabCursor: true,
  allowTouchMove: true,
  threshold: 5,
  autoplay: { delay: 3200, waitForTransition: true, disableOnInteraction: false },
  pagination: { clickable: true },
}
```

Classes the live Swiper adds (keep them so the shared CSS applies):
container `swiper swiper-shutters swiper-horizontal swiper-watch-progress will-change-transform`.

Import from `swiper/react` (`Swiper`, `SwiperSlide`) and `swiper/modules`
(`Autoplay`, `Pagination`). Do **not** import any effect module.

## DOM Structure

```
<div class="swiper swiper-shutters swiper-horizontal will-change-transform h-full w-full">
  <div class="swiper-wrapper">
    <SwiperSlide>  (× 5)
      <div class="relative block h-full w-full overflow-hidden">
        <picture>
          <source media="(max-width: 767px)" srcSet={banner.mobileImage} />
          <img alt={banner.alt} className="slide-cover-image" src={banner.desktopImage} />
        </picture>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />
        <div className="pointer-events-none absolute left-1/2 bottom-8 -translate-x-1/2">
          <a className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/25 bg-gradient-to-r from-white/80 via-white/70 to-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-black/85 shadow-xl shadow-black/30 backdrop-blur-md transition hover:-translate-y-0.5" href={banner.href} target={banner.external ? "_blank" : undefined} rel={banner.external ? "noopener noreferrer" : undefined}>
            <span className="h-1.5 w-1.5 rounded-full bg-black/70 shadow-[0_0_0_4px_rgba(255,255,255,0.6)]" />
            <span>{banner.label}</span>
            <span className="text-sm leading-none">↗</span>
          </a>
        </div>
      </div>
    </SwiperSlide>
  </div>
  <div className="swiper-pagination swiper-pagination-horizontal" />
</div>
```

The `← →` characters are the actual glyph used on the live site: `↗`.

## Data source

Import `heroBanners` from
`src/components/sites/sanamband-com-6610da83/shared/content` — do **not** redeclare it.

| # | label | href | external | alt |
|---|---|---|---|---|
| 1 | `Tour` | `/tour` | false | See the latest tour dates |
| 2 | `Watch Latest Release` | `https://youtu.be/Gf7Lf4kiZ-A?si=CN1TTNSXzlb0lOPI` | true | See the latest Release |
| 3 | `Shop merch` | `/merchandise` | false | Shop SANAM merchandise |
| 4 | `Follow us` | `https://www.instagram.com/sanamband?igsh=YnNleXFmaTk5aXFl` | true | Follow SANAM on Instagram |
| 5 | `Listen to us` | `/music#latest` | false | Explore the latest music from SANAM |

Images: `banner.desktopImage` / `banner.mobileImage` (already namespaced under
`/sites/sanamband-com-6610da83/root-8a5edab2/images/hero/`). Use a plain `<img>` — the live
site uses a plain `<img>` with the `.slide-cover-image` class, not `next/image`.

## Computed styles

- `.slide-cover-image`: `object-fit: cover; object-position: center center; width: 100%;
  height: 100%; display: block;` (already defined in the shared `site.css`; do not redefine).
- Scrim: `linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)`.
- CTA wrapper: `position: absolute`, `left: 50%`, `bottom: 32px`, `translateX(-50%)`,
  `pointer-events: none` (the inner link re-enables pointer events).
- CTA link measured: `height 34.1px`, `border-radius: 9999px`,
  `border: 1px solid rgba(255,255,255,0.25)`,
  `background-image: linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.8) 100%)`,
  `padding: 8px 16px` (`px-4 py-2`), `font-size: 11px`, `font-weight: 600`,
  `letter-spacing: 0.26em` (2.86px), `color: rgba(0,0,0,0.85)`, `gap: 8px`,
  `box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` (that's
  `shadow-xl`) — the live sheet computes it as `shadow-xl shadow-black/30`, so
  `shadow-xl` alone is correct; `backdrop-filter: blur(12px)` (`backdrop-blur-md`).
- Pagination bullets (horizontal): container `position: absolute; bottom: 8px; width: 100%;
  height: 24px`. Active bullet `8×8`, `background: #fff`, `border-radius: 50%`,
  `margin: 0 4px`, `transition: width 0.3s`. Inactive bullet `8×8`,
  `background: rgba(185,191,199,0.65)`, `opacity: 0.2`, `margin: 0 4px`.
  These come from Swiper's own `swiper.css`; import `swiper/css` globally (the page shell does
  this) and do not hand-roll bullets.

## States & Behaviors

### Autoplay
- **Trigger:** `Autoplay` module with `delay: 3200`, `waitForTransition: true`,
  `disableOnInteraction: false` — so dragging does **not** stop the auto-advance.
- Since `speed` is 2400 ms and the delay is 3200 ms, each banner is fully settled for 800 ms.

### Slide motion
- The wrapper carries `transition-duration: 2400ms`. Non-active slides keep the
  `swiper-slide-4ffe` class whose only effect is `background-color: #333` (defined in the
  shared `site.css`) so the slide window never flashes white mid-transition. Because the
  effect module is not registered, Swiper will **not** add that class for you — add it
  yourself via `className="swiper-slide-4ffe"` on each `SwiperSlide`.

### CTA hover
- `transform: translateY(-2px)` (`hover:-translate-y-0.5`), `transition: transform 150ms`.

### Pagination click
- `pagination: { clickable: true }` — bullets carry `role="button"`,
  `aria-label="Go to slide N"` and are keyboard focusable (`tabIndex={0}`). This comes free
  from Swiper's Pagination module.

## Responsive behavior
- **≥768px:** `<img src={desktopImage}>`.
- **<768px:** the `<picture><source media="(max-width: 767px)">` swaps in `mobileImage`.
  Implement with a real `<picture>` element exactly as shown above.
- CTA pill position is identical at both sizes (`bottom-8`).
- The hero fills the whole slide: the component's root must be `h-full w-full`.

## Verification
Run `npx tsc --noEmit` from the app root. Must pass.