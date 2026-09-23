import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Gutscheine",
  description:
    "Wertgutscheine und Leistungsgutscheine von Sport Schuh Steiner — als PDF per E-Mail oder gedruckt zum Abholen.",
};

const valueAmounts = [25, 50, 100];

export default function GutscheinePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="font-[var(--font-heading)] text-4xl uppercase text-nachtblau">
        Gutscheine
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-text-muted">
        Das passende Geschenk, wenn du dir bei der Schuhgröße nicht sicher
        bist: ein Gutschein für Beratung, Bootfitting oder ein neues Paar.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <section className="rounded-[24px] border border-linie bg-white p-6">
          <h2 className="font-[var(--font-heading)] text-2xl uppercase text-nachtblau">
            Wertgutschein
          </h2>
          <p className="mt-2 text-text-muted">
            Frei einlösbar im Geschäft und im Online-Shop.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {valueAmounts.map((v) => (
              <li
                key={v}
                className="rounded-full border border-linie px-4 py-1.5 font-semibold text-nachtblau"
              >
                {v} €
              </li>
            ))}
            <li className="rounded-full border border-dashed border-linie px-4 py-1.5 font-semibold text-text-muted">
              freier Betrag
            </li>
          </ul>
        </section>

        <section className="rounded-[24px] border border-linie bg-white p-6">
          <h2 className="font-[var(--font-heading)] text-2xl uppercase text-nachtblau">
            Leistungsgutschein
          </h2>
          <p className="mt-2 text-text-muted">
            Für eine konkrete Leistung, z. B. Fußanalyse oder Bootfitting.
          </p>
          <ul className="mt-4 space-y-1 text-text-muted">
            <li>· Fußanalyse</li>
            <li>· Einlagen nach Maß</li>
            <li>· Bootfitting</li>
          </ul>
          <p className="mt-3 text-sm text-text-muted">
            Preise auf Anfrage — der Betrieb bestätigt jede Bestellung
            persönlich.
          </p>
        </section>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-[16px] bg-stein-2/60 p-5">
          <Icon name="mail" className="mt-1 h-5 w-5 shrink-0 text-nachtblau" />
          <div>
            <p className="font-semibold">Sofort als PDF</p>
            <p className="text-sm text-text-muted">
              Per E-Mail an dich oder direkt an die beschenkte Person, wahlweise
              zu einem gewünschten Datum.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-[16px] bg-stein-2/60 p-5">
          <Icon name="shop" className="mt-1 h-5 w-5 shrink-0 text-nachtblau" />
          <div>
            <p className="font-semibold">Gedruckt</p>
            <p className="text-sm text-text-muted">
              Zum Abholen im Geschäft in Scheffau oder per Post.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-[24px] border border-dashed border-linie bg-stein-2/50 p-6 text-text-muted">
        Der Online-Kauf von Gutscheinen startet zusammen mit dem Shop. Bis
        dahin stellen wir dir einen Gutschein gerne persönlich aus.
      </div>

      <div className="mt-8">
        <Link
          href="/kontakt"
          className="inline-flex min-h-[44px] items-center rounded-full bg-logogelb px-6 py-2.5 font-bold text-nachtblau"
        >
          Gutschein anfragen
        </Link>
      </div>
    </div>
  );
}
