"use client";

import { useState } from "react";
import { useCookieConsent } from "@/lib/cookie-consent";

/**
 * Platzhalter für externe Inhalte (z. B. Google-Karte), bis Zustimmung zur
 * Kategorie „Externe Medien“ vorliegt. Ein Klick auf „Laden“ gibt nur diesen
 * einen Inhalt frei, ohne die generelle Einstellung zu ändern.
 */
export function ExternalMediaGate({
  label,
  placeholder,
  children,
}: {
  label: string;
  /** Hintergrund des Platzhalters, z. B. die gezeichnete Karte */
  placeholder?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { consent } = useCookieConsent();
  const [forced, setForced] = useState(false);

  if (consent?.external || forced) {
    return <>{children}</>;
  }

  return (
    <div className="relative flex min-h-[240px] w-full flex-1 flex-col items-center justify-end overflow-hidden rounded-3xl border border-karte-rand bg-stein-2 p-6 text-center">
      {placeholder}
      <div className="relative flex max-w-[360px] flex-col items-center gap-3 rounded-2xl bg-white/95 p-5">
        <p className="m-0 text-sm text-text-muted">
          Für diesen Inhalt ({label}) braucht es Ihre Zustimmung zur Kategorie
          „Externe Medien“. Dabei werden Daten an Google übertragen.
        </p>
        <button
          type="button"
          onClick={() => setForced(true)}
          className="flex h-12 items-center rounded-full bg-nachtblau px-6 font-extrabold text-white hover:bg-tiefblau"
        >
          {label} laden
        </button>
      </div>
    </div>
  );
}
