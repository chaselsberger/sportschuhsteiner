import type { Metadata } from "next";
import { brand } from "@/brand.config";
import { DraftNotice } from "@/components/DraftNotice";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "AGB" };

export default function AgbPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Start" },
          { label: "Allgemeine Geschäftsbedingungen" },
        ]}
        title="Allgemeine Geschäftsbedingungen"
      />
      <div className="page-x py-10 lg:py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-karte-rand bg-white p-6 text-[15px] leading-relaxed lg:p-10">
          <DraftNotice>
            Gerüst-Text für den geplanten Online-Shop (Einzelstücke,
            Reservierung, Gutscheine). Vor Shop-Start unbedingt anwaltlich
            prüfen und um Versandkosten sowie endgültige Zahlungsarten ergänzen
            lassen.
          </DraftNotice>

          <div className="space-y-6 text-text">
            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">
                1. Geltungsbereich
              </h2>
              <p className="mt-2">
                Diese AGB gelten für alle Verträge zwischen {brand.legalName}{" "}
                und Kund:innen über den Online-Shop auf sport-schuh-steiner.at.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">
                2. Vertragsschluss & Einzelstücke
              </h2>
              <p className="mt-2">
                Jedes Produkt im Shop ist ein Einzelstück in genau einer Größe.
                Mit Abschluss des Bestellvorgangs und Zahlung über Stripe kommt
                der Kaufvertrag zustande. Ist ein Paar zwischenzeitlich
                reserviert oder verkauft, wird die Bestellung storniert und der
                Betrag erstattet.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">
                3. Reservierung
              </h2>
              <p className="mt-2">
                Eine Reservierung zur Anprobe im Geschäft ist unverbindlich und
                gilt für 48 Stunden.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">
                4. Preise & Versand
              </h2>
              <p className="mt-2">
                Alle Preise verstehen sich in Euro inklusive gesetzlicher
                Umsatzsteuer. Lieferung erfolgt kostenlos zur Abholung in
                Scheffau oder per Versand nach Österreich und Deutschland
                (Kosten werden im Checkout angezeigt).
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">
                5. Gutscheine
              </h2>
              <p className="mt-2">
                Gutscheine sind ab Ausstellung grundsätzlich lange gültig; eine
                Verkürzung der Gültigkeit ist nur eingeschränkt zulässig.
                Details siehe Gutschein-Bedingungen (in Abstimmung mit der
                Steuerberatung).
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">
                6. Widerrufsrecht
              </h2>
              <p className="mt-2">Siehe eigene Widerrufsbelehrung.</p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
