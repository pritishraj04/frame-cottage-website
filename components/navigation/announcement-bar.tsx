"use client";

import { useState } from "react";
import { X, Sparkles } from "lucide-react";

export function AnnouncementBar() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="relative z-50 bg-[#6B1C23] text-[#F4F1EA] text-xs py-2 px-4 border-b border-[#54161C] tracking-wide transition-all duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-center relative pr-8 sm:pr-0 overflow-hidden">
        <div className="flex items-center gap-2 text-center mx-auto truncate sm:overflow-visible min-w-0">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059] shrink-0 hidden sm:inline-block" aria-hidden="true" />
          <span className="font-medium tracking-normal text-[11px] sm:text-xs text-[#F4F1EA] truncate">
            Multi-Disciplinary Design, Fabrication & Framing Studio <span className="text-[#C5A059] mx-1.5">•</span> Delivering End-to-End Solutions for B2C, B2B & Public Sector <span className="text-[#C5A059] mx-1.5">•</span> Request Project RFP
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-[#F4F1EA]/75 hover:text-[#F4F1EA] transition-colors rounded focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
