import Link from "next/link";
import { brand } from "@/brand.config";
import { OpeningHoursList } from "./OpeningHoursList";

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/widerruf", label: "Widerruf" },
  { href: "/versand-rueckgabe", label: "Versand & Rückgabe" },
  { href: "/barrierefreiheit", label: "Barrierefreiheit" },
  { href: "/cookie-einstellungen", label: "Cookie-Einstellungen" },
];

export function Footer() {
  return (
    <footer className="mt-16 bg-tiefblau pb-28 pt-12 text-stein md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-[var(--font-heading)] text-xl uppercase tracking-wide">
            {brand.name}
          </p>
          <p className="mt-2 max-w-xs text-sm text-stein/70">
            {brand.claim}
          </p>
          {brand.social.instagram && (
            <a
              href={`https://instagram.com/${brand.social.instagram}`}
              className="mt-4 inline-block text-sm text-stein/60 hover:text-logogelb"
            >
              @{brand.social.instagram}
            </a>
          )}
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-stein/80">
            Kontakt
          </h2>
          <address className="mt-3 space-y-1 text-sm not-italic text-stein/70">
            <p>{brand.legalName}</p>
            <p>
              {brand.address.street}, {brand.address.zip} {brand.address.city}
            </p>
            <p>
              <a
                href={`tel:${brand.contact.phone.replace(/\s+/g, "")}`}
                className="hover:text-logogelb"
              >
                {brand.contact.phoneDisplay}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${brand.contact.email}`}
                className="hover:text-logogelb"
              >
                {brand.contact.email}
              </a>
            </p>
          </address>
          <h2 className="mt-4 text-sm font-bold uppercase tracking-wide text-stein/80">
            Öffnungszeiten
          </h2>
          <div className="mt-2 text-sm text-stein/70">
            <OpeningHoursList compact />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-stein/80">
            Rechtliches
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm text-stein/70">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-logogelb">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl px-4 text-xs text-stein/40 sm:px-6">
        © {new Date().getFullYear()} {brand.name}
        {brand.isStaging && " · Vorschau — nicht für Suchmaschinen"}
      </p>
    </footer>
  );
}
