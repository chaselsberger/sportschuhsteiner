import Link from "next/link";
import { brand } from "@/brand.config";
import { discountLabel, latestProducts } from "@/lib/demo-products";
import { Icon } from "../Icon";
import { ProductCard, ProductCardMobile } from "../ProductCard";

/** Shop-Vorschau: die 4 neuesten Einzelstücke */
export function LatestPairs() {
  const products = latestProducts;
  const badge = (p: (typeof products)[number]) => p.badge ?? discountLabel(p);

  return (
    <>
      {/* Desktop */}
      <section className="hidden flex-col gap-[34px] px-16 pb-10 pt-24 lg:flex">
        <div className="flex items-end justify-between gap-8">
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-logogelb px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.1em] text-nachtblau">
                Neu im Shop
              </span>
              <span className="text-sm text-text-muted">
                Einzelstücke &amp; Restposten – jedes Paar gibt es nur einmal
              </span>
            </div>
            <h2 className="t-h2 text-nachtblau">Letzte Paare, beste Preise.</h2>
          </div>
          <Link
            href="/shop"
            className="flex h-[52px] shrink-0 items-center gap-2.5 rounded-full border-2 border-nachtblau px-6 font-extrabold text-nachtblau hover:bg-white"
          >
            Alle Einzelstücke
            <Icon name="arrow" size={20} />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard
              key={p.slug}
              product={p}
              badge={badge(p)}
              variant="home"
            />
          ))}
        </div>
        {brand.isStaging && (
          <p className="-mt-4 text-[13px] text-grau">
            Vorschau: Produkte und Preise sind Beispieldaten.
          </p>
        )}
        <div className="flex items-center justify-between gap-8 rounded-[18px] bg-stein-2 px-7 py-[22px]">
          <p className="m-0 flex items-center gap-4 text-base text-nachtblau">
            <Icon name="store" size={30} />
            <span>
              <b>Lieber anprobieren?</b> Online reservieren, im Geschäft
              probieren – mit Beratung inklusive.
            </span>
          </p>
          <p className="m-0 flex items-center gap-4 text-base text-nachtblau">
            <Icon name="bell" size={26} />
            <span>
              <b>Größen-Alarm:</b> Wir melden uns, wenn Ihre Größe reinkommt.
            </span>
          </p>
        </div>
      </section>

      {/* Mobil */}
      <section className="flex flex-col gap-3.5 bg-stein-2 py-6 pl-4 sm:pl-8 lg:hidden">
        <div className="flex items-end justify-between pr-4 sm:pr-8">
          <div className="flex flex-col gap-2">
            <span className="self-start rounded-full bg-logogelb px-2.5 py-1 text-[11px] font-extrabold uppercase text-nachtblau">
              Neu im Shop
            </span>
            <h2 className="t-h2 text-nachtblau">Letzte Paare</h2>
          </div>
          <Link href="/shop" className="text-sm font-extrabold">
            Alle →
          </Link>
        </div>
        <div className="scroll-row flex gap-3 overflow-x-auto pr-4 sm:pr-8">
          {[products[1], products[0], products[2], products[3]].map((p) => (
            <ProductCardMobile key={p.slug} product={p} badge={badge(p)} />
          ))}
        </div>
        {brand.isStaging && (
          <p className="m-0 pr-4 text-xs text-grau">Vorschau: Beispieldaten.</p>
        )}
      </section>
    </>
  );
}
