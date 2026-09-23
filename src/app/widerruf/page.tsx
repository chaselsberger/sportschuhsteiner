import type { Metadata } from "next";
import { brand } from "@/brand.config";
import { DraftNotice } from "@/components/DraftNotice";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Widerruf" };

export default function WiderrufPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Start" },
          { label: "Widerrufsbelehrung" },
        ]}
        title="Widerrufsbelehrung"
      />
      <div className="page-x py-10 lg:py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-karte-rand bg-white p-6 text-[15px] leading-relaxed lg:p-10">
          <DraftNotice>
            Standard-Muster für den Fernabsatz, an den geplanten Shop angepasst.
            Vor Go-live anwaltlich prüfen lassen.
          </DraftNotice>

          <div className="space-y-6 text-text">
            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">
                Widerrufsrecht
              </h2>
              <p className="mt-2">
                Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von
                Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt
                vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen
                benannter Dritter die Ware in Besitz genommen hat.
              </p>
              <p className="mt-2">
                Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer
                eindeutigen Erklärung (z. B. per Post oder E-Mail) über Ihren
                Entschluss informieren:
              </p>
              <p className="mt-2">
                {brand.legalName}
                <br />
                {brand.address.street}, {brand.address.zip} {brand.address.city}
                <br />
                {brand.contact.email}
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">
                Folgen des Widerrufs
              </h2>
              <p className="mt-2">
                Im Fall eines wirksamen Widerrufs erstatten wir alle Zahlungen,
                die wir von Ihnen erhalten haben, unverzüglich und spätestens
                innerhalb von vierzehn Tagen ab Eingang der Widerrufsmitteilung.
                Wir können die Rückzahlung verweigern, bis wir die Ware
                zurückerhalten haben oder Sie den Nachweis erbracht haben, dass
                Sie die Ware zurückgesandt haben.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">
                Rücksendekosten
              </h2>
              <p className="mt-2">
                Sie tragen die unmittelbaren Kosten der Rücksendung der Ware.
                (Endgültige Regelung mit dem Kunden abstimmen.)
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
