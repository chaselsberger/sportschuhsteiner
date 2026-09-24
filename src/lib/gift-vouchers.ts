import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import { PDFDocument } from "pdf-lib";
import sharp from "sharp";
import type Stripe from "stripe";
import { prisma } from "./prisma";

/** Kleinster/größter online kaufbarer Wertgutschein-Betrag, in vollen Euro. */
export const VOUCHER_MIN_AMOUNT = 10;
export const VOUCHER_MAX_AMOUNT = 500;
export const VOUCHER_PRESET_AMOUNTS = [25, 50, 100, 150, 200];

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** Kurzer, gut vorlesbarer Gutscheincode, z. B. "SSS-4F7K-2Q9X". Dient auch
 * als Bearer-Token für den PDF-Download-Link, siehe /api/gutscheine/[code]/pdf. */
function randomVoucherCode(): string {
  let part1 = "";
  let part2 = "";
  for (let i = 0; i < 4; i++) part1 += CHARS[Math.floor(Math.random() * CHARS.length)];
  for (let i = 0; i < 4; i++) part2 += CHARS[Math.floor(Math.random() * CHARS.length)];
  return `SSS-${part1}-${part2}`;
}

/** Generiert einen Gutscheincode und stellt sicher, dass er noch nicht vergeben ist. */
export async function generateUniqueVoucherCode(): Promise<string> {
  for (let attempt = 0; attempt < 10; attempt++) {
    const code = randomVoucherCode();
    const existing = await prisma.order.findUnique({ where: { voucherCode: code } });
    if (!existing) return code;
  }
  throw new Error("Konnte keinen eindeutigen Gutscheincode erzeugen.");
}

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

let templateCache: string | null = null;
function loadTemplate(): string {
  if (!templateCache) {
    templateCache = readFileSync(
      path.join(process.cwd(), "content", "gutschein-vorlage.svg"),
      "utf8",
    );
  }
  return templateCache;
}

export type VoucherPdfData = {
  amount: number;
  code: string;
  recipientFirstName: string | null;
  message: string | null;
  issuedAt: Date;
};

/** Baut das personalisierte Gutschein-PDF (A4) aus der SVG-Vorlage. */
export async function renderVoucherPdf(data: VoucherPdfData): Promise<Buffer> {
  let svg = loadTemplate();

  const wert = data.amount.toLocaleString("de-AT", { minimumFractionDigits: 0 });
  const datum = data.issuedAt.toLocaleDateString("de-AT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const nummer = data.code.replace(/^SSS-/, "").replace(/-/g, "");

  svg = svg.replace("{{WERT}}", xmlEscape(wert));
  svg = svg.replace("{{DATUM}}", xmlEscape(datum));
  svg = svg.replace("{{NUMMER}}", xmlEscape(nummer));

  const recipient = data.recipientFirstName?.trim();
  if (recipient) {
    const name = recipient.toUpperCase();
    // Lt. Vorlagen-Notiz: bei ungewöhnlich langen Namen (>14 Zeichen) die
    // Schriftgröße dieses Elements reduzieren, damit es nicht am Rand knapp wird.
    const fontSize = name.length > 14 ? 9.5 : 12.5;
    svg = svg.replace(
      '<text x="14" y="193" class="display" font-size="12.5" fill="#F0E552" letter-spacing="0.3">{{VORNAME}}</text>',
      `<text x="14" y="193" class="display" font-size="${fontSize}" fill="#F0E552" letter-spacing="0.3">${xmlEscape(name)}</text>`,
    );
  } else {
    svg = svg.replace(
      '<text x="14" y="193" class="display" font-size="12.5" fill="#F0E552" letter-spacing="0.3">{{VORNAME}}</text>',
      '<text x="14" y="193" class="display" font-size="12.5" fill="#F0E552" letter-spacing="0.3">FÜR DICH</text>',
    );
  }

  const message = data.message?.trim();
  if (message) {
    svg = svg.replace(/&#8222;\{\{FREITEXT\}\}&#8220;/, `&#8222;${xmlEscape(message)}&#8220;`);
  } else {
    // Leeres Freitext-Feld inkl. Label darüber ganz entfernen, statt leere
    // Anführungszeichen auf dem Gutschein zu zeigen (siehe LIESMICH der Vorlage).
    svg = svg.replace(
      /<text x="96\.0" y="116"[^>]*>PERS&#214;NLICHE NACHRICHT \(OPTIONAL\)<\/text>\s*<g id="ph-freitext">[\s\S]*?<\/g>/,
      "",
    );
  }

  const png = await sharp(Buffer.from(svg), { density: 170 }).png().toBuffer();
  const jpeg = await sharp(png).flatten({ background: "#1A2E39" }).jpeg({ quality: 92 }).toBuffer();
  const meta = await sharp(jpeg).metadata();

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]); // A4 in pt
  const image = await pdf.embedJpg(jpeg);
  const scale = Math.min(page.getWidth() / (meta.width ?? 1), page.getHeight() / (meta.height ?? 1));
  const w = (meta.width ?? 0) * scale;
  const h = (meta.height ?? 0) * scale;
  page.drawImage(image, {
    x: (page.getWidth() - w) / 2,
    y: (page.getHeight() - h) / 2,
    width: w,
    height: h,
  });

  return Buffer.from(await pdf.save());
}

/** Legt aus einer bezahlten Stripe-Checkout-Session (metadata.type ===
 * "gutschein") die Order + das PDF an. Idempotent über `stripeSessionId`. */
export async function createGiftVoucherOrderFromSession(
  session: Stripe.Checkout.Session,
) {
  const existing = await prisma.order.findUnique({ where: { stripeSessionId: session.id } });
  if (existing) return existing;

  const metadata = session.metadata ?? {};
  const amount = Number(metadata.voucherAmount ?? 0);
  const code = typeof metadata.voucherCode === "string" ? metadata.voucherCode : null;
  const orderNumber =
    typeof metadata.orderNumber === "string" ? metadata.orderNumber : session.id;
  const recipientFirstName =
    typeof metadata.recipientFirstName === "string" && metadata.recipientFirstName
      ? metadata.recipientFirstName
      : null;
  const message =
    typeof metadata.voucherMessage === "string" && metadata.voucherMessage
      ? metadata.voucherMessage
      : null;

  if (!code) {
    throw new Error(`Gutschein-Session ${session.id} hat keinen voucherCode im Metadata.`);
  }

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : (session.payment_intent?.id ?? null);

  const billingAddress = session.customer_details?.address;

  const order = await prisma.order.create({
    data: {
      orderNumber,
      stripeSessionId: session.id,
      stripePaymentIntentId: paymentIntentId,
      productTitle: `Wertgutschein ${amount.toLocaleString("de-AT")} €`,
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
      type: "gutschein",
      voucherCode: code,
      voucherRecipientName: recipientFirstName,
      voucherMessage: message,
    },
  });

  return order;
}
