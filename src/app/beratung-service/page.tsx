import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { PromiseSection } from "@/components/home/PromiseSection";

export const metadata: Metadata = {
  title: "Beratung & Service",
  description:
    "Fußanalyse mit Druckmessplatte, Einlagen nach Maß, Bootfitting seit 2006, Reparaturen und Schneeschuh-Verleih in Scheffau am Wilden Kaiser – für Kundinnen und Kunden aus Söll, Ellmau, Kufstein und Wörgl.",
};

type Service = {
  id: string;
  icon: IconName;
  title: string;
  intro: string;
  points?: { h: string; p: string }[];
  image?: { src: string; alt: string; position?: string };
  extra?: string;
};

const services: Service[] = [
  {
    id: "fussanalyse",
    icon: "footscan",
    title: "Fußanalyse",
    intro:
      "Unser Anspruch ist, den Schuh zu finden, der zu Ihrem Fuß passt wie ein Abziehbild. Dafür setzen wir mehrere Methoden ein – und nehmen uns die Zeit, die es braucht.",
    points: [
      {
        h: "Druckmessplatte für Geh-, Lauf- und Stehanalyse",
        p: "Zeigt Bewegungsmuster, Fußstellung, Gangbild und besondere Belastungen – und macht sichtbar, wie wichtig die richtige Sporteinlage ist.",
      },
      {
        h: "Klassische Fußvermessung mit Messlehre",
        p: "Wir vermessen den Fuß genau, erfassen Besonderheiten und beziehen sie in die Analyse ein.",
      },
      {
        h: "Fußsensoren zur Bewegungsanalyse",
        p: "Bis zu 22.000 Sensoren bilden ab, wie sich Fuß und Schuh in der gesamten Bewegung verhalten.",
      },
    ],
    image: {
      src: "/images/service-fussanalyse.jpg",
      alt: "Fußvermessung im Geschäft",
    },
  },
  {
    id: "einlagen",
    icon: "insole",
    title: "Einlagen nach Maß",
    intro:
      "Einlagen entlasten die Gelenke beim Sport und unterstützen die Muskulatur. Gerade geschlossene Skischuh-Schnallen erhöhen den Druck auf den Fuß – Krämpfe oder Fußsohlenbrennen können die Folge sein. Mit der richtigen Einlage beugen Sie dem vor. Sporteinlagen fertigen wir auch für Business- und Festschuhe.",
    image: {
      src: "/images/service-einlagen-anpassen.webp",
      alt: "Eine Einlage wird in der Werkstatt angepasst",
      position: "50% 40%",
    },
  },
  {
    id: "bootfitting",
    icon: "ski",
    title: "Bootfitting",
    intro:
      "Seit 2006 passen wir Ski- und Tourenschuhe an, statt sie nur zu verkaufen: Schale, Innenschuh und Einlage werden aufeinander abgestimmt – bis hin zur Schaumanpassung –, bis der Schuh wirklich passt.",
    image: {
      src: "/images/kategorie-ski.jpg",
      alt: "Skischuhe im Geschäft",
      position: "50% 30%",
    },
  },
  {
    id: "laufberatung",
    icon: "run",
    title: "Laufschuh-Beratung",
    intro:
      "Lauf- und Gangbildanalyse für die passende Dämpfung und Sprengung – damit der Laufschuh zu Ihrem Fuß und zu Ihrer Strecke passt, vom Trailrun am Hintersteiner See bis zum Stadtlauf.",
    image: {
      src: "/images/beratung-laufanalyse.jpg",
      alt: "Laufanalyse auf dem Laufband",
    },
  },
  {
    id: "reparaturen",
    icon: "repair",
    title: "Reparaturen",
    intro:
      "Hochwertiges Schuhwerk ist nicht billig – und wer den perfekten Schuh gefunden hat, möchte am liebsten mit ihm alt werden. Wir reparieren, was sich zu reparieren lohnt: Schnallen, Klettbänder und Sohlenplatten, auch an Skischuhen.",
    image: {
      src: "/images/service-werkstatt.webp",
      alt: "Reparatur eines Skischuhs in der Werkstatt",
    },
  },
  {
    id: "verleih",
    icon: "snowshoe",
    title: "Schneeschuh-Verleih",
    intro:
      "Schneeschuhe und Stöcke für Touren rund um den Wilden Kaiser – zum Ausleihen oder Kaufen. Mit der Wilder Kaiser GuestCard erhalten Sie 10 % Ermäßigung.",
    image: {
      src: "/images/hero-schneeschuh-wilder-kaiser.jpg",
      alt: "Schneeschuhwanderung vor dem Wilden Kaiser",
      position: "70% 50%",
    },
  },
];

export default function BeratungServicePage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Start" },
          { label: "Beratung & Service" },
        ]}
        title="Beratung & Service"
        lead="Der Verkauf kommt bei uns an zweiter Stelle. Zuerst steht die Analyse – damit Sie am Ende einen Schuh tragen, der wirklich passt."
      />

      {/* Sprungmarken */}
      <nav
        aria-label="Leistungen"
        className="page-x border-b border-karte-rand bg-white py-4"
      >
        <ul className="scroll-row -mx-4 m-0 flex list-none gap-2 overflow-x-auto p-0 px-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:px-0">
          {services.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                className="flex h-11 items-center gap-2 rounded-full border border-linie px-4 text-sm font-bold text-nachtblau hover:border-nachtblau"
              >
                <span className="text-linkblau">
                  <Icon name={s.icon} size={20} />
                </span>
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="page-x flex flex-col gap-6 py-10 lg:gap-8 lg:py-16">
        {services.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className={`flex scroll-mt-6 flex-col overflow-hidden rounded-3xl border border-karte-rand bg-white lg:flex-row ${
              i % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="flex flex-1 flex-col gap-4 p-6 lg:p-10">
              <span className="text-linkblau">
                <Icon name={s.icon} size={40} />
              </span>
              <h2 className="t-h3 text-nachtblau">{s.title}</h2>
              <p className="m-0 max-w-[640px] text-base leading-relaxed text-text">
                {s.intro}
              </p>
              {s.points && (
                <ul className="m-0 flex list-none flex-col gap-4 p-0">
                  {s.points.map((pt) => (
                    <li key={pt.h} className="flex gap-3">
                      <span className="mt-0.5 shrink-0 text-linkblau">
                        <Icon name="check" size={20} />
                      </span>
                      <span>
                        <b className="block text-nachtblau">{pt.h}</b>
                        <span className="text-[15px] leading-relaxed text-text-muted">
                          {pt.p}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <a
                href="#termin"
                className="mt-2 flex h-[50px] items-center gap-2.5 self-start rounded-full bg-nachtblau px-[22px] font-extrabold text-white hover:bg-tiefblau"
              >
                <Icon name="calendar" size={20} />
                Termin anfragen
              </a>
            </div>
            {s.image && (
              <div className="relative h-[240px] lg:h-auto lg:min-h-[340px] lg:w-[44%] lg:shrink-0">
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: s.image.position ?? "50% 50%" }}
                />
              </div>
            )}
          </section>
        ))}

        <section className="flex flex-col gap-3 rounded-3xl bg-stein-2 p-6 lg:p-10">
          <h2 className="t-h3 text-nachtblau">Physio- &amp; Podotherapie</h2>
          <p className="m-0 max-w-[760px] text-base leading-relaxed text-text-muted">
            Wir arbeiten mit Physio- und Podotherapeutinnen zusammen: Helene in
            Going und Silvia in Wörgl. Die Abwicklung läuft über Ihr
            Physiotherapie-Team; bei entsprechender Zusatzversicherung können
            die Kosten über die Krankenkasse verrechnet werden.
          </p>
        </section>
      </div>

      <PromiseSection />

      <div className="page-x flex flex-wrap gap-3 py-12 lg:py-16">
        <a
          href="#termin"
          className="flex h-14 items-center gap-2.5 rounded-full bg-logogelb px-7 font-extrabold text-nachtblau hover:brightness-95"
        >
          <Icon name="calendar" size={20} />
          Beratungstermin buchen
        </a>
        <Link
          href="/sortiment"
          className="flex h-14 items-center gap-2.5 rounded-full border-2 border-nachtblau px-7 font-extrabold text-nachtblau hover:bg-white"
        >
          Zum Sortiment
          <Icon name="arrow" size={20} />
        </Link>
      </div>
    </>
  );
}
