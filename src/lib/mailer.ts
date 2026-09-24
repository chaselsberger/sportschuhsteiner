import "server-only";
import nodemailer from "nodemailer";
import { brand } from "@/brand.config";

/**
 * Verschickt den Gutschein per E-Mail (PDF-Anhang). Nutzt SMTP-Zugangsdaten
 * aus .env (SMTP_HOST/PORT/USER/PASSWORD) – fehlen sie, wird nur eine Warnung
 * geloggt statt eines Absturzes: der Kauf und der Download auf der
 * Erfolgsseite funktionieren dann trotzdem, nur der automatische Versand
 * fehlt, bis SMTP eingerichtet ist.
 */
function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  if (!host || !port || !user || !password) return null;

  return nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: { user, pass: password },
  });
}

export async function sendVoucherEmail(params: {
  to: string;
  recipientFirstName: string | null;
  amountLabel: string;
  voucherCode: string;
  pdf: Buffer;
}) {
  const transport = getTransport();
  if (!transport) {
    console.warn(
      `[mailer] SMTP nicht konfiguriert – Gutschein ${params.voucherCode} wurde NICHT per E-Mail verschickt. ` +
        "Zum Aktivieren SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASSWORD in .env eintragen.",
    );
    return false;
  }

  const greeting = params.recipientFirstName
    ? `für ${params.recipientFirstName}`
    : "";

  await transport.sendMail({
    from: `"${brand.name}" <${brand.contact.email}>`,
    to: params.to,
    subject: `Ihr Gutschein ${greeting} · ${brand.name}`,
    text:
      `Vielen Dank für Ihren Einkauf!\n\n` +
      `Im Anhang finden Sie Ihren Gutschein über ${params.amountLabel} ` +
      `(Gutschein-Nr. ${params.voucherCode}) als PDF zum Ausdrucken oder Weiterleiten.\n\n` +
      `Einlösbar im Geschäft in Scheffau am Wilden Kaiser.\n\n` +
      `${brand.name}\n${brand.contact.email}\n${brand.contact.phoneDisplay}`,
    attachments: [
      {
        filename: `Gutschein-${params.voucherCode}.pdf`,
        content: params.pdf,
        contentType: "application/pdf",
      },
    ],
  });

  return true;
}

/** Informiert den Kunden per E-Mail, sobald seine Bestellung als versendet
 * markiert wurde – inklusive Sendungsnummer, falls hinterlegt. Nutzt
 * dieselben SMTP-Zugangsdaten wie sendVoucherEmail und degradiert genauso
 * sanft, falls SMTP noch nicht konfiguriert ist. */
export async function sendShippedEmail(params: {
  to: string;
  customerFirstName: string | null;
  productTitle: string;
  orderNumber: string;
  trackingNumber: string | null;
}) {
  const transport = getTransport();
  if (!transport) {
    console.warn(
      `[mailer] SMTP nicht konfiguriert – Versandbenachrichtigung für Bestellung ${params.orderNumber} wurde NICHT verschickt.`,
    );
    return false;
  }

  const greeting = params.customerFirstName ? `Hallo ${params.customerFirstName}` : "Hallo";
  const trackingLine = params.trackingNumber
    ? `\nSendungsnummer: ${params.trackingNumber}\n`
    : "";

  await transport.sendMail({
    from: `"${brand.name}" <${brand.contact.email}>`,
    to: params.to,
    subject: `Ihre Bestellung ist unterwegs · ${brand.name}`,
    text:
      `${greeting},\n\n` +
      `gute Nachrichten: „${params.productTitle}“ (Bestell-Nr. ${params.orderNumber}) wurde soeben versendet.\n` +
      trackingLine +
      `\n${brand.name}\n${brand.contact.email}\n${brand.contact.phoneDisplay}`,
  });

  return true;
}
