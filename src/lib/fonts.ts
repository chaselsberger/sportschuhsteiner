import localFont from "next/font/local";

/**
 * Fließtext. Selbst gehostet (kein Google-Fonts-CDN, DSGVO).
 * Quelle: google/fonts (OFL), siehe scripts/fetch-fonts.sh
 */
export const bodyFont = localFont({
  src: "../fonts/BalooBhai2-Variable.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "400 800",
});

/**
 * Überschriften. Austauschbare Variable — laut Briefing zwischen
 * A) Big Shoulders Display, B) Fraunces, C) Bricolage Grotesque zu entscheiden.
 * Aktuell: A – Big Shoulders Display (versal gesetzt).
 */
export const headingFont = localFont({
  src: "../fonts/BigShouldersDisplay-Variable.woff2",
  variable: "--font-heading",
  display: "swap",
  weight: "400 900",
});
