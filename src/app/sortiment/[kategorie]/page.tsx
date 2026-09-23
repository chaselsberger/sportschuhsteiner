import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brand, categories } from "@/brand.config";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { badgeFor } from "@/lib/product-types";
import { getPublishedProductsByCategory } from "@/lib/products";

const descriptions: Record<(typeof categories)[number]["slug"], string> = {
  laufschuhe:
    "Passende Schuhe für jeden Tag – für die Runde am Morgen und den langen Lauf am Wochenende. Mit Gangbildanalyse zur passenden Dämpfung.",
  trailschuhe:
    "Griffige Profile und stabiler Halt für unwegsames Gelände rund um den Wilden Kaiser.",
  wanderschuhe:
    "Über Stock und über Stein – der passende Schuh fürs Bergerlebnis, von der Hüttenwanderung bis zur Hochtour.",
  skischuhe:
    "Im Winter ist die Schale entscheidend: Der Innenschuh schmiegt sich an, die Schale gibt Halt. Mit Bootfitting seit 2006.",
  skitourenschuhe:
    "Leicht bergauf, sicher bergab – Skitourenschuhe, individuell angepasst für lange Aufstiege.",
  schneeschuhe:
    "Schneeschuhe zum Kauf oder im Verleih – mit 10 % Ermäßigung bei Vorlage der Wilder Kaiser GuestCard.",
  berufsschuhe:
    "Berufsschuhe für Post, Gastronomie und Pflege – den ganzen Tag bequem und sicher auf den Beinen.",
  barfussschuhe:
    "Spüren, worauf man sich bewegt: gesunde Füße und guter Grip mit hochwertigen Barfußschuhen für Erwachsene und Kinder.",
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/sortiment/[kategorie]">): Promise<Metadata> {
  const { kategorie } = await params;
  const cat = categories.find((c) => c.slug === kategorie);
  if (!cat) return {};
  return {
    title: cat.label,
    description: `${descriptions[cat.slug]} ${brand.name}, Scheffau am Wilden Kaiser.`,
  };
}

export default async function KategoriePage({
  params,
}: PageProps<"/sortiment/[kategorie]">) {
  const { kategorie } = await params;
  const cat = categories.find((c) => c.slug === kategorie);
  if (!cat) notFound();

  const products = await getPublishedProductsByCategory(cat.shop, 4);

  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Start" },
          { href: "/sortiment", label: "Sortiment" },
          { label: cat.label },
        ]}
        title={cat.label}
        lead={descriptions[cat.slug]}
      />

      <section className="page-x flex flex-col gap-8 py-10 lg:flex-row lg:gap-14 lg:py-16">
        <div className="relative h-[260px] overflow-hidden rounded-3xl lg:h-[420px] lg:w-[55%] lg:shrink-0">
          <Image
            src={cat.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
            style={{ objectPosition: cat.position }}
          />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-4">
          <span className="text-linkblau">
            <Icon name={cat.icon} size={44} />
          </span>
          <h2 className="t-h3 text-nachtblau">Beratung zuerst</h2>
          <p className="m-0 text-base leading-relaxed text-text-muted">
            Welcher Schuh passt, zeigt sich am Fuß – nicht im Katalog. Wir
            messen, beraten und passen an, damit Sie mit einem Paar nach Hause
            gehen, das wirklich sitzt.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#termin"
              className="flex h-[52px] items-center gap-2.5 rounded-full bg-logogelb px-6 font-extrabold text-nachtblau hover:brightness-95"
            >
              <Icon name="calendar" size={20} />
              Beratung anfragen
            </a>
            <Link
              href="/sortiment"
              className="flex h-[52px] items-center gap-2.5 rounded-full border-2 border-nachtblau px-6 font-extrabold text-nachtblau hover:bg-white"
            >
              Alle Kategorien
            </Link>
          </div>
        </div>
      </section>

      {products.length > 0 && (
        <section className="page-x flex flex-col gap-6 pb-16">
          <div className="flex items-end justify-between gap-6">
            <h2 className="t-h3 text-nachtblau">Einzelstücke im Shop</h2>
            <Link
              href="/shop"
              className="flex items-center gap-2 font-extrabold"
            >
              Alle <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {products.map((p) => (
              <ProductCard
                key={p.slug}
                product={p}
                badge={badgeFor(p)}
                variant="shop"
              />
            ))}
          </div>
          {brand.isStaging && (
            <p className="m-0 text-[13px] text-grau">
              Vorschau: Produkte und Preise sind Beispieldaten.
            </p>
          )}
        </section>
      )}
    </>
  );
}
