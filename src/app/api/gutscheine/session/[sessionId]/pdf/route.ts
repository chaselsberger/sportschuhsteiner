import { NextResponse } from "next/server";
import { renderVoucherPdf } from "@/lib/gift-vouchers";
import { stripe } from "@/lib/stripe";

/**
 * Liefert das Gutschein-PDF direkt anhand der Stripe-Checkout-Session aus –
 * unabhängig von der DB-Order (die erst asynchron per Webhook entsteht).
 * Verhindert, dass der Download auf der Erfolgsseite kurz nach der Zahlung
 * fehlschlägt, nur weil der Webhook noch nicht durchgelaufen ist. Für den
 * E-Mail-Versand (nach dem Webhook) wird stattdessen die code-basierte Route
 * verwendet, siehe /api/gutscheine/[code]/pdf.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> },
) {
  const { sessionId } = await params;

  const session = await stripe.checkout.sessions.retrieve(sessionId).catch(() => null);
  if (
    !session ||
    session.payment_status !== "paid" ||
    session.metadata?.type !== "gutschein" ||
    typeof session.metadata.voucherCode !== "string"
  ) {
    return NextResponse.json({ error: "Gutschein nicht gefunden." }, { status: 404 });
  }

  const amount = Number(session.metadata.voucherAmount ?? 0);
  const recipientFirstName =
    typeof session.metadata.recipientFirstName === "string" && session.metadata.recipientFirstName
      ? session.metadata.recipientFirstName
      : null;
  const message =
    typeof session.metadata.voucherMessage === "string" && session.metadata.voucherMessage
      ? session.metadata.voucherMessage
      : null;

  const pdf = await renderVoucherPdf({
    amount,
    code: session.metadata.voucherCode,
    recipientFirstName,
    message,
    issuedAt: new Date(session.created * 1000),
  });

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="Gutschein-${session.metadata.voucherCode}.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}
