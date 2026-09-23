import Link from "next/link";
import { brand, serviceHighlights } from "@/brand.config";
import { Icon } from "../Icon";

const tel = `tel:${brand.contact.phone.replace(/\s+/g, "")}`;

/** Mobil direkt unter dem Einstieg: Anrufen · Route · Shop */
export function QuickActions() {
  const tile =
    "flex h-[76px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-karte-rand bg-white text-[13px] font-extrabold text-nachtblau";
  return (
    <section
      aria-label="Schnellzugriff"
      className="grid grid-cols-3 gap-2.5 p-4 sm:px-8 lg:hidden"
    >
      <a href={tel} className={tile}>
        <Icon name="phone" size={24} />
        Anrufen
      </a>
      <a
        href={brand.routeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={tile}
      >
        <Icon name="pin" size={24} />
        Route
      </a>
      <Link href="/shop" className={tile}>
        <Icon name="bag" size={24} />
        Shop
      </Link>
    </section>
  );
}

/** Leistungen: Desktop als fünfteilige Leiste, Mobil als Wischleiste „Unser Service“ */
export function ServiceStrip() {
  return (
    <>
      <section
        id="beratung"
        aria-label="Unsere Leistungen"
        className="page-x hidden pb-6 pt-10 lg:block"
      >
        <ul className="m-0 grid list-none grid-cols-5 overflow-hidden rounded-3xl border border-karte-rand bg-white p-0">
          {serviceHighlights.map((s, i) => (
            <li
              key={s.slug}
              className={
                i < serviceHighlights.length - 1
                  ? "border-r border-linie"
                  : undefined
              }
            >
              <Link
                href={`/beratung-service#${s.slug}`}
                className="flex h-full flex-col gap-2.5 px-[22px] py-[26px] hover:bg-stein/60"
              >
                <span className="text-linkblau">
                  <Icon name={s.icon} size={40} />
                </span>
                <span className="text-[17px] font-extrabold text-nachtblau">
                  {s.label}
                </span>
                <span className="text-sm leading-normal text-text-muted">
                  {s.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3.5 py-5 pl-4 sm:pl-8 lg:hidden">
        <h2 className="t-h2 text-nachtblau">Unser Service</h2>
        <ul className="scroll-row m-0 flex list-none gap-2.5 overflow-x-auto p-0 pr-4 sm:pr-8">
          {serviceHighlights.map((s) => (
            <li key={s.slug} className="w-[150px] shrink-0">
              <Link
                href={`/beratung-service#${s.slug}`}
                className="flex h-full flex-col gap-2 rounded-2xl border border-karte-rand bg-white p-4"
              >
                <span className="flex text-linkblau">
                  <Icon name={s.icon} size={32} />
                </span>
                <b className="text-[15px] text-nachtblau">
                  {"mobileLabel" in s ? s.mobileLabel : s.label}
                </b>
                <span className="text-[13px] text-text-muted">{s.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
