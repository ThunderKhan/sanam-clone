# BandMembers Specification (desktop, ≥768px)

## Overview
- **Target file:** `src/components/sites/sanamband-com-6610da83/root-8a5edab2/BandMembers.tsx`
- **Screenshot:** `docs/design-references/sanamband-com-6610da83/root-8a5edab2/02-band-desktop.png`
- **Interaction model:** **static**. The only live behaviour is hover on the thumbnail cards.
  Clicking a thumbnail does **NOT** change the featured member — verified in the browser:
  clicking the 4th thumbnail left the featured `<h2>` reading "Sanam Puri". Do not add state.

This component renders one slide of the vertical creative Swiper. Its root element must be
the SwiperSlide content and must fill the slide.

## DOM Structure

```
<div class="min-h-screen bg-white px-4 py-8 sm:px-8 md:px-12 lg:px-16">
  <div class="mx-auto flex h-[min(80vh,80vw)] w-full max-w-screen-xl gap-6 sm:gap-10 lg:gap-16">

    <!-- featured member -->
    <div class="flex-[0.9] flex items-center">
      <div class="relative block aspect-[3/4] h-full w-full overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
        <img alt="Sanam Puri" class="absolute inset-0 object-cover object-top image-fade-in" src={…featuredImage} />
        <div class="absolute bottom-0 left-0 z-20 p-6 text-white text-fade-in">
          <h2 class="text-2xl font-semibold">Sanam Puri</h2>
          <p class="mt-1 text-sm text-white/80">Vocals & Lead Composer</p>
          <p class="mt-3 max-w-md text-sm leading-relaxed text-white/90">{bio}</p>
        </div>
        <div class="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>
    </div>

    <!-- thumbnail grid -->
    <div class="flex-[2.1] flex items-center">
      <div class="aspect-square h-full w-full">
        <div class="grid h-full w-full grid-cols-2 gap-12">
          {members.map((m, i) => (
            <div key={m.name} class="group relative block overflow-hidden rounded-2xl bg-gray-200 cursor-pointer">
              {/* img class differs for the ACTIVE card — see below */}
              <div class="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />  {/* NOT on active */}
              <div class="absolute bottom-0 left-0 p-5 z-10">
                <h3 class="text-lg font-semibold text-white">{m.name}</h3>
                <p class="text-sm text-white/80">{m.role}</p>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <a href={m.instagram} target="_blank" rel="noopener noreferrer"
                 class="absolute bottom-2 right-1 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black">
                <InstagramGlyph class="h-5 w-5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>

  </div>
</div>
```

### Thumbnail `<img>` — the active/inactive split (verified from the live DOM)

- **First card (Sanam Puri, the featured one):**
  `object-cover object-top transition-all duration-300 grayscale-0 scale-105`
  and it has **no** `bg-black/10` overlay child.
- **All other cards:**
  `object-cover object-top transition-all duration-300 grayscale group-hover:grayscale-0`
  and it **does** have the `bg-black/10` overlay child, placed immediately after the `<img>`.

This is a fixed split on `index === 0`, not interactive state.

## Computed styles (measured at 1440×900)

- Outer wrapper: `background: #fff`, `min-height: 100vh`, `padding: 32px 64px` at `lg`
  (`px-4 py-8 sm:px-8 md:px-12 lg:px-16` → `lg:px-16` = 64px, `py-8` = 32px).
- Inner flex row: `max-width: 1280px` (`max-w-screen-xl`), `width: 100%`,
  `height: 720px` (that is `min(80vh, 80vw)` = min(720, 1152) = 720),
  `display: flex`, `gap: 64px` (`lg:gap-16`), `align-items` comes from the children.
- Featured column `flex-[0.9]`, thumbnail column `flex-[2.1]`; both `display: flex;
  align-items: center`. With a 1280px row and 64px gap the columns resolve to 447.3px and
  1044.7px.
- Featured card: `aspect-ratio: 3/4` (447.3 × 596.4px), `border-radius: 16px` (`rounded-2xl`),
  `overflow: hidden`, `background: #f3f4f6` (`bg-gray-100`), `box-shadow` (`shadow-xl`).
- Thumbnail grid: `aspect-ratio: 1/1` square, `display: grid`,
  `grid-template-columns: repeat(2, minmax(0,1fr))`, `gap: 48px` (`gap-12`).
  At 1044.7px wide each thumbnail is 498.35 × 336px (`aspect-ratio` inherited from the
  parent's square + grid row sizing) — reproduce by keeping the exact same box model rather
  than adding an aspect class to the cards.
- Thumbnail `rounded-2xl` (16px), `bg-gray-200` (`#e5e7eb`), `overflow: hidden`.

### Typography
- `h2` featured name: `text-2xl font-semibold` = 24px / 32px, weight 600, `#ffffff`.
- `p` featured role: 14px / 20px, `rgba(255,255,255,0.8)`, `margin-top: 4px`.
- `p` featured bio: 14px, `line-height: 1.625` (`leading-relaxed`), `rgba(255,255,255,0.9)`,
  `margin-top: 12px`, `max-width: 448px` (`max-w-md`).
- `h3` thumbnail name: `text-lg font-semibold` = 18px / 28px, weight 600, `#ffffff`.
- `p` thumbnail role: 14px / 20px, `rgba(255,255,255,0.8)`.
- Caption block paddings: featured `p-6` (24px), thumbnail `p-5` (20px).

## States & Behaviors

### Entry animations (run once on mount, never re-run)
```css
.image-fade-in { opacity: 0; animation: 1.9s ease-out 0s 1 normal forwards running fadeIn; }
.text-fade-in  { opacity: 0; animation: 0.6s ease-out 50ms 1 normal forwards running fadeInUp; }
@keyframes fadeIn   { 0% { opacity:0; transform: scale(1.01);} 100% { opacity:1; transform: scale(1);} }
@keyframes fadeInUp { 0% { opacity:0; transform: translateY(10px);} 100% { opacity:1; transform: translateY(0);} }
```
Both classes already exist in
`src/components/sites/sanamband-com-6610da83/shared/site.css` — just apply them.

### Thumbnail hover (all three effects are real)
1. `<img>`: `filter: grayscale(1)` → `grayscale(0)` over `transition: all 300ms`
   (`grayscale group-hover:grayscale-0`).
2. Overlay: `opacity: 1` → `0` over `transition: opacity 300ms`.
3. Instagram button: `background-color: rgba(0,0,0,0.7)` → `rgb(0,0,0)`.

### What NOT to implement
- The live markup has `hover:scale-120` on the Instagram button. **That class has no rule in
  the live stylesheet** — it is an invalid Tailwind value that does nothing. Reproduce it as a
  no-op: the button does **not** scale on hover. (Omit the class, or add `hover:scale-100`.)

## Assets

All portraits come from `bandMembers` in
`src/components/sites/sanamband-com-6610da83/shared/content`:
- `featuredImage` → featured card
- `thumbnailImage` → thumbnail cards

Use plain `<img>` (the live site uses plain `<img>` for the desktop band, not `next/image`).
`InstagramGlyph` from `src/components/sites/sanamband-com-6610da83/shared/icons`.

## Text content (verbatim, from `bandMembers`)

| name | role |
|---|---|
| Sanam Puri | Vocals & Lead Composer |
| Venkat Subramaniyam | Bass & Arranger |
| Keshav Dhanraj | Drums & Programmer |
| Samar Puri | Guitars, Lyrics & Editor |

Full bios are in `bandMembers[i].bio` — use them verbatim, do not truncate or rewrite.

## Responsive behavior
- **Desktop (1440×900):** two columns exactly as above.
- **Tablet (768px):** same DOM; `gap-6` → `sm:gap-10` → `md:gap-10`, padding drops to
  `md:px-12` (48px), `max-w-screen-xl` still applies, height stays `min(80vh,80vw)`.
- **Mobile (<768px):** this component is **not rendered**. The page shell renders
  `BandMemberCard` (one slide per member) instead. Do not add a mobile fallback here.
- Breakpoint for the switch: 768px, decided in JS by the page shell.

## Verification
Run `npx tsc --noEmit` from the app root. Must pass.