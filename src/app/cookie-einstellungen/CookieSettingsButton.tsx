"use client";

import { useCookieConsent } from "@/lib/cookie-consent";

export function CookieSettingsButton() {
  const { openBanner } = useCookieConsent();
  return (
    <button
      onClick={openBanner}
      className="mt-6 min-h-[44px] rounded-full bg-logogelb px-6 py-2.5 font-bold text-nachtblau"
    >
      Einstellungen öffnen
    </button>
  );
}
