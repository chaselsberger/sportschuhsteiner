import Link from "next/link";
import { brand } from "@/brand.config";
import { Icon } from "./Icon";

const navLinks = [
  { href: "/beratung-service", label: "Beratung & Service" },
  { href: "/sortiment", label: "Sortiment" },
  { href: "/shop", label: "Shop" },
  { href: "/gutscheine", label: "Gutscheine" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-linie/60 bg-stein/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-nachtblau"
        >
          <span className="sr-only">{brand.name} — Start</span>
          <span aria-hidden className="block h-9 w-auto">
            <svg viewBox="0 0 24 24" className="h-9 w-9 text-nachtblau">
              <path
                d="M3 20l6-13 3 6 2-3 7 10z"
                fill="var(--color-logogelb)"
              />
            </svg>
          </span>
          <span className="hidden font-[var(--font-heading)] text-xl uppercase tracking-wide sm:inline">
            {brand.name}
          </span>
        </Link>

        <nav
          aria-label="Hauptnavigation"
          className="hidden items-center gap-6 text-sm font-medium text-text md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm py-1 hover:text-linkblau"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${brand.contact.phone.replace(/\s+/g, "")}`}
            className="hidden rounded-full border border-nachtblau/20 px-4 py-2 text-sm font-semibold text-nachtblau hover:bg-stein-2 sm:inline-flex sm:items-center sm:gap-2"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            {brand.contact.phoneDisplay}
          </a>
          <Link
            href="/kontakt#termin"
            className="inline-flex items-center gap-2 rounded-full bg-logogelb px-4 py-2 text-sm font-bold text-nachtblau hover:brightness-95"
          >
            <Icon name="calendar" className="h-4 w-4" />
            Termin anfragen
          </Link>
        </div>
      </div>
    </header>
  );
}
