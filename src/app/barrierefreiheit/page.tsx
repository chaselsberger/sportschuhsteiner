import type { Metadata } from "next";
import { brand } from "@/brand.config";

export const metadata: Metadata = {
  title: "Barrierefreiheit",
  description:
    "Erklärung zur Barrierefreiheit von sport-schuh-steiner.at.",
};

export default function BarrierefreiheitPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-[var(--font-heading)] text-4xl uppercase text-nachtblau">
        Barrierefreiheit
      </h1>

      <div className="mt-8 space-y-6 text-text">
        <p>
          Wir setzen bewusst auf sauberes, semantisches HTML statt auf ein
          nachträgliches Overlay-Widget — so funktionieren die
          Bedienungshilfen deines Geräts (VoiceOver, TalkBack,
          Browser-Zoom, Systemschriftgröße, Vorlesefunktion) zuverlässig mit
          dieser Seite zusammen.
        </p>

        <section>
          <h2 className="font-semibold text-nachtblau">Was wir umsetzen</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>Zoom bis 200 % ohne horizontales Scrollen</li>
            <li>Unterstützung für reduzierte Bewegung, erhöhten Kontrast und Systemfarben</li>
            <li>Sichtbarer Fokus, Skip-Link, klare Landmarks und Überschriftenstruktur</li>
            <li>Alt-Texte für Bilder, beschriftete Formularfelder</li>
            <li>Kontrastverhältnisse von mindestens 4.5:1</li>
            <li>Touch-Ziele von mindestens 44 × 44 Pixel</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-nachtblau">Testverfahren</h2>
          <p className="mt-2">
            Wir testen laufend mit VoiceOver (Mac/iPhone) und TalkBack
            (Android).
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-nachtblau">Rückmeldung</h2>
          <p className="mt-2">
            Wenn dir eine Barriere auffällt, sag uns gerne Bescheid:{" "}
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
  );
}
