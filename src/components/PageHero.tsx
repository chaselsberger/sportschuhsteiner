import Link from "next/link";
import { MountainMark } from "./MountainMark";

export type Crumb = { href?: string; label: string };

/**
 * Seitenkopf der Unterseiten (Entwurf „Shop · Übersicht“): nachtblaues Band
 * mit Brotkrumen, großer Überschrift, Unterzeile und Logo-Berg rechts.
 */
export function PageHero({
  crumbs,
  title,
  lead,
  children,
}: {
  crumbs: Crumb[];
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-nachtblau text-white">
      <MountainMark
        width={900}
        className="pointer-events-none absolute -right-40 -top-32 z-0 hidden opacity-[0.15] sm:block"
      />
      <div className="page-x relative z-[1] flex flex-col gap-3.5 pb-9 pt-8 lg:pb-11 lg:pt-10">
        <nav aria-label="Brotkrumen" className="text-[13px] text-eisblau">
          <ol className="m-0 flex list-none flex-wrap gap-1 p-0">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex gap-1">
                {i > 0 && <span aria-hidden="true">/</span>}
                {c.href ? (
                  <Link href={c.href} className="text-eisblau hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="t-h1 max-w-[900px] text-white">{title}</h1>
        {lead && (
          <p className="m-0 max-w-[720px] text-base leading-relaxed text-hellblau lg:text-lg">
            {lead}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
