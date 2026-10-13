# SubscribeForm Specification

## Overview
- **Target file:** `src/components/sites/sanamband-com-6610da83/root-8a5edab2/SubscribeForm.tsx`
- **Screenshot:** `docs/design-references/sanamband-com-6610da83/root-8a5edab2/04-newsletter-desktop.png`, `09-newsletter-mobile.png`
- **Interaction model:** **click/typing-driven** floating label + focus states. No network
  call — `onSubmit` just `preventDefault()`.

This component is used in **two** places: the desktop white card (by `NewsletterSignup`) and
the mobile "Subscribe now" accordion panel. It must work at both widths.

## Props

```ts
export interface SubscribeFormProps {
  /** Unique id suffix so the two instances don't clash (e.g. "desktop" / "mobile"). */
  idSuffix: string;
}
```

## DOM Structure

```
<form class="mt-8 space-y-5" onSubmit={handleSubmit} noValidate={false}>
  <div class="relative group">
    <input
      id={`email-address-${idSuffix}`}
      name="email"
      type="email"
      required
      placeholder=" "
      class="peer block w-full rounded-lg bg-neutral-100 border-transparent py-3 px-4 text-neutral-900 placeholder-transparent focus:border-black focus:ring-0 transition-all duration-300"
    />
    <label
      htmlFor={`email-address-${idSuffix}`}
      class="absolute left-3 top-3 text-sm text-neutral-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black peer-focus:bg-white bg-transparent px-1"
    >
      Email Address
    </label>
  </div>
  <button type="submit" class="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg text-sm font-bold tracking-wider text-white bg-black hover:bg-neutral-800 transition-all duration-300">
    Don't miss a beat
    <ArrowRight class="h-4 w-4" />
  </button>
</form>
<p class="mt-4 text-xs text-neutral-400 text-center">
  By subscribing, you agree to receive marketing emails from SANAM. You can unsubscribe at any time.
</p>
```

`ArrowRight` (lucide) from `src/components/sites/sanamband-com-6610da83/shared/icons`.

## Computed styles

- Form: `margin-top: 32px` (`mt-8`), `display: flex`? No — `space-y-5` means the children are
  normal block flow with `margin-top: 20px` between them. Use `space-y-5`.
- Input: `display: block`, `width: 100%`, `border-radius: 8px` (`rounded-lg`),
  `background: #f5f5f5` (`neutral-100`), `border: 1px solid transparent`,
  `padding: 12px 16px` (`py-3 px-4`), `color: #171717` (`neutral-900`),
  `font-size: 16px` (inherits `text-base`; the `text-neutral-900` class does not change size).
- Label at rest: `position: absolute`, `left: 12px`, `top: 12px`, `font-size: 14px`,
  `color: #737373` (`neutral-500`), `padding: 0 4px`, `background: transparent`.
- Submit button: `width: 100%`, `display: flex`, `justify-content: center`,
  `align-items: center`, `gap: 8px`, `padding: 12px 16px`, `border-radius: 8px`,
  `font-size: 14px`, `font-weight: 700`, `letter-spacing: 0.05em` (`tracking-wider`),
  `color: #ffffff`, `background: #000000`. Measured on desktop: 512 × 42px.
- Disclaimer: `margin-top: 16px`, `font-size: 12px`, `color: #a3a3a3` (`neutral-400`),
  `text-align: center`.

## States & Behaviors

### Floating label — driven purely by Tailwind peer variants, no JS
| State | label `top` | label `font-size` | label `color` | label `background` |
|---|---|---|---|---|
| Empty & unfocused (`peer-placeholder-shown`) | `12px` | `14px` | `#737373` | transparent |
| Focused (`peer-focus`) | `-8px` (`-top-2`) | `12px` (`text-xs`) | `#000000` | `#ffffff` |
| Filled & unfocused | `12px` (no `peer-focus`) | `14px` | `#737373` | transparent |

Transition: `transition-all duration-300` on the label. This is exactly the class list above —
do not add React state for the label.

### Input focus
- `border-color` → `#000000` (`focus:border-black`), `outline: none` (`focus:ring-0`).
- `background` stays `#f5f5f5`. Measured input at 1440: x 781, y 355, w 512, h 46px.

### Button hover
- `background-color` `#000000` → `#262626` (`hover:bg-neutral-800`),
  `transition: all 300ms`. No transform, no shadow change.

### Submit
- `onSubmit={(e) => e.preventDefault()}`. No state change, no success message — the live
  form is not wired up in the clone.

## Text content (verbatim)
- Placeholder/label: `Email Address`
- Button: `Don't miss a beat`  (straight apostrophe `'`)
- Disclaimer: `By subscribing, you agree to receive marketing emails from SANAM. You can unsubscribe at any time.`

## Responsive behavior
- No internal breakpoints. The desktop card supplies `p-8 lg:p-10` around it; the mobile
  accordion supplies its own padding. The form itself is fluid width.
- At 390px the measured elements are: input x 49, w 293, h 46px; button h 44px, w 293px;
  disclaimer wraps to two lines.

## Verification
Run `npx tsc --noEmit` from the app root. Must pass.