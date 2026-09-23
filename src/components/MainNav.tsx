"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/beratung-service", label: "Beratung & Service" },
  { href: "/sortiment", label: "Sortiment" },
  { href: "/shop", label: "Shop", badge: "Neu" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Hauptmenü"
      className="flex gap-6 text-base font-bold xl:gap-10"
    >
      {links.map((link) => {
        const active =
          pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-2 border-b-[3px] pb-1 pt-[7px] text-nachtblau hover:border-linie ${
              active
                ? "border-logogelb hover:border-logogelb"
                : "border-transparent"
            }`}
          >
            {link.label}
            {link.badge && !active && (
              <span className="rounded-full bg-logogelb px-2 py-0.5 text-[11px] font-extrabold uppercase text-nachtblau">
                {link.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
