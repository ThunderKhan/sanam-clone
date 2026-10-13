"use client";

import { useState, type ReactNode } from "react";

import { ChevronDown } from "../shared/icons";
import { BenefitsList } from "./BenefitsList";
import { SubscribeForm } from "./SubscribeForm";

interface AccordionItemProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

function AccordionItem({ title, defaultOpen = false, children }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-neutral-200 py-4">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-xl font-bold text-black">{title}</h3>
        <div
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 300ms",
          }}
        >
          <ChevronDown className="h-6 w-6 text-neutral-500" />
        </div>
      </button>
      {open && <div className="pt-4 pb-2">{children}</div>}
    </div>
  );
}

export function NewsletterSignup() {
  return (
    <div className="h-full w-full">
      <div className="h-full w-full">
        <section id="subscribe" className="scroll-mt-32 mx-auto h-full w-full max-w-[85vw] py-12">
          <div className="w-full mx-auto">
            <div className="text-center mb-10">
              <p className="font-bold text-neutral-500 tracking-wider uppercase text-xs mb-2">
                Stay Connected
              </p>
              <h2 className="text-4xl md:text-4xl font-bold text-black mb-2">
                Join the SANAM Community
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-neutral-600 font-light leading-relaxed">
                Be part of our musical journey. Get exclusive access to tour announcements, new
                releases, and behind-the-scenes content.
              </p>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-black border-b border-neutral-200 pb-4 inline-block">
                What You&apos;ll Get:
              </h3>
              <BenefitsList variant="desktop" />
            </div>
            <div className="bg-white rounded-2xl p-8 lg:p-10 border border-neutral-100 shadow-2xl">
              <h3 className="text-2xl font-bold text-black">Subscribe now</h3>
              <p className="mt-2 text-neutral-600 font-light">
                Join our fans who never miss an update.
              </p>
              <SubscribeForm idSuffix="desktop" />
            </div>
          </div>

          <div className="lg:hidden mt-6 border-t border-neutral-200">
            <AccordionItem title="What You'll Get:">
              <BenefitsList variant="mobile" />
            </AccordionItem>
            <AccordionItem title="Subscribe now" defaultOpen>
              <p className="mt-3 text-neutral-600 font-light">
                Join our fans who never miss an update.
              </p>
              <SubscribeForm idSuffix="mobile" />
            </AccordionItem>
          </div>
        </section>
      </div>
    </div>
  );
}
