import type { Metadata } from "next";
import { CookieSettingsButton } from "./CookieSettingsButton";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Cookie-Einstellungen",
  description: "Cookie-Einstellungen jederzeit ändern.",
};

export default function CookieEinstellungenPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Start" },
          { label: "Cookie-Einstellungen" },
        ]}
        title="Cookie-Einstellungen"
      />
      <div className="page-x py-10 lg:py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-karte-rand bg-white p-6 text-[15px] leading-relaxed lg:p-10">
          <p className="mt-4 text-lg text-text-muted">
            Wir verwenden nur, was für den Betrieb der Seite nötig ist. Für
            externe Inhalte wie die Google-Karte fragen wir gesondert um
            Zustimmung. Sie können Ihre Auswahl hier jederzeit ändern.
          </p>
          <CookieSettingsButton />
        </div>
      </div>
    </>
  );
}
