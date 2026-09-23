import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { categories } from "@/brand.config";
import { Icon } from "@/components/Icon";

const descriptions: Record<(typeof categories)[number]["slug"], string> = {
  laufschuhe:
    "Passende Schuhe für jeden Tag — für die Runde am Morgen, den Kaffee zu Mittag und das Fest am Abend. Mit Gangbildanalyse zur passenden Dämpfung.",
  trailschuhe:
    "Griffige Profile und stabiler Halt für unwegsames Gelände rund um den Wilden Kaiser.",
  wanderschuhe:
    "Über Stock und über Stein — der passende Schuh fürs Bergerlebnis, von der Halbschuh-Wanderung bis zur Hochtour.",
  skischuhe:
    "Im Winter ist die Schale entscheidend: Der weiche Innenschuh schmiegt sich an, die Schale gibt Halt. Mit Bootfitting seit 2006.",
  skitourenschuhe:
    "Leicht bergauf, sicher bergab — Skitourenschuhe, individuell angepasst für lange Aufstiege.",
  schneeschuhe:
    "Schneeschuhe zum Kauf oder im Verleih — mit 10 % Ermäßigung bei Vorlage der Wilder Kaiser GuestCard.",
  berufsschuhe:
    "Berufsschuhe für Post, Gastronomie und Pflege — den ganzen Tag komfortabel und sicher im Stand.",
  barfussschuhe:
    "Spüren, worauf man sich bewegt: gesunde Füße und merkbaren Grip mit hochwertigen Barfußschuhen für Erwachsene und Kinder.",
};

export function generateStaticParams() {
  return categories.map((c) => ({ kategorie: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/sortiment/[kategorie]">): Promise<Metadata> {
  const { kategorie } = await params;
  const cat = categories.find((c) => c.slug === kategorie);
  if (!cat) return {};
  return {
    title: cat.label,
    description: descriptions[cat.slug],
  };
}

export default async function KategoriePage({
  params,
}: PageProps<"/sortiment/[kategorie]">) {
  const { kategorie } = await params;
  const cat = categories.find((c) => c.slug === kategorie);
  if (!cat) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-sm text-text-muted">
        <Link href="/sortiment" className="hover:text-linkblau">
          Sortiment
        </Link>{" "}
        / {cat.label}
      </nav>

      <div className="mt-3 flex items-center gap-3">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-stein-2 text-nachtblau">
          <Icon name={cat.icon} className="h-6 w-6" />
        </span>
        <h1 className="font-[var(--font-heading)] text-4xl uppercase text-nachtblau">
          {cat.label}
        </h1>
      </div>
      <p className="mt-4 max-w-2xl text-lg text-text-muted">
        {descriptions[cat.slug]}
      </p>

      <div className="mt-10 rounded-[24px] border border-dashed border-linie bg-stein-2/50 p-6 text-text-muted">
        Einzelstücke aus dieser Kategorie erscheinen hier, sobald der
        Online-Shop live ist. Bis dahin berät dich das Team gerne persönlich
        im Geschäft.
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/kontakt#termin"
          className="min-h-[44px] rounded-full bg-logogelb px-6 py-2.5 font-bold text-nachtblau"
        >
          Beratung anfragen
        </Link>
        <Link
          href="/sortiment"
          className="min-h-[44px] rounded-full border-2 border-nachtblau px-6 py-2.5 font-semibold text-nachtblau"
        >
          Alle Kategorien
        </Link>
      </div>
    </div>
  );
}
