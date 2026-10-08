import React from "react";
import { CELEBRITIES } from "../data/mockStories";
import { CelebrityProfile } from "../types";
import { SectionHeader } from "./primitives/SectionHeader";
import { CelebrityCard } from "./primitives/CelebrityCard";

interface CelebritySectionProps {
  onSelectCelebrity: (celebrity: CelebrityProfile) => void;
  celebrities?: CelebrityProfile[];
}

export const CelebritySection: React.FC<CelebritySectionProps> = ({
  onSelectCelebrity,
  celebrities = CELEBRITIES,
}) => {
  return (
    <section id="celebrities" className="py-8 sm:py-12 border-b border-stone-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Dossiers & Talent Intelligence"
          title="Celebrities & Creators"
          description="In-depth career profiles, production agreements, stage debuts, and industry moves. Journalistic rigor without tabloid sensationalism."
          actionText="View Talent Index"
          onActionClick={() => onSelectCelebrity(celebrities[0] || CELEBRITIES[0])}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {celebrities.map((celeb) => (
            <CelebrityCard
              key={celeb.id}
              celebrity={celeb}
              onSelect={onSelectCelebrity}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
