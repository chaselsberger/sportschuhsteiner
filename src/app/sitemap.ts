import type { MetadataRoute } from "next";
import { brand, categories } from "@/brand.config";

export const dynamic = "force-static";

const staticRoutes = [
  "",
  "beratung-service",
  "sortiment",
  "shop",
  "ueber-uns",
  "kontakt",
  "impressum",
  "datenschutz",
  "agb",
  "widerruf",
  "versand-rueckgabe",
  "barrierefreiheit",
  "cookie-einstellungen",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_ENV === "production"
      ? "https://www.sport-schuh-steiner.at"
      : "https://vorschau.sport-schuh-steiner.at";

  const routes = [
    ...staticRoutes,
    ...(brand.shopEnabled ? ["gutscheine", "gutscheine/kaufen"] : []),
    ...categories.map((c) => `sortiment/${c.slug}`),
  ];

  return routes.map((route) => ({
    url: route ? `${siteUrl}/${route}/` : `${siteUrl}/`,
    lastModified: new Date(),
  }));
}
