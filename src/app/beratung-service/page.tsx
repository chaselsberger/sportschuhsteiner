import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Beratung & Service",
  description:
    "Fußanalyse mit Druckmessplatte, Einlagen nach Maß, Bootfitting seit 2006 und Reparaturen in Scheffau am Wilden Kaiser.",
};

const sections = [
  {
    id: "fussanalyse",
    icon: "insole" as const,
    title: "Fußanalyse",
    intro:
      "Als Schuhprofis ist es unser Anspruch, den perfekten Schuh für dich zu finden — einen, der wie ein Abziehbild zu deinem Fuß passt. Dafür kommen mehrere Methoden zum Einsatz.",
    points: [
      {
        h: "Druckmessplatte für Geh-, Lauf- und Stehanalyse",
        p: "Sie gibt Aufschluss über Bewegungsmuster, Fußstellung, Gangbild und spezielle Belastungen — und macht sichtbar, wie wichtig die richtige Sporteinlage ist.",
      },
      {
        h: "Klassische Fußvermessung mit Messlehre",
        p: "Der Fuß wird genau vermessen, Besonderheiten werden erfasst und fließen in die Analyse mit ein.",
      },
      {
        h: "Fußsensoren zur Bewegungsanalyse",
        p: "Bis zu 22.000 Sensoren bilden ab, wie sich Fuß und Schuh in der gesamten Bewegungsphase verhalten.",
      },
    ],
  },
  {
    id: "einlagen",
    icon: "insole" as const,
    title: "Einlagen nach Maß",
    intro:
      "Einlagen entlasten die Gelenke bei sportlichen Aktivitäten und unterstützen die Muskulatur. Gerade geschlossene Skischuh-Schnallen erhöhen den Druck auf den Fuß — die Folge können Krämpfe oder Fußsohlenbrennen sein. Mit den richtigen Einlagen beugst du dem vor.",
    points: [],
  },
  {
    id: "bootfitting",
    icon: "ski" as const,
    title: "Bootfitting",
    intro:
      "Seit 2006 passen wir Skischuhe an, statt sie nur zu verkaufen: Schale, Innenschuh und Einlage werden aufeinander abgestimmt, bis der Schuh wirklich passt.",
    points: [],
  },
  {
    id: "reparaturen",
    icon: "work" as const,
    title: "Reparaturen",
    intro:
      "Hochwertiges Schuhwerk ist nicht billig — und wenn man den perfekten Schuh gefunden hat, möchte man am liebsten mit ihm alt werden. Wir reparieren kaputte Schnallen, Klettbänder und Sohlenplatten, auch an Skischuhen.",
    points: [],
  },
  {
    id: "laufberatung",
    icon: "run" as const,
    title: "Laufschuh-Beratung",
    intro:
      "Lauf- und Gangbildanalyse für die passende Dämpfung und Sprengung — damit der Laufschuh zum Fuß und zur Strecke passt.",
    points: [],
  },
];

export default function BeratungServicePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="font-[var(--font-heading)] text-4xl uppercase text-nachtblau">
        Beratung & Service
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-text-muted">
        Der Verkauf kommt bei uns an zweiter Stelle. Zuerst steht die Analyse —
        damit du am Ende einen Schuh trägst, der wirklich passt.
      </p>

      <div className="mt-12 space-y-14">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-stein-2 text-nachtblau">
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <h2 className="font-[var(--font-heading)] text-2xl uppercase text-nachtblau">
                {s.title}
              </h2>
            </div>
            <p className="mt-3 max-w-2xl text-text">{s.intro}</p>
            {s.points.length > 0 && (
              <dl className="mt-5 space-y-4">
                {s.points.map((pt) => (
                  <div key={pt.h}>
                    <dt className="font-semibold text-nachtblau">{pt.h}</dt>
                    <dd className="mt-1 max-w-2xl text-text-muted">{pt.p}</dd>
                  </div>
                ))}
              </dl>
            )}
          </section>
        ))}
      </div>

      <div className="mt-14 rounded-[24px] bg-nachtblau p-6 text-stein sm:p-8">
        <h2 className="font-[var(--font-heading)] text-2xl uppercase">
          Physio- & Podotherapie
        </h2>
        <p className="mt-2 max-w-2xl text-stein/80">
          Wir arbeiten mit Physio- und Podotherapeutinnen zusammen: Helene in
          Going und Silvia in Wörgl. Die Abwicklung läuft über euer
          Physiotherapie-Team, die Kosten können bei entsprechender
          Zusatzversicherung über die Krankenkasse verrechnet werden.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/kontakt#termin"
          className="min-h-[44px] rounded-full bg-logogelb px-6 py-2.5 font-bold text-nachtblau"
        >
          Termin anfragen
        </Link>
        <Link
          href="/sortiment"
          className="min-h-[44px] rounded-full border-2 border-nachtblau px-6 py-2.5 font-semibold text-nachtblau"
        >
          Zum Sortiment
        </Link>
      </div>
    </div>
  );
}
