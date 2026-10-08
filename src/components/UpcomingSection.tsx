import React, { useState } from "react";
import { UPCOMING_RELEASES } from "../data/mockStories";
import { SectionHeader } from "./primitives/SectionHeader";
import { ReleaseCard } from "./primitives/ReleaseCard";

export const UpcomingSection: React.FC = () => {
  const [filter, setFilter] = useState<"All" | "Movies" | "TV" | "Gaming">("All");

  const filteredReleases = UPCOMING_RELEASES.filter((item) => {
    if (filter === "All") return true;
    return item.category === filter;
  });

  return (
    <section id="coming-up" className="py-8 sm:py-12 border-b border-stone-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Production & Exhibition Schedule"
          title="Coming Up: The Release Calendar"
          description="Verified theatrical dates, streaming premiere windows, and console launches cross-referenced with studio production notices."
          actionText="Export Calendar"
          onActionClick={() => alert("Release calendar exported to iCal / Google Calendar format.")}
        />

        {/* Medium filter tabs */}
        <div className="overflow-x-auto no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0 mb-6">
          <div className="flex items-center gap-2 w-max">
            {(["All", "Movies", "TV", "Gaming"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer min-h-[38px] whitespace-nowrap ${
                  filter === tab
                    ? "bg-stone-900 text-white"
                    : "bg-stone-200/60 text-stone-700 hover:bg-stone-300/60"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Release rows */}
        <div className="space-y-2.5 sm:space-y-3">
          {filteredReleases.map((item) => (
            <ReleaseCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
