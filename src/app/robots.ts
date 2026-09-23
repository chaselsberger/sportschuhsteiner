import type { MetadataRoute } from "next";
import { brand } from "@/brand.config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (brand.isStaging) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: "https://www.sport-schuh-steiner.at/sitemap.xml",
  };
}
