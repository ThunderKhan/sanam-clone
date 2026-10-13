import { bandMembers } from "../shared/content";
import { InstagramGlyph } from "../shared/icons";

export function BandMembers() {
  const featured = bandMembers[0];

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto flex h-[min(80vh,80vw)] w-full max-w-screen-xl gap-6 sm:gap-10 lg:gap-16">
        <div className="flex items-center flex-[0.9]">
          <div className="relative block aspect-[3/4] h-full w-full overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
            <img
              alt={featured.name}
              className="image-fade-in absolute inset-0 h-full w-full object-cover object-top"
              src={featured.featuredImage}
            />
            <div className="text-fade-in absolute bottom-0 left-0 z-20 p-6 text-white">
              <h2 className="text-2xl font-semibold">{featured.name}</h2>
              <p className="mt-1 text-sm text-white/80">{featured.role}</p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/90">
                {featured.bio}
              </p>
            </div>
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
        </div>

        <div className="flex items-center flex-[2.1]">
          <div className="aspect-square h-full w-full">
            <div className="grid h-full w-full grid-cols-2 gap-12">
              {bandMembers.map((m, i) => (
                <div
                  key={m.name}
                  className="group relative block cursor-pointer overflow-hidden rounded-2xl bg-gray-200"
                >
                  <img
                    alt={m.name}
                    src={m.thumbnailImage}
                    className={
                      i === 0
                        ? "absolute inset-0 h-full w-full scale-105 object-cover object-top transition-all duration-300 grayscale-0"
                        : "absolute inset-0 h-full w-full object-cover object-top transition-all duration-300 grayscale group-hover:grayscale-0"
                    }
                  />
                  {i !== 0 && (
                    <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
                  )}
                  <div className="absolute bottom-0 left-0 z-10 p-5">
                    <h3 className="text-lg font-semibold text-white">{m.name}</h3>
                    <p className="text-sm text-white/80">{m.role}</p>
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <a
                    href={m.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-2 right-1 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
                  >
                    <InstagramGlyph className="h-5 w-5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}