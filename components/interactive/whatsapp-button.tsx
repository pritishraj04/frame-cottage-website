"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Clock,
  Shield,
  Layers,
} from "lucide-react";
import { WHATSAPP_PHONE, createWhatsAppChatUrl } from "@/lib/constants/whatsapp";

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close popover when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const defaultWhatsAppUrl = createWhatsAppChatUrl();

  const handleLaunchConcierge = () => {
    setIsOpen(false);
    const conciergeEl = document.getElementById("decision-concierge");
    if (conciergeEl) {
      conciergeEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#decision-concierge";
    }
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 select-none">
      {/* Popover Studio Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popoverRef}
            data-testid="whatsapp-popover"
            role="dialog"
            aria-modal="true"
            aria-label="Studio WhatsApp Consultation"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute bottom-16 sm:bottom-20 right-0 w-[320px] sm:w-[370px] max-w-[calc(100vw-2.5rem)] rounded-2xl border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-card)] text-[var(--foreground)] shadow-[0_16px_40px_rgba(0,0,0,0.08),0_4px_16px_rgba(197,160,89,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(197,160,89,0.15)] p-5 sm:p-6 backdrop-blur-xl z-50 flex flex-col gap-4"
          >
            {/* Header: Consultant Status & Close */}
            <div className="flex items-center justify-between border-b border-dashed border-[var(--color-border-subtle)] pb-3.5">
              <div className="flex items-center gap-3">
                {/* Active Presence Beacon */}
                <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-serif font-bold text-[var(--foreground)]">
                      Studio Consultant Online
                    </h4>
                  </div>
                  <p className="text-[11px] font-mono text-[var(--color-ink-muted)] flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-[var(--color-accent-gold)]" />
                    Average reply time: &lt; 15 min
                  </p>
                </div>
              </div>

              <button
                type="button"
                data-testid="whatsapp-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close consultation popover"
                className="w-7 h-7 rounded-lg border border-dashed border-[var(--color-border-subtle)] text-[var(--color-ink-muted)] hover:text-[var(--foreground)] hover:border-[var(--color-accent-gold)] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Consultant Bio & Intro */}
            <div className="text-xs text-[var(--color-ink-muted)] leading-relaxed space-y-1">
              <p className="font-sans">
                Welcome to <span className="font-serif font-semibold text-[var(--foreground)]">Frames Cottage Atelier</span>. Connect directly with our master framers and spatial fabrication specialists for instant material advice, RFQ scoping, or bespoke commissions.
              </p>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <a
              href={defaultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="whatsapp-chat-cta"
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-[#0A2612] font-semibold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2.5 shadow-md transition-all group"
            >
              {/* WhatsApp Glyph */}
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-current transition-transform group-hover:scale-110"
                aria-hidden="true"
              >
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.04 7.42C8.84 7.42 8.52 7.5 8.25 7.79C7.97 8.09 7.21 8.81 7.21 10.27C7.21 11.73 8.27 13.13 8.41 13.33C8.56 13.53 10.5 16.69 13.56 17.89C16.1 18.88 16.62 18.69 17.17 18.64C17.72 18.59 18.94 17.91 19.19 17.21C19.44 16.51 19.44 15.91 19.37 15.79C19.3 15.66 19.1 15.59 18.8 15.44C18.5 15.29 17.03 14.57 16.76 14.47C16.48 14.37 16.29 14.32 16.09 14.62C15.89 14.91 15.33 15.59 15.16 15.79C14.99 15.98 14.81 16.01 14.52 15.86C14.22 15.71 13.27 15.4 12.14 14.39C11.26 13.6 10.66 12.63 10.5 12.33C10.33 12.04 10.48 11.88 10.63 11.73C10.77 11.59 10.94 11.37 11.09 11.19C11.24 11.02 11.29 10.89 11.39 10.69C11.49 10.5 11.44 10.33 11.37 10.18C11.29 10.04 10.69 8.58 10.44 7.98C10.2 7.4 9.96 7.48 9.77 7.47C9.6 7.47 9.4 7.42 9.04 7.42Z" />
              </svg>
              <span>Open WhatsApp Chat</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* Quick Consultation Shortcuts */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--color-accent-gold)] font-bold">
                Quick Shortcuts
              </span>

              <div className="flex flex-col gap-1.5">
                <a
                  href="https://wa.me/919876543210?text=Hello%20Frames%20Cottage%20Studio%2C%20I%20would%20like%20to%20inquire%20about%20Bespoke%20Framing."
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="whatsapp-shortcut-bespoke"
                  className="px-3.5 py-2.5 rounded-lg border border-dashed border-[var(--color-border-subtle)] hover:border-[var(--color-accent-gold)]/80 hover:bg-[var(--color-canvas-subtle)] text-[11px] font-sans text-[var(--foreground)] flex items-center justify-between transition-all group"
                >
                  <span className="group-hover:text-[var(--color-accent-gold)] transition-colors">
                    Quick Inquire: Bespoke Framing
                  </span>
                  <ArrowRight className="w-3 h-3 text-[var(--color-ink-muted)] group-hover:text-[var(--color-accent-gold)] transition-colors" />
                </a>

                <a
                  href="https://wa.me/919876543210?text=Hello%20Frames%20Cottage%20Studio%2C%20I%20would%20like%20to%20inquire%20about%20Spatial%20Signage%20%26%20CNC."
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="whatsapp-shortcut-signage"
                  className="px-3.5 py-2.5 rounded-lg border border-dashed border-[var(--color-border-subtle)] hover:border-[var(--color-accent-gold)]/80 hover:bg-[var(--color-canvas-subtle)] text-[11px] font-sans text-[var(--foreground)] flex items-center justify-between transition-all group"
                >
                  <span className="group-hover:text-[var(--color-accent-gold)] transition-colors">
                    Quick Inquire: Spatial Signage &amp; CNC
                  </span>
                  <ArrowRight className="w-3 h-3 text-[var(--color-ink-muted)] group-hover:text-[var(--color-accent-gold)] transition-colors" />
                </a>

                <button
                  type="button"
                  onClick={handleLaunchConcierge}
                  data-testid="whatsapp-launch-concierge"
                  className="px-3.5 py-2.5 rounded-lg border border-dashed border-[var(--color-accent-gold)]/70 bg-[var(--color-accent-gold)]/10 hover:bg-[var(--color-accent-gold)]/20 text-[11px] font-sans font-medium text-[var(--color-accent-gold)] flex items-center justify-between transition-all cursor-pointer group"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Launch Decision Concierge
                  </span>
                  <ArrowRight className="w-3 h-3 text-[var(--color-accent-gold)] transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Footer Trust Stamp */}
            <div className="mt-1 pt-3 pb-0.5 flex items-center justify-between text-[10px] font-mono text-[var(--color-ink-muted)] border-t border-dashed border-[var(--color-border-subtle)]">
              <span>Direct Studio Channel</span>
              <span>ISO 9001:2015 Studio</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <div className="relative">
        {/* Soft Ambient Green Pulse Beacon */}
        <span
          className="absolute -inset-1.5 rounded-full bg-[#25D366]/30 animate-ping opacity-60 pointer-events-none"
          aria-hidden="true"
        />
        {/* Secondary Gold Pulse Ring */}
        <span
          className="absolute -inset-1 rounded-full bg-[var(--color-accent-gold)]/25 animate-pulse pointer-events-none"
          aria-hidden="true"
        />

        <button
          ref={buttonRef}
          type="button"
          data-testid="whatsapp-floating-btn"
          aria-label="Chat with Studio Consultant on WhatsApp"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[var(--color-canvas-card)] border-2 border-[var(--color-accent-gold)] shadow-[0_8px_24px_rgba(179,143,72,0.22),0_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_28px_rgba(0,0,0,0.55),0_0_15px_rgba(197,160,89,0.35)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
        >
          {/* Active online green dot */}
          <span
            className="absolute top-1 right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#25D366] rounded-full border-2 border-[var(--color-canvas-card)] shadow-xs flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
          </span>

          {/* Icon Switcher between WhatsApp and X */}
          {isOpen ? (
            <X className="w-6 h-6 text-[var(--color-accent-gold)] transition-transform duration-200" />
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="w-6.5 h-6.5 sm:w-7 sm:h-7 fill-[#25D366] translate-x-[0.5px] -translate-y-[0.5px] transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
              aria-hidden="true"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.04 7.42C8.84 7.42 8.52 7.5 8.25 7.79C7.97 8.09 7.21 8.81 7.21 10.27C7.21 11.73 8.27 13.13 8.41 13.33C8.56 13.53 10.5 16.69 13.56 17.89C16.1 18.88 16.62 18.69 17.17 18.64C17.72 18.59 18.94 17.91 19.19 17.21C19.44 16.51 19.44 15.91 19.37 15.79C19.3 15.66 19.1 15.59 18.8 15.44C18.5 15.29 17.03 14.57 16.76 14.47C16.48 14.37 16.29 14.32 16.09 14.62C15.89 14.91 15.33 15.59 15.16 15.79C14.99 15.98 14.81 16.01 14.52 15.86C14.22 15.71 13.27 15.4 12.14 14.39C11.26 13.6 10.66 12.63 10.5 12.33C10.33 12.04 10.48 11.88 10.63 11.73C10.77 11.59 10.94 11.37 11.09 11.19C11.24 11.02 11.29 10.89 11.39 10.69C11.49 10.5 11.44 10.33 11.37 10.18C11.29 10.04 10.69 8.58 10.44 7.98C10.2 7.4 9.96 7.48 9.77 7.47C9.6 7.47 9.4 7.42 9.04 7.42Z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
