import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brand } from "@/brand.config";
import { Icon } from "@/components/Icon";
import { ProductCard } from "@/components/ProductCard";
import { ProductActions } from "@/components/shop/ProductActions";
import {
  badgeFor,
  demoProducts,
  discountLabel,
  euro,
} from "@/lib/demo-products";

export function generateStaticParams() {
  return demoProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = demoProducts.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.brand} ${p.model} · Gr. ${p.size}`,
    description: `${p.brand} ${p.model} in Größe ${p.size} – Einzelstück bei ${brand.name} in Scheffau am Wilden Kaiser.`,
  };
}

const perks = [
  {
    icon: "truck",
    title: "Versand in 1–3 Werktagen",
    text: "Österreich & Deutschland · [Versandkosten]",
  },
  {
    icon: "store",
    title: "Abholung in Scheffau",
    text: "Kostenlos, meist am selben Tag",
  },
  {
    icon: "return",
    title: "Rückgabe",
    text: "Details dazu vor dem Kauf",
  },
  {
    icon: "lock",
    title: "Sicher bezahlen",
    text: "Karte, EPS, Apple Pay, Klarna via Stripe",
  },
] as const;

const accordion = [
  {
    title: "Beschreibung",
    text: "[Produktbeschreibung – wird im Shop-Backend gepflegt oder per KI aus Hersteller-Daten vorformuliert und vom Team freigegeben.]",
  },
  {
    title: "Details & Material",
    text: "[Material, Sprengung, Gewicht – aus den Herstellerangaben]",
  },
  {
    title: "Passform-Tipp aus dem Geschäft",
    text: "[Kurzer Tipp aus dem Team, z. B. „fällt eher schmal aus – bei breitem Vorfuß eine halbe Nummer größer“]",
  },
  {
    title: "Versand & Rückgabe",
    text: "Abholung in Scheffau kostenlos, Versand mit der Post nach Österreich und Deutschland. Da es sich um ein Restposten-Einzelstück handelt, ist die Rückgabe ausgeschlossen – bitte vor dem Kauf gut prüfen oder im Geschäft anprobieren.",
  },
];

export default async function ProductPage({
  params,
}: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = demoProducts.find((p) => p.slug === slug);
  if (!product) notFound();

  const similar = demoProducts
    .filter((p) => p.size === product.size && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="pb-40 lg:pb-0">
      <nav
        aria-label="Brotkrumen"
        className="page-x hidden pt-[22px] text-[13px] text-text-muted lg:block"
      >
        <Link href="/">Start</Link> / <Link href="/shop">Shop</Link> /{" "}
        {product.categoryLabel} /{" "}
        <span aria-current="page">
          {product.brand} {product.model}
        </span>
      </nav>

      <section className="flex flex-col gap-5 lg:flex-row lg:gap-14 lg:px-16 lg:pb-14 lg:pt-[22px]">
        {/* Bild */}
        <div className="relative h-[380px] overflow-hidden bg-black sm:h-[480px] lg:h-[600px] lg:w-[53%] lg:shrink-0 lg:rounded-3xl">
          <Image
            src={product.image}
            alt={`${product.brand} ${product.model}`}
            fill
            preload
            sizes="(min-width: 1024px) 53vw, 100vw"
            className={
              product.fit === "contain" ? "object-contain" : "object-cover"
            }
            style={{ objectPosition: product.position ?? "50% 50%" }}
          />
          <span className="absolute left-5 top-5 hidden rounded-full bg-logogelb px-3.5 py-2 text-[13px] font-extrabold tracking-[0.06em] text-nachtblau lg:block">
            EINZELSTÜCK · NUR 1 PAAR
          </span>
          <Link
            href="/shop"
            aria-label="Zurück zum Shop"
            className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl font-extrabold text-nachtblau lg:hidden"
          >
            ←
          </Link>
        </div>

        {/* Infos */}
        <div className="flex flex-1 flex-col gap-[22px] px-4 sm:px-8 lg:px-0 lg:pt-2">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-3">
              <p className="m-0 text-xs font-extrabold uppercase tracking-[0.14em] text-linkblau lg:text-sm">
                {product.brand} · {product.categoryLabel}
              </p>
              <span className="rounded-full bg-logogelb px-2.5 py-1 text-[11px] font-extrabold text-nachtblau lg:hidden">
                NUR 1 PAAR
              </span>
            </div>
            <h1 className="t-h2 text-nachtblau">{product.model}</h1>
            <div className="flex flex-wrap items-baseline gap-3.5">
              <span className="text-[26px] font-extrabold text-nachtblau lg:text-[34px]">
                {euro(product.price)}
              </span>
              <s className="text-[15px] text-grau lg:text-lg">
                <span className="sr-only">statt </span>
                {euro(product.oldPrice)}
              </s>
              <span className="rounded-lg bg-nachtblau px-2.5 py-1 text-[13px] font-extrabold text-logogelb">
                {discountLabel(product)}
              </span>
            </div>
            <p className="m-0 text-[13px] text-grau">
              inkl. 20 % MwSt., zzgl. Versand
              {brand.isStaging ? " · Beispielpreis" : ""}
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-[18px] border border-karte-rand bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-extrabold text-nachtblau">
                Verfügbare Größe
              </span>
              <Link
                href="/shop#groessentabelle"
                className="flex items-center gap-1.5 text-sm font-extrabold"
              >
                <Icon name="ruler" size={20} />
                Größentabelle
              </Link>
            </div>
            <div className="flex items-center gap-3.5">
              <span className="flex h-14 items-center rounded-[14px] bg-nachtblau px-[22px] text-xl font-extrabold text-white">
                EU {product.size}
              </span>
              <span className="text-sm leading-normal text-text-muted">
                {product.sizeDetails}
                <br />
                {product.gender}
              </span>
            </div>
            <p className="m-0 flex items-center gap-2.5 border-t border-[#EFEAE0] pt-2.5 text-sm text-nachtblau">
              <Icon name="insole" size={20} />
              <span>
                Passt nicht ganz? Mit unserer <b>Einlage nach Maß</b> oft schon.
              </span>
            </p>
          </div>

          <ProductActions product={product} />

          <ul className="m-0 grid list-none grid-cols-1 gap-[18px] border-y border-linie p-0 py-[22px] sm:grid-cols-2">
            {perks.map((perk) => (
              <li key={perk.title} className="flex items-start gap-3.5">
                <span className="flex shrink-0 text-linkblau">
                  <Icon name={perk.icon} size={28} />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-extrabold text-nachtblau">
                    {perk.title}
                  </span>
                  <span className="text-sm text-text-muted">{perk.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-8 px-4 pt-8 sm:px-8 lg:flex-row lg:gap-14 lg:px-16 lg:pb-14 lg:pt-0">
        <div className="lg:w-[53%] lg:shrink-0">
          {accordion.map((item, i) => (
            <details
              key={item.title}
              open={i === 0}
              className="group border-b border-linie"
            >
              <summary className="flex h-[60px] cursor-pointer list-none items-center justify-between text-[17px] font-extrabold text-nachtblau [&::-webkit-details-marker]:hidden">
                {item.title}
                <span className="group-open:hidden">
                  <Icon name="plus" size={22} />
                </span>
                <span className="hidden group-open:inline">
                  <Icon name="minus" size={22} />
                </span>
              </summary>
              <p className="m-0 pb-5 text-[15px] leading-[1.7] text-text-muted">
                {item.text}
              </p>
            </details>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-3.5 self-start rounded-[22px] bg-nachtblau p-7 text-white">
          <span className="text-logogelb">
            <Icon name="footscan" size={40} />
          </span>
          <p className="t-h3 m-0 text-white">Sie wollen sichergehen?</p>
          <p className="m-0 text-[15px] leading-relaxed text-hellblau">
            Kommen Sie zur Fußanalyse – wir prüfen, ob dieses Paar zu Ihrem Fuß
            passt, bevor Sie kaufen.
          </p>
          <a
            href="#termin"
            className="flex h-[50px] items-center gap-2.5 self-start rounded-full bg-logogelb px-[22px] font-extrabold text-nachtblau hover:brightness-95"
          >
            <Icon name="calendar" size={20} />
            Termin buchen
          </a>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="flex flex-col gap-6 px-4 pb-16 pt-10 sm:px-8 lg:px-16 lg:pt-0">
          <h2 className="t-h3 text-nachtblau">
            Ebenfalls in Größe {product.size}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {similar.map((p) => (
              <ProductCard
                key={p.slug}
                product={p}
                badge={badgeFor(p)}
                variant="shop"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
