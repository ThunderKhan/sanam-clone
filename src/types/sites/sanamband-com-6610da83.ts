/**
 * Content contracts for the sanamband.com clone
 * (site-key: sanamband-com-6610da83, page-key: root-8a5edab2)
 *
 * All strings below are verbatim from https://www.sanamband.com/.
 */

export interface HeroBanner {
  /** Visible label inside the glass CTA pill, e.g. "Tour". */
  label: string;
  href: string;
  /** `target="_blank"` for off-site links. */
  external: boolean;
  alt: string;
  /** Public path under /sites/sanamband-com-6610da83/root-8a5edab2/images/hero/. */
  desktopImage: string;
  mobileImage: string;
}

export interface BandMember {
  name: string;
  role: string;
  bio: string;
  instagram: string;
  /** Portrait used by the mobile full-screen card (< 768px). */
  mobileImage: string;
  /** Portrait used by the desktop featured card. */
  featuredImage: string;
  /** Portrait used by the desktop thumbnail grid. */
  thumbnailImage: string;
}

export interface InstagramBenefit {
  icon: "calendar" | "music" | "ticket" | "users";
  title: string;
  description: string;
}

export interface FooterLink {
  label: string;
  href: string;
  external: boolean;
}