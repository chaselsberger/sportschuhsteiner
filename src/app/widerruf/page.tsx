import type { Metadata } from "next";
import { brand } from "@/brand.config";
import { DraftNotice } from "@/components/DraftNotice";

export const metadata: Metadata = { title: "Widerruf" };

export default function WiderrufPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-[var(--font-heading)] text-4xl uppercase text-nachtblau">
        Widerrufsbelehrung
      </h1>

      <DraftNotice>
        Standard-Muster für den Fernabsatz, an den geplanten Shop angepasst.
        Vor Go-live anwaltlich prüfen lassen.
      </DraftNotice>

      <div className="space-y-6 text-text">
        <section>
          <h2 className="font-semibold text-nachtblau">Widerrufsrecht</h2>
          <p className="mt-2">
            Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
            diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn
            Tage ab dem Tag, an dem du oder ein von dir benannter Dritter die
            Ware in Besitz genommen hat.
          </p>
          <p className="mt-2">
            Um dein Widerrufsrecht auszuüben, musst du uns mittels einer
            eindeutigen Erklärung (z. B. per Post oder E-Mail) über deinen
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
          <h2 className="font-semibold text-nachtblau">Folgen des Widerrufs</h2>
          <p className="mt-2">
            Im Fall eines wirksamen Widerrufs erstatten wir alle Zahlungen,
            die wir von dir erhalten haben, unverzüglich und spätestens
            innerhalb von vierzehn Tagen ab Eingang der Widerrufsmitteilung.
            Wir können die Rückzahlung verweigern, bis wir die Ware
            zurückerhalten haben oder du den Nachweis erbracht hast, dass du
            die Ware zurückgesandt hast.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-nachtblau">Rücksendekosten</h2>
          <p className="mt-2">
            Du trägst die unmittelbaren Kosten der Rücksendung der Ware.
            (Endgültige Regelung mit dem Kunden abstimmen.)
          </p>
        </section>
      </div>
    </div>
  );
}
