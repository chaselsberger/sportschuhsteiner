import type { Metadata } from "next";
import { brand } from "@/brand.config";
import { ExternalMediaGate } from "@/components/ExternalMediaGate";
import { Icon } from "@/components/Icon";
import { MapIllustration } from "@/components/MapIllustration";
import { OpeningHoursTable } from "@/components/OpeningHoursTable";
import { PageHero } from "@/components/PageHero";
import { shopClock } from "@/lib/opening-hours";

export const metadata: Metadata = {
  title: "Kontakt & Anfahrt",
  description:
    "Sport Schuh Steiner, Blaiken 72, 6351 Scheffau am Wilden Kaiser – zwischen Söll und Ellmau, gut erreichbar aus Kufstein und Wörgl. Telefon, E-Mail, Öffnungszeiten und Anfahrt.",
};

const tel = `tel:${brand.contact.phone.replace(/\s+/g, "")}`;

export default function KontaktPage() {
  const mapsQuery = encodeURIComponent(
    `${brand.name}, ${brand.address.street}, ${brand.address.zip} ${brand.address.city}`,
  );
  const today = shopClock().dayIndex;

  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Start" }, { label: "Kontakt & Anfahrt" }]}
        title="Kontakt & Anfahrt"
        lead="Mitten am Wilden Kaiser – zwischen Söll und Ellmau, gut erreichbar aus Kufstein und Wörgl."
      />

      <section className="page-x grid grid-cols-1 gap-8 py-10 lg:grid-cols-2 lg:py-16">
        <div className="relative flex min-h-[360px] lg:min-h-[520px]">
          <ExternalMediaGate
            label="Google-Karte"
            placeholder={<MapIllustration />}
          >
            <iframe
              title="Anfahrt zu Sport Schuh Steiner"
              className="absolute inset-0 h-full w-full rounded-3xl border border-karte-rand"
              loading="lazy"
              src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
            />
          </ExternalMediaGate>
        </div>

        <div className="flex flex-col gap-[22px] lg:px-2 lg:py-3">
          <p className="t-eyebrow m-0 text-linkblau">Besuchen Sie uns</p>
          <h2 className="t-h2 text-nachtblau">Mitten am Wilden Kaiser.</h2>
          <address className="flex flex-col gap-1 not-italic">
            <span className="text-[17px] font-extrabold text-nachtblau">
              {brand.legalName}
            </span>
            <span className="text-base text-text-muted">
              {brand.address.street} · {brand.address.zip} {brand.address.city}
            </span>
          </address>
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
              {brand.contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${brand.contact.email}`}
              className="flex h-[52px] items-center gap-2.5 rounded-full border-2 border-nachtblau px-[22px] font-extrabold text-nachtblau hover:bg-white"
            >
              <Icon name="mail" size={20} />
              E-Mail
            </a>
            <a
              href={brand.routeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[52px] items-center gap-2.5 rounded-full border-2 border-nachtblau px-[22px] font-extrabold text-nachtblau hover:bg-white"
            >
              <Icon name="pin" size={20} />
              Route planen
            </a>
          </div>
        </div>
      </section>

      <section id="termin" className="page-x scroll-mt-6 pb-16">
        <div className="flex flex-col gap-4 rounded-3xl bg-nachtblau p-7 text-white lg:flex-row lg:items-center lg:justify-between lg:p-10">
          <div className="flex flex-col gap-3">
            <h2 className="t-h3 text-white">Termin anfragen</h2>
            <p className="m-0 max-w-[620px] text-base leading-relaxed text-hellblau">
              Kein Buchungssystem, keine Warteschleife – schreiben Sie uns kurz
              per WhatsApp oder E-Mail, wir bestätigen persönlich.
            </p>
          </div>
          <a
            href="#termin"
            className="flex h-14 shrink-0 items-center gap-2.5 self-start rounded-full bg-logogelb px-7 font-extrabold text-nachtblau hover:brightness-95 lg:self-auto"
          >
            <Icon name="calendar" size={20} />
            Termin anfragen
          </a>
        </div>
      </section>
    </>
  );
}
