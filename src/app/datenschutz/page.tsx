import type { Metadata } from "next";
import { brand } from "@/brand.config";
import { DraftNotice } from "@/components/DraftNotice";

export const metadata: Metadata = { title: "Datenschutz" };

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-[var(--font-heading)] text-4xl uppercase text-nachtblau">
        Datenschutzerklärung
      </h1>

      <DraftNotice>
        Dieser Text beschreibt die tatsächliche technische Umsetzung der
        neuen Seite (keine Google-Analytics-Cookies mehr, selbst gehostete
        Schriften). Bitte vor dem Go-live von einer fachkundigen Stelle
        prüfen lassen.
      </DraftNotice>

      <div className="space-y-6 text-text">
        <p>
          Der Schutz deiner persönlichen Daten ist uns wichtig. Wir
          verarbeiten Daten ausschließlich auf Grundlage der gesetzlichen
          Bestimmungen (DSGVO, TKG 2003).
        </p>

        <section>
          <h2 className="font-semibold text-nachtblau">Hosting & Schriften</h2>
          <p className="mt-2">
            Diese Seite wird auf einem Server in Österreich/EU gehostet.
            Schriftarten werden selbst gehostet — es findet keine Verbindung
            zu Google Fonts oder anderen externen Font-CDNs statt.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-nachtblau">Cookies</h2>
          <p className="mt-2">
            Notwendige Cookies speichern ausschließlich deine
            Cookie-Einstellung selbst. Für Statistik verwenden wir ein
            cookieloses Analyse-Tool, das keine personenbezogenen Daten
            erhebt. Externe Inhalte (z. B. die Google-Karte) laden wir erst,
            nachdem du in der Kategorie „Externe Medien“ zugestimmt hast. Du
            kannst deine Auswahl jederzeit unter „Cookie-Einstellungen“ im
            Footer ändern.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-nachtblau">
            Kontaktformular & Terminanfrage
          </h2>
          <p className="mt-2">
            Terminanfragen senden wir per WhatsApp oder E-Mail — sie werden
            von uns nicht in einer Datenbank gespeichert, sondern persönlich
            bearbeitet und danach gelöscht.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-nachtblau">Google-Bewertungen & Öffnungszeiten</h2>
          <p className="mt-2">
            Wir zeigen Bewertungen und Öffnungszeiten über die Google Places
            API an. Der Abruf erfolgt serverseitig; dein Browser hat dabei
            keine direkte Verbindung zu Google.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-nachtblau">Shop & Zahlungsabwicklung</h2>
          <p className="mt-2">
            Bestellungen werden über Stripe abgewickelt. Zur
            Vertragserfüllung übermitteln wir dabei Name, Adresse und
            Zahlungsdaten an Stripe; eine Weitergabe an sonstige Dritte
            erfolgt nur an das beauftragte Versandunternehmen sowie zur
            Erfüllung steuerrechtlicher Pflichten an unsere Steuerberatung.
            Vertragsdaten bewahren wir gemäß gesetzlicher Aufbewahrungsfrist
            (7 Jahre) auf.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-nachtblau">Deine Rechte</h2>
          <p className="mt-2">
            Dir stehen die Rechte auf Auskunft, Berichtigung, Löschung,
            Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu.
            Bei Verstößen kannst du dich bei der österreichischen
            Datenschutzbehörde beschweren.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-nachtblau">Kontakt</h2>
          <p className="mt-2">
            {brand.legalName}
            <br />
            {brand.address.street}, {brand.address.zip} {brand.address.city}
            <br />
            {brand.contact.email}
          </p>
        </section>
      </div>
    </div>
  );
}
