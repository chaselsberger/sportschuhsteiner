"use client";

import { useState } from "react";
import { useCookieConsent } from "@/lib/cookie-consent";

/**
 * Platzhalter für externe Inhalte (z. B. Google-Karte), bis Zustimmung zur
 * Kategorie "Externe Medien" vorliegt. Ein Klick auf "Laden" gibt nur diesen
 * einen Inhalt frei, ohne die generelle Einstellung zu ändern.
 */
export function ExternalMediaGate({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const { consent } = useCookieConsent();
  const [forced, setForced] = useState(false);

  if (consent?.external || forced) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 rounded-[24px] border border-linie bg-stein-2 p-6 text-center">
      <p className="text-sm text-text-muted">
        Für diesen Inhalt ({label}) ist deine Zustimmung zur Kategorie
        „Externe Medien“ erforderlich.
      </p>
      <button
        onClick={() => setForced(true)}
        className="min-h-[44px] rounded-full bg-nachtblau px-5 font-semibold text-stein"
      >
        {label} laden
      </button>
    </div>
  );
}
