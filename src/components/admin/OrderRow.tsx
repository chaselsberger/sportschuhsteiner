"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const statusLabels: Record<string, string> = {
  bezahlt: "Bezahlt",
  storniert: "Storniert",
  erstattet: "Erstattet",
};

const statusClasses: Record<string, string> = {
  bezahlt: "bg-[#e7f5ec] text-[#1f7a4a]",
  storniert: "bg-[#f3f0e8] text-text-muted",
  erstattet: "bg-[#fff6e0] text-nachtblau",
};

export function OrderRow({
  id,
  orderNumber,
  productTitle,
  amountLabel,
  customerEmail,
  status,
  createdAt,
}: {
  id: string;
  orderNumber: string;
  productTitle: string;
  amountLabel: string;
  customerEmail: string | null;
  status: string;
  createdAt: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRefund() {
    if (!confirm(`Zahlung für „${productTitle}“ (${amountLabel}) wirklich erstatten?`)) {
      return;
    }
    setBusy(true);
    setError(null);
    const res = await fetch(`/api/admin/verkaeufe/${id}/erstatten`, { method: "POST" });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Erstattung fehlgeschlagen.");
      setBusy(false);
      return;
    }
    router.refresh();
  }

  const date = new Date(createdAt).toLocaleDateString("de-AT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-karte-rand bg-white p-3.5 sm:flex-row sm:items-center sm:gap-3.5">
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[15px] font-bold text-nachtblau">{productTitle}</span>
        <span className="text-sm text-text-muted">
          {date} · {orderNumber}
          {customerEmail ? ` · ${customerEmail}` : ""}
        </span>
        {error && <span className="text-[13px] text-[#b3261e]">{error}</span>}
      </div>
      <span className="text-[15px] font-extrabold text-nachtblau">{amountLabel}</span>
      <span
        className={`w-fit rounded-full px-2.5 py-1 text-[13px] font-extrabold ${statusClasses[status] ?? ""}`}
      >
        {statusLabels[status] ?? status}
      </span>
      {status === "bezahlt" && (
        <button
          type="button"
          onClick={handleRefund}
          disabled={busy}
          className="text-sm font-bold text-[#b3261e] disabled:opacity-60"
        >
          {busy ? "Erstatte …" : "Erstatten"}
        </button>
      )}
    </div>
  );
}
