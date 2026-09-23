import type { Metadata } from "next";
import { brand } from "@/brand.config";
import { DraftNotice } from "@/components/DraftNotice";

export const metadata: Metadata = { title: "AGB" };

export default function AgbPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-[var(--font-heading)] text-4xl uppercase text-nachtblau">
        Allgemeine Geschäftsbedingungen
      </h1>

      <DraftNotice>
        Gerüst-Text für den geplanten Online-Shop (Einzelstücke, Reservierung,
        Gutscheine). Vor Shop-Start unbedingt anwaltlich prüfen und um
        Versandkosten sowie endgültige Zahlungsarten ergänzen lassen.
      </DraftNotice>

      <div className="space-y-6 text-text">
        <section>
          <h2 className="font-semibold text-nachtblau">1. Geltungsbereich</h2>
          <p className="mt-2">
            Diese AGB gelten für alle Verträge zwischen {brand.legalName} und
            Kund:innen über den Online-Shop auf sport-schuh-steiner.at.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-nachtblau">
            2. Vertragsschluss & Einzelstücke
          </h2>
          <p className="mt-2">
            Jedes Produkt im Shop ist ein Einzelstück in genau einer Größe.
            Mit Abschluss des Bestellvorgangs und Zahlung über Stripe kommt
            der Kaufvertrag zustande. Ist ein Paar zwischenzeitlich reserviert
            oder verkauft, wird die Bestellung storniert und der Betrag
            erstattet.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-nachtblau">3. Reservierung</h2>
          <p className="mt-2">
            Eine Reservierung zur Anprobe im Geschäft ist unverbindlich und
            gilt für 48 Stunden.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-nachtblau">
            4. Preise & Versand
          </h2>
          <p className="mt-2">
            Alle Preise verstehen sich in Euro inklusive gesetzlicher
            Umsatzsteuer. Lieferung erfolgt kostenlos zur Abholung in
            Scheffau oder per Versand nach Österreich und Deutschland (Kosten
            werden im Checkout angezeigt).
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-nachtblau">5. Gutscheine</h2>
          <p className="mt-2">
            Gutscheine sind ab Ausstellung grundsätzlich lange gültig; eine
            Verkürzung der Gültigkeit ist nur eingeschränkt zulässig. Details
            siehe Gutschein-Bedingungen (in Abstimmung mit der
            Steuerberatung).
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-nachtblau">6. Widerrufsrecht</h2>
          <p className="mt-2">Siehe eigene Widerrufsbelehrung.</p>
        </section>
      </div>
    </div>
  );
}
