import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const PHOTOS_DIR = process.env.PRODUCT_PHOTOS_DIR;

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".heic": "image/heic",
};

/**
 * Liefert ein hochgeladenes Produktfoto aus. Öffentlich (kein Admin-Login
 * nötig) – die Fotos sind ganz normale, öffentlich sichtbare Shop-Bilder,
 * nur die Verwaltung darunter (Upload/Löschen) ist geschützt.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ dateiname: string }> },
) {
  if (!PHOTOS_DIR) {
    return NextResponse.json(
      { error: "PRODUCT_PHOTOS_DIR fehlt in .env" },
      { status: 500 },
    );
  }

  const { dateiname } = await params;
  // Nur einfache Dateinamen erlauben, keine Pfad-Traversal ("../").
  if (!/^[a-zA-Z0-9_-]+\.[a-z]{3,4}$/.test(dateiname)) {
    return NextResponse.json({ error: "Ungültiger Dateiname." }, { status: 400 });
  }

  const ext = path.extname(dateiname).toLowerCase();
  const contentType = CONTENT_TYPES[ext];
  if (!contentType) {
    return NextResponse.json({ error: "Unbekanntes Format." }, { status: 400 });
  }

  try {
    const filePath = path.join(/* turbopackIgnore: true */ PHOTOS_DIR, dateiname);
    const buffer = await readFile(filePath);
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Foto nicht gefunden." }, { status: 404 });
  }
}
