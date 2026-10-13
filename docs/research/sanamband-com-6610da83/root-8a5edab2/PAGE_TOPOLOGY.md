# PAGE TOPOLOGY — sanamband.com `/`

## Layer stack (top → bottom)

| z-index | Layer | Notes |
|---|---|---|
| 50 | `<header>` | `fixed inset-x-0 top-0 z-50`, height 64px, always transparent bg |
| 40 | Mobile menu overlay | `fixed inset-0 z-40`, `bg-black/90 backdrop-blur-lg xl:hidden`, only when open |
| 1 | `.swiper-creative` container | `relative`, `overflow: hidden`, `h-screen w-screen` |
| — | `.swiper-creative .swiper-wrapper` | `display: flex`, vertical, 5 (desktop) or 8 (mobile) slides |
| 10 | Outer pagination bullets | inside container, absolute right 8px, vertically centred |
| 10 | Inner (hero) horizontal pagination bullets | absolute bottom 8px of hero slide |
| — | Body | `h-screen w-screen`; document does **not** scroll |

The header and mobile menu overlay live **outside** `main`, as siblings. They are the only
elements that escape the Swiper clip.

## Section order

### Desktop (≥ 768px) — 5 slides

| # | Name | Root element | Interaction model | Theme for header |
|---|---|---|---|---|
| 0 | `HeroCarousel` | `.swiper.swiper-shutters` (nested) | **time-driven** autoplay 3200ms + drag + bullet click | light (white text) |
| 1 | `BandMembers` | `div.min-h-screen.bg-white.px-4.py-8...` | **static** (entry animations only; thumbnail hover) | dark (neutral-700 text) |
| 2 | `InstagramFeed` | `section.instagram-section.h-full.w-full` | **static** fallback state | dark |
| 3 | `NewsletterSignup` | `div#subscribe > section#subscribe` | **static** desktop / **click-driven** accordions on mobile | dark |
| 4 | `SiteFooter` | `footer.bg-neutral-900...` | **static** (link hover only) | light (white text) |

### Mobile (< 768px) — 8 slides

| # | Name | Notes |
|---|---|---|
| 0 | `HeroCarousel` | same nested carousel, `<picture>` mobile sources |
| 1–4 | `BandMemberCard` × 4 | one slide per member, full-screen photo + glass card |
| 5 | `InstagramFeed` | same fallback |
| 6 | `NewsletterSignup` | accordion layout |
| 7 | `SiteFooter` | same |

## Assembly rules for the page component

1. `src/app/page.tsx` renders a single client component `SanamHome` (needs Swiper + viewport
   branching).
2. `SanamHome` reads `isMobile = width < 768` and builds the slide list accordingly:
   - desktop: `[<HeroCarousel/>, <BandMembers/>, <InstagramFeed/>, <NewsletterSignup/>, <SiteFooter/>]`
   - mobile: `[<HeroCarousel/>, ...members.map(<BandMemberCard/>), <InstagramFeed/>, <NewsletterSignup/>, <SiteFooter/>]`
3. `SanamHome` owns the `Swiper` instance (`direction="vertical"`, `effect="creative"`,
   `speed: 800`, `grabCursor`, `mousewheel` on container, `pagination` clickable vertical,
   `watchProgress`) and publishes `activeIndex` so `SiteHeader` can pick its colour theme.
4. `SiteHeader` is rendered as a **sibling** of `main`, receives `isDarkSlide` (true for the
   hero and the footer slide, computed by the parent from the active index and the
   desktop/mobile slide list), and renders the fixed nav + mobile menu overlay.
5. Each slide child must fill its slide: `h-full w-full` and must not introduce page scroll.
   Slides 1–3 keep `overflow-y-auto` as the live site does.
6. The `.swiper-slide-4ffe { background-color: #333 }` rule exists so gaps during the hero's
   2400ms slide never flash white.