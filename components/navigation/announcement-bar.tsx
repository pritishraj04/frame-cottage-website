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
      className="relative z-50 bg-[#F5F5F7] text-[#1D1D1F] text-xs py-2 px-4 border-b border-[#D2D2D7] tracking-wide transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-center relative pr-8 sm:pr-0">
        <div className="flex items-center gap-2 text-center mx-auto truncate sm:overflow-visible">
          <Sparkles className="w-3.5 h-3.5 text-[#B88E56] shrink-0 hidden sm:inline-block" aria-hidden="true" />
          <span className="font-medium tracking-normal text-[11px] sm:text-xs text-[#1D1D1F]">
            Handcrafted in 5–7 Days <span className="text-[#86868B] mx-1.5">•</span> Free White-Glove Shipping on Orders $150+ <span className="text-[#86868B] mx-1.5">•</span> 100% Solid Hardwood Guarantee
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-[#86868B] hover:text-[#1D1D1F] transition-colors rounded focus:outline-none focus:ring-1 focus:ring-[#1D1D1F]"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
