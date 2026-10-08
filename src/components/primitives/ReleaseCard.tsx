import React from "react";
import { ReleaseCalendarItem } from "../../types";

interface ReleaseCardProps {
  item: ReleaseCalendarItem;
  className?: string;
}

export const ReleaseCard: React.FC<ReleaseCardProps> = ({
  item,
  className = "",
}) => {
  return (
    <div
      className={`p-3.5 sm:py-3.5 sm:px-4 bg-white border border-stone-200/80 rounded-xs hover:border-stone-400 transition-colors shadow-2xs ${className}`}
    >
      {/* Mobile Card Layout (< md) */}
      <div className="flex md:hidden flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold tracking-wider text-[#9B1B30] uppercase">
              {item.dayBadge}
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-[11px] text-stone-500">{item.date}</span>
          </div>

          <span
            className={`text-[9px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded-xs ${
              item.verifiedStatus === "Confirmed Date"
                ? "text-emerald-800 bg-emerald-50 border border-emerald-200"
                : "text-stone-600 bg-stone-100 border border-stone-200"
            }`}
          >
            {item.verifiedStatus === "Confirmed Date" ? "Locked" : "Est."}
          </span>
        </div>

        <h4 className="text-base font-medium text-stone-900 font-serif leading-snug">
          {item.title}
        </h4>

        <div className="flex items-center justify-between pt-1.5 border-t border-stone-100 text-[11px] text-stone-600">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-stone-700">{item.category}</span>
            <span className="text-stone-300">·</span>
            <span>{item.medium}</span>
          </div>
          <span className="text-stone-800 font-medium truncate max-w-[150px]">{item.platform}</span>
        </div>
      </div>

      {/* Desktop / Tablet Row Layout (>= md) */}
      <div className="hidden md:grid md:grid-cols-12 gap-3 items-center">
        {/* Date badge */}
        <div className="md:col-span-2 flex flex-col">
          <span className="text-xs font-mono font-semibold tracking-wider text-[#9B1B30] uppercase">
            {item.dayBadge}
          </span>
          <span className="text-[11px] text-stone-500">{item.date}</span>
        </div>

        {/* Title & Category */}
        <div className="md:col-span-6">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
              {item.category}
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-[10px] text-stone-600 font-medium">
              {item.medium}
            </span>
          </div>
          <h4 className="text-base font-medium text-stone-900 font-serif">
            {item.title}
          </h4>
        </div>

        {/* Distribution platform */}
        <div className="md:col-span-3 text-xs text-stone-600">
          <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-medium">
            Exhibition / Platform
          </span>
          <span className="font-medium text-stone-800">{item.platform}</span>
        </div>

        {/* Verified Status */}
        <div className="md:col-span-1 text-right">
          <span
            className={`inline-block text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-xs ${
              item.verifiedStatus === "Confirmed Date"
                ? "text-emerald-800 bg-emerald-50 border border-emerald-200"
                : "text-stone-600 bg-stone-100 border border-stone-200"
            }`}
          >
            {item.verifiedStatus === "Confirmed Date" ? "Locked" : "Est."}
          </span>
        </div>
      </div>
    </div>
  );
};
