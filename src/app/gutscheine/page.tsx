import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/brand.config";
import { Icon } from "@/components/Icon";
import { MountainMark } from "@/components/MountainMark";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Gutscheine",
  description:
    "Wert- und Leistungsgutscheine von Sport Schuh Steiner in Scheffau – für Fußanalyse, Bootfitting oder ein neues Paar. Als PDF per E-Mail oder gedruckt zum Abholen.",
};

const valueAmounts = ["€ 25", "€ 50", "€ 100", "Freier Betrag"];
const services = ["Fußanalyse", "Einlagen nach Maß", "Bootfitting"];

const mailto = `mailto:${brand.contact.email}?subject=${encodeURIComponent("Gutschein-Anfrage")}&body=${encodeURIComponent(
  "Ich möchte gerne einen Gutschein bestellen:\n\nBetrag bzw. Leistung: \nFür (Name): \nWidmung: \nZustellung (PDF per E-Mail / gedruckt zum Abholen / per Post): \n",
)}`;

/** Gutschein-Motiv in den Markenfarben: Logo-Berg, Grat-Linie, Schuh-Icon */
function VoucherVisual() {
  return (
    <div className="relative aspect-[1.6] w-full max-w-[520px] overflow-hidden rounded-3xl bg-nachtblau p-7 text-white shadow-[0_24px_60px_rgba(19,48,59,0.25)] lg:p-9">
      <div className="flex items-start justify-between">
        <MountainMark width={110} className="h-auto w-[84px] lg:w-[110px]" />
        <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-eisblau">
          Gutschein
        </span>
      </div>
      <p className="t-h1 m-0 mt-3 text-logogelb lg:mt-5">€ 50</p>
      <p className="m-0 mt-2 text-sm text-hellblau">
        Für: Anna · „Für deine nächste Tour!“
      </p>
      <p className="m-0 mt-1 text-[11px] font-bold tracking-[0.1em] text-eisblau">
        CODE SSS-4F7K-2Q
      </p>
      <svg
        viewBox="0 0 520 60"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[22%] w-full"
      >
        <path
          d="M0 44 L40 36 L80 40 L120 22 L160 30 L200 10 L240 24 L280 16 L320 34 L360 26 L400 40 L440 28 L480 38 L520 30 L520 60 L0 60 Z"
          fill="#0E242D"
        />
        <path
          d="M0 44 L40 36 L80 40 L120 22 L160 30 L200 10 L240 24 L280 16 L320 34 L360 26 L400 40 L440 28 L480 38 L520 30"
          fill="none"
          stroke="#F2E62B"
          strokeWidth={2.5}
        />
      </svg>
      <span
        className="absolute left-[37%] top-[76%] text-logogelb"
        aria-hidden="true"
      >
        <Icon name="run" size={26} />
      </span>
    </div>
  );
}

export default function GutscheinePage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Start" }, { label: "Gutscheine" }]}
        title="Gutscheine"
        lead="Das passende Geschenk, wenn Sie bei der Schuhgröße unsicher sind: ein Gutschein für Beratung, Bootfitting oder ein neues Paar."
      />

      <section className="page-x flex flex-col gap-10 py-10 lg:flex-row lg:items-center lg:gap-16 lg:py-16">
        <div className="flex justify-center lg:w-[45%] lg:shrink-0">
          <VoucherVisual />
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-3xl border border-karte-rand bg-white p-7">
            <h2 className="t-h3 text-nachtblau">Wertgutschein</h2>
            <p className="m-0 text-[15px] text-text-muted">
              Frei einlösbar im Geschäft – jetzt bequem online kaufen.
            </p>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {valueAmounts.map((v) => (
                <li
                  key={v}
                  className="flex h-12 items-center rounded-xl border-2 border-linie bg-white px-4 font-extrabold text-nachtblau"
                >
                  {v}
                </li>
              ))}
            </ul>
            <Link
              href="/gutscheine/kaufen"
              className="flex h-14 w-fit items-center gap-2.5 rounded-full bg-logogelb px-7 font-extrabold text-nachtblau hover:brightness-95"
            >
              <Icon name="cart" size={20} />
              Jetzt online kaufen
            </Link>
          </div>
          <div className="flex flex-col gap-4 rounded-3xl border border-karte-rand bg-white p-7">
            <h2 className="t-h3 text-nachtblau">Leistungsgutschein</h2>
            <p className="m-0 text-[15px] text-text-muted">
              Für eine konkrete Leistung aus unserer Werkstatt.
            </p>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {services.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-2.5 font-bold text-nachtblau"
                >
                  <span className="text-linkblau">
                    <Icon name="check" size={20} />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
            <p className="m-0 text-sm text-grau">
              Preise auf Anfrage – wir bestätigen jede Bestellung persönlich.
            </p>
          </div>
        </div>
      </section>

      <section className="page-x pb-12 lg:pb-20">
        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3">
          {[
            {
              icon: "mail" as const,
              t: "Sofort als PDF",
              p: "Per E-Mail an Sie oder direkt an die beschenkte Person – auch zu einem Wunschdatum.",
            },
            {
              icon: "store" as const,
              t: "Gedruckt abholen",
              p: "Hochwertig gedruckt zum Abholen im Geschäft in Scheffau.",
            },
            {
              icon: "truck" as const,
              t: "Per Post",
              p: "Wir schicken den Gutschein nach Österreich und Deutschland.",
            },
          ].map((d) => (
            <li
              key={d.t}
              className="flex gap-4 rounded-[18px] bg-stein-2 p-[22px]"
            >
              <span className="shrink-0 text-nachtblau">
                <Icon name={d.icon} size={28} />
              </span>
              <span className="flex flex-col gap-1">
                <b className="text-nachtblau">{d.t}</b>
                <span className="text-sm leading-normal text-text-muted">
                  {d.p}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-4 rounded-3xl bg-nachtblau p-7 text-white lg:flex-row lg:items-center lg:justify-between lg:p-10">
          <div className="flex flex-col gap-2">
            <p className="t-h3 m-0 text-white">Wertgutschein sofort online</p>
            <p className="m-0 max-w-[620px] text-base leading-relaxed text-hellblau">
              Betrag wählen, sicher mit Stripe bezahlen, Gutschein direkt als
              PDF erhalten. Für Leistungsgutscheine bestätigen wir jede
              Bestellung persönlich.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 self-start sm:flex-row lg:self-auto">
            <a
              href="/gutscheine/kaufen"
              className="flex h-14 items-center gap-2.5 rounded-full bg-logogelb px-7 font-extrabold text-nachtblau hover:brightness-95"
            >
              <Icon name="cart" size={20} />
              Wertgutschein kaufen
            </a>
            <a
              href={mailto}
              className="flex h-14 items-center gap-2.5 rounded-full border-2 border-white px-7 font-extrabold text-white hover:bg-white/10"
            >
              <Icon name="mail" size={20} />
              Leistungsgutschein anfragen
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
