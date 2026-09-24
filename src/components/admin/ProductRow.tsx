"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const statusLabels: Record<string, string> = {
  entwurf: "Entwurf",
  veroeffentlicht: "Im Shop",
  verkauft: "Verkauft",
};

export function ProductRow({
  id,
  title,
  size,
  priceLabel,
  status,
  imageUrl,
}: {
  id: string;
  title: string;
  size: number;
  priceLabel: string;
  status: string;
  imageUrl: string | null;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function setStatus(next: string) {
    setBusy(true);
    await fetch(`/api/admin/produkte/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    router.refresh();
    setBusy(false);
  }

  async function remove() {
    if (!confirm(`„${title}“ endgültig löschen?`)) return;
    setBusy(true);
    await fetch(`/api/admin/produkte/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="flex items-center gap-3.5 rounded-2xl border border-karte-rand bg-white p-3">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-bild-grund">
        {imageUrl && (
          <Image src={imageUrl} alt="" fill sizes="64px" className="object-cover" />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[15px] font-bold text-nachtblau">{title}</span>
        <span className="text-sm text-text-muted">
          Gr. {size} · {priceLabel}
        </span>
      </div>
      <select
        value={status}
        disabled={busy}
        onChange={(e) => setStatus(e.target.value)}
        className="h-10 rounded-lg border border-formrand bg-white px-2 text-sm"
      >
        {Object.entries(statusLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <Link href={`/admin/produkte/${id}`} className="text-sm font-bold text-nachtblau">
        Bearbeiten
      </Link>
      <button
        type="button"
        onClick={remove}
        disabled={busy}
        className="text-sm font-bold text-[#b3261e] disabled:opacity-60"
      >
        Löschen
      </button>
    </div>
  );
}
