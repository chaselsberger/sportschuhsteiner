import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resizeForWeb } from "@/lib/image-resize";
import { MAX_PRODUCT_PHOTOS, shopCategories, type ShopCategory } from "@/lib/product-types";
import { joinCategories } from "@/lib/product-categories";

const PHOTOS_DIR = process.env.PRODUCT_PHOTOS_DIR;

const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/heic": ".heic",
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uniqueSlug(base: string) {
  let slug = base || "produkt";
  let n = 1;
  // Kleine Menge an Produkten – ein paar sequentielle Checks sind unproblematisch.
  while (await prisma.product.findUnique({ where: { slug } })) {
    n += 1;
    slug = `${base}-${n}`;
  }
  return slug;
}

function str(form: FormData, key: string) {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(request: Request) {
  if (!PHOTOS_DIR) {
    return NextResponse.json(
      { error: "PRODUCT_PHOTOS_DIR fehlt in .env" },
      { status: 500 },
    );
  }

  const form = await request.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const brand = str(form, "brand");
  const model = str(form, "model");
  const title = str(form, "title") || `${brand} ${model}`.trim();
  const categories = form.getAll("categories").filter((v): v is string => typeof v === "string") as ShopCategory[];
  const category = categories[0];
  const gender = str(form, "gender") as "Damen" | "Herren" | "Kinder";
  const size = Number(str(form, "size"));
  const sizeDetails = str(form, "sizeDetails");
  const price = Number(str(form, "price"));
  const oldPriceRaw = str(form, "oldPrice");
  const oldPrice = oldPriceRaw ? Number(oldPriceRaw) : price;
  const badge = str(form, "badge") || null;
  const isRestposten = str(form, "isRestposten") === "true";
  const publish = str(form, "status") !== "entwurf";
  const description = str(form, "description") || null;
  const detailsMaterial = str(form, "detailsMaterial") || null;
  const fitTip = str(form, "fitTip") || null;

  const categoryMeta = category ? shopCategories.find((c) => c.key === category) : undefined;
  const allCategoriesValid = categories.every((c) => shopCategories.some((sc) => sc.key === c));

  if (
    !brand ||
    !model ||
    !categoryMeta ||
    !allCategoriesValid ||
    !gender ||
    !Number.isFinite(size) ||
    !sizeDetails ||
    !Number.isFinite(price) ||
    price <= 0
  ) {
    return NextResponse.json(
      { error: "Bitte alle Pflichtfelder gültig ausfüllen." },
      { status: 400 },
    );
  }

  const photos = form.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  if (photos.length === 0) {
    return NextResponse.json(
      { error: "Mindestens ein Foto ist erforderlich." },
      { status: 400 },
    );
  }
  if (photos.length > MAX_PRODUCT_PHOTOS) {
    return NextResponse.json(
      { error: `Es sind maximal ${MAX_PRODUCT_PHOTOS} Fotos pro Produkt erlaubt.` },
      { status: 400 },
    );
  }

  await mkdir(PHOTOS_DIR, { recursive: true });

  const savedFilenames: string[] = [];
  for (const photo of photos) {
    const originalExt = ALLOWED_IMAGE_TYPES[photo.type];
    if (!originalExt) {
      return NextResponse.json(
        { error: `Nicht unterstütztes Bildformat: ${photo.type || "unbekannt"}.` },
        { status: 400 },
      );
    }
    const originalBuffer = Buffer.from(await photo.arrayBuffer());
    const { buffer, ext } = await resizeForWeb(originalBuffer, originalExt);
    const filename = `${randomUUID()}${ext}`;
    // PHOTOS_DIR liegt außerhalb des Projekts (siehe .env) – kein Tracing nötig.
    await writeFile(path.join(/* turbopackIgnore: true */ PHOTOS_DIR, filename), buffer);
    savedFilenames.push(filename);
  }

  const slug = await uniqueSlug(slugify(`${brand}-${model}-${size}`));

  await prisma.brand.upsert({ where: { name: brand }, update: {}, create: { name: brand } });

  const product = await prisma.product.create({
    data: {
      slug,
      brand,
      model,
      title,
      category,
      categoryLabel: categoryMeta.label,
      categories: joinCategories(categories),
      gender,
      size,
      sizeDetails,
      price: Math.round(price),
      oldPrice: Math.round(oldPrice),
      badge,
      isRestposten,
      status: publish ? "veroeffentlicht" : "entwurf",
      description,
      detailsMaterial,
      fitTip,
      photos: {
        create: savedFilenames.map((dateiname, i) => ({ dateiname, sortIndex: i })),
      },
    },
  });

  return NextResponse.json({ ok: true, slug: product.slug });
}
