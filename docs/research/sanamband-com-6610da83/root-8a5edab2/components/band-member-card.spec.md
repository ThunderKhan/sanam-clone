# BandMemberCard Specification (mobile, <768px)

## Overview
- **Target file:** `src/components/sites/sanamband-clone/…/root-8a5edab2/BandMemberCard.tsx`
  (exact path: `src/components/sites/sanamband-com-6610da83/root-8a5edab2/BandMemberCard.tsx`)
- **Screenshot:** `docs/design-references/sanamband-com-6610da83/root-8a5edab2/07-band-mobile.png`
- **Interaction model:** static. One card per member; each is its own slide of the vertical
  Swiper. The whole card is wrapped in a link to the member's Instagram.
- This is the **only** band rendering below 768px. `BandMembers` is not rendered there.

## Props

```ts
export interface BandMemberCardProps {
  member: (typeof bandMembers)[number];
}
```

Type it as `(typeof bandMembers)[number]` importing `bandMembers` from
`src/components/sites/sanamband-com-6610da83/shared/content`.

## DOM Structure

```
<div class="mobile-slide-wrapper">
  <div class="mobile-slide-background">
    <img alt={member.name} class="object-cover object-top" src={member.mobileImage} />
    <div class="mobile-slide-overlay" />
  </div>
  <div class="mobile-slide-card fixed-card">
    <a href={member.instagram} target="_blank" rel="noopener noreferrer" class="block">
      <div class="glassy-card">
        <div class="mobile-card-content">
          <div class="mobile-card-text">
            <h2 class="mobile-card-name">{member.name}</h2>
            <p class="mobile-card-title">{member.role}</p>
            <p class="mobile-card-description">{member.bio}</p>
            <div class="mobile-card-footer">
              <LinkGlyph class="h-4 w-4" />   {/* lucide link icon, 16×16 */}
              Tap to see {member.name}'s Instagram profile
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</div>
```

**All the class names above already exist** in
`src/components/sites/sanamband-com-6610da83/shared/site.css` — copied verbatim from the live
stylesheet. Use them; do not rewrite the styles with Tailwind and do not add new CSS.

The footer text is built as: `Tap to see ` + `{member.name}` + `'s Instagram profile`
(so it reads e.g. `Tap to see Venkat Subramaniyam's Instagram profile`).

## Computed styles (measured at 390×844)

- `.mobile-slide-wrapper` — `background-color: #000`, `width/height: 100%`,
  `position: relative`, `overflow: hidden`. Measured 390.07 × 843.3px.
- `.mobile-slide-background` — `position: absolute`, `inset: 0`. Its `img` is
  `object-fit: cover; object-position: center top` (plus the Tailwind classes above).
- `.mobile-slide-background::after` — a `content: ""` pseudo-element with
  `background: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.75))`, `position: absolute`,
  `inset: 0`. **This gradient overlay is what darkens the portrait.** Keep it (it comes free
  with the shared CSS). `.mobile-slide-overlay` is an empty extra div with `position:absolute;
  inset:0` and no visual effect — include it to match the live DOM.
- `.mobile-slide-card` — `position: absolute`, `left: 1rem`, `right: 1rem`,
  `bottom: calc(1rem + env(safe-area-inset-bottom, 0px))`, `z-index: 10`,
  `padding-bottom: env(safe-area-inset-bottom, 0px)`. Measured rect at 390px:
  x 16.15, y 573.87, w 358.1, h 253.79.
- `.fixed-card` — **no CSS rule exists**; it is a marker class. Keep it, add no styles.
- `.glassy-card` — `color: #fff`,
  `max-height: calc(70vh - env(safe-area-inset-bottom, 0px))` (≈591px at 844px tall),
  `background: rgba(255,255,255,0.15)`, `border: 1px solid rgba(255,255,255,0.25)`,
  `border-radius: 1.25rem` (20px), `padding: 1rem`, `overflow-y: auto`,
  `box-shadow: 0 8px 32px rgba(0,0,0,0.35)`, thin scrollbar with
  `scrollbar-color: rgba(255,255,255,0.4) transparent`.
- `.mobile-card-content` — `display: flex`, `flex-direction: column`, `gap: 0.8rem`.
- `.mobile-card-text` — `flex: 1 1 0%`.
- `.mobile-card-name` — `color: #fff`, `font-size: 1.3rem` (20.8px), `font-weight: 700`.
  In the live DOM this is an `<h2>` with **no** Tailwind reset class — it inherits the UA
  default `margin`. Keep it an `<h2>`.
- `.mobile-card-title` — `color: #ddd`, `margin-bottom: 0.5rem`, `font-size: 0.9rem` (14.4px),
  `font-weight: 500`.
- `.mobile-card-description` — `color: #f5f5f5`, `text-align: justify`,
  `margin-top: 0.25rem`, `margin-bottom: 0.75rem`, `font-size: 0.9rem`, `line-height: 1.5`.
- `.mobile-card-footer` — `display: flex`, `align-items: center`, `gap: 0.4rem`,
  `color: #e5e5e5`, `font-size: 0.75rem` (12px), `text-decoration: none`,
  `transition: color 0.3s`.

## States & Behaviors
- **Whole card is a link** to `member.instagram`, `target="_blank" rel="noopener noreferrer"`.
- **Footer hover:** `color` `#e5e5e5` → `#ffffff` (`transition: color 0.3s`).
- **Long bios scroll** inside `.glassy-card` (`max-height` 70vh, `overflow-y: auto`).
  Do not truncate the text and do not disable scrolling.
- No entry animation, no parallax, no state.

## Assets / content
- Portrait: `member.mobileImage` — from `bandMembers`:
  - Sanam Puri → `.../images/faces/sanam00.png`
  - Venkat Subramaniyam → `.../images/faces/venky00.jpg`
  - Keshav Dhanraj → `.../images/faces/keshav00.jpg`
  - Samar Puri → `.../images/faces/samar00.jpg`
- Use a plain `<img>` with `alt={member.name}`.
- `LinkGlyph` (lucide `Link`) from
  `src/components/sites/sanamband-com-6610da83/shared/icons`.

## Text content (verbatim, from `bandMembers`)

| name | role | bio |
|---|---|---|
| Sanam Puri | Vocals & Lead Composer | The face of the band and its defining voice. Sanam is the band leader with vision and emotion. A singer, songwriter, and dreamer whose voice carries words straight into the hearts of listeners across the world. His melodies bridge nostalgia and newness, making every song unforgettable. |
| Venkat Subramaniyam | Bass & Arranger | The sonic architect of the band. Venky's deep understanding of sound, harmony, and groove turns every track into an experience. His basslines and arrangements give SANAM its pulse. Thoughtful, musical, and alive with soul. |
| Keshav Dhanraj | Drums & Programmer | The driving force behind SANAM, on and off the stage. Keshav is the backbone who turns new vision into reality with direction and creativity. A drummer, programmer and visionary. An unshakable anchor for SANAM. |
| Samar Puri | Guitars, Lyrics & Editor | The storyteller of SANAM. Samar’s video edits and lyrics bring emotion and depth, while his creative direction keeps the visual and lyrical world honest and connected. His simple yet powerful artistry gives SANAM the soul and sincerity the band is known for. |

Note: Samar's bio contains a **curly apostrophe** (`Samar’s`) — preserve it.

## Responsive behavior
- Only rendered below 768px. The component itself has no internal breakpoints.
- Must fill its Swiper slide exactly: root is `h-full w-full` by virtue of
  `.mobile-slide-wrapper { width:100%; height:100% }`.
- Do not add `min-h-screen` or any page-level scroll.

## Verification
Run `npx tsc --noEmit` from the app root. Must pass.