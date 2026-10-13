/**
 * Site-scoped icons for sanamband.com (site-key: sanamband-com-6610da83).
 *
 * Lucide icons come from `lucide-react` and are re-exported under the names used on
 * the live site. lucide-react v1 no longer ships the brand glyphs (Instagram,
 * YouTube), so those are reproduced here from the live site's inline SVG, together
 * with the SANAM logomark.
 */

export {
  ArrowRight,
  Calendar,
  ChevronDown,
  Link as LinkGlyph,
  Mail,
  Menu,
  Music as MusicNote,
  Ticket,
  User,
  Users,
  X as CloseIcon,
} from "lucide-react";

export function SanamMarkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M4.7998 7.20078C4.7998 5.87478 5.8738 4.80078 7.1998 4.80078C8.5258 4.80078 9.5998 5.87478 9.5998 7.20078V16.8008C9.5998 18.1268 8.5258 19.2008 7.1998 19.2008C5.8738 19.2008 4.7998 18.1268 4.7998 16.8008V7.20078Z"
        fill="currentColor"
      />
      <path
        d="M12 4.80039C12 3.47439 13.074 2.40039 14.4 2.40039C15.726 2.40039 16.8 3.47439 16.8 4.80039V19.2004C16.8 20.5264 15.726 21.6004 14.4 21.6004C13.074 21.6004 12 20.5264 12 19.2004V4.80039Z"
        fill="currentColor"
      />
      <path
        d="M19.2002 9.59922C19.2002 8.27322 20.2742 7.19922 21.6002 7.19922C22.9262 7.19922 24.0002 8.27322 24.0002 9.59922V14.3992C24.0002 15.7252 22.9262 16.7992 21.6002 16.7992C20.2742 16.7992 19.2002 15.7252 19.2002 14.3992V9.59922Z"
        fill="currentColor"
      />
    </svg>
  );
}

const INSTAGRAM_PATH =
  "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.6-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z";

/** Filled Instagram glyph — `viewBox 0 0 448 512`, `fill="currentColor"`. */
export function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 448 512"
      className={className}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={INSTAGRAM_PATH} />
    </svg>
  );
}

/** Filled X (Twitter) glyph — `viewBox 0 0 512 512`, `fill="currentColor"`. */
export function XBrandIcon({ className }: { className?: string }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      className={className}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
    </svg>
  );
}

/** Filled YouTube play-badge — `viewBox 0 0 576 512`, `fill="currentColor"`. */
export function YoutubeBrandIcon({ className }: { className?: string }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 576 512"
      className={className}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
    </svg>
  );
}

/** Lucide-style outlined YouTube icon (stroke 2, `viewBox 0 0 24 24`). */
export function YoutubeOutlineIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}