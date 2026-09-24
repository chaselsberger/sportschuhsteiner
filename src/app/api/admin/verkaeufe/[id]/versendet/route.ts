import { NextResponse } from "next/server";
import { setOrderShipped } from "@/lib/orders";

/** Setzt/entfernt den Versendet-Status samt optionaler Sendungsnummer. */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const shipped = Boolean(body?.shipped);
  const trackingNumber =
    typeof body?.trackingNumber === "string" ? body.trackingNumber : null;

  try {
    const order = await setOrderShipped(id, shipped, trackingNumber);
    return NextResponse.json({
      ok: true,
      shipped: order.shipped,
      trackingNumber: order.trackingNumber,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Fehlgeschlagen.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
