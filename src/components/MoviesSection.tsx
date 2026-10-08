import React, { useState } from "react";
import { MOVIES_ITEMS } from "../data/mockStories";
import { MovieItem } from "../types";
import { SectionHeader } from "./primitives/SectionHeader";
import { MovieCard } from "./primitives/MovieCard";

interface MoviesSectionProps {
  onSelectMovie: (movie: MovieItem) => void;
  onOpenTrailersSection: () => void;
}

export const MoviesSection: React.FC<MoviesSectionProps> = ({
  onSelectMovie,
  onOpenTrailersSection,
}) => {
  const [filter, setFilter] = useState<"Latest" | "Upcoming" | "Reviews" | "Trailers">("Latest");

  const subNavTabs = ["Latest", "Upcoming", "Reviews", "Trailers"] as const;

  const filteredMovies = MOVIES_ITEMS.filter((m) => {
    if (filter === "Upcoming") return m.status === "Upcoming";
    if (filter === "Reviews") return m.rating !== undefined;
    if (filter === "Trailers") return true;
    return true;
  });

  return (
    <section id="movies" className="py-8 sm:py-12 border-b border-stone-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Cinematheque & Theatrical Ledger"
          title="Movies"
          description="Festivals, box office projections, critical reviews, and auteur retrospectives."
          actionText="Full Film Ledger"
          onActionClick={() => onSelectMovie(MOVIES_ITEMS[0])}
        />

        {/* Cinematic Sub-Nav: smooth touch scroll on mobile */}
        <div className="overflow-x-auto no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0 mb-6 sm:mb-8">
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-stone-200/70 rounded-xs w-max">
            {subNavTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setFilter(tab);
                  if (tab === "Trailers") {
                    onOpenTrailersSection();
                  }
                }}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors whitespace-nowrap cursor-pointer min-h-[38px] ${
                  filter === tab
                    ? "bg-white text-stone-900 shadow-2xs"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-100/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Movies grid: 1 col on phone, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={onSelectMovie}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
