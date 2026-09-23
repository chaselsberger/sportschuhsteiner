import type { Metadata } from "next";
import { brand } from "@/brand.config";
import { OpeningHoursList } from "@/components/OpeningHoursList";
import { Icon } from "@/components/Icon";
import { ExternalMediaGate } from "@/components/ExternalMediaGate";
import { KontaktTermin } from "./KontaktTermin";

export const metadata: Metadata = {
  title: "Kontakt & Anfahrt",
  description:
    "Sport Schuh Steiner, Blaiken 72, 6351 Scheffau am Wilden Kaiser. Telefon, E-Mail, Öffnungszeiten und Anfahrt.",
};

export default function KontaktPage() {
  const mapsQuery = encodeURIComponent(
    `${brand.address.street}, ${brand.address.zip} ${brand.address.city}`,
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="font-[var(--font-heading)] text-4xl uppercase text-nachtblau">
        Kontakt & Anfahrt
      </h1>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div className="space-y-6">
          <address className="not-italic">
            <p className="font-semibold text-nachtblau">{brand.legalName}</p>
            <p className="mt-1 text-text">
              {brand.address.street}
              <br />
              {brand.address.zip} {brand.address.city}
            </p>
          </address>

          <div className="flex items-center gap-3">
            <Icon name="whatsapp" className="h-5 w-5 text-nachtblau" />
            <a
              href={`tel:${brand.contact.phone.replace(/\s+/g, "")}`}
              className="font-medium hover:text-linkblau"
            >
              {brand.contact.phoneDisplay}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Icon name="mail" className="h-5 w-5 text-nachtblau" />
            <a
              href={`mailto:${brand.contact.email}`}
              className="font-medium hover:text-linkblau"
            >
              {brand.contact.email}
            </a>
          </div>

          <div>
            <h2 className="font-semibold text-nachtblau">Öffnungszeiten</h2>
            <div className="mt-2">
              <OpeningHoursList />
            </div>
          </div>
        </div>

        <ExternalMediaGate label="Google-Karte">
          <iframe
            title="Anfahrt zu Sport Schuh Steiner"
            className="h-full min-h-[280px] w-full rounded-[24px] border border-linie"
            loading="lazy"
            src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
          />
        </ExternalMediaGate>
      </div>

      <section id="termin" className="mt-16 scroll-mt-24">
        <h2 className="font-[var(--font-heading)] text-3xl uppercase text-nachtblau">
          Termin anfragen
        </h2>
        <p className="mt-2 max-w-2xl text-text-muted">
          Kein Buchungssystem, keine Warteschleife — schreib uns kurz, wir
          bestätigen persönlich.
        </p>
        <KontaktTermin />
      </section>
    </div>
  );
}
