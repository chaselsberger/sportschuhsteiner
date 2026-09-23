import type { MetadataRoute } from "next";
import { categories } from "@/brand.config";

export const dynamic = "force-static";

const staticRoutes = [
  "",
  "beratung-service",
  "sortiment",
  "shop",
  "gutscheine",
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
    ...categories.map((c) => `sortiment/${c.slug}`),
  ];

  return routes.map((route) => ({
    url: route ? `${siteUrl}/${route}/` : `${siteUrl}/`,
    lastModified: new Date(),
  }));
}
