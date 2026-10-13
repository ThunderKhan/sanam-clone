# NewsletterSignup Specification

## Overview
- **Target file:** `src/components/sites/sanamband-com-6610da83/root-8a5edab2/NewsletterSignup.tsx`
- **Screenshot:** `docs/design-references/sanamband-com-6610da83/root-8a5edab2/04-newsletter-desktop.png`, `09-newsletter-mobile.png`
- **Interaction model:** static on desktop; **click-driven accordions** on mobile (`<1024px`).
  Both variants live in the same DOM and are toggled by `lg:hidden` / `hidden lg:grid`.

This component fills one Swiper slide. Its root must be `h-full w-full`.

## Props

None. It may be a client component (it needs `useState` for the mobile accordions).

## DOM Structure

```
<div id="subscribe" class="h-full w-full">
  <div class="h-full w-full">
    <section id="subscribe" class="scroll-mt-32 mx-auto h-full w-full max-w-[85vw] py-12">

      <!-- header block, shared by both layouts -->
      <div class="w-full mx-auto">
        <div class="text-center mb-10">
          <p class="font-bold text-neutral-500 tracking-wider uppercase text-xs mb-2">Stay Connected</p>
          <h2 class="text-4xl md:text-4xl font-bold text-black mb-2">Join the SANAM Community</h2>
          <p class="max-w-2xl mx-auto text-lg text-neutral-600 font-light leading-relaxed">
            Be part of our musical journey. Get exclusive access to tour announcements, new releases, and behind-the-scenes content.
          </p>
        </div>
      </div>

      <!-- DESKTOP (≥1024px) -->
      <div class="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <BenefitsColumn />   {/* see below */}
        <div class="bg-white rounded-2xl p-8 lg:p-10 border border-neutral-100 shadow-2xl">
          <h3 class="text-2xl font-bold text-black">Subscribe now</h3>
          <p class="mt-2 text-neutral-600 font-light">Join our fans who never miss an update.</p>
          <SubscribeForm idSuffix="desktop" />
        </div>
      </div>

      <!-- MOBILE (<1024px) -->
      <div class="lg:hidden mt-6 border-t border-neutral-200">
        <Accordion title="What You'll Get:" defaultOpen={false}>
          <BenefitsList />   {/* the four rows, same markup as desktop */}
        </Accordion>
        <Accordion title="Subscribe now" defaultOpen={true}>
          <p class="mt-3 text-neutral-600 font-light">Join our fans who never miss an update.</p>
          <SubscribeForm idSuffix="mobile" />
        </Accordion>
      </div>

    </section>
  </div>
</div>
```

Note the live DOM has **two** elements with `id="subscribe"` (the outer wrapper and the
`section`). Duplicate ids are invalid; keep `id="subscribe"` on the `<section>` only.

## Benefits column (desktop left column)

```
<div class="space-y-6">
  <h3 class="text-2xl font-bold text-black border-b border-neutral-200 pb-4 inline-block">What You'll Get:</h3>
  <div class="grid grid-cols-1 gap-5">
    {benefits.map((b) => (
      <div key={b.title} class="flex items-start gap-5 group">
        <div class="flex-shrink-0 pt-1 p-2 bg-neutral-100 rounded-full group-hover:bg-neutral-200 transition-colors">
          <Icon class="h-6 w-6 text-neutral-800" />
        </div>
        <div>
          <h4 class="font-semibold text-black text-lg group-hover:text-neutral-700 transition-colors">{b.title}</h4>
          <p class="mt-1 text-neutral-600 font-light">{b.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>
```

Icon mapping (import from
`src/components/sites/sanamband-com-6610da83/shared/icons`, all lucide, `viewBox 0 0 24 24`,
rendered `h-6 w-6`):
- `calendar` → `Calendar`
- `music` → `MusicNote`
- `ticket` → `Ticket`
- `users` → `Users`

Data comes from `instagramBenefits` in
`src/components/sites/sanamband-com-6610da83/shared/content` — do not redeclare.

| icon | title | description |
|---|---|---|
| calendar | Tour Announcements | Be the first to know about upcoming concerts and tour dates. |
| music | New Releases | Get notified when we drop new songs and music videos. |
| ticket | Exclusive Merchandise | Early access to limited edition merchandise and special offers. |
| users | Behind the Scenes | Exclusive content, studio updates, and personal stories. |

## Mobile accordion

Each item:
```
<div class="border-b border-neutral-200 py-4">
  <button type="button" onClick={toggle} class="w-full flex justify-between items-center text-left" aria-expanded={open}>
    <h3 class="text-xl font-bold text-black">{title}</h3>
    <div style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 300ms' }}>
      <ChevronDown class="h-6 w-6 text-neutral-500" />
    </div>
  </button>
  {open && <div class="…panel…">{children}</div>}
</div>
```
- Chevron icon: `ChevronDown` (lucide) from
  `src/components/sites/sanamband-com-6610da83/shared/icons`, `h-6 w-6 text-neutral-500`.
- Measured at 390px with the panel open: "What You'll Get:" at y≈319 (collapsed),
  "Subscribe now" at y≈380 (expanded). The expanded panel contains the description, the
  `SubscribeForm`, and a `border-t border-neutral-200` bottom edge, ending at y≈643.
- Panel needs top/bottom padding — use `pt-4 pb-2` on the wrapper (the live site's collapsed
  panel sits directly under the button's `py-4`).

## Computed styles (measured at 1440×900)

- `<section>`: `max-width: 85vw` (`max-w-[85vw]` = 1224px at 1440), `width: 100%`,
  `height: 100%`, `padding: 48px 0` (`py-12`), `scroll-margin-top: 128px` (`scroll-mt-32`).
- **The content overflows the 900px viewport on purpose.** The live section has no top
  padding: the "Stay Connected" eyebrow renders at y ≈ 57 and is partially covered by the
  fixed 64px header, and the h2 baseline is at y ≈ 93. Do **not** add `pt-24` here.
- Header block: `text-align: center`, `margin-bottom: 40px` (`mb-10`).
- Eyebrow: `font-size: 12px`, `font-weight: 700`, `letter-spacing: 0.05em` (`tracking-wider`),
  `text-transform: uppercase`, `color: #737373` (`neutral-500`), `margin-bottom: 8px`.
- `h2`: `font-size: 36px` (`text-4xl`), `line-height: 40px`, `font-weight: 700`,
  `color: #000000`, `margin-bottom: 8px`, centered. Measured 486 × 40px at x 477, y 77.
- Subtitle: `max-width: 672px` (`max-w-2xl`), centered, `font-size: 18px` (`text-lg`),
  `font-weight: 300` (`font-light`), `line-height: 1.625` (`leading-relaxed`),
  `color: #525252` (`neutral-600`). Measured 2 lines, 549px wide, at y 124.
- Desktop grid: `display: grid`, `grid-template-columns: repeat(2, minmax(0,1fr))`,
  `gap: 40px` (`gap-10`), `align-items: start`. Measured: 562px + 562px, x 108 and x 710,
  starting y ≈ 220.
- Desktop card: `background: #fff`, `border-radius: 16px` (`rounded-2xl`),
  `padding: 40px` (`lg:p-10`), `border: 1px solid #f5f5f5` (`border-neutral-100`),
  `box-shadow` (`shadow-2xl`). Measured x 742, y 220, w 560, h 336.
- Card `h3`: 24px / 32px, weight 700, `#000000` (measured x 781, y 268).
- Card subtitle: `margin-top: 8px`, 16px, weight 300, `#525252` (measured y 307).
- `What You'll Get:` h3: 24px / 32px, weight 700, `#000000`,
  `border-bottom: 1px solid #e5e5e5` (`border-neutral-200`), `padding-bottom: 16px`,
  `display: inline-block`. Measured x 108, y 223, w 185, h 49 — the underline is only as
  wide as the text because of `inline-block`.
- Benefits grid: `display: grid`, `grid-template-columns: minmax(0,1fr)`, `gap: 20px`
  (`gap-5`). Rows measured at y 291, 363, 437, 508 (≈72px pitch).
- Benefit row: `display: flex`, `align-items: flex-start`, `gap: 20px` (`gap-5`).
- Icon chip: `padding: 8px` (`p-2`), `padding-top: 8px` too (`pt-1` is overridden by `p-2` in
  the live computed result — both classes are present, keep both), `border-radius: 9999px`,
  `background: #f5f5f5` (`neutral-100`), `flex-shrink: 0`, icon 24×24,
  `color: #262626` (`neutral-800`). Measured chip 40×40 at x 108.
- Benefit title: `font-size: 18px`, `font-weight: 600`, `#000000`, `margin-top: 0`.
- Benefit description: `margin-top: 4px`, 16px, weight 300, `#525252`.

## States & Behaviors

### Benefit row hover (`group` on the row)
- Icon chip `background-color`: `#f5f5f5` → `#e5e5e5` (`group-hover:bg-neutral-200`),
  `transition-colors` (150ms).
- Title `color`: `#000000` → `#525252` (`group-hover:text-neutral-700`),
  `transition-colors` (150ms).
- Description does **not** change.

### Mobile accordion
- **Trigger:** click on the row button. Toggles `open`.
- **State A (closed):** panel not rendered; chevron `transform: none`.
- **State B (open):** panel rendered; chevron wrapper `transform: rotate(180deg)`.
- **Transition:** `transform 300ms` on the chevron wrapper (inline style, as in the live DOM).
- **Defaults:** "What You'll Get:" closed, "Subscribe now" open. Verified at 390×844.
- `aria-expanded` on the button.

### Form
The desktop card and the mobile panel both render `<SubscribeForm>` with different
`idSuffix` values so the two floating-label inputs do not share ids.

## Text content (verbatim)
`Stay Connected`
`Join the SANAM Community`
`Be part of our musical journey. Get exclusive access to tour announcements, new releases, and behind-the-scenes content.`
`What You'll Get:` (with the trailing colon)
`Subscribe now`
`Join our fans who never miss an update.`
Plus the four benefit rows from the table above.

## Responsive behavior
- **≥1024px (`lg`):** desktop 2-column grid; accordion block hidden (`lg:hidden`).
- **<1024px:** accordion block visible; desktop grid hidden (`hidden lg:grid`).
- At 390px the section `max-width` is `85vw` = 331.5px; measured content x 29, w 332.
- Breakpoint for the swap: 1024px.

## Verification
Run `npx tsc --noEmit` from the app root. Must pass.