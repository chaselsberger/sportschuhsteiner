import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ShopBrowser } from "@/components/shop/ShopBrowser";
import { SizeTable } from "@/components/shop/SizeTable";
import { demoProducts } from "@/lib/demo-products";

export const metadata: Metadata = {
  title: "Shop – Einzelstücke & Restposten",
  description:
    "Einzelstücke und Restposten von Sport Schuh Steiner in Scheffau am Wilden Kaiser – jedes Paar gibt es genau einmal. Größe wählen, reservieren, im Geschäft anprobieren.",
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Start" }, { label: "Shop" }]}
        title="Einzelstücke & Restposten"
        lead={`${demoProducts.length} Paare – jedes gibt es genau einmal. Wer zuerst kommt, läuft zuerst.`}
      />
      <ShopBrowser products={demoProducts} />
      <SizeTable />
    </>
  );
}
