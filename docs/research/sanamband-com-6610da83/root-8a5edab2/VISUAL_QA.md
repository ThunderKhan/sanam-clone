# VISUAL QA — sanamband.com clone

Original screenshots live in `docs/design-references/sanamband-com-6610da83/root-8a5edab2/`
Clone screenshots live in `.../clone/`.
Compared at 1440×900 and 390×844 against `https://www.sanamband.com/`.

## Discrepancies found and fixed during QA

| # | Symptom | Cause | Fix |
|---|---|---|---|
| 1 | Whole page rendered as a single white screen; the hero image was loaded but invisible; the outer Swiper measured 26,843,546px tall | The `.swiper-creative` container was missing the `h-screen w-screen` (and `swiper-3d`) classes from the live DOM, so its height came from content and the nested hero Swiper fed a circular `h-full` back into it | Added `h-screen w-screen swiper-3d` to the container class in `SanamHome.tsx` |
| 2 | Band-section portraits overflowed their cards (featured image 809.6px tall in a 720px card; Keshav's landscape portrait left an empty grey band) | The images used `absolute inset-0` with `height: auto`. For an absolutely-positioned **replaced element** with `height: auto`, CSS ignores `top`/`bottom` and uses the intrinsic ratio. The live site escapes this because `next/image` sets inline `height: 100%; width: 100%` | Added `h-full w-full` to the featured and thumbnail `<img>` elements in `BandMembers.tsx` |
| 3 | Band section sat 48px too low (content top y=128 vs live y=80) | The live slide carries `pt-24` (96px) yet its content renders 48px down, not 96px. Matched the **rendered** result instead of the class | Changed the band slide class in `SanamHome.tsx` from `pt-24` to `pt-12` |
| 4 | Outer Swiper ran with `effect: "slide"` | `EffectCreative` was registered as a module but the `effect` prop was never set | Added `effect="creative"` in `SanamHome.tsx` |
| 5 | `npx eslint` errors: three `<a href="/">` internal links; two `setState` calls directly inside an effect body | Lint rules `@next/next/no-html-link-for-pages` and `react-hooks/set-state-in-effect` | Swapped the internal links to `next/link`; replaced the two reset effects with React's "adjust state during render" pattern |

## Verified identical after fixes

### Geometry (measured with `getBoundingClientRect()` on both sites)

| Element | Live | Clone |
|---|---|---|
| Band flex row | x 80, y 80, 1280×720 | x 80, y 80, 1280×720 |
| Band featured column / card | 540 wide / 540×720, aspect-ratio `3 / 4` | 540 wide / 540×720, aspect-ratio `3 / 4` |
| Band thumbnail column | x 684, w 720 | x 684, w 720 |
| Band thumbnail cards | 336×336 at (684,80), (1068,80), (684,464), (1068,464) | identical |
| Active thumbnail image (scale-105) | x 675.60, y 71.60, 352.8×352.8 | identical |
| Header | fixed, 1440×64, padding 12px 32px | identical |
| Desktop nav link | 14px/20px, letter-spacing 1.4px, padding 0 4px | identical |
| Header pill (rest) | 41.6×40 | identical |
| Instagram fallback text | y ≈ 448 and y ≈ 563 | identical |
| Newsletter desktop card | x 742, y 220, 560×336 | identical |
| Newsletter section max-width | 85vw = 1224px | identical |
| Footer inner container | x 176, y 225.6, 1088×448.79 | identical |
| Footer links columns | x 560, w 704, two 332px columns, 40px gap | identical |
| Footer bottom border / copyright | y 561.8 / y 596 | identical |
| Mobile band glass card | x 16.15, y 573.87, 358.1×253.79 | identical |

### Behaviour

| Behaviour | Live | Clone |
|---|---|---|
| Outer Swiper params | `direction vertical`, `effect creative`, `speed 800`, `loop false`, `grabCursor true`, `threshold 5` | identical (read back from `element.swiper.params`) |
| Hero Swiper params | `effect shutters` (a **no-op** — the module is not registered), `speed 2400`, `loop true`, `autoplay { delay: 3200, waitForTransition: true, disableOnInteraction: false }` | `effect` omitted (deliberate — the live effect does nothing), `speed 2400`, `loop true`, same autoplay object |
| Hero auto-advance | advances every ~3.2s with a 2.4s transition | verified advancing with `transition-duration: 2400ms` |
| Hero pagination bullets | 5 bullets, active `#fff`, inactive `rgba(185,191,199,0.65)` @ `opacity 0.2` | identical |
| Outer pagination | 5 vertical bullets at x 1424, clickable | identical; click on bullet 5 moved 2 → 4 |
| Mousewheel paging | enabled, `forceToAxis` | verified: two wheel events moved 0 → 1 → 2 |
| Header theme on hero slide (index 0) | links `text-white`, `rgb(255,255,255)`, logomark white | identical |
| Header theme on light slides (1,2,3) | links `text-neutral-700`, `lab(27.036 0 0)`, logomark `rgb(0,0,0)` | identical |
| Header theme on footer slide | `text-white` | identical |
| Nav link hover | overlay span `font-light` → `group-hover:font-medium` | implemented via the same two-span markup |
| Header pill hover | pill 41.6 → 98.9px wide, `background: oklab(0.556 0 0 / 0.1)`, label `opacity 1`, grid column expands | identical |
| Thumbnail hover | img `grayscale(1)` → `grayscale(0)`, overlay `opacity 1` → `0` | verified on hover |
| Thumbnail **click** | does NOT change the featured member (verified live) | no click handler — matches |
| Instagram section | API-blocked fallback: "Unable to load Instagram posts." + "Swipe to see recent posts" | identical fallback, no fabricated grid |
| Mobile menu | `fixed inset-0 z-40 bg-black/90 backdrop-blur-lg`, 5 links + 2 outline buttons, Escape closes | identical |
| Mobile breakpoint behaviour | outer Swiper has **8** slides below 768px (band splits into 4 member cards) | identical — verified `slides.length === 8` at 390px |
| Newsletter mobile accordions | "What You'll Get:" closed, "Subscribe now" open | identical |
| `hover:scale-120` on the band Instagram button | class exists in the live markup but has **no CSS rule** — it does nothing | deliberately not implemented (button does not scale) |

## Remaining differences

1. **Image encoding.** The live site serves portraits through `next/image`
   (`/_next/image?url=…&w=384&q=75`); the clone serves the originals with plain `<img>` so that
   the rendered crop and size are deterministic. Minor tone/sharpness differences on portraits
   are visible side by side but the framing and geometry are identical.
2. **`next/image` vs `<img>` warnings.** ESLint reports 4 `@next/next/no-img-element` warnings.
   They are intentional — the band/footer markup on the live site is plain `<img>`, and
   swapping in `next/image` would change the crop. **0 lint errors.**
3. **Uncloned routes.** The header and footer link to `/music`, `/tour`, `/merchandise`,
   `/contact`, `/privacy`, `/terms`, which are outside this target's scope (`/` only) and 404
   in the clone, producing console 404s for their RSC prefetches. This matches the scope
   decision: the requested URL resolves to `/` and only `/` is cloned.
4. **Instagram posts** are never rendered on either site, so no post grid exists to compare.

## Final build

`npm run check` (lint + typecheck + build): **PASS**, 0 lint errors, 4 intentional warnings.
Route `/` prerenders as a static page.