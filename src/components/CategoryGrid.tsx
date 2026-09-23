import Link from "next/link";
import { categories } from "@/brand.config";
import { Icon } from "./Icon";

export function CategoryGrid() {
  return (
    <section className="bg-stein-2/60 py-16" id="sortiment">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-[var(--font-heading)] text-3xl uppercase text-nachtblau">
          Sortiment
        </h2>
        <p className="mt-2 max-w-2xl text-text-muted">
          Vom Laufschuh bis zum Skitourenschuh — jedes Paar wird bei uns
          angepasst, nicht nur verkauft.
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/sortiment/${cat.slug}`}
                className="flex min-h-[44px] items-center gap-3 rounded-[16px] border border-linie bg-white px-4 py-3.5 font-medium text-text hover:border-logoblau"
              >
                <Icon name={cat.icon} className="h-5 w-5 shrink-0 text-nachtblau" />
                <span>{cat.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
