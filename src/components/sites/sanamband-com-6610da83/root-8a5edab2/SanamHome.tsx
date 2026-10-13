"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import "swiper/css";
import "swiper/css/pagination";
import "../shared/site.css";

import { BandMemberCard } from "./BandMemberCard";
import { BandMembers } from "./BandMembers";
import { HeroCarousel } from "./HeroCarousel";
import { InstagramFeed } from "./InstagramFeed";
import { NewsletterSignup } from "./NewsletterSignup";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { bandMembers } from "../shared/content";

const MOBILE_BREAKPOINT = 768;
const TRANSITION_MS = 800;
/** Wheel delta that must accumulate before one section is consumed. */
const WHEEL_THRESHOLD = 48;
/** Vertical touch travel that commits to a section change. */
const TOUCH_THRESHOLD = 56;

interface Slide {
  key: string;
  node: ReactNode;
  /** Extra classes placed on the slide element, matching the live DOM. */
  slideClassName?: string;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

/**
 * True when the event target sits inside a container that can genuinely scroll in `deltaY`'s
 * direction, so nested scrollable content is never hijacked by the page pager.
 */
function canScrollWithin(target: EventTarget | null, deltaY: number) {
  return walkScrollableAncestors(target, (node) => {
    const atTop = node.scrollTop <= 0;
    const atBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 1;
    if (deltaY < 0 && !atTop) return true;
    if (deltaY > 0 && !atBottom) return true;
    return false;
  });
}

/** True when any ancestor is a scrollable box, regardless of remaining scroll range. */
function hasScrollableAncestor(target: EventTarget | null) {
  return walkScrollableAncestors(target, () => true);
}

function walkScrollableAncestors(
  target: EventTarget | null,
  onScrollable: (node: HTMLElement) => boolean,
) {
  let node = target as HTMLElement | null;

  while (node && node instanceof Element && node !== document.body && node !== document.documentElement) {
    const overflowY = getComputedStyle(node).overflowY;
    if (
      (overflowY === "auto" || overflowY === "scroll") &&
      node.scrollHeight > node.clientHeight + 1 &&
      onScrollable(node)
    ) {
      return true;
    }
    node = node.parentElement;
  }

  return false;
}

function isFormControl(target: EventTarget | null) {
  const node = target as HTMLElement | null;
  if (!node) return false;
  const tag = node.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    tag === "OPTION" ||
    node.isContentEditable === true
  );
}

export function SanamHome() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [locked, setLocked] = useState(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const lockTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const wheelAccumulator = useRef(0);
  const touchStart = useRef<{ x: number; y: number; scrollable: boolean } | null>(null);
  const touchConsumed = useRef(false);

  const duration = prefersReducedMotion ? 0 : TRANSITION_MS;

  const slides = useMemo<Slide[]>(() => {
    const shared: Slide[] = [
      { key: "hero", node: <HeroCarousel /> },
      {
        key: "instagram",
        node: <InstagramFeed />,
        slideClassName: "bg-white overflow-y-auto",
      },
      {
        key: "newsletter",
        node: <NewsletterSignup />,
        slideClassName: "bg-white overflow-y-auto",
      },
      { key: "footer", node: <SiteFooter /> },
    ];

    if (isMobile) {
      return [
        shared[0],
        ...bandMembers.map((member) => ({
          key: member.name,
          node: <BandMemberCard member={member} />,
        })),
        ...shared.slice(1),
      ];
    }

    return [
      shared[0],
      {
        key: "band",
        node: <BandMembers />,
        slideClassName: "bg-white overflow-y-auto pt-12",
      },
      ...shared.slice(1),
    ];
  }, [isMobile]);

  const slideCount = slides.length;
  const lastIndex = slideCount - 1;

  const releaseLock = useCallback(() => {
    if (lockTimer.current !== undefined) {
      clearTimeout(lockTimer.current);
      lockTimer.current = undefined;
    }
    setLocked(false);
  }, []);

  useEffect(() => releaseLock, [releaseLock]);

  /**
   * Moves exactly one section (or jumps to `target`).
   *
   * The stacking is what produces the effect: slide `i` keeps `z-index: i + 1`, every slide at
   * or before `activeIndex` stays parked at `translateY(0)`, and every slide after it waits at
   * `translateY(100%)` below the viewport. Advancing therefore slides the incoming section up
   * *over* a stationary outgoing one; going back slides the current section down to uncover the
   * one beneath it.
   */
  const goTo = useCallback(
    (target: number) => {
      const next = Math.max(0, Math.min(target, lastIndex));
      setActiveIndex((current) => {
        if (locked || next === current) return current;

        setLocked(true);
        if (lockTimer.current !== undefined) clearTimeout(lockTimer.current);
        lockTimer.current = setTimeout(() => {
          lockTimer.current = undefined;
          setLocked(false);
        }, duration + 60);

        return next;
      });
    },
    [duration, lastIndex, locked],
  );

  const step = useCallback(
    (direction: 1 | -1) => {
      goTo(activeIndex + direction);
    },
    [activeIndex, goTo],
  );

  // Wheel / trackpad. One accumulated gesture commits one section; no skipping, and native
  // scrolling inside nested scrollable content is left alone.
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;

      const delta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;

      if (locked || delta === 0) {
        wheelAccumulator.current = 0;
        return;
      }

      if (canScrollWithin(event.target, delta)) return;

      event.preventDefault();
      wheelAccumulator.current += delta;

      if (Math.abs(wheelAccumulator.current) >= WHEEL_THRESHOLD) {
        const direction = wheelAccumulator.current > 0 ? 1 : -1;
        wheelAccumulator.current = 0;
        step(direction);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [locked, step]);

  // Touch. Vertical intent only, so horizontal hero swipes and nested scrollers still work.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      touchStart.current = {
        x: touch.clientX,
        y: touch.clientY,
        scrollable: canScrollWithin(event.target, 0) || hasScrollableAncestor(event.target),
      };
      touchConsumed.current = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (locked || touchConsumed.current || !touchStart.current) return;
      const touch = event.touches[0];
      if (!touch) return;

      const dx = touch.clientX - touchStart.current.x;
      const dy = touch.clientY - touchStart.current.y;
      if (Math.abs(dy) <= Math.abs(dx)) return;

      if (Math.abs(dy) < TOUCH_THRESHOLD) return;

      touchConsumed.current = true;
      step(dy < 0 ? 1 : -1);
    };

    const handleTouchEnd = () => {
      touchStart.current = null;
    };

    stage.addEventListener("touchstart", handleTouchStart, { passive: true });
    stage.addEventListener("touchmove", handleTouchMove, { passive: true });
    stage.addEventListener("touchend", handleTouchEnd, { passive: true });
    stage.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      stage.removeEventListener("touchstart", handleTouchStart);
      stage.removeEventListener("touchmove", handleTouchMove);
      stage.removeEventListener("touchend", handleTouchEnd);
      stage.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [locked, step]);

  // Keyboard paging, skipped while a form control has focus.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isFormControl(event.target)) return;

      switch (event.key) {
        case "ArrowDown":
        case "PageDown":
          event.preventDefault();
          step(1);
          break;
        case "ArrowUp":
        case "PageUp":
          event.preventDefault();
          step(-1);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step]);

  const [previousIsMobile, setPreviousIsMobile] = useState(isMobile);
  if (previousIsMobile !== isMobile) {
    setPreviousIsMobile(isMobile);
    setActiveIndex(0);
    setMenuOpen(false);
  }

  const isDarkSlide = activeIndex === 0 || activeIndex === lastIndex;

  return (
    <>
      <SiteHeader
        isDarkSlide={isDarkSlide}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((open) => !open)}
      />
      <div ref={stageRef} className="sanam-stage">
        {slides.map((slide, index) => {
          const isSettled = index <= activeIndex;
          return (
            <div
              key={slide.key}
              id={index === 0 ? "sanam-slide-0" : undefined}
              className={`sanam-slide ${slide.slideClassName ?? ""}`.trim()}
              data-slide-index={index}
              data-active={index === activeIndex}
              aria-hidden={index !== activeIndex}
              style={{
                zIndex: index + 1,
                transform: `translate3d(0, ${isSettled ? "0%" : "100%"}, 0)`,
                transitionDuration: `${duration}ms`,
              }}
            >
              {slide.node}
            </div>
          );
        })}

        <nav className="sanam-pagination" aria-label="Sections">
          {slides.map((slide, index) => (
            <button
              key={slide.key}
              type="button"
              className={`sanam-bullet${index === activeIndex ? " sanam-bullet-active" : ""}`}
              aria-label={`Go to section ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => goTo(index)}
            />
          ))}
        </nav>
      </div>
    </>
  );
}