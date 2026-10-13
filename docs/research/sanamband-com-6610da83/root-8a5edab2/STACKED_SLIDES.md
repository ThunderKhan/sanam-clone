# Stacked Full-Screen Slide Transitions — sanamband.com

Supersedes `SCROLL_SYSTEM.md`, which documented the (now removed) Swiper creative-effect
approach. Evidence: `docs/design-references/sanamband-com-6610da83/root-8a5edab2/stack/`.

## Requirement

The landing page behaves as a stack of full-viewport slides. Scrolling down raises the next
section up **over** a stationary outgoing section; scrolling up lowers the current section to
reveal the one beneath it. No fade, no crossfade, no group translation, no scaling.

## Mechanism

Swiper's outer pager was **removed**. `SanamHome.tsx` now renders a plain stacking container and
drives the position of each slide directly, so the visual is deterministic rather than delegated
to an effect's internals.

```
.sanam-stage        position: relative; height: 100dvh; width: 100%; overflow: hidden
  .sanam-slide × n  position: absolute; inset: 0; width/height: 100%
                    z-index: i + 1
                    transform: translate3d(0, {i <= active ? 0% : 100%}, 0)
                    transition: transform 800ms cubic-bezier(0.4, 0, 0.2, 1)
  .sanam-pagination fixed vertical dots, right: 8px
```

- **Stacking order** is `i + 1`, so a later slide always paints above earlier ones.
- **Forward (0 → 1 → 2 …):** the outgoing slide keeps `translateY(0)` and never moves; only the
  incoming slide changes, from `100%` to `0`, sliding up across and covering it.
- **Backward (n → n-1 … → 0):** the current slide keeps its higher `z-index` and animates from
  `0` to `100%`, moving down and uncovering the previous slide, which stays at `translateY(0)`
  underneath.
- Because the outgoing slide is never translated and the incoming one starts exactly at the
  viewport edge, no gap can open between slides and there is no background flash.
- `will-change: transform` and `translate3d` keep the movement on the compositor.

## Controls

| Input | Behaviour |
|---|---|
| Wheel / trackpad | Accumulated delta must reach 48px, then exactly one section moves. `preventDefault` only when the pager handles it. |
| Touch | Vertical swipe over 56px commits one section, once per gesture (`touchConsumed`). Horizontal intent is ignored so the hero's inner carousel still works. |
| Keyboard | `ArrowDown` / `PageDown` forward, `ArrowUp` / `PageUp` back; ignored while an input, textarea, select or contenteditable has focus. |
| Pagination | Dot `i` navigates to slide `i`; active state follows `activeIndex`. |
| Nested scroll | A wheel event inside an element that can still scroll in that direction is left alone (`canScrollWithin`). |

A transition lock (`duration + 60ms`) prevents skipping while an animation plays, and
`prefers-reduced-motion: reduce` sets the duration to `0` so navigation still works without
animation.

## Removed

- Swiper outer pager: `Swiper`, `SwiperSlide`, `EffectCreative`, `Mousewheel`, `Keyboard`,
  `Pagination`, `A11y` and the `swiper-slide-*` wiring.
- The transition-end watchdog, the synthetic `transitionend` dispatch and the `animating` recovery
  — all of which only existed to work around the creative effect and are now unnecessary.
- `swiper/css/effect-creative` import.

Swiper is still used by `HeroCarousel.tsx` for the hero's own banner carousel; that is untouched.

## Verification (Playwright MCP)

Visual proof was captured with a CDP `Page.startScreencast` stream, because `page.screenshot`
round-trip latency (~200–400 ms) is longer than the instants being measured. Frames below are real
frames from the running app at 1440×900.

| Frame | File | What it shows |
|---|---|---|
| t = 0 ms | `01-forward-hero-t000ms.jpg` | Hero fills the viewport |
| t ≈ 156 ms | `05-fwd1to2-t200ms.jpg` | Hero stationary, incoming section just starting at the bottom edge |
| t ≈ 301 ms | `06-fwd1to2-t300ms.jpg` | Hero still stationary and unmoved; incoming section risen to the bottom, hard horizontal boundary, no gap |
| t ≈ 301 ms | `03-forward-t300ms-covering.jpg` | Same moment from a second run: incoming section covering ~80 % of the viewport |
| t ≈ 850 ms | `08-fwd1to2-t850ms.jpg` | Transition settled on the incoming section |
| t ≈ 192 ms | `11-back1to0-t200ms.jpg` | Reverse: current section starting to leave downward |
| t ≈ 408 ms | `12-back1to0-t400ms-revealing.jpg` | Previous section revealed at the top, current section lowered over it |
| t ≈ 908 ms | `14-back1to0-t900ms-settled.jpg` | Reverse settled on the previous section |

Computed-transform trace of a forward step (rAF, real wheel event): slide 0 stays at
`y = 0` for the whole animation while slide 1 travels `900 → 623`, i.e. only the incoming slide
moves.

Functional results:

| Check | Result |
|---|---|
| `window.scrollY` / `scrollHeight` | `0` / `900` — no native document scrolling |
| Wheel walk down | `1,1,2,3,4` — monotone, one section per gesture, clamped at the last |
| Wheel walk up | `3,2,1,1,0,0` — reverse mirrors forward, clamped at the first |
| Keyboard | `↓=1, ↓=2, PageDown=3, ↑=2, PageUp=1` |
| Arrow key inside the email input | focus stays on `email-address-desktop`, index unchanged (3) |
| 6 rapid wheels | lands on 1 — no skipping, no freeze |
| Pagination dots | `4→4, 1→1, 3→3, 0→0` |
| Tablet 768×1024 | 5 slides, stage `1024px`, wheel works |
| Mobile 390×844 | 8 slides, stage `844px`, no horizontal overflow, walk `1,2,3,4` / up `3,2,1,0` |
| Touch (touch-emulated context) | swipe up `0→1→2→3→4`, swipe down `4→3→2→1→0`, short swipe ignored |
| Console errors | none |
| `npm run check` | pass, 0 errors (4 pre-existing `<img>` warnings) |

## Known limitations

1. Chromium screencast occasionally delivers a torn frame mid-raster (one captured frame showed a
   vertical seam). The frames cited above are the complete ones; the transform trace is the
   authoritative record of which element moves.
2. A duplicated index in the wheel walks (e.g. `1,1,2`) is the transition lock doing its job, not
   a dropped section — the next gesture always resumes from the correct slide.
3. The hero's own banner carousel (a nested Swiper) is unchanged and still auto-advances on its
   own 3.2 s timer.