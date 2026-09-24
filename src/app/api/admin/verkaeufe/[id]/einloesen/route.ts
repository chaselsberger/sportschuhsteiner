import { NextResponse } from "next/server";
import { toggleVoucherRedeemed } from "@/lib/orders";

/** Markiert einen Gutschein als (nicht) eingelöst – z. B. wenn er im
 * Geschäft gegen Ware/Leistung eingetauscht wurde. */
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const order = await toggleVoucherRedeemed(id);
    return NextResponse.json({ ok: true, voucherRedeemed: order.voucherRedeemed });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Fehlgeschlagen.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
