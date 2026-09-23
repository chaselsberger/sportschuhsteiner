import Image from "next/image";
import { brand } from "@/brand.config";
import { shopClock } from "@/lib/opening-hours";
import { Icon } from "../Icon";
import { MapIllustration } from "../MapIllustration";
import { OpeningHoursTable } from "../OpeningHoursTable";

const tel = `tel:${brand.contact.phone.replace(/\s+/g, "")}`;

/** Marken-Band (Desktop) */
export function BrandBand() {
  return (
    <section className="mx-16 mt-12 hidden items-center gap-12 rounded-3xl bg-nachtblau px-12 py-[34px] lg:flex">
      <p className="m-0 w-[220px] shrink-0 text-sm font-extrabold uppercase leading-relaxed tracking-[0.14em] text-eisblau">
        Marken, denen wir vertrauen
      </p>
      <div className="relative h-[200px] flex-1">
        <Image
          src="/images/marken-logos.jpg"
          alt="Markenlogos: adidas, asics, benger, cygnus, Dynafit, Finnlo, Garmin, Kettler, Kilimanjaro, Löffler, Mammut, Martini, Nike, Polar, Puma, Salewa, Salomon, Salta, Skechers, Under Armour"
          fill
          sizes="700px"
          className="object-contain mix-blend-screen"
        />
      </div>
    </section>
  );
}

/**
 * „Besuchen Sie uns“ – Desktop: Karte (Illustration, ohne Einbettung → keine
 * Zustimmung nötig) + Öffnungszeiten. Mobil: dunkler Öffnungszeiten-Block.
 */
export function VisitSection() {
  const today = shopClock().dayIndex;

  return (
    <>
      <section
        id="kontakt"
        className="hidden grid-cols-2 gap-8 px-16 py-24 lg:grid"
      >
        <div className="relative min-h-[460px] overflow-hidden rounded-3xl bg-[#E3EEF1]">
          <MapIllustration />
          <div className="absolute left-7 top-7 flex flex-col gap-1 rounded-2xl bg-white px-[22px] py-[18px]">
            <span className="text-[17px] font-extrabold text-nachtblau">
              {brand.name}
            </span>
            <span className="text-[15px] text-text-muted">
              {brand.address.street} · {brand.address.zip} {brand.address.city}
            </span>
          </div>
          <a
            href={brand.routeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-7 left-7 flex h-[52px] items-center gap-2.5 rounded-full bg-nachtblau px-6 font-extrabold text-white hover:bg-tiefblau"
          >
            <Icon name="pin" size={20} />
            Route planen
          </a>
        </div>

        <div className="flex flex-col gap-[22px] px-2 py-3">
          <p className="t-eyebrow m-0 text-linkblau">Besuchen Sie uns</p>
          <h2 className="t-h2 text-nachtblau">Mitten am Wilden Kaiser.</h2>
          <OpeningHoursTable initialToday={today} tone="light" />
          <p className="m-0 flex items-center gap-2 text-[13px] text-grau">
            <Icon name="clock" size={16} />
            Termine gerne auch außerhalb der Öffnungszeiten nach Vereinbarung.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={tel}
              className="flex h-[52px] items-center gap-2.5 rounded-full border-2 border-nachtblau px-[22px] font-extrabold text-nachtblau hover:bg-white"
            >
              <Icon name="phone" size={20} />
              Anrufen
            </a>
            <a
              href={`mailto:${brand.contact.email}`}
              className="flex h-[52px] items-center gap-2.5 rounded-full border-2 border-nachtblau px-[22px] font-extrabold text-nachtblau hover:bg-white"
            >
              <Icon name="mail" size={20} />
              E-Mail
            </a>
            <a
              href="#termin"
              className="flex h-[52px] items-center gap-2.5 rounded-full bg-logogelb px-[22px] font-extrabold text-nachtblau hover:brightness-95"
            >
              <Icon name="calendar" size={20} />
              Termin
            </a>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3.5 bg-nachtblau px-4 py-7 text-white sm:px-8 lg:hidden">
        <h2 className="t-h2 text-white">Öffnungszeiten</h2>
        <OpeningHoursTable initialToday={today} tone="dark" />
        <p className="m-0 text-xs text-eisblau">
          Termine auch nach Vereinbarung
        </p>
        <address className="text-[15px] not-italic leading-relaxed">
          {brand.address.street}
          <br />
          {brand.address.zip} {brand.address.city}
        </address>
      </section>
    </>
  );
}
