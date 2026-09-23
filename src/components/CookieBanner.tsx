"use client";

import { useEffect, useRef, useState } from "react";
import {
  type Consent,
  defaultConsent,
  useCookieConsent,
} from "@/lib/cookie-consent";

const categoryInfo: {
  key: keyof Consent;
  title: string;
  description: string;
  locked?: boolean;
}[] = [
  {
    key: "necessary",
    title: "Notwendig",
    description:
      "Für den Betrieb der Seite erforderlich (z. B. gespeicherte Cookie-Auswahl). Kann nicht deaktiviert werden.",
    locked: true,
  },
  {
    key: "external",
    title: "Externe Medien",
    description:
      "Lädt eingebettete Inhalte wie die Google-Karte erst nach deiner Zustimmung.",
  },
  {
    key: "statistics",
    title: "Statistik",
    description:
      "Cookielose, anonyme Reichweitenmessung — hilft uns, die Seite zu verbessern.",
  },
];

export function CookieBanner() {
  const { bannerOpen, closeBanner, acceptAll, rejectAll, save, consent } =
    useCookieConsent();
  const [customizing, setCustomizing] = useState(false);
  const [draft, setDraft] = useState<Consent>(consent ?? defaultConsent);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bannerOpen) {
      setDraft(consent ?? defaultConsent);
      panelRef.current?.focus();
    }
  }, [bannerOpen, consent]);

  useEffect(() => {
    if (!bannerOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [bannerOpen]);

  if (!bannerOpen) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] flex justify-center p-3 sm:p-6"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Cookie-Einstellungen"
        className="w-full max-w-2xl rounded-[24px] border border-linie bg-stein p-5 shadow-2xl sm:p-6"
      >
        <h2 className="font-[var(--font-heading)] text-lg uppercase text-nachtblau">
          Cookie-Einstellungen
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          Wir verwenden nur, was nötig ist. Zustimmung brauchen wir lediglich
          für externe Inhalte wie die Google-Karte.
        </p>

        {customizing && (
          <fieldset className="mt-4 space-y-3">
            <legend className="sr-only">Kategorien auswählen</legend>
            {categoryInfo.map((cat) => (
              <label
                key={cat.key}
                className="flex items-start gap-3 rounded-[12px] border border-linie/70 p-3"
              >
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5"
                  checked={draft[cat.key]}
                  disabled={cat.locked}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, [cat.key]: e.target.checked }))
                  }
                />
                <span>
                  <span className="block font-semibold">{cat.title}</span>
                  <span className="block text-sm text-text-muted">
                    {cat.description}
                  </span>
                </span>
              </label>
            ))}
          </fieldset>
        )}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={rejectAll}
            className="min-h-[44px] flex-1 rounded-full border-2 border-nachtblau px-4 font-semibold text-nachtblau"
          >
            Alle ablehnen
          </button>
          <button
            onClick={acceptAll}
            className="min-h-[44px] flex-1 rounded-full bg-logogelb px-4 font-bold text-nachtblau"
          >
            Alle akzeptieren
          </button>
          {customizing ? (
            <button
              onClick={() => save(draft)}
              className="min-h-[44px] flex-1 rounded-full bg-nachtblau px-4 font-semibold text-stein"
            >
              Auswahl speichern
            </button>
          ) : (
            <button
              onClick={() => setCustomizing(true)}
              className="min-h-[44px] flex-1 rounded-full px-4 font-semibold text-linkblau underline"
            >
              Auswahl anpassen
            </button>
          )}
        </div>
        <div className="mt-3 flex justify-between text-xs text-text-muted">
          <a href="/datenschutz" className="underline">
            Datenschutzerklärung
          </a>
          {!customizing && (
            <button onClick={closeBanner} className="underline">
              Später entscheiden
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
