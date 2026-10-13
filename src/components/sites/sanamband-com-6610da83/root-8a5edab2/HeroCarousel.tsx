"use client";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { heroBanners } from "../shared/content";

export function HeroCarousel() {
  return (
    <Swiper
      className="swiper swiper-shutters swiper-horizontal will-change-transform h-full w-full"
      direction="horizontal"
      slidesPerView={1}
      spaceBetween={0}
      loop
      speed={2400}
      grabCursor
      allowTouchMove
      threshold={5}
      autoplay={{ delay: 3200, waitForTransition: true, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
    >
      {heroBanners.map((banner) => (
        <SwiperSlide key={banner.href} className="swiper-slide-4ffe">
          <div className="relative block h-full w-full overflow-hidden">
            <picture>
              <source media="(max-width: 767px)" srcSet={banner.mobileImage} />
              <img alt={banner.alt} className="slide-cover-image" src={banner.desktopImage} />
            </picture>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />
            <div className="pointer-events-none absolute left-1/2 bottom-8 -translate-x-1/2">
              <a
                className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/25 bg-gradient-to-r from-white/80 via-white/70 to-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-black/85 shadow-xl shadow-black/30 backdrop-blur-md transition hover:-translate-y-0.5"
                href={banner.href}
                target={banner.external ? "_blank" : undefined}
                rel={banner.external ? "noopener noreferrer" : undefined}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-black/70 shadow-[0_0_0_4px_rgba(255,255,255,0.6)]" />
                <span>{banner.label}</span>
                <span className="text-sm leading-none">↗</span>
              </a>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="swiper-pagination swiper-pagination-horizontal" slot="container" />
    </Swiper>
  );
}