import { NextResponse } from "next/server";
import { brand } from "@/brand.config";
import {
  VOUCHER_MAX_AMOUNT,
  VOUCHER_MIN_AMOUNT,
  generateUniqueVoucherCode,
} from "@/lib/gift-vouchers";
import { stripe } from "@/lib/stripe";

function generateOrderNumber(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
  return `GS-${date}-${suffix}`;
}

/**
 * Startet den Stripe-Checkout für einen Wertgutschein. Der Betrag wird
 * serverseitig geprüft (10–500 €), Empfängername/Nachricht landen als
 * Metadata auf der Session, damit der Webhook daraus Order + PDF erzeugen
 * kann – ohne Client-Input für Preis oder Gutscheincode zu übernehmen.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const amount = Number(body?.amount);
  const recipientFirstName =
    typeof body?.recipientFirstName === "string" ? body.recipientFirstName.trim().slice(0, 30) : "";
  const message = typeof body?.message === "string" ? body.message.trim().slice(0, 120) : "";

  if (!Number.isFinite(amount) || !Number.isInteger(amount)) {
    return NextResponse.json({ error: "Ungültiger Betrag." }, { status: 400 });
  }
  if (amount < VOUCHER_MIN_AMOUNT || amount > VOUCHER_MAX_AMOUNT) {
    return NextResponse.json(
      { error: `Der Betrag muss zwischen € ${VOUCHER_MIN_AMOUNT} und € ${VOUCHER_MAX_AMOUNT} liegen.` },
      { status: 400 },
    );
  }

  const orderNumber = generateOrderNumber();
  const voucherCode = await generateUniqueVoucherCode();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "de",
    submit_type: "pay",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: amount * 100,
          product_data: {
            name: `Wertgutschein € ${amount}`,
            description: recipientFirstName
              ? `Sport Schuh Steiner · für ${recipientFirstName}`
              : "Sport Schuh Steiner",
          },
        },
      },
    ],
    metadata: {
      type: "gutschein",
      voucherAmount: String(amount),
      voucherCode,
      orderNumber,
      recipientFirstName,
      voucherMessage: message,
    },
    success_url: `${brand.siteUrl}/gutscheine/erfolg?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${brand.siteUrl}/gutscheine/kaufen?checkout=abgebrochen`,
  });

  if (!session.url) {
    return NextResponse.json({ error: "Checkout konnte nicht gestartet werden." }, { status: 502 });
  }

  return NextResponse.json({ url: session.url });
}
