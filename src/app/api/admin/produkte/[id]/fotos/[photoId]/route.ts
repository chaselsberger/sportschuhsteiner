import { unlink } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PHOTOS_DIR = process.env.PRODUCT_PHOTOS_DIR;

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; photoId: string }> },
) {
  const { id, photoId } = await params;
  const photo = await prisma.productPhoto
    .findFirst({ where: { id: photoId, productId: id } })
    .catch(() => null);
  if (!photo) {
    return NextResponse.json({ error: "Foto nicht gefunden." }, { status: 404 });
  }

  await prisma.productPhoto.delete({ where: { id: photoId } });

  if (PHOTOS_DIR) {
    await unlink(path.join(/* turbopackIgnore: true */ PHOTOS_DIR, photo.dateiname)).catch(
      () => {},
    );
  }

  return NextResponse.json({ ok: true });
}
