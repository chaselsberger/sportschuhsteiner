import { NextResponse } from "next/server";

/**
 * Eigenes Manifest nur für den Admin-Bereich (Next.js erlaubt manifest.ts
 * nur im app-Root, daher hier als einfacher Route Handler).
 */
export function GET() {
  return NextResponse.json(
    {
      name: "Sport Schuh Steiner · Shop-Verwaltung",
      short_name: "Shop-Verwaltung",
      description: "Restposten erfassen und den Shop verwalten.",
      start_url: "/admin",
      scope: "/admin",
      display: "standalone",
      background_color: "#f5f1e8",
      theme_color: "#13303b",
      icons: [
        { src: "/admin/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/admin/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    { headers: { "Content-Type": "application/manifest+json" } },
  );
}
