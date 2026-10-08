import React from "react";
import { StoryStatus } from "../../types";

interface StatusBadgeProps {
  status?: StoryStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = "" }) => {
  if (!status) return null;

  switch (status) {
    case "breaking":
      return (
        <span
          className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#9B1B30] ${className}`}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#9B1B30] animate-pulse" />
          Breaking
        </span>
      );
    case "developing":
      return (
        <span
          className={`inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-amber-800 ${className}`}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-600" />
          Developing
        </span>
      );
    case "confirmed":
      return (
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-stone-700 ${className}`}
        >
          <span className="text-emerald-700 font-bold">✓</span> Confirmed
        </span>
      );
    case "reported":
      return (
        <span
          className={`inline-flex items-center text-[11px] font-medium uppercase tracking-wider text-stone-600 ${className}`}
        >
          Reported
        </span>
      );
    case "rumor":
      return (
        <span
          className={`inline-flex items-center px-1.5 py-0.5 border border-dashed border-stone-400 text-[10px] font-medium uppercase tracking-wider text-stone-600 bg-stone-100/60 ${className}`}
        >
          Rumor / Unconfirmed
        </span>
      );
    case "updated":
      return (
        <span
          className={`inline-flex items-center text-[11px] font-medium uppercase tracking-wider text-stone-500 ${className}`}
        >
          Updated
        </span>
      );
    default:
      return null;
  }
};
