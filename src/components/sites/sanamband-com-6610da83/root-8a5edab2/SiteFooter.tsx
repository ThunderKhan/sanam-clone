import Link from "next/link";
import { quickLinks, socialLinks } from "../shared/content";
import { InstagramGlyph, XBrandIcon, YoutubeBrandIcon } from "../shared/icons";

const WHATSAPP_URL =
  "https://wa.me/919699969940?text=Hi%20SANAM%20team!%20I'd%20love%20to%20talk%20about%20gigs%2C%20collaborations%2C%20or%20media%20enquiries.";

function SocialIcon({ icon }: { icon: "x" | "instagram" | "youtube" }) {
  if (icon === "x") return <XBrandIcon className="h-7 w-7" />;
  if (icon === "instagram") return <InstagramGlyph className="h-7 w-7" />;
  return <YoutubeBrandIcon className="h-7 w-7" />;
}

export function SiteFooter() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 h-full w-full flex items-center">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/sites/sanamband-com-6610da83/root-8a5edab2/images/logo.svg"
                alt="SANAM logo"
                className="h-8 w-8"
              />
              <span className="text-xl font-semibold text-white">SANAM</span>
            </div>
            <p className="mt-4 max-w-xs text-sm">
              Music that bridges hearts and generations. India&apos;s most beloved
              independent band creating authentic connections through melody.
            </p>
            <div className="mt-8 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white"
                >
                  <span className="sr-only">{social.label}</span>
                  <SocialIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 min-[360px]:grid-cols-2 sm:gap-6 lg:gap-10 lg:col-span-2 items-start">
            <div>
              <p className="font-semibold text-white">Quick Links</p>
              <ul className="mt-5 space-y-3 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link className="hover:opacity-75" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white">Connect</p>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <a
                    href="mailto:wearesanam@gmail.com"
                    className="flex w-full max-w-full flex-wrap items-center gap-2 hover:opacity-75 break-all"
                  >
                    <span className="min-w-0">wearesanam@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:opacity-75"
                  >
                    <span>+91 96999 69940</span>
                  </a>
                </li>
                <li>Mumbai, India</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-800 pt-8">
          <p className="text-center text-xs text-neutral-500">
            © 2026 SANAM. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;