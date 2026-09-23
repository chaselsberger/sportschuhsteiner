import { unlink } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PHOTOS_DIR = process.env.PRODUCT_PHOTOS_DIR;

const STATUS_VALUES = ["entwurf", "veroeffentlicht", "verkauft"] as const;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const status = body?.status;

  if (!STATUS_VALUES.includes(status)) {
    return NextResponse.json({ error: "Ungültiger Status." }, { status: 400 });
  }

  const product = await prisma.product
    .update({ where: { id }, data: { status } })
    .catch(() => null);

  if (!product) {
    return NextResponse.json({ error: "Produkt nicht gefunden." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const product = await prisma.product
    .findUnique({ where: { id }, include: { photos: true } })
    .catch(() => null);

  if (!product) {
    return NextResponse.json({ error: "Produkt nicht gefunden." }, { status: 404 });
  }

  if (PHOTOS_DIR) {
    await Promise.all(
      product.photos.map((p) =>
        unlink(path.join(/* turbopackIgnore: true */ PHOTOS_DIR, p.dateiname)).catch(
          () => {},
        ),
      ),
    );
  }

  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
