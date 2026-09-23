import type { Metadata } from "next";
import { brand } from "@/brand.config";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Start" }, { label: "Impressum" }]}
        title="Impressum"
      />
      <div className="page-x py-10 lg:py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-karte-rand bg-white p-6 text-[15px] leading-relaxed lg:p-10">
          <div className="mt-8 space-y-6 text-text">
            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">
                Angaben gemäß § 5 ECG
              </h2>
              <p className="mt-2">
                {brand.name}
                <br />
                {brand.owner}
                <br />
                {brand.address.street}
                <br />
                {brand.address.zip} {brand.address.city}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">Kontakt</h2>
              <p className="mt-2">
                Telefon: {brand.contact.phone}
                <br />
                E-Mail: {brand.contact.email}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">
                Unternehmensgegenstand
              </h2>
              <p className="mt-2">
                Einzelhandel mit Sportschuhen und Sportartikeln, orthopädische
                Schuhversorgung und Einlagenanfertigung.
              </p>
              <p className="mt-2 text-sm text-text-muted">
                Mitglied bei der Wirtschaftskammer Österreich. Es gilt die
                Gewerbeordnung: www.ris.bka.gv.at
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">
                Für den Inhalt verantwortlich
              </h2>
              <p className="mt-2">{brand.owner}</p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">
                Bildnachweise
              </h2>
              <ul className="mt-2 space-y-1">
                <li>© Molibso</li>
                <li>© Georg Steiner</li>
                <li>© Manuel Bialucha</li>
                <li>© Tobias Knaubert</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">
                EU-Streitschlichtung
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                Verbraucher haben die Möglichkeit, Beschwerden an die
                Online-Streitbeilegungsplattform der EU zu richten:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  className="underline"
                >
                  ec.europa.eu/consumers/odr
                </a>
                . Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor
                einer Verbraucherschlichtungsstelle nicht verpflichtet und nicht
                bereit, sofern dies nicht gesetzlich vorgeschrieben ist.
              </p>
            </section>
          </div>

          <p className="mt-10 rounded-[16px] bg-stein-2/60 p-4 text-sm text-text-muted">
            Hinweis für die Freigabe: UID-Nummer, Gewerbeberechtigung und
            Firmenbuchdaten (falls zutreffend) bitte vom Kunden ergänzen lassen,
            bevor die Seite live geht.
          </p>
        </div>
      </div>
    </>
  );
}
