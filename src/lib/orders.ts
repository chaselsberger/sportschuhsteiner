import "server-only";
import type Stripe from "stripe";
import { prisma } from "./prisma";
import { sendShippedEmail } from "./mailer";
import { markProductSold } from "./products";
import { stripe } from "./stripe";

/** Generiert eine kurze Bestellnummer, falls die Session (aus welchem Grund
 * auch immer) keine `orderNumber` im Metadata-Feld trägt. */
function fallbackOrderNumber(session: Stripe.Checkout.Session) {
  return session.id;
}

/** Holt den von Stripe gehosteten Kassenbon-Link über die zugehörige Charge. */
async function fetchReceiptUrl(paymentIntentId: string): Promise<string | null> {
  const paymentIntent = await stripe.paymentIntents
    .retrieve(paymentIntentId, { expand: ["latest_charge"] })
    .catch(() => null);
  const charge = paymentIntent?.latest_charge;
  if (!charge || typeof charge === "string") return null;
  return charge.receipt_url ?? null;
}

/**
 * Legt aus einer abgeschlossenen Stripe-Checkout-Session eine Order an
 * (idempotent über `stripeSessionId @unique` — der Webhook kann dasselbe
 * Event mehrfach zugestellt bekommen, Stripe verlangt das explizit).
 * Markiert außerdem das zugehörige Produkt als verkauft.
 */
export async function createOrderFromSession(session: Stripe.Checkout.Session) {
  const existing = await prisma.order.findUnique({
    where: { stripeSessionId: session.id },
  });
  if (existing) return existing;

  const productId =
    typeof session.metadata?.productId === "string"
      ? session.metadata.productId
      : null;
  const orderNumber =
    typeof session.metadata?.orderNumber === "string"
      ? session.metadata.orderNumber
      : fallbackOrderNumber(session);

  const product = productId
    ? await prisma.product.findUnique({ where: { id: productId } })
    : null;

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : (session.payment_intent?.id ?? null);

  const receiptUrl = paymentIntentId ? await fetchReceiptUrl(paymentIntentId) : null;

  const invoiceId =
    typeof session.invoice === "string" ? session.invoice : (session.invoice?.id ?? null);
  let invoiceUrl: string | null = null;
  let invoicePdfUrl: string | null = null;
  if (invoiceId) {
    const invoice = await stripe.invoices.retrieve(invoiceId).catch(() => null);
    invoiceUrl = invoice?.hosted_invoice_url ?? null;
    invoicePdfUrl = invoice?.invoice_pdf ?? null;
  }

  const billingAddress = session.customer_details?.address;
  const shipping = session.collected_information?.shipping_details;

  const order = await prisma.order.create({
    data: {
      orderNumber,
      stripeSessionId: session.id,
      stripePaymentIntentId: paymentIntentId,
      productId: product?.id,
      productTitle: product ? `${product.brand} ${product.model}` : "Unbekanntes Produkt",
      amountTotal: session.amount_total ?? 0,
      currency: session.currency ?? "eur",
      customerEmail: session.customer_details?.email ?? null,
      customerName: session.customer_details?.name ?? null,
      customerPhone: session.customer_details?.phone ?? null,
      billingAddressLine1: billingAddress?.line1 ?? null,
      billingAddressLine2: billingAddress?.line2 ?? null,
      billingCity: billingAddress?.city ?? null,
      billingPostalCode: billingAddress?.postal_code ?? null,
      billingCountry: billingAddress?.country ?? null,
      shippingName: shipping?.name ?? null,
      shippingAddressLine1: shipping?.address?.line1 ?? null,
      shippingAddressLine2: shipping?.address?.line2 ?? null,
      shippingCity: shipping?.address?.city ?? null,
      shippingPostalCode: shipping?.address?.postal_code ?? null,
      shippingCountry: shipping?.address?.country ?? null,
      receiptUrl,
      invoiceUrl,
      invoicePdfUrl,
    },
  });

  if (productId) {
    await markProductSold(productId);
  }

  return order;
}

/** Hält den Order-Status synchron, falls eine Erstattung direkt im
 * Stripe-Dashboard statt über die Admin-PWA ausgelöst wurde. */
export async function markOrderRefundedByPaymentIntent(paymentIntentId: string) {
  await prisma.order.updateMany({
    where: { stripePaymentIntentId: paymentIntentId, status: "bezahlt" },
    data: { status: "erstattet" },
  });
}

export async function listOrders(range?: { from?: Date; to?: Date }) {
  const hasRange = range?.from || range?.to;
  return prisma.order.findMany({
    where: hasRange
      ? {
          createdAt: {
            ...(range?.from ? { gte: range.from } : {}),
            ...(range?.to ? { lte: range.to } : {}),
          },
        }
      : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export async function getOrderByStripeSessionId(sessionId: string) {
  return prisma.order.findUnique({ where: { stripeSessionId: sessionId } });
}

/** Kippt den Eingelöst-Status eines Gutscheins (z. B. bei Einlösung im Geschäft). */
export async function toggleVoucherRedeemed(orderId: string) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("Bestellung nicht gefunden.");
  if (order.type !== "gutschein") throw new Error("Kein Gutschein.");

  return prisma.order.update({
    where: { id: orderId },
    data: {
      voucherRedeemed: !order.voucherRedeemed,
      voucherRedeemedAt: !order.voucherRedeemed ? new Date() : null,
    },
  });
}

/** Markiert eine Bestellung als versendet (mit optionaler Sendungsnummer)
 * bzw. macht das rückgängig, falls versehentlich gesetzt. Verschickt beim
 * Wechsel auf "versendet" automatisch eine Benachrichtigung an den Kunden. */
export async function setOrderShipped(
  orderId: string,
  shipped: boolean,
  trackingNumber?: string | null,
) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("Bestellung nicht gefunden.");

  const updated = await prisma.order.update({
    where: { id: orderId },
    data: {
      shipped,
      shippedAt: shipped ? new Date() : null,
      trackingNumber: trackingNumber?.trim() || null,
    },
  });

  if (shipped && !order.shipped && updated.customerEmail) {
    await sendShippedEmail({
      to: updated.customerEmail,
      customerFirstName: updated.customerName?.split(" ")[0] ?? null,
      productTitle: updated.productTitle,
      orderNumber: updated.orderNumber,
      trackingNumber: updated.trackingNumber,
    }).catch((err) => console.error("[mailer] Versandbenachrichtigung fehlgeschlagen:", err));
  }

  return updated;
}

/** Speichert die interne Notiz zu einem Verkauf (z. B. Rückfragen, Sonderwünsche). */
export async function setOrderNote(orderId: string, note: string) {
  return prisma.order.update({
    where: { id: orderId },
    data: { note: note.trim() || null },
  });
}

/** Löst die Rückerstattung bei Stripe aus und markiert die Order lokal. */
export async function refundOrder(orderId: string) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("Bestellung nicht gefunden.");
  if (order.status !== "bezahlt") return order;
  if (!order.stripePaymentIntentId) {
    throw new Error("Keine Zahlungs-ID hinterlegt, Erstattung nicht möglich.");
  }

  await stripe.refunds.create({ payment_intent: order.stripePaymentIntentId });

  return prisma.order.update({
    where: { id: orderId },
    data: { status: "erstattet" },
  });
}
