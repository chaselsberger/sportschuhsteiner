import { NextResponse } from "next/server";
import { listOrders } from "@/lib/orders";
import { euro } from "@/lib/product-types";

const statusLabels: Record<string, string> = {
  bezahlt: "Bezahlt",
  storniert: "Storniert",
  erstattet: "Erstattet",
};

function escapeCsvField(value: string) {
  if (/[;"\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

/** Exportiert Verkäufe eines Zeitraums als CSV (Semikolon-getrennt, für
 * Buchhaltung/Steuerberater). `from`/`to` als YYYY-MM-DD, jeweils optional. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");

  const from = fromParam ? new Date(`${fromParam}T00:00:00`) : undefined;
  const to = toParam ? new Date(`${toParam}T23:59:59`) : undefined;

  const orders = await listOrders({ from, to });

  const header = [
    "Datum",
    "Bestellnummer",
    "Typ",
    "Produkt",
    "Betrag",
    "Kunde",
    "E-Mail",
    "Status",
    "Versendet",
    "Sendungsnummer",
    "Notiz",
  ];

  const rows = orders.map((o) => [
    o.createdAt.toLocaleDateString("de-AT"),
    o.orderNumber,
    o.type === "gutschein" ? "Gutschein" : "Produkt",
    o.productTitle,
    euro(o.amountTotal / 100),
    o.customerName ?? "",
    o.customerEmail ?? "",
    statusLabels[o.status] ?? o.status,
    o.shippingAddressLine1 ? (o.shipped ? "Ja" : "Nein") : "",
    o.trackingNumber ?? "",
    o.note ?? "",
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map(escapeCsvField).join(";"))
    .join("\r\n");

  const filename = `verkaeufe-${fromParam ?? "alle"}-bis-${toParam ?? "alle"}.csv`;

  return new NextResponse(`﻿${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
