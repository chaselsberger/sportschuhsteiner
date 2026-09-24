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

type Address = {
  line1: string | null;
  line2: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
};

function formatAddress(a: Address, name?: string | null) {
  const lines = [
    name,
    a.line1,
    a.line2,
    [a.postalCode, a.city].filter(Boolean).join(" "),
    a.country,
  ].filter((l): l is string => Boolean(l && l.trim()));
  return lines;
}

export function OrderRow({
  id,
  orderNumber,
  productTitle,
  amountLabel,
  customerEmail,
  customerName,
  customerPhone,
  status,
  createdAt,
  billingAddress,
  shippingName,
  shippingAddress,
  receiptUrl,
  invoiceUrl,
  type = "produkt",
  voucherCode = null,
  voucherRecipientName = null,
  voucherMessage = null,
  voucherRedeemed = false,
}: {
  id: string;
  orderNumber: string;
  productTitle: string;
  amountLabel: string;
  customerEmail: string | null;
  customerName: string | null;
  customerPhone: string | null;
  status: string;
  createdAt: string;
  billingAddress: Address;
  shippingName: string | null;
  shippingAddress: Address;
  receiptUrl: string | null;
  invoiceUrl: string | null;
  type?: string;
  voucherCode?: string | null;
  voucherRecipientName?: string | null;
  voucherMessage?: string | null;
  voucherRedeemed?: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isGutschein = type === "gutschein";

  async function handleToggleRedeemed() {
    setBusy(true);
    setError(null);
    const res = await fetch(`/api/admin/verkaeufe/${id}/einloesen`, { method: "POST" });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Fehlgeschlagen.");
      setBusy(false);
      return;
    }
    router.refresh();
  }

  async function handleResend() {
    setBusy(true);
    setError(null);
    const res = await fetch(`/api/admin/verkaeufe/${id}/erneut-senden`, { method: "POST" });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Versand fehlgeschlagen.");
      setBusy(false);
      return;
    }
    setBusy(false);
    alert("Gutschein wurde erneut per E-Mail verschickt.");
  }

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

  const billingLines = formatAddress(billingAddress, customerName);
  const shippingLines = formatAddress(shippingAddress, shippingName);

  return (
    <details className="group rounded-2xl border border-karte-rand bg-white p-3.5">
      <summary className="flex cursor-pointer list-none flex-col gap-2 [&::-webkit-details-marker]:hidden sm:flex-row sm:items-center sm:gap-3.5">
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="flex items-center gap-2 truncate text-[15px] font-bold text-nachtblau">
            {isGutschein && (
              <span className="rounded-full bg-[#eef2ff] px-2 py-0.5 text-[11px] font-extrabold text-[#3730a3]">
                Gutschein
              </span>
            )}
            {productTitle}
          </span>
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
        {isGutschein && (
          <span
            className={`w-fit rounded-full px-2.5 py-1 text-[13px] font-extrabold ${
              voucherRedeemed ? "bg-[#f3f0e8] text-text-muted" : "bg-[#e7f5ec] text-[#1f7a4a]"
            }`}
          >
            {voucherRedeemed ? "Eingelöst" : "Offen"}
          </span>
        )}
      </summary>

      <div className="mt-3.5 flex flex-col gap-3.5 border-t border-linie pt-3.5 sm:flex-row sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 text-sm">
          {isGutschein && (
            <div>
              <p className="m-0 text-[13px] font-extrabold text-nachtblau">Gutschein-Details</p>
              {voucherCode && (
                <p className="m-0 font-mono text-text-muted">{voucherCode}</p>
              )}
              {voucherRecipientName && (
                <p className="m-0 text-text-muted">
                  <span className="font-bold text-nachtblau">Für: </span>
                  {voucherRecipientName}
                </p>
              )}
              {voucherMessage && (
                <p className="m-0 text-text-muted">
                  <span className="font-bold text-nachtblau">Nachricht: </span>„{voucherMessage}“
                </p>
              )}
            </div>
          )}
          <div>
            <p className="m-0 text-[13px] font-extrabold text-nachtblau">Rechnungsadresse</p>
            {billingLines.length > 0 ? (
              billingLines.map((l, i) => (
                <p key={i} className="m-0 text-text-muted">
                  {l}
                </p>
              ))
            ) : (
              <p className="m-0 text-text-muted">Keine Adresse hinterlegt.</p>
            )}
          </div>
          {shippingLines.length > 0 && (
            <div>
              <p className="m-0 text-[13px] font-extrabold text-nachtblau">Lieferadresse</p>
              {shippingLines.map((l, i) => (
                <p key={i} className="m-0 text-text-muted">
                  {l}
                </p>
              ))}
            </div>
          )}
          {customerPhone && (
            <p className="m-0 text-text-muted">
              <span className="font-bold text-nachtblau">Telefon: </span>
              {customerPhone}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          {receiptUrl && (
            <a
              href={receiptUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-bold text-nachtblau underline"
            >
              Beleg (Stripe)
            </a>
          )}
          {invoiceUrl && (
            <a
              href={invoiceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-bold text-nachtblau underline"
            >
              Rechnung (Stripe)
            </a>
          )}
          {isGutschein && voucherCode && (
            <a
              href={`/api/gutscheine/${voucherCode}/pdf`}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-bold text-nachtblau underline"
            >
              Gutschein-PDF
            </a>
          )}
          {isGutschein && customerEmail && (
            <button
              type="button"
              onClick={handleResend}
              disabled={busy}
              className="text-sm font-bold text-nachtblau disabled:opacity-60"
            >
              {busy ? "Sende …" : "Erneut per E-Mail senden"}
            </button>
          )}
          {isGutschein && status === "bezahlt" && (
            <button
              type="button"
              onClick={handleToggleRedeemed}
              disabled={busy}
              className="text-sm font-bold text-nachtblau disabled:opacity-60"
            >
              {voucherRedeemed ? "Als offen markieren" : "Als eingelöst markieren"}
            </button>
          )}
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
      </div>
    </details>
  );
}
