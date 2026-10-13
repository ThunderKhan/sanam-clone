# MobileMenuOverlay Specification

## Overview
- **Target file:** `src/components/sites/sanamband-com-6610da83/root-8a5edab2/MobileMenuOverlay.tsx`
- **Screenshot:** `docs/design-references/sanamband-com-6610da83/root-8a5edab2/11-menu-mobile.png`
- **Interaction model:** click-driven. Opens from `SiteHeader`'s hamburger. Closes on link
  click, on the X (the X is the header's own toggle button, not part of this component),
  and on `Escape`.

## Props

```ts
export interface MobileMenuOverlayProps {
  open: boolean;
  onClose: () => void;
}
```

Client component. When `open` is `false`, render `null`.

## DOM Structure

```
<div class="fixed inset-0 z-40 h-screen w-screen bg-black/90 backdrop-blur-lg xl:hidden">   <!-- only when open -->
  <div class="flex h-full w-full flex-col items-center justify-center px-6 pb-12">
    <div class="flex flex-col items-center space-y-7 text-center w-full">
      <a href="/"       class="block text-xl uppercase tracking-widest text-white transition-all font-medium">Home</a>
      <a href="/music"  class="block text-xl uppercase tracking-widest text-white transition-all font-light hover:font-medium">Music</a>
      <a href="/tour"   class="block text-xl uppercase tracking-widest text-white transition-all font-light hover:font-medium">Tour</a>
      <a href="/merchandise" class="…font-light hover:font-medium">Merchandise</a>
      <a href="/contact"     class="…font-light hover:font-medium">Contact</a>

      <div class="w-full max-w-xs pt-8 mt-4 border-t border-white/20 space-y-4">
        <a href="/#subscribe" class="flex w-full items-center justify-center gap-3 rounded-full border border-white px-6 py-2.5 text-base font-medium uppercase tracking-widest text-white transition-transform active:scale-95">
          <Mail class="h-5 w-5" />Join Community
        </a>
        <a href="https://www.youtube.com/c/SANAM" target="_blank" rel="noopener noreferrer"
           class="flex w-full items-center justify-center gap-3 rounded-full border border-white px-6 py-2.5 text-base font-medium uppercase tracking-widest text-white transition-transform active:scale-95">
          <YoutubeOutlineIcon class="h-6 w-6" />Subscribe
        </a>
      </div>
    </div>
  </div>
</div>
```

## Computed styles (measured at 390×844, overlay open)

- Overlay: `position: fixed`, `inset: 0`, `z-index: 40`, computed background
  `oklab(0 0 0 / 0.9)` (that is `bg-black/90`), `backdrop-filter: blur(16px)`
  (`backdrop-blur-lg`), measured rect 390.4 × 844 (full viewport).
- Content column: `display: flex`, `flex-direction: column`, `align-items: center`,
  `justify-content: center`, `padding: 0 24px 48px` (`px-6 pb-12`).
- Link stack: `display:flex`, `flex-direction:column`, `align-items:center`,
  `gap: 28px` (`space-y-7`), `text-align: center`, `width: 100%`.
- Nav links: `font-size: 20px` (`text-xl`), `text-transform: uppercase`,
  `letter-spacing: 0.1em` (`tracking-widest`), `color: #ffffff`, `display: block`.
- Action stack: `max-width: 320px` (`max-w-xs`), `width: 100%`, `padding-top: 32px` (`pt-8`),
  `margin-top: 16px` (`mt-4`), `border-top: 1px solid rgba(255,255,255,0.2)`, `gap: 16px`.
- Action buttons: `display: flex`, `justify-content: center`, `align-items: center`,
  `gap: 12px`, `border-radius: 9999px`, `border: 1px solid #ffffff`,
  `padding: 10px 24px` (`px-6 py-2.5`), `font-size: 16px`, `font-weight: 500`,
  `text-transform: uppercase`, `letter-spacing: 0.1em`, `color: #ffffff`, full width.

## States & Behaviors
- **Open:** `open === true` → overlay mounted.
- **Close:** any of the 7 links calls `onClose()` before navigating. Add a `keydown` listener
  for `Escape` while open and call `onClose()`.
- **Hover:** nav links `font-light` → `font-medium` (`transition-all`).
- **Action buttons:** `active:scale-95` only (`transition-transform`).
- No enter/exit animation exists on the live site — mount/unmount instantly.

## Assets / icons
`Mail` and `YoutubeOutlineIcon` from
`src/components/sites/sanamband-com-6610da83/shared/icons`.

## Text content (verbatim)
`Home`, `Music`, `Tour`, `Merchandise`, `Contact`, `Join Community`, `Subscribe`.

## Responsive behavior
- Hidden entirely at `≥1280px` (`xl:hidden`) — this overlay only exists below `xl`.
- Below `xl` it covers the full viewport including behind the fixed header.
- The overlay's `z-40` sits **below** the header's `z-50`, so the header's hamburger/X stays
  visible and clickable on top of the overlay.

## Verification
Run `npx tsc --noEmit` from the app root. Must pass.