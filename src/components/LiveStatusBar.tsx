import React from "react";

export const LiveStatusBar: React.FC = () => {
  return (
    <div className="w-full bg-[#F3F0E8] border-b border-stone-300/80 py-1.5 sm:py-2">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 text-xs font-sans text-stone-600">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="inline-block w-2 h-2 rounded-full bg-[#9B1B30] animate-pulse shrink-0" />
            <span className="font-semibold text-stone-900 tracking-wider uppercase text-[10px] sm:text-[11px] shrink-0">
              LIVE
            </span>
            <span className="text-stone-400 shrink-0">·</span>
            <span className="text-stone-700 text-[11px] sm:text-xs truncate">
              Updated throughout the day
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2.5 text-stone-500 text-[11px] shrink-0">
            <span>London Desk</span>
            <span className="text-stone-300">/</span>
            <span>Los Angeles</span>
            <span className="text-stone-300">/</span>
            <span>Mumbai</span>
            <span className="text-stone-300">/</span>
            <span>Tokyo</span>
            <span className="text-stone-300">·</span>
            <span className="font-medium text-stone-700">All claims cross-verified</span>
          </div>

          <div className="md:hidden text-[10px] text-stone-500 font-medium shrink-0">
            4 Bureaus Active
          </div>
        </div>
      </div>
    </div>
  );
};
