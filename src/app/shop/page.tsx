import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Einzelstücke und Restposten aus Scheffau — der Online-Shop startet in Kürze.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6">
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-stein-2 text-nachtblau">
        <Icon name="cart" className="h-8 w-8" />
      </span>
      <h1 className="mt-6 font-[var(--font-heading)] text-4xl uppercase text-nachtblau">
        Shop startet in Kürze
      </h1>
      <p className="mt-4 text-lg text-text-muted">
        Jedes Paar bei uns ist ein Einzelstück in genau einer Größe. Bald
        kannst du hier nach Größe, Kategorie und Marke filtern, ein Paar 48h
        reservieren und direkt online kaufen.
      </p>
      <p className="mt-2 text-text-muted">
        Bis dahin: ruf gerne an oder komm im Geschäft in Scheffau vorbei.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/kontakt"
          className="min-h-[44px] rounded-full bg-logogelb px-6 py-2.5 font-bold text-nachtblau"
        >
          Kontakt & Anfahrt
        </Link>
        <Link
          href="/sortiment"
          className="min-h-[44px] rounded-full border-2 border-nachtblau px-6 py-2.5 font-semibold text-nachtblau"
        >
          Sortiment ansehen
        </Link>
      </div>
    </div>
  );
}
