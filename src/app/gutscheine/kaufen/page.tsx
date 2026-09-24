import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { VoucherPurchaseForm } from "@/components/shop/VoucherPurchaseForm";

export const metadata: Metadata = {
  title: "Wertgutschein kaufen",
  description:
    "Wertgutschein von Sport Schuh Steiner online kaufen – sicher per Stripe bezahlen, sofort als PDF per E-Mail.",
};

export default function GutscheinKaufenPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Start" },
          { href: "/gutscheine", label: "Gutscheine" },
          { label: "Kaufen" },
        ]}
        title="Wertgutschein kaufen"
        lead="Betrag wählen, optional personalisieren – Sie erhalten den Gutschein sofort als PDF."
      />

      <section className="page-x flex justify-center py-10 lg:py-16">
        <div className="w-full max-w-[560px]">
          <VoucherPurchaseForm />
        </div>
      </section>
    </>
  );
}
