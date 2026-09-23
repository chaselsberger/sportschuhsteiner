"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAppointment } from "@/lib/appointment";
import { Icon, type IconName } from "./Icon";
import { MobileMenuSheet } from "./MobileMenuSheet";

const tabs: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Start", icon: "home" },
  { href: "/sortiment", label: "Sortiment", icon: "search" },
  { href: "/shop", label: "Shop", icon: "bag" },
];

const itemClass =
  "flex h-[60px] flex-1 flex-col items-center justify-center gap-[3px] text-[11px] font-extrabold";

/** Schwebende Leiste unten am Handy: Start, Sortiment, Shop, Termin, Menü */
export function MobileTabBar() {
  const pathname = usePathname();
  const { openAppointment } = useAppointment();
  const [menuOpen, setMenuOpen] = useState(false);

  // Produktseiten haben eine eigene Kauf-Leiste (Entwurf „Shop · Produkt Mobil“)
  if (/^\/shop\/[^/]+/.test(pathname)) return null;

  return (
    <>
      <nav
        aria-label="Schnellnavigation"
        className="fixed inset-x-3 z-40 flex h-16 items-center rounded-[20px] bg-nachtblau px-1.5 shadow-[0_12px_30px_rgba(14,36,45,0.35)] lg:hidden"
        style={{ bottom: "calc(12px + env(safe-area-inset-bottom))" }}
      >
        {tabs.map((tab) => {
          const active =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={`${itemClass} ${active ? "text-logogelb" : "text-hellblau"}`}
            >
              <Icon name={tab.icon} size={24} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={openAppointment}
          className={`${itemClass} text-hellblau`}
        >
          <Icon name="calendar" size={24} />
          <span>Termin</span>
        </button>
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-haspopup="dialog"
          className={`${itemClass} text-hellblau`}
        >
          <Icon name="menu" size={24} />
          <span>Menü</span>
        </button>
      </nav>
      <MobileMenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
