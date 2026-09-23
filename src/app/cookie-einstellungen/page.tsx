import type { Metadata } from "next";
import { CookieSettingsButton } from "./CookieSettingsButton";

export const metadata: Metadata = {
  title: "Cookie-Einstellungen",
  description: "Cookie-Einstellungen jederzeit ändern.",
};

export default function CookieEinstellungenPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <h1 className="font-[var(--font-heading)] text-4xl uppercase text-nachtblau">
        Cookie-Einstellungen
      </h1>
      <p className="mt-4 text-lg text-text-muted">
        Wir verwenden nur, was für den Betrieb der Seite nötig ist. Für
        externe Inhalte wie die Google-Karte fragen wir gesondert um
        Zustimmung. Du kannst deine Auswahl hier jederzeit ändern.
      </p>
      <CookieSettingsButton />
    </div>
  );
}
