import { unlink } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { shopCategories, type ShopCategory } from "@/lib/product-types";
import { joinCategories } from "@/lib/product-categories";

const PHOTOS_DIR = process.env.PRODUCT_PHOTOS_DIR;

const STATUS_VALUES = ["entwurf", "veroeffentlicht", "verkauft"] as const;
const GENDER_VALUES = ["Damen", "Herren", "Kinder"] as const;

function optionalText(value: unknown): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Reiner Statuswechsel (Dropdown in der Übersicht).
  if (Object.keys(body).length === 1 && "status" in body) {
    if (!STATUS_VALUES.includes(body.status)) {
      return NextResponse.json({ error: "Ungültiger Status." }, { status: 400 });
    }
    const product = await prisma.product
      .update({ where: { id }, data: { status: body.status } })
      .catch(() => null);
    if (!product) {
      return NextResponse.json({ error: "Produkt nicht gefunden." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  }

  // Vollständige Bearbeitung über das Formular.
  const data: Record<string, unknown> = {};

  if (body.status !== undefined) {
    if (!STATUS_VALUES.includes(body.status)) {
      return NextResponse.json({ error: "Ungültiger Status." }, { status: 400 });
    }
    data.status = body.status;
  }
  if (body.brand !== undefined) {
    if (typeof body.brand !== "string" || !body.brand.trim()) {
      return NextResponse.json({ error: "Marke fehlt." }, { status: 400 });
    }
    data.brand = body.brand.trim();
    await prisma.brand.upsert({
      where: { name: data.brand as string },
      update: {},
      create: { name: data.brand as string },
    });
  }
  if (body.model !== undefined) {
    if (typeof body.model !== "string" || !body.model.trim()) {
      return NextResponse.json({ error: "Modell fehlt." }, { status: 400 });
    }
    data.model = body.model.trim();
  }
  if (body.title !== undefined) {
    data.title =
      typeof body.title === "string" && body.title.trim()
        ? body.title.trim()
        : `${data.brand ?? ""} ${data.model ?? ""}`.trim();
  }
  if (body.categories !== undefined) {
    const categories = Array.isArray(body.categories) ? (body.categories as unknown[]) : [];
    const valid =
      categories.length > 0 &&
      categories.every((c) => typeof c === "string" && shopCategories.some((sc) => sc.key === c));
    if (!valid) {
      return NextResponse.json({ error: "Bitte mindestens eine gültige Kategorie wählen." }, { status: 400 });
    }
    const typedCategories = categories as ShopCategory[];
    const categoryMeta = shopCategories.find((c) => c.key === typedCategories[0])!;
    data.category = categoryMeta.key as ShopCategory;
    data.categoryLabel = categoryMeta.label;
    data.categories = joinCategories(typedCategories);
  }
  if (body.gender !== undefined) {
    if (!GENDER_VALUES.includes(body.gender)) {
      return NextResponse.json({ error: "Ungültige Angabe bei „Für“." }, { status: 400 });
    }
    data.gender = body.gender;
  }
  if (body.size !== undefined) {
    const size = Number(body.size);
    if (!Number.isFinite(size)) {
      return NextResponse.json({ error: "Ungültige Größe." }, { status: 400 });
    }
    data.size = size;
  }
  if (body.sizeDetails !== undefined) {
    data.sizeDetails = typeof body.sizeDetails === "string" ? body.sizeDetails.trim() : "";
  }
  if (body.price !== undefined) {
    const price = Number(body.price);
    if (!Number.isFinite(price) || price <= 0) {
      return NextResponse.json({ error: "Ungültiger Preis." }, { status: 400 });
    }
    data.price = Math.round(price);
  }
  if (body.oldPrice !== undefined) {
    const oldPrice = body.oldPrice === null || body.oldPrice === "" ? null : Number(body.oldPrice);
    if (oldPrice !== null && !Number.isFinite(oldPrice)) {
      return NextResponse.json({ error: "Ungültiger Ursprungspreis." }, { status: 400 });
    }
    data.oldPrice = oldPrice === null ? null : Math.round(oldPrice);
  }
  if (body.badge !== undefined) data.badge = optionalText(body.badge);
  if (body.isRestposten !== undefined) data.isRestposten = Boolean(body.isRestposten);
  if (body.description !== undefined) data.description = optionalText(body.description);
  if (body.detailsMaterial !== undefined) data.detailsMaterial = optionalText(body.detailsMaterial);
  if (body.fitTip !== undefined) data.fitTip = optionalText(body.fitTip);

  const product = await prisma.product.update({ where: { id }, data }).catch(() => null);

  if (!product) {
    return NextResponse.json({ error: "Produkt nicht gefunden." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, slug: product.slug });
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
