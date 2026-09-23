"use client";

import { useEffect, useRef } from "react";

const RIDGE_PATH =
  "M0,60 L60,30 L120,55 L180,15 L240,45 L300,10 L360,50 L420,25 L480,58 L540,20 L600,48 L660,12 L720,55 L780,30 L840,60 L900,35 L960,58 L1020,20 L1080,50 L1140,30 L1200,60 L1200,80 L0,80 Z";

const RIDGE_STROKE =
  "M0,60 L60,30 L120,55 L180,15 L240,45 L300,10 L360,50 L420,25 L480,58 L540,20 L600,48 L660,12 L720,55 L780,30 L840,60 L900,35 L960,58 L1020,20 L1080,50 L1140,30 L1200,60";

/**
 * Gezackte Grat-Linie unten im Einstiegsbereich — bildet zugleich die Kante
 * zum nächsten Abschnitt. Die Linie zeichnet sich gelb, ein Laufschuh-Icon
 * wandert per offset-path den Grat entlang. Aus bei prefers-reduced-motion.
 */
export function RidgeLine({ className }: { className?: string }) {
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
      className={`ridge-line relative ${className ?? ""}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="block h-16 w-full sm:h-20"
      >
        <path d={RIDGE_PATH} fill="var(--color-stein)" />
        <path
          className="ridge-path"
          d={RIDGE_STROKE}
          pathLength={1}
          style={{ offsetPath: `path('${RIDGE_STROKE}')` }}
        />
        <g
          className="ridge-runner"
          style={{ offsetPath: `path('${RIDGE_STROKE}')` }}
        >
          <circle r="10" fill="var(--color-nachtblau)" />
          <path
            d="M-4 3l2-3 2-1.5-1-2.5-2 1-1 2"
            stroke="var(--color-logogelb)"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}
