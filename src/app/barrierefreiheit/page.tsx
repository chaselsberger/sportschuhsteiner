import type { Metadata } from "next";
import { brand } from "@/brand.config";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Barrierefreiheit",
  description: "Erklärung zur Barrierefreiheit von sport-schuh-steiner.at.",
};

export default function BarrierefreiheitPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Start" }, { label: "Barrierefreiheit" }]}
        title="Barrierefreiheit"
      />
      <div className="page-x py-10 lg:py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-karte-rand bg-white p-6 text-[15px] leading-relaxed lg:p-10">
          <div className="mt-8 space-y-6 text-text">
            <p>
              Wir setzen bewusst auf sauberes, semantisches HTML statt auf ein
              nachträgliches Overlay-Widget — so funktionieren die
              Bedienungshilfen Ihres Geräts (VoiceOver, TalkBack, Browser-Zoom,
              Systemschriftgröße, Vorlesefunktion) zuverlässig mit dieser Seite
              zusammen.
            </p>

            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">
                Was wir umsetzen
              </h2>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li>Zoom bis 200 % ohne horizontales Scrollen</li>
                <li>
                  Unterstützung für reduzierte Bewegung, erhöhten Kontrast und
                  Systemfarben
                </li>
                <li>
                  Sichtbarer Fokus, Skip-Link, klare Landmarks und
                  Überschriftenstruktur
                </li>
                <li>Alt-Texte für Bilder, beschriftete Formularfelder</li>
                <li>Kontrastverhältnisse von mindestens 4.5:1</li>
                <li>Touch-Ziele von mindestens 44 × 44 Pixel</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">
                Testverfahren
              </h2>
              <p className="mt-2">
                Wir testen laufend mit VoiceOver (Mac/iPhone) und TalkBack
                (Android).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">
                Rückmeldung
              </h2>
              <p className="mt-2">
                Wenn Ihnen eine Barriere auffällt, sagen Sie uns gerne Bescheid:{" "}
                <a href={`mailto:${brand.contact.email}`} className="underline">
                  {brand.contact.email}
                </a>{" "}
                oder{" "}
                <a
                  href={`tel:${brand.contact.phone.replace(/\s+/g, "")}`}
                  className="underline"
                >
                  {brand.contact.phoneDisplay}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
