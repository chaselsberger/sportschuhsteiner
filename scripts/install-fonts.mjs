// Registriert die Marken-Schriften (Archivo Black, Baloo Bhai 2) im
// Fontconfig-Cache des Server-Users, damit sharp/librsvg sie beim
// Rendern des Gutschein-PDFs findet (siehe src/lib/gift-vouchers.ts).
// Läuft automatisch nach "npm install" (siehe package.json "postinstall").
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { execSync } from "node:child_process";

const files = [
  "@fontsource/archivo-black/files/archivo-black-latin-400-normal.woff2",
  "@fontsource/baloo-bhai-2/files/baloo-bhai-2-latin-500-normal.woff2",
  "@fontsource/baloo-bhai-2/files/baloo-bhai-2-latin-600-normal.woff2",
  "@fontsource/baloo-bhai-2/files/baloo-bhai-2-latin-700-normal.woff2",
];

const fontsDir = path.join(homedir(), ".fonts");
if (!existsSync(fontsDir)) mkdirSync(fontsDir, { recursive: true });

let copied = 0;
for (const rel of files) {
  const src = path.join(process.cwd(), "node_modules", rel);
  if (!existsSync(src)) continue;
  copyFileSync(src, path.join(fontsDir, path.basename(rel)));
  copied++;
}

if (copied > 0) {
  try {
    execSync(`fc-cache -f "${fontsDir}"`, { stdio: "ignore" });
  } catch {
    // fc-cache evtl. nicht installiert – Fontconfig findet neue Dateien im
    // Zweifel trotzdem beim nächsten Scan, nur eben nicht sofort.
  }
}
