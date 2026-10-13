# SiteHeader Specification

## Overview
- **Target file:** `src/components/sites/sanamband-com-6610da83/root-8a5edab2/SiteHeader.tsx`
- **Screenshot:** `docs/design-references/sanamband-com-6610da83/root-8a5edab2/01-hero-desktop.png` (light-on-dark theme) and `02-band-desktop.png` (dark theme)
- **Interaction model:** hover-driven (nav link weight swap, pill label reveal), click-driven (mobile menu toggle is handled by `MobileMenuOverlay`, which receives `open` / `onClose` props from you)
- **Client component** (`"use client"`), because it reads a prop and manages nothing else — a plain component is fine if it has no handlers. It MUST accept `isDarkSlide: boolean`.

## Props

```ts
export interface SiteHeaderProps {
  /** true → white text (hero + footer slides); false → neutral-700 text */
  isDarkSlide: boolean;
  menuOpen: boolean;
  onToggleMenu: () => void;
}
```

Render `<MobileMenuOverlay open={menuOpen} onClose={onToggleMenu} />` as the **last child** of
the `<header>` element (it is `position: fixed` so DOM order does not matter visually, but the
live site mounts it there).

## DOM Structure

```
<header role="banner" class="fixed inset-x-0 top-0 z-50 transition-colors duration-300 bg-transparent">
  <nav aria-label="Global" class="relative flex w-full items-center justify-between px-4 py-3 md:px-6 lg:px-8">
    <a href="/" aria-label="SANAM — Home" class="flex items-center gap-3">
      <SanamMarkIcon class="h-7 w-7 {text-white|text-black}" />
      <SanamWordmark class="object-contain {text-white|text-black}" style="height:1.7rem;width:auto" />
    </a>

    <div class="hidden xl:flex absolute inset-y-0 left-1/2 -translate-x-1/2 items-center gap-6">
      …5 nav links…
    </div>

    <div class="hidden xl:flex items-center space-x-2">
      …pill cluster (3 pills + 2 separators)…
    </div>

    <div class="flex xl:hidden items-center gap-2 sm:gap-4">
      …login pill button + hamburger button…
    </div>
  </nav>
</header>
```

## Computed styles (from getComputedStyle at 1440×900)

- `<header>`: `position: fixed`, `height: 64px`, `z-index: 50`, background always transparent,
  `transition: color/background-color/border-color … 0.3s cubic-bezier(0.4,0,0.2,1)`
  (i.e. `transition-colors duration-300`).
- `<nav>`: `padding: 12px 32px` (`px-4 py-3` → `md:px-6` → `lg:px-8`), `height: 64px`,
  `display: flex`, `align-items: center`, `justify-content: space-between`, `position: relative`.
- Brand `<a>`: `display:flex`, `align-items:center`, `gap: 12px`, `height: 28px`, width 130.66px.
  Logomark `h-7 w-7` (28×28). Wordmark `height: 1.7rem; width: auto` (27.2px tall, 90.66px wide).
  **Gap between mark and wordmark is 12px** (`gap-3`) even though the mark is 28px wide.
- Nav links: `font-size: 14px`, `line-height: 20px`, `letter-spacing: 1.4px`,
  `text-transform: uppercase`, `padding: 0 4px` (`px-1`), `position: relative`,
  `color` = `#ffffff` on dark slides / `neutral-700` on light slides.
- Centre nav row: `position: absolute`, `inset-y-0`, `left: 50%`, `translateX(-50%)`,
  `display:flex`, `align-items:center`, `gap: 24px` (`gap-6`).
- Pill cluster: `display:flex`, `align-items:center`, `gap: 8px` (`space-x-2`).
  Each pill is `41.6 × 40px` at rest.
- Mobile cluster: `display:flex`, `gap: 8px` (`gap-2`) → `16px` (`sm:gap-4`) at ≥640px.

## Brand assets

- Logomark: import `SanamMarkIcon` from
  `src/components/sites/sanamband-com-6610da83/shared/icons`.
- Wordmark: **do not re-type the SVG**. Create
  `src/components/sites/sanamband-com-6610da83/root-8a5edab2/SanamWordmark.tsx`
  as a React component that renders the contents of
  `public/sites/sanamband-com-6610da83/shared/icons/wordmark.svg` (that file is the exact
  live markup, `<svg version="1.2" viewBox="0 0 1600 480">…</svg>`). Copy the `<path>`
  `d` attribute verbatim into a `<path fill="currentColor" fillRule="evenodd" />`, give it
  `viewBox="0 0 1600 480"`, `xmlns="http://www.w3.org/2000/svg"`, and accept
  `{ className?: string; style?: CSSProperties }`. Keep `id="Path 0"` off (React does not
  need it).

## States & Behaviors

### Theme (driven by the parent slide index, NOT scroll)
- **Trigger:** parent passes `isDarkSlide`. `true` for the hero slide (index 0) and the footer
  slide (last index); `false` for the band, instagram and newsletter slides.
- **Dark theme:** every nav link, pill, separator and mobile item gets `text-white`;
  logomark + wordmark get `text-white`.
- **Light theme:** nav links and pills get `text-neutral-700`; logomark + wordmark get
  `text-black`.
- **Transition:** `transition-colors duration-300` on the header is enough for text; add
  `transition-colors duration-300` to the svgs (or set them as `currentColor` consumers inside
  the themed element).
- Do NOT change the header background — it stays `bg-transparent` in both themes.

### Nav link hover
Each link is two stacked spans; the overlay span changes weight on hover:
```html
<a class="group relative px-1 text-sm uppercase tracking-widest {theme}" href="/music">
  <span class="invisible font-medium">Music</span>
  <span class="absolute inset-0 flex items-center justify-center transition-all font-light group-hover:font-medium">Music</span>
</a>
```
- The active route (`/`) uses `font-medium` on the overlay span with **no** `group-hover` class.
- The others use `font-light group-hover:font-medium`, transition `all` (Tailwind default
  `transition-all`, 150 ms).
- Links, in order: `/` Home, `/music` Music, `/tour` Tour, `/merchandise` Merchandise,
  `/contact` Contact. All internal — render with `next/link` **except** keep plain `<a>` is also
  acceptable; use `next/link` for consistency.

### Desktop pill cluster (≥1280px)
```
<a class="block cursor-pointer outline-none" href="/#subscribe">  PILL
<span class="text-sm font-light opacity-30 select-none {theme}">|</span>   …between pills…
```
Pill internals:
```html
<div class="group flex items-center justify-end rounded-full h-10 p-1 border border-current select-none transition-colors duration-300 hover:bg-neutral-500/10 {theme}">
  <div class="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-[grid-template-columns] duration-500 ease-out">
    <div class="overflow-hidden min-w-0 flex items-center">
      <span class="pl-3 pr-2 text-xs font-bold tracking-[0.2em] uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">Join</span>
    </div>
  </div>
  <div class="flex h-8 w-8 items-center justify-center shrink-0 rounded-full">{ICON}</div>
</div>
```
- Three pills: **Join** (`href="/#subscribe"`, icon `Mail` at `h-4.5 w-4.5`),
  **Subscribe** (`href="https://www.youtube.com/c/SANAM"`, `target="_blank" rel="noopener noreferrer"`,
  icon `YoutubeOutlineIcon` at `h-5 w-5`), **Login** (`<button type="button">`, icon
  `User` at `h-5 w-5` with `strokeWidth={2.5}`).
- Icons come from `src/components/sites/sanamband-com-6610da83/shared/icons`
  (`Mail`, `YoutubeOutlineIcon`, `User`). `Mail` and `User` are lucide re-exports.
- Hover: `background-color` → `rgb(122 122 122 / 0.1)` (that is `hover:bg-neutral-500/10`),
  label `opacity` 0→1 and the grid column 0fr→1fr, both `500ms ease-out`.
- Separators between pill 1/2 and 2/3 only.

### Mobile cluster (<1280px)
```html
<button type="button" class="flex items-center gap-2 rounded-full border border-current p-1 transition-all active:scale-95 text-left outline-none {theme}">
  <span class="text-xs sm:text-sm font-bold uppercase tracking-wider pl-2 select-none">Login</span>
  <div class="relative flex h-7 w-7 items-center justify-center rounded-full"><User class="h-5 w-5" strokeWidth={2.5} /></div>
</button>
<button type="button" onClick={onToggleMenu} aria-label="Toggle menu" aria-expanded={menuOpen}
        class="relative z-50 inline-flex items-center justify-center rounded-md p-2 outline-none">
  {menuOpen ? <X class="h-6 w-6 {theme}" /> : <Menu class="h-6 w-6 {theme}" />}
</button>
```
- Hamburger icon at rest: `Menu` `h-6 w-6`. When open the live site swaps to an X — implement
  `CloseIcon` (lucide `X`) when `menuOpen`.
- The Login button has no handler (mock).

## Text content (verbatim)
`Home`, `Music`, `Tour`, `Merchandise`, `Contact`, `Join`, `Subscribe`, `Login`, `Toggle menu`.

## Responsive behavior
- **≥1280px (`xl`):** centre nav row + pill cluster visible; mobile cluster hidden.
- **<1280px:** mobile cluster visible; centre nav and pill cluster hidden.
- **<768px:** logomark + wordmark still both shown (measured 28px + 90.66px at 390px too).
- Breakpoint for the swap is exactly `xl` = 1280px.

## Verification
Run `npx tsc --noEmit` from the app root before finishing. Must pass with no errors.