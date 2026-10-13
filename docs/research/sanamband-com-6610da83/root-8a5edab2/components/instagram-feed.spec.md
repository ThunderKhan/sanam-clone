# InstagramFeed Specification

## Overview
- **Target file:** `src/components/sites/sanamband-com-6610da83/root-8a5edab2/InstagramFeed.tsx`
- **Screenshot:** `docs/design-references/sanamband-com-6610da83/root-8a5edab2/03-instagram-desktop.png`, `08-instagram-mobile.png`
- **Interaction model:** static.

## The state you must reproduce is the API-failure fallback

The live site requests Instagram's oEmbed endpoint, which is blocked, so **no posts ever
render**. The observable result at both 1440×900 and 390×844 is a warm-grey gradient panel with
two lines of uppercase text. Clone exactly that. Do not invent a photo grid, do not fabricate
posts, do not add a heading (the live fallback has none — the empty space above is real).

## DOM Structure

```
<section class="instagram-section h-full w-full">
  <div class="instagram-background" />
  <div class="instagram-content mx-auto flex h-full max-w-6xl flex-col justify-center px-6 py-12 text-center">
    <div class="instagram-carousel-wrapper">
      <div class="py-16 text-sm uppercase tracking-[0.2em] text-neutral-500">
        Unable to load Instagram posts.
      </div>
    </div>
    <div class="mt-6 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
      <InstagramGlyph class="h-4 w-4" />
      <span>Swipe to see recent posts</span>
    </div>
  </div>
</section>
```

`InstagramGlyph` from `src/components/sites/sanamband-com-6610da83/shared/icons`
(`viewBox 0 0 448 512`, `fill="currentColor"`, `stroke-width="0"`). Size it `h-4 w-4`.

## Computed styles

The `.instagram-*` classes are **already defined** in
`src/components/sites/sanamband-com-6610da83/shared/site.css`, copied verbatim from the live
stylesheet. Apply them; do not restyle:

- `.instagram-section`: `background: linear-gradient(#f8f6f2 0%, #f1eee8 45%, #ebe6df 100%)`,
  `position: relative`, `overflow: hidden`.
- `.instagram-background`: `opacity: 0.8`, `pointer-events: none`, `height: 60%`,
  `position: absolute`, `inset: -20% 0 auto` (i.e. `top: -20%; left: 0; right: 0`),
  `background: radial-gradient(circle at 20% 20%, rgba(0,0,0,0.08), transparent 55%), radial-gradient(circle at 80% 30%, rgba(0,0,0,0.06), transparent 50%)`.
- `.instagram-carousel-wrapper`: `perspective: 1200px`, `padding: 20px 0 10px`,
  `position: relative`.
- `.instagram-content`: `padding-top: max(72px, min(8vh, 110px))` — this **overrides** the
  Tailwind `py-12`. Keep both classes as in the live DOM; the shared CSS wins on padding-top.

Text styles (Tailwind, exact):
- Fallback line: `font-size: 14px` (`text-sm`), `text-transform: uppercase`,
  `letter-spacing: 0.2em` (2.8px), `color: #737373` (`neutral-500`),
  `padding: 64px 0` (`py-16`).
- Hint line: `margin-top: 24px` (`mt-6`), `display: flex`, `align-items: center`,
  `justify-content: center`, `gap: 8px`, `font-size: 12px` (`text-xs`),
  `text-transform: uppercase`, `letter-spacing: 0.2em`, `color: #737373`.
- Container: `max-width: 1152px` (`max-w-6xl`), `width: 100%`, `height: 100%`,
  `display: flex`, `flex-direction: column`, `justify-content: center`,
  `padding: 48px 24px` (`px-6 py-12`), `text-align: center`.

## Measured positions (1440×900)

- Section fills the whole slide: 1440 × 900.
- `.instagram-content` measured 1152 × 900, starting at x 144.
- "Unable to load Instagram posts." baseline sits at y ≈ 448 (its box centre ≈ 448).
- "Swipe to see recent posts" sits at y ≈ 563.
- At 390×844 the two lines land at y ≈ 420 and y ≈ 536.
Both fall out of `justify-content: center` plus `padding-top: max(72px, min(8vh, 110px))`.

## States & Behaviors
- None. The section is completely static.
- The `instagram-swiper`, `instagram-slide`, `instagram-card`, `instagram-card-overlay`,
  `instagram-card-meta`, `instagram-audio-toggle`, `instagram-caption`, `instagram-stats` and
  `instagram-link` CSS classes exist in the shared stylesheet but are **unused** in this state.
  Do not render them.

## Text content (verbatim)
`Unable to load Instagram posts.`
`Swipe to see recent posts`

## Responsive behavior
- Identical at all widths; the only differences come from `max-w-6xl` + `px-6` and the
  `min(8vh, 110px)` term in `padding-top`.
- Must fill its Swiper slide: root is `h-full w-full`.
- Do not introduce page scroll.

## Verification
Run `npx tsc --noEmit` from the app root. Must pass.