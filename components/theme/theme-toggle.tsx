"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  testId?: string;
  showLabel?: boolean;
}

const subscribe = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};

  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  window.addEventListener("storage", callback);

  return () => {
    observer.disconnect();
    window.removeEventListener("storage", callback);
  };
};

const getThemeSnapshot = (): "dark" | "light" => {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
};

const getServerThemeSnapshot = (): "dark" | "light" => "dark";

const getMountedSnapshot = (): boolean => true;
const getServerMountedSnapshot = (): boolean => false;

export function ThemeToggle({
  className,
  testId = "theme-toggle-btn",
  showLabel = false,
}: ThemeToggleProps) {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const mounted = useSyncExternalStore(
    () => () => {},
    getMountedSnapshot,
    getServerMountedSnapshot
  );

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    try {
      localStorage.setItem("frame-cottage-theme", nextTheme);
    } catch {
      // LocalStorage access might be restricted in sandboxed contexts
    }

    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(nextTheme);
    document.documentElement.style.colorScheme = nextTheme;
  };

  const isDark = theme === "dark";
  const ariaLabel = isDark
    ? "Switch to light theme"
    : "Switch to dark theme";
  const title = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      role="button"
      aria-label={ariaLabel}
      title={title}
      data-testid={testId}
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-2",
        "focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:ring-offset-2 focus:ring-offset-[var(--background)]",
        "text-[var(--color-ink-primary)] hover:text-[var(--color-accent-gold)] hover:bg-[var(--color-canvas-subtle)]",
        className
      )}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon (visible in Dark mode to prompt switching to Light mode) */}
        <Sun
          className={cn(
            "w-5 h-5 transition-transform duration-300 transform",
            !mounted || isDark
              ? "rotate-0 scale-100 text-[#C5A059]"
              : "rotate-90 scale-0 text-[#9E9E9E] absolute"
          )}
          aria-hidden="true"
        />
        {/* Moon Icon (visible in Light mode to prompt switching to Dark mode) */}
        <Moon
          className={cn(
            "w-5 h-5 transition-transform duration-300 transform",
            mounted && !isDark
              ? "rotate-0 scale-100 text-[#1A1A1A]"
              : "-rotate-90 scale-0 text-[#9E9E9E] absolute"
          )}
          aria-hidden="true"
        />
      </div>

      {showLabel && (
        <span className="text-xs font-semibold tracking-wide uppercase">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
}
