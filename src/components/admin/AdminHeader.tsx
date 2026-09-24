"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { AdminLogoutButton } from "./AdminLogoutButton";

const links = [
  { href: "/admin", label: "Erfassen" },
  { href: "/admin/produkte", label: "Produkte" },
  { href: "/admin/verkaeufe", label: "Verkäufe" },
];

export function AdminHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="flex items-center justify-between gap-4 border-b border-karte-rand bg-nachtblau px-4 py-3 text-white">
        <Link href="/admin" aria-label="Sport Schuh Steiner – Shop-Verwaltung" className="flex shrink-0 items-center">
          <Image
            src="/brand/logo-weiss-gelb.svg"
            alt="Sport Schuh Steiner"
            width={104}
            height={42}
            className="block h-9 w-auto"
            priority
          />
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Menü öffnen"
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10"
        >
          <Icon name="menu" size={26} />
        </button>
      </header>

      <div
        className={`fixed inset-0 z-50 transition-opacity ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setOpen(false)}
        />
        <nav
          className={`absolute right-0 top-0 flex h-full w-[78%] max-w-xs flex-col gap-1 bg-nachtblau px-5 py-4 text-white shadow-xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[15px] font-extrabold">Menü</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Menü schließen"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10"
            >
              <Icon name="close" size={22} />
            </button>
          </div>
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-xl px-3 py-3 text-[15px] font-bold ${
                  active ? "bg-white/15 text-white" : "text-white/85 hover:bg-white/10"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <div className="mt-auto border-t border-white/15 pt-4">
            <AdminLogoutButton />
          </div>
        </nav>
      </div>
    </>
  );
}
