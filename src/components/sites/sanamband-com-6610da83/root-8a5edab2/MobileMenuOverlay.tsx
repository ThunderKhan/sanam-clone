'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { Mail, YoutubeOutlineIcon } from '../shared/icons';

export interface MobileMenuOverlayProps {
  open: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/music', label: 'Music' },
  { href: '/tour', label: 'Tour' },
  { href: '/merchandise', label: 'Merchandise' },
  { href: '/contact', label: 'Contact' },
];

const ACTION_LINK_CLASS =
  'flex w-full items-center justify-center gap-3 rounded-full border border-white px-6 py-2.5 text-base font-medium uppercase tracking-widest text-white transition-transform active:scale-95';

export function MobileMenuOverlay({ open, onClose }: MobileMenuOverlayProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 h-screen w-screen bg-black/90 backdrop-blur-lg xl:hidden">
      <div className="flex h-full w-full flex-col items-center justify-center px-6 pb-12">
        <div className="flex w-full flex-col items-center space-y-7 text-center">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={
                index === 0
                  ? 'block text-xl uppercase tracking-widest text-white transition-all font-medium'
                  : 'block text-xl uppercase tracking-widest text-white transition-all font-light hover:font-medium'
              }
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-4 w-full max-w-xs space-y-4 border-t border-white/20 pt-8">
            <Link href="/#subscribe" onClick={onClose} className={ACTION_LINK_CLASS}>
              <Mail className="h-5 w-5" />
              Join Community
            </Link>
            <a
              href="https://www.youtube.com/c/SANAM"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className={ACTION_LINK_CLASS}
            >
              <YoutubeOutlineIcon className="h-6 w-6" />
              Subscribe
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenuOverlay;