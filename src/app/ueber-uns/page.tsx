import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Georg & Martina Steiner — Sport Schuh Steiner in Scheffau am Wilden Kaiser. Bootfitting seit 2006, spezialisiert auf Lauf- und Fußanalyse.",
};

export default function UeberUnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-[var(--font-heading)] text-4xl uppercase text-nachtblau">
        Mit Hand und Fuß — und Freude
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-text">
        Was wir anpacken, hat Hand und Fuß. Mit diesem Anspruch an uns selbst
        gehen wir jeden Tag in unser Geschäft und finden für unsere Kund:innen
        das passende Equipment. In all den Jahren haben wir uns auf die
        professionelle Lauf- und Fußanalyse spezialisiert, weil wir aus
        eigener Erfahrung wissen, wie wichtig der richtige Schuh ist.
      </p>
      <p className="mt-4 text-lg leading-relaxed text-text">
        Nach über zwölf Jahren Erfahrung im Bereich Bootfitting dürfen wir uns
        mit viel Sorgfalt euren Anliegen widmen — Georg & Martina Steiner.
      </p>
      <p className="mt-4 font-semibold text-nachtblau">
        Schau vorbei — wir freuen uns auf dich!
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/kontakt"
          className="min-h-[44px] rounded-full bg-logogelb px-6 py-2.5 font-bold text-nachtblau"
        >
          Kontakt & Anfahrt
        </Link>
        <Link
          href="/beratung-service"
          className="min-h-[44px] rounded-full border-2 border-nachtblau px-6 py-2.5 font-semibold text-nachtblau"
        >
          Beratung & Service
        </Link>
      </div>
    </div>
  );
}
