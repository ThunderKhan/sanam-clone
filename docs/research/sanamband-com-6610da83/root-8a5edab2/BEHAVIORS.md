# BEHAVIORS — sanamband.com

All findings from a live browser session (Playwright MCP, Chromium) at 1440×900 and 390×844.

## Page shape

- The document **does not scroll**. `document.documentElement.scrollHeight === innerHeight === 900`.
- Everything is inside a full-viewport Swiper: `<main class="h-screen w-screen">` → `.swiper.swiper-creative`.
- No smooth-scroll library. `.lenis` / `.locomotive-scroll` absent. Native scroll only.
- No scroll-snap, no IntersectionObserver reveals, no parallax.

## Outer Swiper (`swiper-creative`)

Exact runtime params read from `element.swiper.params`:

| param | value |
|---|---|
| `direction` | `'vertical'` |
| `effect` | `'creative'` |
| `slidesPerView` | 1 |
| `spaceBetween` | 0 |
| `centeredSlides` | false |
| `loop` | false |
| `speed` | 800 |
| `grabCursor` | true |
| `mousewheel` | `{ enabled: true, releaseOnEdges: false, invert: false, forceToAxis: true, sensitivity: 1, eventsTarget: 'container', noMousewheelClass: 'swiper-no-mousewheel' }` |
| `threshold` | 5 |
| `allowTouchMove` | true |
| `watchProgress` | true (class `swiper-watch-progress` present) |

Slide transforms observed:
- prev: `translate3d(calc(0px), calc(0% + 0px), calc(-1px)) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)`
- active: `translate3d(calc(0px), calc(0% - 900px), calc(-1px)) ...`
- next: `translate3d(calc(0px), calc(100% - 3600px), calc(0px)) ...`

### Slide count is breakpoint-dependent (INTERACTION MODEL: swipe/scroll + click)

| viewport | outer slide count | slides |
|---|---|---|
| ≥ 768 px | 5 | 0 hero, 1 band, 2 instagram, 3 newsletter, 4 footer |
| < 768 px | 8 | 0 hero, 1 Sanam Puri, 2 Venkat Subramaniyam, 3 Keshav Dhanraj, 4 Samar Puri, 5 instagram, 6 newsletter, 7 footer |

The band section is ONE slide on desktop but FOUR slides on mobile (one per member, each a
full-screen glass card). The DOM actually swaps — the desktop markup does not exist at 390 px
and vice versa. This is a JS breakpoint branch, not CSS.

### Outer pagination
- `.swiper-pagination.swiper-pagination-vertical` — absolute, right 8px, vertically centred.
- Container rect at 1440×900: x 1424, y 412, w 8, h 76 (5 bullets × 8px + 6px margins).
- Active bullet: `background: rgb(255,255,255)`, `border-radius: 50%`, 8×8, `margin: 6px 0`, `transition: width 0.3s`.
- Inactive bullet: `background: rgba(185,191,199,0.65)`, `opacity: 0.2`.
- Bullets are clickable (`swiper-pagination-clickable`), `role="button"`, `aria-label="Go to slide N"`.

## Header

- `<header class="fixed inset-x-0 top-0 z-50 transition-colors duration-300 bg-transparent">`, height 64px, always transparent background.
- `nav.relative.flex.w-full.items-center.justify-between.px-4.py-3.md:px-6.lg:px-8` — computed padding `12px 32px` at 1440 (lg:px-8), height 64px.

### Header theme is driven by the ACTIVE SLIDE (not scroll)

| active slide | nav link class | link color | logomark color |
|---|---|---|---|
| 0 (hero, dark image) | `text-white` | `rgb(255,255,255)` | `rgb(255,255,255)` |
| 1, 2, 3 (light slides) | `text-neutral-700` | `lab(27.036 0 0)` ≈ `#3f3f46` | `rgb(0,0,0)` |
| 4 (footer, dark) | `text-white` | `rgb(255,255,255)` | `rgb(255,255,255)` |

Transition: `transition-colors duration-300` → `color 0.3s cubic-bezier(0.4,0,0.2,1)`.
The logomark/wordmark swap `text-white` ⇄ `text-black` with the same 300 ms colour transition.

### Desktop nav link markup (exact)
Two stacked spans — an invisible `font-medium` sizer and an absolutely positioned overlay
whose weight changes on hover:

```html
<a class="group relative px-1 text-sm uppercase tracking-widest text-white" href="/music">
  <span class="invisible font-medium">Music</span>
  <span class="absolute inset-0 flex items-center justify-center transition-all font-light group-hover:font-medium">Music</span>
</a>
```

Computed on the link: `font-size: 14px`, `line-height: 20px`, `letter-spacing: 1.4px`
(`tracking-widest` = 0.1em), `text-transform: uppercase`, `padding: 0 4px`, `color` per theme.
Nav row is `absolute inset-y-0 left-1/2 -translate-x-1/2 items-center gap-6` (24px gaps),
`hidden xl:flex`.

### Desktop right-hand pill cluster
`hidden xl:flex items-center space-x-2`. Three items separated by
`<span class="text-sm font-light opacity-30 select-none text-white">|</span>`.

Each pill: `<a class="block cursor-pointer outline-none">` wrapping
`div.group.flex.items-center.justify-end.rounded-full.h-10.p-1.border.border-current.select-none.transition-colors.duration-300.hover:bg-neutral-500/10.text-white`
containing a CSS-grid width animation and a 32×32 icon circle:

```html
<div class="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-[grid-template-columns] duration-500 ease-out">
  <div class="overflow-hidden min-w-0 flex items-center">
    <span class="pl-3 pr-2 text-xs font-bold tracking-[0.2em] uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">Join</span>
  </div>
</div>
<div class="flex h-8 w-8 items-center justify-center shrink-0 rounded-full">…icon…</div>
```

Measured: pill 41.6 × 40px at rest (icon only). Labels: `Join`, `Subscribe`, `Login`.
Icons: `lucide-mail` (`h-4.5 w-4.5`), `lucide-youtube` (`h-5 w-5`), `lucide-user` (`h-5 w-5`, strokeWidth 2.5).
Hover: `background-color` → `rgb(122 122 122 / 0.1)`, label fades in, pill widens — 500 ms ease-out.

### Mobile header (`< xl`)
`div.flex.xl\:hidden.items-center.gap-2.sm:gap-4` containing:
- Login pill button: `flex items-center gap-2 rounded-full border border-current p-1 transition-all active:scale-95 text-left outline-none text-white`, label `text-xs sm:text-sm font-bold uppercase tracking-wider pl-2`, 28×28 icon circle.
- Hamburger button: `relative z-50 inline-flex items-center justify-center rounded-md p-2 outline-none`, `aria-label="Toggle menu"`, `aria-expanded`, `lucide-menu h-6 w-6`.

### Mobile menu overlay (click-driven)
- Opens on hamburger click. Container:
  `fixed inset-0 z-40 h-screen w-screen bg-black/90 backdrop-blur-lg xl:hidden`
  (computed background `oklab(0 0 0 / 0.9)`).
- Inner: `flex h-full w-full flex-col items-center justify-center px-6 pb-12`
  → `flex flex-col items-center space-y-7 text-center w-full`
  → 5 links `block text-xl uppercase tracking-widest text-white transition-all font-medium`
  (active `font-medium`, others `font-light hover:font-medium`): Home, Music, Tour, Merchandise, Contact
  → `w-full max-w-xs pt-8 mt-4 border-t border-white/20 space-y-4`
  → 2 outline buttons `flex w-full items-center justify-center gap-3 rounded-full border border-white px-6 py-2.5 text-base font-medium uppercase tracking-widest text-white transition-transform active:scale-95`:
  `lucide-mail` + "Join Community" (→ `/#subscribe`), `lucide-youtube` + "Subscribe" (→ YouTube channel).
- The hamburger icon swaps to an X while open. `Escape` closes it.

## Hero slide (outer slide 0) — nested carousel

`<div class="swiper swiper-shutters swiper-horizontal">` filling the slide.

Exact runtime params:

| param | value |
|---|---|
| `effect` | `'shutters'` |
| `direction` | `'horizontal'` |
| `slidesPerView` | 1 |
| `spaceBetween` | 0 |
| `loop` | true |
| `speed` | 2400 |
| `grabCursor` | true |
| `threshold` | 5 |
| `autoplay` | `{ enabled: true, delay: 3200, waitForTransition: true, disableOnInteraction: false, stopOnLastSlide: false, reverseDirection: false, pauseOnMouseEnter: false }` |

**IMPORTANT — the `shutters` effect is registered as a no-op.** Sampled 10 times across a full
`slideNext()` cycle: `transform`, `opacity`, `clip-path`, `mask-image`, width and height on the
outgoing and incoming slides never changed. All non-active slides carry `swiper-slide-4ffe`
which only supplies `background-color: rgb(51,51,51)`. The only motion is the wrapper translate
(`transition-duration: 2400ms`, e.g. `translate3d(-5760px, 0, 0)`). So: **a slow 2400 ms
horizontal slide, auto-advancing every 3200 ms, looping.** Do not build a strip-reveal effect.

Wrapper style observed: `cursor: grab; transform: translate3d(-5760px, 0px, 0px); transition-duration: 2400ms;`

### Hero slide markup (exact, per banner)
```html
<div class="relative block h-full w-full overflow-hidden">
  <picture>
    <source media="(max-width: 767px)" srcset="/HeroCarousel/<Mobile>.png" />
    <img alt="…" class="slide-cover-image" src="/HeroCarousel/<Desktop>" />
  </picture>
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0"></div>
  <div class="pointer-events-none absolute left-1/2 bottom-8 md:bottom-8 -translate-x-1/2">
    <a class="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/25 bg-gradient-to-r from-white/80 via-white/70 to-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-black/85 shadow-xl shadow-black/30 backdrop-blur-md transition hover:-translate-y-0.5" href="…">
      <span class="h-1.5 w-1.5 rounded-full bg-black/70 shadow-[0_0_0_4px_rgba(255,255,255,0.6)]"></span>
      <span>Tour</span>
      <span class="text-sm leading-none">↗</span>
    </a>
  </div>
</div>
```
- `.slide-cover-image { object-fit: cover; object-position: center center; width: 100%; height: 100%; display: block; }`
- CTA pill computed: height 34.1px, `border-radius: 9999px`, `font-size: 11px`,
  `letter-spacing: 0.26em` (2.86px), `font-weight: 600`, background
  `linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.8) 100%)`.
- Hover: `transform: translateY(-2px)` via `hover:-translate-y-0.5`.

### Inner (horizontal) pagination
`.swiper-pagination.swiper-pagination-horizontal`, absolute `bottom: 8px`, full width, height 24px.
Active bullet 8×8 `rgb(255,255,255)`; inactive 8×8 `rgba(185,191,199,0.65)` `opacity: 0.2`;
`margin: 0 4px`.

### Hero banner content (verbatim)

| # | label | href | desktop asset | mobile asset | img alt |
|---|---|---|---|---|---|
| 1 | Tour | `/tour` | `TourBannerDesktop.png` (2520×1490) | `TourBannerMobile.png` | See the latest tour dates |
| 2 | Watch Latest Release | `https://youtu.be/Gf7Lf4kiZ-A?si=CN1TTNSXzlb0lOPI` | `LatestMusicDesktop.jpg` (1280×720) | `LatestMusicMobile.png` | See the latest Release |
| 3 | Shop merch | `/merchandise` | `MerchBannerDesktop.png` (2384×1695) | `MerchBannerMobile.png` | Shop SANAM merchandise |
| 4 | Follow us | `https://www.instagram.com/sanamband?igsh=YnNleXFmaTk5aXFl` | `GroupBannerDesktop.png` (5400×2700) | `groupBannerMobile.png` | Follow SANAM on Instagram |
| 5 | Listen to us | `/music#latest` | `MusicBannerDesktop.png` (2448×1549) | `MusicBannerMobile.png` | Explore the latest music from SANAM |

## Band section — desktop (outer slide 1)

`div.min-h-screen.bg-white.px-4.py-8.sm:px-8.md:px-12.lg:px-16`
→ `div.mx-auto.flex.h-[min(80vh,80vw)].w-full.max-w-screen-xl.gap-6.sm:gap-10.lg:gap-16`

At 1440×900 the inner flex row measures 1280 × 720px, with two children:
- featured card column `flex-[0.9] flex items-center`
- thumbnail column `flex-[2.1] flex items-center`

Featured card: `relative block aspect-[3/4] h-full w-full overflow-hidden rounded-2xl bg-gray-100 shadow-xl`
- img `absolute inset-0 object-cover object-top image-fade-in`
- caption `absolute bottom-0 left-0 z-20 p-6 text-white text-fade-in`
  - `h2.text-2xl.font-semibold` → `Sanam Puri`
  - `p.mt-1.text-sm.text-white/80` → `Vocals & Lead Composer`
  - `p.mt-3.max-w-md.text-sm.leading-relaxed.text-white/90` → the long bio
- scrim `pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent`

Thumbnail grid: `aspect-square h-full w-full` → `grid h-full w-full grid-cols-2 gap-12`
→ 4 cards `group relative block overflow-hidden rounded-2xl bg-gray-200 cursor-pointer`

Each thumbnail card contains, in order:
1. `img.object-cover.object-top.transition-all.duration-300`
   - ACTIVE (Sanam Puri, first): `grayscale-0 scale-105` and **no** dark overlay div
   - others: `grayscale group-hover:grayscale-0` plus
     `div.absolute.inset-0.bg-black/10.transition-opacity.duration-300.group-hover:opacity-0`
2. `div.absolute.bottom-0.left-0.p-5.z-10` with `h3.text-lg.font-semibold.text-white` + `p.text-sm.text-white/80`
3. `div.absolute.inset-0.bg-gradient-to-t.from-black/60.via-transparent.to-transparent.pointer-events-none`
4. `a.absolute.bottom-2.right-1.z-20.inline-flex.h-9.w-9.items-center.justify-center.rounded-full.bg-black/70.text-white.transition.hover:scale-120.hover:bg-black` with an `lucide-instagram h-5 w-5` icon (→ each member's Instagram)

**Hover states (measured from class names; `hover:scale-120` has NO CSS rule in the live
stylesheet — it is an invalid Tailwind class and does nothing. Do not add a scale.)**
- thumbnail img: `filter: grayscale(1)` → `grayscale(0)` over `transition: all 300ms`
- thumbnail overlay: `opacity: 1` → `0` over `transition: opacity 300ms`
- Instagram button: `background-color: rgb(0,0,0,0.7)` → `rgb(0,0,0)`

**Clicking a thumbnail does NOT change the featured card.** Verified: clicked the 4th
thumbnail, the featured `<h2>` still read "Sanam Puri". The section is therefore
**static — no state**. Only hover states exist.

### Entry animations
```css
.image-fade-in { opacity: 0; animation: 1.9s ease-out 0s 1 normal forwards running fadeIn; }
.text-fade-in  { opacity: 0; animation: 0.6s ease-out 50ms 1 normal forwards running fadeInUp; }
@keyframes fadeIn   { 0% { opacity: 0; transform: scale(1.01); } 100% { opacity: 1; transform: scale(1); } }
@keyframes fadeInUp { 0% { opacity: 0; transform: translateY(10px); }  100% { opacity: 1; transform: translateY(0); } }
```

## Band section — mobile (outer slides 1–4)

Each slide is a full-screen member card:
```html
<div class="mobile-slide-wrapper">
  <div class="mobile-slide-background">
    <img alt="Sanam Puri" class="object-cover object-top" sizes="100vw" src="/faces/sanam00.png" />
    <div class="mobile-slide-overlay"></div>
  </div>
  <div class="mobile-slide-card fixed-card">
    <a href="https://www.instagram.com/sanampuri/" target="_blank" rel="noopener noreferrer" class="block">
      <div class="glassy-card">
        <div class="mobile-card-content">
          <div class="mobile-card-text">
            <h2 class="mobile-card-name">Sanam Puri</h2>
            <p class="mobile-card-title">Vocals &amp; Lead Composer</p>
            <p class="mobile-card-description">…</p>
            <div class="mobile-card-footer">[link icon] Tap to see Sanam Puri's Instagram profile</div>
          </div>
        </div>
      </div>
    </a>
  </div>
</div>
```

CSS (verbatim from the live stylesheet):
```css
.mobile-slide-wrapper { background-color:#000; width:100%; height:100%; position:relative; overflow:hidden; }
.mobile-slide-background { position:absolute; inset:0; }
.mobile-slide-background img { object-fit:cover; object-position:center top; }
.mobile-slide-background::after { content:""; background:linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.75)); position:absolute; inset:0; }
.mobile-slide-card { position:absolute; bottom:calc(1rem + env(safe-area-inset-bottom,0)); z-index:10; padding-bottom:env(safe-area-inset-bottom,0); left:1rem; right:1rem; }
.fixed-card { /* no rules — marker class only */ }
.glassy-card { color:#fff; max-height:calc(70vh - env(safe-area-inset-bottom,0)); scrollbar-width:thin; scrollbar-color:rgba(255,255,255,0.4) transparent; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); border-radius:1.25rem; padding:1rem; overflow-y:auto; box-shadow:0 8px 32px rgba(0,0,0,0.35); }
.glassy-card::-webkit-scrollbar { width:6px; }
.glassy-card::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.4); border-radius:999px; }
.mobile-card-content { display:flex; flex-direction:column; gap:0.8rem; }
.mobile-card-text { flex:1 1 0%; }
.mobile-card-name { color:#fff; font-size:1.3rem; font-weight:700; }
.mobile-card-title { color:#ddd; margin-bottom:0.5rem; font-size:0.9rem; font-weight:500; }
.mobile-card-description { color:#f5f5f5; text-align:justify; margin-top:0.25rem; margin-bottom:0.75rem; font-size:0.9rem; line-height:1.5; }
.mobile-card-footer { color:#e5e5e5; display:flex; align-items:center; gap:0.4rem; font-size:0.75rem; text-decoration:none; transition:color 0.3s; }
.mobile-card-footer:hover { color:#fff; }
```
Measured card rect at 390×844: x 16.15, y 573.87, w 358.1, h 253.8.

Mobile member content (verbatim):

| name | role | image | instagram | description |
|---|---|---|---|---|
| Sanam Puri | Vocals & Lead Composer | `/faces/sanam00.png` | `https://www.instagram.com/sanampuri/` | The face of the band and its defining voice. Sanam is the band leader with vision and emotion. A singer, songwriter, and dreamer whose voice carries words straight into the hearts of listeners across the world. His melodies bridge nostalgia and newness, making every song unforgettable. |
| Venkat Subramaniyam | Bass & Arranger | `/faces/venky00.jpg` | `https://www.instagram.com/venkysbass/` | The sonic architect of the band. Venky's deep understanding of sound, harmony, and groove turns every track into an experience. His basslines and arrangements give SANAM its pulse. Thoughtful, musical, and alive with soul. |
| Keshav Dhanraj | Drums & Programmer | `/faces/keshav00.jpg` | `https://www.instagram.com/keshavdhanraj/` | The driving force behind SANAM, on and off the stage. Keshav is the backbone who turns new vision into reality with direction and creativity. A drummer, programmer and visionary. An unshakable anchor for SANAM. |
| Samar Puri | Guitars, Lyrics & Editor | `/faces/samar00.jpg` | `https://www.instagram.com/samarpuri/` | The storyteller of SANAM. Samar’s video edits and lyrics bring emotion and depth, while his creative direction keeps the visual and lyrical world honest and connected. His simple yet powerful artistry gives SANAM the soul and sincerity the band is known for. |

## Instagram section (outer slide 2 desktop / 5 mobile)

Observed state is the **API-failure fallback** — the Instagram oEmbed request is blocked, so no
posts render. This is the honest pixel-perfect target.

```html
<section class="instagram-section h-full w-full">
  <div class="instagram-background"></div>
  <div class="instagram-content mx-auto flex h-full max-w-6xl flex-col justify-center px-6 py-12 text-center">
    <div class="instagram-carousel-wrapper">
      <div class="py-16 text-sm uppercase tracking-[0.2em] text-neutral-500">Unable to load Instagram posts.</div>
    </div>
    <div class="mt-6 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
      <svg viewBox="0 0 448 512" class="h-4 w-4" fill="currentColor" stroke="currentColor" stroke-width="0" aria-hidden="true">…instagram glyph…</svg>
      <span>Swipe to see recent posts</span>
    </div>
  </div>
</section>
```
CSS:
```css
.instagram-section { background: linear-gradient(#f8f6f2 0%, #f1eee8 45%, #ebe6df 100%); position:relative; overflow:hidden; }
.instagram-background { opacity:0.8; pointer-events:none; background: radial-gradient(circle at 20% 20%, rgba(0,0,0,0.08), transparent 55%), radial-gradient(circle at 80% 30%, rgba(0,0,0,0.06), transparent 50%); height:60%; position:absolute; inset:-20% 0 auto; }
.instagram-carousel-wrapper { perspective:1200px; padding:20px 0 10px; position:relative; }
.instagram-content { padding-top: max(72px, min(8vh, 110px)); }
```
(The `instagram-*` card/swiper styles for the loaded state exist in the stylesheet too —
`.instagram-swiper`, `.instagram-slide`, `.instagram-card`, `.instagram-media`,
`.instagram-card-overlay`, `.instagram-card-meta`, `.instagram-audio-toggle`,
`.instagram-caption`, `.instagram-stats`, `.instagram-link` — but are unreachable without posts.)

## Newsletter section (outer slide 3 desktop / 6 mobile)

Static content, no carousel of its own. Wrapped in `div#subscribe.h-full.w-full` →
`div.h-full.w-full` (opacity/transform animation wrapper) →
`section#subscribe.scroll-mt-32.mx-auto.h-full.w-full.max-w-[85vw].py-12`.

Note: at 900px tall the content overflows above the fold — the eyebrow "STAY CONNECTED" sits at
y≈57 and is partially covered by the fixed header. Replicate as-is (no extra top padding).

### Header block
- `p.font-bold.text-neutral-500.tracking-wider.uppercase.text-xs.mb-2` → `Stay Connected`
- `h2.text-4xl.md:text-4xl.font-bold.text-black.mb-2` → `Join the SANAM Community`
- `p.max-w-2xl.mx-auto.text-lg.text-neutral-600.font-light.leading-relaxed` →
  `Be part of our musical journey. Get exclusive access to tour announcements, new releases, and behind-the-scenes content.`

### Desktop body `hidden lg:grid.grid-cols-1.lg:grid-cols-2.gap-10.items-start`
Left column `space-y-6`:
- `h3.text-2xl.font-bold.text-black.border-b.border-neutral-200.pb-4.inline-block` → `What You'll Get:`
- `div.grid.grid-cols-1.gap-5` with four `div.flex.items-start.gap-5.group` rows:
  - icon chip `div.flex-shrink-0.pt-1.p-2.bg-neutral-100.rounded-full.group-hover:bg-neutral-200.transition-colors`
    holding `lucide h-6 w-6 text-neutral-800` — `lucide-calendar`, `lucide-music`,
    `lucide-ticket`, `lucide-users` (viewBox 0 0 24 24)
  - `h4.font-semibold.text-black.text-lg.group-hover:text-neutral-700.transition-colors`
  - `p.mt-1.text-neutral-600.font-light`
  1. Tour Announcements — Be the first to know about upcoming concerts and tour dates.
  2. New Releases — Get notified when we drop new songs and music videos.
  3. Exclusive Merchandise — Early access to limited edition merchandise and special offers.
  4. Behind the Scenes — Exclusive content, studio updates, and personal stories.

Right column: `div.bg-white.rounded-2xl.p-8.lg:p-10.border.border-neutral-100.shadow-2xl`
- `h3.text-2xl.font-bold.text-black` → `Subscribe now`
- `p.mt-2.text-neutral-600.font-light` → `Join our fans who never miss an update.`
- `form.mt-8.space-y-5`
  - floating-label input: `div.relative.group` →
    `input#email-address-desktop.peer.block.w-full.rounded-lg.bg-neutral-100.border-transparent.py-3.px-4.text-neutral-900.placeholder-transparent.focus:border-black.focus:ring-0.transition-all.duration-300` and
    `label.absolute.left-3.top-3.text-sm.text-neutral-500.transition-all.duration-300.peer-placeholder-shown:top-3.peer-placeholder-shown:text-neutral-500.peer-placeholder-shown:text-sm.peer-focus:-top-2.peer-focus:text-xs.peer-focus:text-black.peer-focus:bg-white.bg-transparent.px-1` → `Email Address`
  - submit: `button.w-full.flex.justify-center.items-center.gap-2.py-3.px-4.rounded-lg.text-sm.font-bold.tracking-wider.text-white.bg-black.hover:bg-neutral-800.transition-all.duration-300` →
    `Don't miss a beat` + `lucide-arrow-right h-4 w-4`
- `p.mt-4.text-xs.text-neutral-400.text-center` →
  `By subscribing, you agree to receive marketing emails from SANAM. You can unsubscribe at any time.`

### Mobile body `lg:hidden.mt-6.border-t.border-neutral-200` — two accordions
`div.border-b.border-neutral-200.py-4` each holding
`button.w-full.flex.justify-between.items-center.text-left` with
`h3.text-xl.font-bold.text-black` + a rotating `div` wrapping `lucide-chevron-down h-6 w-6 text-neutral-500`.
Default state at 390px: "What You'll Get:" collapsed (chevron down, `transform: none`),
"Subscribe now" expanded (chevron up). The expanded panel shows the same
description + email input + black submit button + disclaimer, stacked and full width.

## Footer section (outer slide 4 desktop / 7 mobile)

`footer.bg-neutral-900.text-neutral-300.h-full.w-full.flex.items-center`
→ `div.mx-auto.max-w-7xl.px-4.py-16.sm:px-6.lg:px-8`
→ `div.grid.grid-cols-1.gap-8.lg:grid-cols-3`

Column 1:
- `div.flex.items-center.gap-3` → `img.h-8.w-8` (`/logo.svg`) + `span.text-xl.font-semibold.text-white` → `SANAM`
- `p.mt-4.max-w-xs.text-sm` →
  `Music that bridges hearts and generations. India's most beloved independent band creating authentic connections through melody.`
- `div.mt-8.flex.gap-4` — three `a.text-neutral-400.hover:text-white`, each with
  `span.sr-only` label and a `h-7 w-7` filled brand glyph:
  X (`viewBox 0 0 512 512`), Instagram (`0 0 448 512`), YouTube (`0 0 576 512`).
  hrefs: `https://x.com/sanam_official`, `https://www.instagram.com/sanamband/`,
  `https://www.youtube.com/c/SANAM` (all `target="_blank" rel="noopener noreferrer"`).

Columns 2–3 wrapper: `div.grid.grid-cols-2.gap-6.min-[360px]:grid-cols-2.sm:gap-6.lg:gap-10.lg:col-span-2.items-start`
- `p.font-semibold.text-white` → `Quick Links`, `ul.mt-5.space-y-3.text-sm` with
  `li > a.hover:opacity-75`: Music `/music`, Tour Dates `/tour`, Merchandise `/merchandise`,
  Contact `/contact`, Privacy Policy `/privacy`, Terms of Service `/terms`
- `p.font-semibold.text-white` → `Connect`, `ul.mt-5.space-y-3.text-sm`:
  `mailto:wearesanam@gmail.com` (link class `flex w-full max-w-full flex-wrap items-center gap-2 hover:opacity-75 break-all`),
  `https://wa.me/919699969940?text=Hi%20SANAM%20team!%20I'd%20love%20to%20talk%20about%20gigs%2C%20collaborations%2C%20or%20media%20enquiries.`
  (label `+91 96999 69940`), plain `<li>Mumbai, India</li>`

Bottom: `div.mt-12.border-t.border-neutral-800.pt-8` →
`p.text-center.text-xs.text-neutral-500` → `© 2026 SANAM. All Rights Reserved.`

At 1440×900 the footer block measures 1088 × 448.8px and is vertically centred (items-center).

## Responsive breakpoints observed

| width | change |
|---|---|
| < 768 px | outer swiper has 8 slides (band splits into 4); hero uses `<picture>` mobile sources; newsletter uses accordions; footer 2-col link grid |
| 768–1279 px | header shows the `xl:hidden` cluster (Login pill + hamburger); centre nav hidden |
| ≥ 1280 px (`xl`) | centre nav row visible; right pill cluster visible with hover-reveal labels |
| ≥ 1024 px (`lg`) | newsletter shows the 2-column grid instead of accordions |

## Typography / colours

- Body font-family on the live site resolves to the **system stack** (no webfont is loaded):
  `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`.
  Body `<body>` class contains `antialiased`. Use Tailwind's default `font-sans` / system stack — do NOT add a webfont.
- Type scale in use: `text-xs` 12px, `text-sm` 14px/20px, `text-lg` 18px, `text-xl` 20px,
  `text-2xl` 24px, `text-4xl` 36px, plus custom `text-[11px]`.
- Weights used: `font-light` (300) widely for body copy, `font-medium` (500),
  `font-semibold` (600), `font-bold` (700).
- Colours are shadcn/`neutral` Tailwind defaults — `neutral-900` footer, `neutral-700` header
  links on light slides, `black` headings, `neutral-500`/`neutral-600` body copy,
  `neutral-100`/`neutral-200` chips and borders.

## Title / meta

- `<title>SANAM</title>`
- description: `Official website of SANAM.`
- favicon: `/favicon.ico` (256×256), downloaded to
  `public/sites/sanamband-com-6610da83/shared/seo/favicon.ico`