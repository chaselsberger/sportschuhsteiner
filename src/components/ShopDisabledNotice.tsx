import Link from "next/link";
import { brand } from "@/brand.config";
import { Icon } from "./Icon";

/**
 * Ersetzt Shop- bzw. Gutschein-Kauf-Inhalte, solange `brand.shopEnabled`
 * false ist (Reaktivierung siehe SHOP-REAKTIVIERUNG.md).
 */
export function ShopDisabledNotice({
  title = "Online-Shop derzeit nicht verfügbar",
  text = "Wir arbeiten noch daran. Bis dahin beraten wir Sie gerne persönlich im Geschäft in Scheffau oder telefonisch.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="page-x flex flex-col items-start gap-5 py-14 lg:py-20">
      <span className="flex text-linkblau">
        <Icon name="store" size={40} />
      </span>
      <h2 className="t-h3 text-nachtblau">{title}</h2>
      <p className="m-0 max-w-[560px] text-base leading-relaxed text-text-muted">
        {text}
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href={`tel:${brand.contact.phone.replace(/\s+/g, "")}`}
          className="flex h-[52px] items-center gap-2.5 rounded-full bg-logogelb px-6 font-extrabold text-nachtblau hover:brightness-95"
        >
          <Icon name="phone" size={20} />
          {brand.contact.phoneDisplay}
        </a>
        <Link
          href="/kontakt"
          className="flex h-[52px] items-center gap-2.5 rounded-full border-2 border-nachtblau px-6 font-extrabold text-nachtblau hover:bg-white"
        >
          Kontakt & Anfahrt
        </Link>
      </div>
    </section>
  );
}
