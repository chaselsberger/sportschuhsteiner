import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/brand.config";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Sortiment",
  description:
    "Lauf-, Trail-, Berg- und Wanderschuhe, Ski- und Skitourenschuhe, Schneeschuhe, Berufsschuhe und Barfußschuhe — beraten und angepasst in Scheffau am Wilden Kaiser.",
};

export default function SortimentPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-[var(--font-heading)] text-4xl uppercase text-nachtblau">
        Sortiment
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-text-muted">
        Ein ausgewähltes Sortiment an Schuhen und Equipment — jedes Paar wird
        bei uns angepasst, nicht nur verkauft.
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/sortiment/${cat.slug}`}
              className="flex min-h-[44px] items-center gap-3 rounded-[24px] border border-linie bg-white p-5 font-semibold text-nachtblau hover:border-logoblau"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-stein-2">
                <Icon name={cat.icon} className="h-5 w-5" />
              </span>
              {cat.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-[24px] border border-dashed border-linie bg-stein-2/50 p-6 text-text-muted">
        Der Online-Shop für Einzelstücke startet in Kürze. Bis dahin berät dich
        das Team gerne persönlich im Geschäft in Scheffau.
      </div>
    </div>
  );
}
