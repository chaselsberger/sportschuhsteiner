import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vorschau läuft als statischer Export auf Plesk/Apache (kein Node-Prozess
  // bislang eingerichtet). Sobald Node.js-Hosting für die Domain aktiv ist,
  // kann output:"export" entfallen und Server-Features (Shop, Cron, API-Routen) folgen.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
