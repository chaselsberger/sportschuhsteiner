import { NextResponse } from "next/server";
import { brand } from "@/brand.config";
import { getSellableProductBySlug } from "@/lib/products";
import { stripe } from "@/lib/stripe";

/** Kurze, für Kunden lesbare Bestellnummer (z. B. "SO-20260923-A7K2") statt der langen Stripe-Session-ID. */
function generateOrderNumber(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `SO-${date}-${suffix}`;
}

/**
 * Erstellt eine Stripe-Checkout-Session für genau 1 Paar (Einzelstück, Menge
 * immer 1). Preis und Verfügbarkeit kommen serverseitig aus der Datenbank —
 * nie vom Client übernehmen, sonst könnte der Preis manipuliert werden.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const slug = typeof body?.slug === "string" ? body.slug : null;

  if (!slug) {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const product = await getSellableProductBySlug(slug);
  if (!product) {
    return NextResponse.json(
      { error: "Produkt nicht verfügbar." },
      { status: 404 },
    );
  }

  const orderNumber = generateOrderNumber();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "de",
    submit_type: "pay",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: `${product.brand} ${product.model} · Gr. ${product.size}`,
            description: `${product.gender} · ${product.sizeDetails}`,
            images: [`${brand.siteUrl}${product.imagePath}`],
          },
        },
      },
    ],
    shipping_address_collection: {
      allowed_countries: ["AT", "DE"],
    },
    metadata: {
      productId: product.id,
      slug: product.slug,
      orderNumber,
    },
    success_url: `${brand.siteUrl}/shop/erfolg?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${brand.siteUrl}/shop/${product.slug}?checkout=abgebrochen`,
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Checkout konnte nicht gestartet werden." },
      { status: 502 },
    );
  }

  return NextResponse.json({ url: session.url });
}
