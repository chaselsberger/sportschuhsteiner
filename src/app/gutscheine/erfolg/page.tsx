import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { brand } from "@/brand.config";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Gutschein-Bestellung bestätigt",
  robots: { index: false, follow: false },
};

export default async function GutscheinErfolgPage({
  searchParams,
}: PageProps<"/gutscheine/erfolg">) {
  const { session_id: sessionId } = await searchParams;

  if (typeof sessionId !== "string" || !sessionId) {
    redirect("/gutscheine");
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId).catch(() => null);

  if (!session || session.payment_status !== "paid" || session.metadata?.type !== "gutschein") {
    redirect("/gutscheine");
  }

  const amount = Number(session.metadata.voucherAmount ?? 0);
  const voucherCode = session.metadata.voucherCode ?? "";
  const orderNumber = session.metadata.orderNumber ?? session.id;
  const pdfUrl = `/api/gutscheine/session/${session.id}/pdf`;

  return (
    <div className="pb-16">
      <PageHero
        crumbs={[{ href: "/gutscheine", label: "Gutscheine" }, { label: "Bestellung bestätigt" }]}
        title="Danke für Ihren Einkauf!"
        lead="Ihr Gutschein ist fertig – laden Sie ihn hier herunter oder prüfen Sie Ihr Postfach."
      />

      <section className="page-x flex flex-col items-start gap-6 pt-8 lg:pt-11">
        <div className="flex w-full max-w-[560px] flex-col gap-5 rounded-[22px] border border-karte-rand bg-white p-6 lg:p-7">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e7f5ec] text-[#1f7a4a]">
              <Icon name="check" size={24} />
            </span>
            <div className="flex flex-col">
              <span className="text-[15px] font-extrabold text-nachtblau">
                Zahlung erfolgreich
              </span>
              {session.customer_details?.email && (
                <span className="text-sm text-text-muted">
                  Bestätigung & Gutschein gesendet an {session.customer_details.email}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-[#EFEAE0] pt-4">
            <span className="text-[15px] text-text">Wertgutschein</span>
            <span className="text-[15px] font-extrabold text-nachtblau">€ {amount}</span>
          </div>

          <p className="m-0 text-sm text-text-muted">
            Bestellnummer: <span className="break-all font-mono">{orderNumber}</span>
            {voucherCode && (
              <>
                <br />
                Gutschein-Nr.: <span className="break-all font-mono">{voucherCode}</span>
              </>
            )}
          </p>

          {brand.isStaging && (
            <p className="m-0 rounded-xl bg-[#fff6e0] p-3 text-[13px] text-nachtblau">
              Testmodus (Vorschau): Es wurde kein echtes Geld abgebucht.
            </p>
          )}

          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-14 items-center justify-center gap-2.5 rounded-full bg-nachtblau px-7 font-extrabold text-white hover:bg-tiefblau"
          >
            <Icon name="mail" size={20} />
            Gutschein als PDF öffnen
          </a>
        </div>

        <Link
          href="/gutscheine"
          className="flex h-[52px] items-center gap-2.5 rounded-full border-2 border-nachtblau px-7 font-extrabold text-nachtblau hover:bg-stein-2"
        >
          Zurück zu Gutscheine
        </Link>
      </section>
    </div>
  );
}
