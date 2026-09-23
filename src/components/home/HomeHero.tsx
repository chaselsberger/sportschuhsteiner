import Image from "next/image";
import Link from "next/link";
import { Icon } from "../Icon";
import { MountainMark } from "../MountainMark";
import { HeroRidge, HeroRidgeMobile } from "../RidgeLine";

/**
 * Einstieg. Desktop: Text links auf Nachtblau, Foto rechts, Grat-Linie mit
 * wanderndem Schuh als Kante zum nächsten Abschnitt. Mobil: Foto oben mit
 * Grat, Text darunter.
 */
export function HomeHero() {
  return (
    <section className="relative flex flex-col bg-nachtblau text-white lg:min-h-[780px] lg:flex-row">
      <div className="relative z-[2] flex flex-col gap-4 px-4 pb-[34px] pt-3 sm:px-8 lg:w-[54%] lg:shrink-0 lg:gap-[26px] lg:pb-[190px] lg:pl-16 lg:pr-10 lg:pt-[72px] xl:w-[640px] xl:pr-4">
        <MountainMark width={190} className="h-auto w-[110px] lg:w-[190px]" />
        <p className="t-eyebrow m-0 hidden text-eisblau lg:block">
          Sportschuh-Fachgeschäft · Bootfitting seit 2006
        </p>
        <h1 className="t-h1 text-white">
          Der perfekte Schuh beginnt beim{" "}
          <span className="text-logogelb">Fuß.</span>
        </h1>
        <p className="m-0 text-base leading-relaxed text-[#D6E6EC] lg:hidden">
          Fußanalyse, Einlagen nach Maß und Beratung, die sich Zeit nimmt – in
          Scheffau am Wilden Kaiser.
        </p>
        <p className="m-0 hidden max-w-[500px] text-[19px] leading-relaxed text-[#D6E6EC] lg:block">
          Fußanalyse auf der Druckmessplatte, Einlagen nach Maß und Beratung,
          die sich Zeit nimmt. Dafür fahren unsere Kundinnen und Kunden viele
          Kilometer bis nach Scheffau.
        </p>
        <div className="flex flex-col gap-3.5 lg:mt-1.5 lg:flex-row lg:flex-wrap">
          <a
            href="#termin"
            className="flex h-[54px] items-center justify-center gap-2.5 rounded-full bg-logogelb px-7 text-base font-extrabold text-nachtblau hover:brightness-95 lg:h-14"
          >
            <Icon name="calendar" size={20} />
            Beratungstermin buchen
          </a>
          <Link
            href="/shop"
            className="hidden h-14 items-center gap-2.5 rounded-full border-2 border-logoblau px-[26px] text-base font-extrabold text-white hover:bg-white/5 lg:flex"
          >
            Einzelstücke im Shop
            <Icon name="arrow" size={20} />
          </Link>
        </div>
      </div>

      <div className="relative order-first h-[300px] overflow-hidden sm:h-[420px] lg:order-none lg:h-auto lg:flex-1">
        <Image
          src="/images/hero-schneeschuh-wilder-kaiser.jpg"
          alt="Schneeschuhwanderung vor dem Wilden Kaiser"
          fill
          preload
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="object-cover object-[60%_40%] lg:object-[50%_40%]"
        />
        <div className="absolute right-10 top-10 hidden items-center gap-3.5 rounded-[18px] bg-[rgba(244,241,234,0.94)] px-5 py-4 text-nachtblau lg:flex">
          <span className="text-linkblau">
            <Icon name="snowshoe" size={36} />
          </span>
          <span className="flex flex-col gap-0.5">
            <span className="text-[15px] font-extrabold">
              Schneeschuh-Verleih
            </span>
            <span className="text-[13px] text-text-muted">
              10 % mit Wilder Kaiser GuestCard
            </span>
          </span>
        </div>
        <div className="lg:hidden">
          <HeroRidgeMobile />
        </div>
      </div>

      <div className="hidden lg:block">
        <HeroRidge />
      </div>
    </section>
  );
}
