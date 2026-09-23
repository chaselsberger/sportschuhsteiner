"use client";

import Link from "next/link";
import { BottomSheet } from "./BottomSheet";

const links = [
  { href: "/beratung-service", label: "Beratung & Service" },
  { href: "/sortiment", label: "Sortiment" },
  { href: "/shop", label: "Shop" },
  { href: "/gutscheine", label: "Gutscheine" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt & Anfahrt" },
];

export function MobileMenuSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <BottomSheet open={open} onClose={onClose} title="Menü">
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onClose}
              className="flex min-h-[52px] items-center justify-between rounded-xl px-3 text-lg font-extrabold text-nachtblau hover:bg-stein-2"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </BottomSheet>
  );
}
