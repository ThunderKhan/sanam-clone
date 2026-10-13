"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  CloseIcon,
  Mail,
  Menu,
  SanamMarkIcon,
  User,
  YoutubeOutlineIcon,
} from "../shared/icons";
import MobileMenuOverlay from "./MobileMenuOverlay";
import { SanamWordmark } from "./SanamWordmark";

export interface SiteHeaderProps {
  isDarkSlide: boolean;
  menuOpen: boolean;
  onToggleMenu: () => void;
}

interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/music", label: "Music" },
  { href: "/tour", label: "Tour" },
  { href: "/merchandise", label: "Merchandise" },
  { href: "/contact", label: "Contact" },
];

function NavItem({
  href,
  label,
  theme,
  isActive,
}: NavLink & { theme: string; isActive: boolean }) {
  const overlayClass = isActive ? "font-medium" : "font-light group-hover:font-medium";
  const className = `group relative px-1 text-sm uppercase tracking-widest ${theme}`;

  const content = (
    <>
      <span className="invisible font-medium">{label}</span>
      <span
        className={`absolute inset-0 flex items-center justify-center transition-all ${overlayClass}`}
      >
        {label}
      </span>
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link className={className} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <a className={className} href={href}>
      {content}
    </a>
  );
}

function PillFrame({
  theme,
  label,
  icon,
}: {
  theme: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <div
      className={`group flex items-center justify-end rounded-full h-10 p-1 border border-current select-none transition-colors duration-300 hover:bg-neutral-500/10 ${theme}`}
    >
      <div className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-[grid-template-columns] duration-500 ease-out">
        <div className="overflow-hidden min-w-0 flex items-center">
          <span className="pl-3 pr-2 text-xs font-bold tracking-[0.2em] uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
            {label}
          </span>
        </div>
      </div>
      {icon}
    </div>
  );
}

function PillIcon({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-8 w-8 items-center justify-center shrink-0 rounded-full">
      {children}
    </div>
  );
}

function Separator({ theme }: { theme: string }) {
  return (
    <span
      className={`text-sm font-light opacity-30 select-none ${theme}`}
      aria-hidden="true"
    >
      |
    </span>
  );
}

export function SiteHeader({ isDarkSlide, menuOpen, onToggleMenu }: SiteHeaderProps) {
  const theme = isDarkSlide ? "text-white" : "text-neutral-700";
  const brandTheme = isDarkSlide ? "text-white" : "text-black";

  return (
    <header
      role="banner"
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300 bg-transparent"
    >
      <nav
        aria-label="Global"
        className="relative flex w-full items-center justify-between px-4 py-3 md:px-6 lg:px-8"
      >
        <Link href="/" aria-label="SANAM — Home" className="flex items-center gap-3">
          <SanamMarkIcon className={`h-7 w-7 ${brandTheme}`} />
          <SanamWordmark
            className={`object-contain ${brandTheme}`}
            style={{ height: "1.7rem", width: "auto" }}
          />
        </Link>

        <div className="hidden xl:flex absolute inset-y-0 left-1/2 -translate-x-1/2 items-center gap-6">
          {NAV_LINKS.map((link) => (
            <NavItem
              key={link.href}
              {...link}
              theme={theme}
              isActive={link.href === "/"}
            />
          ))}
        </div>

        <div className="hidden xl:flex items-center space-x-2">
          <Link className="block cursor-pointer outline-none" href="/#subscribe">
            <PillFrame
              theme={theme}
              label="Join"
              icon={
                <PillIcon>
                  <Mail className="h-4.5 w-4.5" />
                </PillIcon>
              }
            />
          </Link>
          <Separator theme={theme} />
          <a
            className="block cursor-pointer outline-none"
            href="https://www.youtube.com/c/SANAM"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PillFrame
              theme={theme}
              label="Subscribe"
              icon={
                <PillIcon>
                  <YoutubeOutlineIcon className="h-5 w-5" />
                </PillIcon>
              }
            />
          </a>
          <Separator theme={theme} />
          <button type="button" className="block cursor-pointer outline-none">
            <PillFrame
              theme={theme}
              label="Login"
              icon={
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full">
                  <User className="h-5 w-5" strokeWidth={2.5} />
                </div>
              }
            />
          </button>
        </div>

        <div className="flex xl:hidden items-center gap-2 sm:gap-4">
          <button
            type="button"
            className={`flex items-center gap-2 rounded-full border border-current p-1 transition-all active:scale-95 text-left outline-none ${theme}`}
          >
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider pl-2 select-none">
              Login
            </span>
            <div className="relative flex h-7 w-7 items-center justify-center rounded-full">
              <User className="h-5 w-5" strokeWidth={2.5} />
            </div>
          </button>
          <button
            type="button"
            onClick={onToggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="relative z-50 inline-flex items-center justify-center rounded-md p-2 outline-none"
          >
            {menuOpen ? (
              <CloseIcon className={`h-6 w-6 ${theme}`} />
            ) : (
              <Menu className={`h-6 w-6 ${theme}`} />
            )}
          </button>
        </div>
      </nav>
      <MobileMenuOverlay open={menuOpen} onClose={onToggleMenu} />
    </header>
  );
}