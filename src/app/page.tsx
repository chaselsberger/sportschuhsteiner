import { GoogleReviews } from "@/components/GoogleReviews";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { HomeHero } from "@/components/home/HomeHero";
import { LatestPairs } from "@/components/home/LatestPairs";
import { PromiseSection } from "@/components/home/PromiseSection";
import { QuickActions, ServiceStrip } from "@/components/home/ServiceStrip";
import { BrandBand, VisitSection } from "@/components/home/VisitSection";

export const dynamic = "force-dynamic";

/** Startseite – Aufbau laut Entwurf „Startseite · Desktop“ und „· Mobil“ */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <QuickActions />
      <ServiceStrip />
      <CategoryTiles />
      <PromiseSection />
      <LatestPairs />
      <GoogleReviews />
      <BrandBand />
      <VisitSection />
    </>
  );
}
