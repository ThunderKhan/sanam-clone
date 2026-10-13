import { bandMembers } from "../shared/content";
import { LinkGlyph } from "../shared/icons";

type BandMember = (typeof bandMembers)[number];

export interface BandMemberCardProps {
  member: BandMember;
}

export function BandMemberCard({ member }: BandMemberCardProps) {
  return (
    <div className="mobile-slide-wrapper">
      <div className="mobile-slide-background">
        <img
          alt={member.name}
          className="object-cover object-top"
          src={member.mobileImage}
        />
        <div className="mobile-slide-overlay" />
      </div>
      <div className="mobile-slide-card fixed-card">
        <a
          href={member.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="glassy-card">
            <div className="mobile-card-content">
              <div className="mobile-card-text">
                <h2 className="mobile-card-name">{member.name}</h2>
                <p className="mobile-card-title">{member.role}</p>
                <p className="mobile-card-description">{member.bio}</p>
                <div className="mobile-card-footer">
                  <LinkGlyph className="h-4 w-4" />
                  {`Tap to see ${member.name}'s Instagram profile`}
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}