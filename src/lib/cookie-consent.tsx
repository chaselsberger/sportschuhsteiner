"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type ConsentCategory = "necessary" | "external";

export type Consent = Record<ConsentCategory, boolean>;

const STORAGE_KEY = "sss-cookie-consent";
const CONSENT_MAX_AGE_DAYS = 180;

type StoredConsent = {
  consent: Consent;
  id: string;
  timestamp: string;
};

const defaultConsent: Consent = {
  necessary: true,
  external: false,
};

function readStored(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    const ageDays =
      (Date.now() - new Date(parsed.timestamp).getTime()) / 86_400_000;
    if (ageDays > CONSENT_MAX_AGE_DAYS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStored(consent: Consent) {
  const existing = readStored();
  const record: StoredConsent = {
    consent,
    id: existing?.id ?? crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  // Nachweis-Log: anonyme ID + Zeitpunkt der Einwilligung (DSGVO-Nachweispflicht)
  return record;
}

type ConsentContextValue = {
  consent: Consent | null;
  hasDecided: boolean;
  bannerOpen: boolean;
  openBanner: () => void;
  closeBanner: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  save: (consent: Consent) => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [hasDecided, setHasDecided] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const stored = readStored();
    if (stored) {
      setConsent(stored.consent);
      setHasDecided(true);
    } else {
      setBannerOpen(true);
    }
  }, []);

  const save = useCallback((next: Consent) => {
    writeStored(next);
    setConsent(next);
    setHasDecided(true);
    setBannerOpen(false);
  }, []);

  const acceptAll = useCallback(
    () => save({ necessary: true, external: true }),
    [save],
  );
  const rejectAll = useCallback(
    () => save({ necessary: true, external: false }),
    [save],
  );

  return (
    <ConsentContext.Provider
      value={{
        consent,
        hasDecided,
        bannerOpen,
        openBanner: () => setBannerOpen(true),
        closeBanner: () => setBannerOpen(false),
        acceptAll,
        rejectAll,
        save,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent muss innerhalb von CookieConsentProvider verwendet werden");
  }
  return ctx;
}

export { defaultConsent };
