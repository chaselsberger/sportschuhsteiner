import { NextResponse } from "next/server";
import { renderVoucherPdf } from "@/lib/gift-vouchers";
import { sendVoucherEmail } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";

/** Verschickt den Gutschein per Mail erneut – falls der Kunde ihn verlegt hat
 * oder die automatische Mail (z. B. wegen SMTP-Ausfall) nicht ankam. */
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const order = await prisma.order.findUnique({ where: { id } });

  if (!order || order.type !== "gutschein" || !order.voucherCode) {
    return NextResponse.json({ error: "Kein Gutschein." }, { status: 400 });
  }
  if (!order.customerEmail) {
    return NextResponse.json({ error: "Keine E-Mail-Adresse hinterlegt." }, { status: 400 });
  }

  const pdf = await renderVoucherPdf({
    amount: order.amountTotal / 100,
    code: order.voucherCode,
    recipientFirstName: order.voucherRecipientName,
    message: order.voucherMessage,
    issuedAt: order.createdAt,
  });

  const sent = await sendVoucherEmail({
    to: order.customerEmail,
    recipientFirstName: order.voucherRecipientName,
    amountLabel: `€ ${(order.amountTotal / 100).toLocaleString("de-AT")}`,
    voucherCode: order.voucherCode,
    pdf,
  });

  if (!sent) {
    return NextResponse.json(
      { error: "SMTP ist nicht konfiguriert – E-Mail-Versand derzeit nicht möglich." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
