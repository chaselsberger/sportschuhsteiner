import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Läuft jetzt als echter Node-Prozess (Plesk/Passenger, siehe server.js).
  // Für den reinen statischen Export (kein Node-Hosting) stattdessen
  // output: "export" + trailingSlash: true setzen und `out/` deployen.
};

export default nextConfig;
