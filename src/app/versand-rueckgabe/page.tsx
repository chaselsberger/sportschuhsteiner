import type { Metadata } from "next";
import { DraftNotice } from "@/components/DraftNotice";

export const metadata: Metadata = { title: "Versand & Rückgabe" };

export default function VersandRueckgabePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-[var(--font-heading)] text-4xl uppercase text-nachtblau">
        Versand & Rückgabe
      </h1>

      <DraftNotice>
        Versandkosten und Rückgabefristen sind Platzhalter — bitte vom Kunden
        final festlegen lassen (siehe Briefing, offene Punkte).
      </DraftNotice>

      <div className="space-y-6 text-text">
        <section>
          <h2 className="font-semibold text-nachtblau">Abholung</h2>
          <p className="mt-2">
            Kostenlose Abholung im Geschäft in Scheffau am Wilden Kaiser —
            wir informieren dich, sobald deine Bestellung bereitliegt.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-nachtblau">Versand</h2>
          <p className="mt-2">
            Versand nach Österreich und Deutschland. Die Versandkosten werden
            dir im Checkout vor Kaufabschluss angezeigt.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-nachtblau">Rückgabe</h2>
          <p className="mt-2">
            Da jedes Paar ein Einzelstück ist, bitten wir um sorgfältige
            Prüfung vor dem Kauf bzw. um Anprobe im Geschäft. Dein
            gesetzliches Widerrufsrecht bei Online-Käufen bleibt davon
            unberührt — siehe Widerrufsbelehrung.
          </p>
        </section>
      </div>
    </div>
  );
}
