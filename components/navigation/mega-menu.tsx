"use client";

import Link from "next/link";
import {
  Frame,
  Palette,
  Compass,
  Cpu,
  Award,
  Landmark,
  ArrowRight,
  Sparkles,
  FileText,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { SERVICE_VERTICALS } from "@/lib/constants/verticals";

interface MegaMenuProps {
  isOpen: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function MegaMenu({ isOpen, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  if (!isOpen) return null;

  const verticalCol1 = SERVICE_VERTICALS.slice(0, 2); // Retail & Bespoke
  const verticalCol2 = SERVICE_VERTICALS.slice(2, 4); // Spatial & Industrial CNC
  const verticalCol3 = SERVICE_VERTICALS.slice(4, 6); // Custom Gifting & Civic Projects

  return (
    <div
      role="region"
      aria-label="Service Verticals Mega Menu"
      data-testid="mega-menu-dropdown"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-0 w-full bg-[var(--color-canvas-surface)] border-b border-[var(--color-border-subtle)] shadow-2xl transition-all duration-300 ease-out z-40 animate-in fade-in slide-in-from-top-2 text-[var(--color-ink-primary)]"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Retail & Bespoke Framing */}
          <div className="space-y-6">
            {verticalCol1.map((vertical) => {
              const Icon = vertical.icon;
              return (
                <div key={vertical.id} className="space-y-3">
                  <div className="border-b border-[var(--color-border-subtle)] pb-2 flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-sm font-semibold text-[var(--color-ink-primary)] tracking-wide flex items-center gap-2">
                        <Icon className="w-4 h-4 text-accent" />
                        {vertical.name}
                      </h3>
                      <p className="text-[11px] text-[var(--color-ink-muted)] mt-0.5">
                        {vertical.audienceBadge}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {vertical.subCapabilities.map((sub) => (
                      <li key={sub.title}>
                        <Link
                          href={sub.href}
                          className="group flex flex-col p-2 -mx-2 rounded-lg hover:bg-[var(--color-canvas-subtle)] border border-transparent hover:border-accent transition-all"
                        >
                          <span className="text-xs font-medium text-[var(--color-ink-primary)] group-hover:text-accent flex items-center justify-between transition-colors">
                            {sub.title}
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                          </span>
                          <span className="text-[11px] text-[var(--color-ink-muted)] leading-tight mt-0.5">
                            {sub.description}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Column 2: Spatial Design & Industrial CNC */}
          <div className="space-y-6">
            {verticalCol2.map((vertical) => {
              const Icon = vertical.icon;
              return (
                <div key={vertical.id} className="space-y-3">
                  <div className="border-b border-[var(--color-border-subtle)] pb-2 flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-sm font-semibold text-[var(--color-ink-primary)] tracking-wide flex items-center gap-2">
                        <Icon className="w-4 h-4 text-accent" />
                        {vertical.name}
                      </h3>
                      <p className="text-[11px] text-[var(--color-ink-muted)] mt-0.5">
                        {vertical.audienceBadge}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {vertical.subCapabilities.map((sub) => (
                      <li key={sub.title}>
                        <Link
                          href={sub.href}
                          className="group flex flex-col p-2 -mx-2 rounded-lg hover:bg-[var(--color-canvas-subtle)] border border-transparent hover:border-accent transition-all"
                        >
                          <span className="text-xs font-medium text-[var(--color-ink-primary)] group-hover:text-accent flex items-center justify-between transition-colors">
                            {sub.title}
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                          </span>
                          <span className="text-[11px] text-[var(--color-ink-muted)] leading-tight mt-0.5">
                            {sub.description}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Column 3: Custom Gifting & Government / Civic Projects */}
          <div className="space-y-6">
            {verticalCol3.map((vertical) => {
              const Icon = vertical.icon;
              return (
                <div key={vertical.id} className="space-y-3">
                  <div className="border-b border-[var(--color-border-subtle)] pb-2 flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-sm font-semibold text-[var(--color-ink-primary)] tracking-wide flex items-center gap-2">
                        <Icon className="w-4 h-4 text-accent" />
                        {vertical.name}
                      </h3>
                      <p className="text-[11px] text-[var(--color-ink-muted)] mt-0.5">
                        {vertical.audienceBadge}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {vertical.subCapabilities.map((sub) => (
                      <li key={sub.title}>
                        <Link
                          href={sub.href}
                          className="group flex flex-col p-2 -mx-2 rounded-lg hover:bg-[var(--color-canvas-subtle)] border border-transparent hover:border-accent transition-all"
                        >
                          <span className="text-xs font-medium text-[var(--color-ink-primary)] group-hover:text-accent flex items-center justify-between transition-colors">
                            {sub.title}
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                          </span>
                          <span className="text-[11px] text-[var(--color-ink-muted)] leading-tight mt-0.5">
                            {sub.description}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Column 4: Studio RFQ / Tender CTA Box */}
          <div className="bg-[var(--color-canvas-subtle)] rounded-2xl p-6 border border-[var(--color-border-subtle)] flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-36 h-36 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-0.5 bg-accent text-[var(--color-accent-contrast)] rounded-full">
                  Enterprise & Civic
                </span>
                <span className="text-xs text-accent font-medium">GeM & Tender Ready</span>
              </div>

              <div>
                <h4 className="font-serif text-base font-semibold text-[var(--color-ink-primary)] mb-1.5 leading-snug">
                  Request a Project Quote (RFQ)
                </h4>
                <p className="text-xs text-[var(--color-ink-muted)] leading-relaxed">
                  Direct consultation with our engineering and spatial studio. We provide structural drawings, material mockups, and turnkey BOQ estimates for commercial & civic tenders.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-[var(--color-border-subtle)] text-xs text-[var(--color-ink-secondary)]">
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>B2B Commercial Architecture & Signage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Landmark className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Public Sector & Municipal Tenders</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>ISO 9001 & GeM Portal Registered</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/rfq"
                data-testid="mega-menu-rfq-btn"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] text-xs font-semibold uppercase tracking-wider shadow-sm transition-all duration-200"
              >
                <span>Request Project RFP / RFQ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
