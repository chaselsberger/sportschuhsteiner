import { NextResponse } from "next/server";
import { brand } from "@/brand.config";
import { createGiftVoucherOrderFromSession, renderVoucherPdf } from "@/lib/gift-vouchers";
import { sendVoucherEmail } from "@/lib/mailer";
import { createOrderFromSession, markOrderRefundedByPaymentIntent } from "@/lib/orders";
import { stripe } from "@/lib/stripe";

const webhookSecret = brand.isStaging
  ? process.env.STRIPE_WEBHOOK_SECRET_TEST
  : process.env.STRIPE_WEBHOOK_SECRET;

/**
 * Nimmt Stripe-Events entgegen (Bestellung abgeschlossen, Erstattung). Kommt
 * direkt von Stripe – kein Admin-Login, stattdessen Signaturprüfung. Liegt
 * bewusst außerhalb von /admin und /api/admin (siehe src/proxy.ts), damit die
 * Session-Middleware nicht dazwischenfunkt.
 */
export async function POST(request: Request) {
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET fehlt in .env" },
      { status: 500 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Fehlende Signatur." }, { status: 400 });
  }

  const rawBody = await request.text();

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      webhookSecret,
    );
  } catch {
    return NextResponse.json({ error: "Ungültige Signatur." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      if (session.payment_status === "paid") {
        if (session.metadata?.type === "gutschein") {
          const order = await createGiftVoucherOrderFromSession(session);
          if (order.customerEmail && order.voucherCode) {
            const pdf = await renderVoucherPdf({
              amount: order.amountTotal / 100,
              code: order.voucherCode,
              recipientFirstName: order.voucherRecipientName,
              message: order.voucherMessage,
              issuedAt: order.createdAt,
            });
            await sendVoucherEmail({
              to: order.customerEmail,
              recipientFirstName: order.voucherRecipientName,
              amountLabel: `€ ${(order.amountTotal / 100).toLocaleString("de-AT")}`,
              voucherCode: order.voucherCode,
              pdf,
            }).catch((err) => console.error("[webhook] Gutschein-Mail fehlgeschlagen", err));
          }
        } else {
          await createOrderFromSession(session);
        }
      }
      break;
    }
    case "charge.refunded": {
      const charge = event.data.object;
      const paymentIntentId =
        typeof charge.payment_intent === "string" ? charge.payment_intent : null;
      if (paymentIntentId) {
        await markOrderRefundedByPaymentIntent(paymentIntentId);
      }
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
