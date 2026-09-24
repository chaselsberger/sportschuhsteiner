import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PHOTOS_DIR = process.env.PRODUCT_PHOTOS_DIR;

const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/heic": ".heic",
};

/** Fügt einem bestehenden Produkt weitere Fotos hinzu (ans Ende der Reihenfolge). */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!PHOTOS_DIR) {
    return NextResponse.json({ error: "PRODUCT_PHOTOS_DIR fehlt in .env" }, { status: 500 });
  }

  const { id } = await params;
  const product = await prisma.product
    .findUnique({ where: { id }, include: { photos: true } })
    .catch(() => null);
  if (!product) {
    return NextResponse.json({ error: "Produkt nicht gefunden." }, { status: 404 });
  }

  const form = await request.formData().catch(() => null);
  const photos =
    form?.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0) ?? [];
  if (photos.length === 0) {
    return NextResponse.json({ error: "Kein Foto ausgewählt." }, { status: 400 });
  }

  await mkdir(PHOTOS_DIR, { recursive: true });

  let sortIndex = product.photos.length;
  for (const photo of photos) {
    const ext = ALLOWED_IMAGE_TYPES[photo.type];
    if (!ext) {
      return NextResponse.json(
        { error: `Nicht unterstütztes Bildformat: ${photo.type || "unbekannt"}.` },
        { status: 400 },
      );
    }
    const filename = `${randomUUID()}${ext}`;
    const buffer = Buffer.from(await photo.arrayBuffer());
    // PHOTOS_DIR liegt außerhalb des Projekts (siehe .env) – kein Tracing nötig.
    await writeFile(path.join(/* turbopackIgnore: true */ PHOTOS_DIR, filename), buffer);
    await prisma.productPhoto.create({
      data: { productId: id, dateiname: filename, sortIndex: sortIndex++ },
    });
  }

  return NextResponse.json({ ok: true });
}
