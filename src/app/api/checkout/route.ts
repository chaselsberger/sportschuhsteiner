import { NextResponse } from "next/server";
import { brand } from "@/brand.config";
import { demoProducts } from "@/lib/demo-products";
import { stripe } from "@/lib/stripe";

/**
 * Erstellt eine Stripe-Checkout-Session für genau 1 Paar (Einzelstück, Menge
 * immer 1). Der Preis kommt serverseitig aus demoProducts — nie vom Client
 * übernehmen, sonst könnte der Preis manipuliert werden.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const slug = typeof body?.slug === "string" ? body.slug : null;

  if (!slug) {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const product = demoProducts.find((p) => p.slug === slug);
  if (!product) {
    return NextResponse.json(
      { error: "Produkt nicht gefunden." },
      { status: 404 },
    );
  }

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
            images: [`${brand.siteUrl}${product.image}`],
          },
        },
      },
    ],
    shipping_address_collection: {
      allowed_countries: ["AT", "DE"],
    },
    metadata: {
      slug: product.slug,
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
