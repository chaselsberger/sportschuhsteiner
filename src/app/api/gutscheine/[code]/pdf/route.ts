import { NextResponse } from "next/server";
import { renderVoucherPdf } from "@/lib/gift-vouchers";
import { prisma } from "@/lib/prisma";

/**
 * Liefert das Gutschein-PDF aus. Öffentlich erreichbar, aber der Code selbst
 * ist der Zugriffsschlüssel (hohe Entropie, wie ein Stripe-Beleglink) – wird
 * nur an den Käufer per E-Mail verschickt bzw. auf der Erfolgsseite direkt
 * nach der Zahlung angezeigt.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  if (!/^SSS-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code)) {
    return NextResponse.json({ error: "Ungültiger Gutscheincode." }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { voucherCode: code } });
  if (!order || order.type !== "gutschein" || order.status !== "bezahlt") {
    return NextResponse.json({ error: "Gutschein nicht gefunden." }, { status: 404 });
  }

  const pdf = await renderVoucherPdf({
    amount: order.amountTotal / 100,
    code: order.voucherCode!,
    recipientFirstName: order.voucherRecipientName,
    message: order.voucherMessage,
    issuedAt: order.createdAt,
  });

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="Gutschein-${order.voucherCode}.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}
