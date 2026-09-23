import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Georg & Martina Steiner – Sport Schuh Steiner in Scheffau am Wilden Kaiser. Bootfitting seit 2006, spezialisiert auf Lauf- und Fußanalyse.",
};

const values: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "ski",
    title: "Bootfitting seit 2006",
    text: "Viele Jahre Erfahrung mit Ski- und Tourenschuhen – und der Anspruch, dass am Ende nichts drückt.",
  },
  {
    icon: "footscan",
    title: "Lauf- & Fußanalyse",
    text: "Darauf haben wir uns spezialisiert, weil wir aus eigener Erfahrung wissen, wie wichtig der richtige Schuh ist.",
  },
  {
    icon: "heart",
    title: "Zeit für Sie",
    text: "Eine gute Beratung dauert so lange, wie sie dauert. Mit Termin gehört die Zeit ganz Ihnen.",
  },
];

export default function UeberUnsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Start" }, { label: "Über uns" }]}
        title={
          <>
            Mit Hand und Fuß –{" "}
            <span className="text-logogelb">und Freude.</span>
          </>
        }
      />

      <section className="page-x flex flex-col gap-10 py-10 lg:flex-row lg:items-center lg:gap-16 lg:py-20">
        <div className="flex flex-col gap-5 lg:w-[46%] lg:shrink-0">
          <p className="t-eyebrow m-0 text-linkblau">
            Georg &amp; Martina Steiner
          </p>
          <h2 className="t-h2 text-nachtblau">
            Was wir anpacken, hat Hand und Fuß.
          </h2>
          <p className="m-0 text-lg leading-relaxed text-text">
            Mit diesem Anspruch an uns selbst gehen wir jeden Tag in unser
            Geschäft und finden für unsere Kundinnen und Kunden das passende
            Equipment. In all den Jahren haben wir uns auf die professionelle
            Lauf- und Fußanalyse spezialisiert, weil wir aus eigener Erfahrung
            wissen, wie wichtig der richtige Schuh ist.
          </p>
          <p className="m-0 text-lg leading-relaxed text-text">
            Nach vielen Jahren Erfahrung im Bootfitting widmen wir uns mit viel
            Sorgfalt Ihren Anliegen – in unserem Geschäft in Scheffau am Wilden
            Kaiser.
          </p>
          <p className="m-0 text-lg font-extrabold text-nachtblau">
            Schauen Sie vorbei – wir freuen uns auf Sie!
          </p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-4 lg:gap-6">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
            <Image
              src="/images/ueber-uns-georg.webp"
              alt="Skitag im Tiefschnee"
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-3xl lg:mt-16">
            <Image
              src="/images/ueber-uns-martina.webp"
              alt="Bergwanderung im Sommer"
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="page-x pb-12 lg:pb-20">
        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3 lg:gap-6">
          {values.map((v) => (
            <li
              key={v.title}
              className="flex flex-col gap-3 rounded-3xl border border-karte-rand bg-white p-7"
            >
              <span className="text-linkblau">
                <Icon name={v.icon} size={40} />
              </span>
              <h3 className="t-h4 text-nachtblau">{v.title}</h3>
              <p className="m-0 text-[15px] leading-relaxed text-text-muted">
                {v.text}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#termin"
            className="flex h-14 items-center gap-2.5 rounded-full bg-logogelb px-7 font-extrabold text-nachtblau hover:brightness-95"
          >
            <Icon name="calendar" size={20} />
            Beratungstermin buchen
          </a>
          <Link
            href="/kontakt"
            className="flex h-14 items-center gap-2.5 rounded-full border-2 border-nachtblau px-7 font-extrabold text-nachtblau hover:bg-white"
          >
            Kontakt &amp; Anfahrt
            <Icon name="arrow" size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
