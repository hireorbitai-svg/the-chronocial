import React, { useState, useEffect, useRef } from "react";
import { SEARCH_INDEX } from "../data/mockStories";
import { SearchResultItem, Story } from "../types";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStory?: (storyId: string) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  onSelectStory,
}) => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = ["All", "People", "Movies", "TV Shows", "Games", "Stories"];

  const filteredResults = SEARCH_INDEX.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.type === selectedCategory;
    const matchesQuery =
      query.trim() === "" ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.meta.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const quickPicks = ["Tom Holland", "Christopher Nolan", "Grand Theft Auto VI", "Zendaya", "Dune Messiah"];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Editorial Search & Intelligence Archive"
      className="fixed inset-0 z-50 bg-[#1C1917]/80 backdrop-blur-xs flex flex-col justify-start items-center p-0 sm:p-4 md:p-6 overflow-y-auto"
    >
      <div className="w-full max-w-3xl bg-[#FAF9F5] sm:border sm:border-stone-300 sm:shadow-2xl sm:rounded-xs min-h-screen sm:min-h-0 sm:my-6 md:my-10 flex flex-col overflow-hidden">
        {/* Top search input bar */}
        <div className="p-3.5 sm:p-6 border-b border-stone-200 bg-white sticky top-0 z-10 shadow-2xs">
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
              <svg
                className="w-5 h-5 text-stone-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search people, films, series, games..."
                className="w-full bg-transparent text-base sm:text-xl font-serif text-stone-900 placeholder:text-stone-400 placeholder:font-sans focus:outline-none min-h-[40px]"
              />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 -mr-1 sm:mr-0 text-stone-500 hover:text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-xs min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            >
              <span className="hidden sm:inline">[ESC] Close</span>
              <span className="sm:hidden text-base">✕</span>
            </button>
          </div>

          {/* Quick search tags: touch scrollable on mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-3 pt-2.5 border-t border-stone-100 overflow-x-auto no-scrollbar text-xs">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-stone-400 shrink-0">
              Popular:
            </span>
            {quickPicks.map((pick) => (
              <button
                key={pick}
                type="button"
                onClick={() => setQuery(pick)}
                className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xs transition-colors text-xs whitespace-nowrap cursor-pointer shrink-0"
              >
                {pick}
              </button>
            ))}
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-3 overflow-x-auto no-scrollbar pb-0.5 text-xs font-medium">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xs transition-colors whitespace-nowrap cursor-pointer min-h-[34px] ${
                  selectedCategory === cat
                    ? "bg-[#9B1B30] text-white"
                    : "bg-stone-100 text-stone-600 hover:text-stone-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results list */}
        <div className="flex-1 p-3 sm:p-6 overflow-y-auto divide-y divide-stone-200/70">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-stone-500 px-4">
              <p className="font-serif text-lg text-stone-700">No matching archives found</p>
              <p className="text-xs text-stone-500 mt-1">
                Try searching for names like "Tom Holland", "Christopher Nolan", or titles like "Dune".
              </p>
            </div>
          ) : (
            filteredResults.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.type === "Stories" && onSelectStory) {
                    onSelectStory("story-lead-01");
                  }
                  onClose();
                }}
                className="py-3 px-2 hover:bg-stone-100/70 active:bg-stone-200/60 rounded-xs transition-colors cursor-pointer flex gap-3 sm:gap-4 items-center"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-stone-200 rounded-xs overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                    <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#9B1B30]">
                      {item.type}
                    </span>
                    {item.category && (
                      <>
                        <span className="text-stone-300">·</span>
                        <span className="text-[9px] sm:text-[10px] text-stone-500">{item.category}</span>
                      </>
                    )}
                  </div>
                  <h4 className="text-sm sm:text-base font-medium text-stone-900 font-serif leading-snug truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-stone-500 truncate mt-0.5">
                    {item.subtitle} — {item.meta}
                  </p>
                </div>
                <div className="text-stone-400 font-serif text-sm px-1 shrink-0">
                  →
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 text-center text-[10px] sm:text-[11px] text-stone-500 font-sans">
          The Chronicle Index · Cross-indexed editorial records updated hourly
        </div>
      </div>
    </div>
  );
};
