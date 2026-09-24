import "server-only";
import type Stripe from "stripe";
import { prisma } from "./prisma";
import { markProductSold } from "./products";
import { stripe } from "./stripe";

/** Generiert eine kurze Bestellnummer, falls die Session (aus welchem Grund
 * auch immer) keine `orderNumber` im Metadata-Feld trägt. */
function fallbackOrderNumber(session: Stripe.Checkout.Session) {
  return session.id;
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

export async function listOrders() {
  return prisma.order.findMany({ orderBy: { createdAt: "desc" } });
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
