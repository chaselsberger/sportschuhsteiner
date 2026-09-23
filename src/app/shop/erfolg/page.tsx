import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { brand } from "@/brand.config";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { stripe } from "@/lib/stripe";
import { euro } from "@/lib/demo-products";

export const metadata: Metadata = {
  title: "Bestellung bestätigt",
  robots: { index: false, follow: false },
};

export default async function CheckoutErfolgPage({
  searchParams,
}: PageProps<"/shop/erfolg">) {
  const { session_id: sessionId } = await searchParams;

  if (typeof sessionId !== "string" || !sessionId) {
    redirect("/shop");
  }

  const session = await stripe.checkout.sessions
    .retrieve(sessionId, { expand: ["line_items"] })
    .catch(() => null);

  if (!session || session.payment_status !== "paid") {
    redirect("/shop");
  }

  const item = session.line_items?.data[0];
  const amount =
    typeof session.amount_total === "number" ? session.amount_total / 100 : null;
  const orderNumber =
    typeof session.metadata?.orderNumber === "string"
      ? session.metadata.orderNumber
      : session.id;

  return (
    <div className="pb-16">
      <PageHero
        crumbs={[{ href: "/shop", label: "Shop" }, { label: "Bestellung bestätigt" }]}
        title="Danke für Ihre Bestellung!"
        lead="Wir haben Ihre Zahlung erhalten und bereiten Ihr Paar für den Versand bzw. die Abholung vor."
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
                  Bestätigung gesendet an {session.customer_details.email}
                </span>
              )}
            </div>
          </div>

          {item && (
            <div className="flex items-center justify-between gap-3 border-t border-[#EFEAE0] pt-4">
              <span className="text-[15px] text-text">{item.description}</span>
              {amount !== null && (
                <span className="text-[15px] font-extrabold text-nachtblau">
                  {euro(amount)}
                </span>
              )}
            </div>
          )}

          <p className="m-0 text-sm text-text-muted">
            Bestellnummer:{" "}
            <span className="break-all font-mono">{orderNumber}</span>
          </p>

          {brand.isStaging && (
            <p className="m-0 rounded-xl bg-[#fff6e0] p-3 text-[13px] text-nachtblau">
              Testmodus (Vorschau): Es wurde kein echtes Geld abgebucht.
            </p>
          )}
        </div>

        <Link
          href="/shop"
          className="flex h-[52px] items-center gap-2.5 rounded-full bg-nachtblau px-7 font-extrabold text-white hover:bg-tiefblau"
        >
          Weiter einkaufen
        </Link>
      </section>
    </div>
  );
}
