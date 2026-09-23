import { Hero } from "@/components/Hero";
import { ServicePromise } from "@/components/ServicePromise";
import { CategoryGrid } from "@/components/CategoryGrid";
import { GoogleReviews } from "@/components/GoogleReviews";
import { LatestProducts } from "@/components/LatestProducts";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicePromise />
      <CategoryGrid />
      <LatestProducts />
      <GoogleReviews />
    </>
  );
}
