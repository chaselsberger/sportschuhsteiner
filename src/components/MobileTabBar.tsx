"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "./Icon";
import { AppointmentSheet } from "./AppointmentSheet";
import { MobileMenuSheet } from "./MobileMenuSheet";

const tabs = [
  { href: "/", label: "Start", icon: "home" as const },
  { href: "/sortiment", label: "Sortiment", icon: "shop" as const },
  { href: "/shop", label: "Shop", icon: "cart" as const },
];

export function MobileTabBar() {
  const pathname = usePathname();
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        aria-label="Mobile Navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-linie bg-stein/95 backdrop-blur md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-5">
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-[11px] font-medium ${
                    active ? "text-linkblau" : "text-text-muted"
                  }`}
                >
                  <Icon name={tab.icon} className="h-5 w-5" />
                  {tab.label}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              onClick={() => setAppointmentOpen(true)}
              className="flex min-h-[56px] w-full flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-text-muted"
            >
              <Icon name="calendar" className="h-5 w-5" />
              Termin
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex min-h-[56px] w-full flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-text-muted"
            >
              <Icon name="menu" className="h-5 w-5" />
              Menü
            </button>
          </li>
        </ul>
      </nav>
      <AppointmentSheet
        open={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
      />
      <MobileMenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
