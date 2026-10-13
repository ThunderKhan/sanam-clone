import { InstagramGlyph } from '../shared/icons';

export function InstagramFeed() {
  return (
    <section className="instagram-section h-full w-full">
      <div className="instagram-background" />
      <div className="instagram-content mx-auto flex h-full max-w-6xl flex-col justify-center px-6 py-12 text-center">
        <div className="instagram-carousel-wrapper">
          <div className="py-16 text-sm uppercase tracking-[0.2em] text-neutral-500">
            Unable to load Instagram posts.
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
          <InstagramGlyph className="h-4 w-4" />
          <span>Swipe to see recent posts</span>
        </div>
      </div>
    </section>
  );
}