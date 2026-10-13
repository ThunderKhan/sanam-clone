import type { LucideIcon } from "lucide-react";

import { instagramBenefits } from "../shared/content";
import { Calendar, MusicNote, Ticket, Users } from "../shared/icons";

type BenefitIconName = (typeof instagramBenefits)[number]["icon"];

const benefitIcons: Record<BenefitIconName, LucideIcon> = {
  calendar: Calendar,
  music: MusicNote,
  ticket: Ticket,
  users: Users,
};

export interface BenefitsListProps {
  variant: "desktop" | "mobile";
}

export function BenefitsList({ variant }: BenefitsListProps) {
  void variant;

  return (
    <div className="grid grid-cols-1 gap-5">
      {instagramBenefits.map((benefit) => {
        const Icon = benefitIcons[benefit.icon];

        return (
          <div key={benefit.title} className="flex items-start gap-5 group">
            <div className="flex-shrink-0 pt-1 p-2 bg-neutral-100 rounded-full group-hover:bg-neutral-200 transition-colors">
              <Icon className="h-6 w-6 text-neutral-800" />
            </div>
            <div>
              <h4 className="font-semibold text-black text-lg group-hover:text-neutral-700 transition-colors">
                {benefit.title}
              </h4>
              <p className="mt-1 text-neutral-600 font-light">{benefit.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
