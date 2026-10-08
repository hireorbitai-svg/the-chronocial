import React, { useState } from "react";
import { TRAILERS } from "../data/mockStories";
import { TrailerItem } from "../types";
import { SectionHeader } from "./primitives/SectionHeader";
import { TrailerCard } from "./primitives/TrailerCard";

interface TrailerSectionProps {
  onPlayTrailer?: (trailer: TrailerItem) => void;
  trailers?: TrailerItem[];
}

export const TrailerSection: React.FC<TrailerSectionProps> = ({ trailers = TRAILERS }) => {
  const [activeTrailer, setActiveTrailer] = useState<TrailerItem | null>(null);

  const handleTrailerClick = (trailer: TrailerItem) => {
    setActiveTrailer(trailer);
    // Smooth scroll to the theater player
    const el = document.getElementById("in-page-theater");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="trailers" className="py-8 sm:py-12 border-b border-stone-300 bg-[#FAF8F5]/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Studio Screenings & Teasers"
          title="Latest Official Trailers"
          description="Verified theatrical teasers, final previews, and gameplay reveals from authorized studio distributors."
          actionText={activeTrailer ? "Collapse Theater" : "Featured Screening"}
          onActionClick={() => {
            if (activeTrailer) {
              setActiveTrailer(null);
            } else {
              handleTrailerClick(TRAILERS[0]);
            }
          }}
        />

        {/* In-Page Cinema Theater Player (NO popups) */}
        {activeTrailer && (
          <div
            id="in-page-theater"
            className="mb-8 bg-stone-950 border border-stone-800 rounded-xs overflow-hidden shadow-xl animate-in fade-in duration-200"
          >
            <div className="px-3.5 sm:px-5 py-2.5 bg-black flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-2 truncate mr-3">
                <span className="w-2 h-2 rounded-full bg-[#9B1B30] animate-pulse shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-white shrink-0">
                  In-Page Screening Room
                </span>
                <span className="text-stone-600 shrink-0">·</span>
                <span className="text-xs text-stone-300 font-sans truncate">{activeTrailer.title}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTrailer(null)}
                className="text-stone-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors px-2 py-1 cursor-pointer shrink-0"
              >
                ✕ Close Player
              </button>
            </div>

            <div className="relative aspect-video bg-black w-full max-h-[70vh]">
              <iframe
                src={activeTrailer.embedUrl}
                title={activeTrailer.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="p-4 sm:p-6 bg-stone-900 text-stone-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="text-lg sm:text-xl font-medium font-serif text-white">
                  {activeTrailer.title}
                </h3>
                <span className="text-xs font-mono text-stone-400">
                  {activeTrailer.duration} · {activeTrailer.studioOrPublisher}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed max-w-4xl">
                {activeTrailer.synopsis}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trailers.map((trailer) => (
            <TrailerCard
              key={trailer.id}
              trailer={trailer}
              onPlay={handleTrailerClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
