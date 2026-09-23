"use client";

import { useEffect, useRef } from "react";
import {
  LOGO_MOUNTAIN_MARKUP,
  LOGO_MOUNTAIN_VIEWBOX,
} from "@/lib/logo-mountain-markup";

/**
 * Original-Logo (Wortmarke + gelber Bergpfad). Der Bergpfad wird zuerst als
 * Linie gezeichnet (stroke-dashoffset, pathLength=1, ~2.4s) und blendet danach
 * die Füllung ein. Reagiert auf prefers-reduced-motion (siehe globals.css).
 */
export function LogoMountain({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const raf = requestAnimationFrame(() => el.classList.add("play"));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      className={`logo-mountain ${className ?? ""}`}
      role="img"
      aria-label="Sport Schuh Steiner"
      dangerouslySetInnerHTML={{
        __html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO_MOUNTAIN_VIEWBOX}">${LOGO_MOUNTAIN_MARKUP}</svg>`,
      }}
    />
  );
}
