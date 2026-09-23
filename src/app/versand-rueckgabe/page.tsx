import type { Metadata } from "next";
import { DraftNotice } from "@/components/DraftNotice";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Versand & Rückgabe" };

export default function VersandRueckgabePage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Start" },
          { label: "Versand & Rückgabe" },
        ]}
        title="Versand & Rückgabe"
      />
      <div className="page-x py-10 lg:py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-karte-rand bg-white p-6 text-[15px] leading-relaxed lg:p-10">
          <DraftNotice>
            Versandkosten und Rückgabefristen sind Platzhalter — bitte vom
            Kunden final festlegen lassen (siehe Briefing, offene Punkte).
          </DraftNotice>

          <div className="space-y-6 text-text">
            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">
                Abholung
              </h2>
              <p className="mt-2">
                Kostenlose Abholung im Geschäft in Scheffau am Wilden Kaiser —
                wir informieren Sie, sobald Ihre Bestellung bereitliegt.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">Versand</h2>
              <p className="mt-2">
                Versand nach Österreich und Deutschland. Die Versandkosten
                werden Ihnen im Checkout vor Kaufabschluss angezeigt.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">
                Rückgabe
              </h2>
              <p className="mt-2">
                Da jedes Paar ein Einzelstück ist, bitten wir um sorgfältige
                Prüfung vor dem Kauf bzw. um Anprobe im Geschäft. Bei
                Restposten aus dem Shop ist die Rückgabe ausgeschlossen. Ihr
                gesetzliches Widerrufsrecht bei Online-Käufen bleibt davon
                unberührt — siehe Widerrufsbelehrung.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
