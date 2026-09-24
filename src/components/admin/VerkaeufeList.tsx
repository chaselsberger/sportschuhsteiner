"use client";

import { useMemo, useState } from "react";
import { OrderRow } from "@/components/admin/OrderRow";

type Address = {
  line1: string | null;
  line2: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
};

export type OrderListItem = {
  id: string;
  orderNumber: string;
  productTitle: string;
  amountLabel: string;
  customerEmail: string | null;
  customerName: string | null;
  customerPhone: string | null;
  status: string;
  createdAt: string;
  type: string;
  voucherCode: string | null;
  voucherRecipientName: string | null;
  voucherMessage: string | null;
  voucherRedeemed: boolean;
  voucherRedeemedAt: string | null;
  billingAddress: Address;
  shippingName: string | null;
  shippingAddress: Address;
  shipped: boolean;
  shippedAt: string | null;
  trackingNumber: string | null;
  note: string | null;
  receiptUrl: string | null;
  invoiceUrl: string | null;
  invoicePdfUrl: string | null;
  stripeSessionId: string | null;
  stripePaymentIntentId: string | null;
};

type Filter = "alle" | "zu-versenden" | "offene-gutscheine";

const filterLabels: Record<Filter, string> = {
  alle: "Alle",
  "zu-versenden": "Zu versenden",
  "offene-gutscheine": "Offene Gutscheine",
};

function isOpenShipment(o: OrderListItem) {
  return o.status === "bezahlt" && Boolean(o.shippingAddress.line1) && !o.shipped;
}

function isOpenVoucher(o: OrderListItem) {
  return o.status === "bezahlt" && o.type === "gutschein" && !o.voucherRedeemed;
}

export function VerkaeufeList({
  orders,
  stats,
}: {
  orders: OrderListItem[];
  stats: {
    total: number;
    openShipments: number;
    openVouchers: number;
    todayRevenueLabel: string;
  };
}) {
  const [filter, setFilter] = useState<Filter>("alle");
  const [search, setSearch] = useState("");
  const [shippingsFirst, setShippingsFirst] = useState(true);
  const [exportFrom, setExportFrom] = useState("");
  const [exportTo, setExportTo] = useState("");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    let list = orders.filter((o) => {
      if (filter === "zu-versenden" && !isOpenShipment(o)) return false;
      if (filter === "offene-gutscheine" && !isOpenVoucher(o)) return false;
      if (!term) return true;
      return (
        o.orderNumber.toLowerCase().includes(term) ||
        (o.customerName?.toLowerCase().includes(term) ?? false) ||
        (o.customerEmail?.toLowerCase().includes(term) ?? false)
      );
    });

    if (shippingsFirst) {
      list = [...list].sort((a, b) => Number(isOpenShipment(b)) - Number(isOpenShipment(a)));
    }

    return list;
  }, [orders, filter, search, shippingsFirst]);

  const exportHref = useMemo(() => {
    const params = new URLSearchParams();
    if (exportFrom) params.set("from", exportFrom);
    if (exportTo) params.set("to", exportTo);
    const query = params.toString();
    return `/api/admin/verkaeufe/export${query ? `?${query}` : ""}`;
  }, [exportFrom, exportTo]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <h1 className="t-h3 text-nachtblau">Verkäufe</h1>
        <span className="text-sm text-text-muted">{stats.total} gesamt</span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        <div className="rounded-2xl border border-karte-rand bg-white p-3.5">
          <p className="m-0 text-[13px] text-text-muted">Tagesumsatz</p>
          <p className="m-0 text-[20px] font-extrabold text-nachtblau">{stats.todayRevenueLabel}</p>
        </div>
        <div className="rounded-2xl border border-karte-rand bg-white p-3.5">
          <p className="m-0 text-[13px] text-text-muted">Offene Versendungen</p>
          <p className="m-0 text-[20px] font-extrabold text-nachtblau">{stats.openShipments}</p>
        </div>
        <div className="rounded-2xl border border-karte-rand bg-white p-3.5">
          <p className="m-0 text-[13px] text-text-muted">Offene Gutscheine</p>
          <p className="m-0 text-[20px] font-extrabold text-nachtblau">{stats.openVouchers}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(filterLabels) as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-bold ${
                filter === f
                  ? "border-nachtblau bg-nachtblau text-white"
                  : "border-formrand bg-white text-nachtblau hover:border-nachtblau"
              }`}
            >
              {filterLabels[f]}
              {f === "zu-versenden" && stats.openShipments > 0 ? ` (${stats.openShipments})` : ""}
              {f === "offene-gutscheine" && stats.openVouchers > 0 ? ` (${stats.openVouchers})` : ""}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Suche nach Bestellnummer, Name oder E-Mail …"
            className="min-w-[240px] flex-1 rounded-lg border border-karte-rand px-3 py-2 text-sm text-nachtblau outline-none focus:border-nachtblau"
          />
          <label className="flex items-center gap-1.5 text-sm text-text-muted">
            <input
              type="checkbox"
              checked={shippingsFirst}
              onChange={(e) => setShippingsFirst(e.target.checked)}
              className="h-4 w-4"
            />
            Offene Versendungen zuerst
          </label>
        </div>

        <div className="flex flex-wrap items-end gap-2.5 rounded-2xl border border-karte-rand bg-white p-3.5">
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-bold text-text-muted">Von</label>
            <input
              type="date"
              value={exportFrom}
              onChange={(e) => setExportFrom(e.target.value)}
              className="rounded-lg border border-karte-rand px-2.5 py-1.5 text-sm text-nachtblau outline-none focus:border-nachtblau"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-bold text-text-muted">Bis</label>
            <input
              type="date"
              value={exportTo}
              onChange={(e) => setExportTo(e.target.value)}
              className="rounded-lg border border-karte-rand px-2.5 py-1.5 text-sm text-nachtblau outline-none focus:border-nachtblau"
            />
          </div>
          <a
            href={exportHref}
            className="rounded-lg bg-nachtblau px-3.5 py-2 text-sm font-bold text-white"
          >
            Als CSV exportieren
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {filtered.map((o) => (
          <OrderRow
            key={o.id}
            id={o.id}
            orderNumber={o.orderNumber}
            productTitle={o.productTitle}
            amountLabel={o.amountLabel}
            customerEmail={o.customerEmail}
            customerName={o.customerName}
            customerPhone={o.customerPhone}
            status={o.status}
            createdAt={o.createdAt}
            type={o.type}
            voucherCode={o.voucherCode}
            voucherRecipientName={o.voucherRecipientName}
            voucherMessage={o.voucherMessage}
            voucherRedeemed={o.voucherRedeemed}
            voucherRedeemedAt={o.voucherRedeemedAt}
            billingAddress={o.billingAddress}
            shippingName={o.shippingName}
            shippingAddress={o.shippingAddress}
            shipped={o.shipped}
            shippedAt={o.shippedAt}
            trackingNumber={o.trackingNumber}
            note={o.note}
            receiptUrl={o.receiptUrl}
            invoiceUrl={o.invoiceUrl}
            invoicePdfUrl={o.invoicePdfUrl}
            stripeSessionId={o.stripeSessionId}
            stripePaymentIntentId={o.stripePaymentIntentId}
          />
        ))}
        {filtered.length === 0 && (
          <p className="m-0 text-sm text-text-muted">
            {orders.length === 0 ? "Noch keine Verkäufe." : "Keine Verkäufe für diese Auswahl."}
          </p>
        )}
      </div>
    </div>
  );
}
