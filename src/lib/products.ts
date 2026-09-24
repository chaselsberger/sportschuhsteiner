import "server-only";
import type { Product as DbProduct, ProductPhoto } from "@prisma/client";
import { prisma } from "./prisma";
import { parseCategories } from "./product-categories";
import type { Product, ShopCategory } from "./product-types";

export type {
  Product,
  ShopCategory,
} from "./product-types";
export {
  badgeFor,
  discountLabel,
  euro,
  shopCategories,
  shopSizes,
} from "./product-types";

/** Öffentliche URL eines hochgeladenen Produktfotos (siehe /api/fotos/[dateiname]). */
export function photoUrl(dateiname: string) {
  return `/api/fotos/${dateiname}`;
}

type DbProductWithPhotos = DbProduct & { photos: ProductPhoto[] };

function toProduct(p: DbProductWithPhotos): Product {
  const sortedPhotos = [...p.photos].sort((a, b) => a.sortIndex - b.sortIndex);
  const firstPhoto = sortedPhotos[0];
  return {
    id: p.id,
    slug: p.slug,
    brand: p.brand,
    model: p.model,
    title: p.title,
    category: p.category as ShopCategory,
    categoryLabel: p.categoryLabel,
    categories: parseCategories(p.categories),
    gender: p.gender,
    size: p.size,
    sizeDetails: p.sizeDetails,
    price: p.price,
    oldPrice: p.oldPrice ?? p.price,
    badge: p.badge ?? undefined,
    image: firstPhoto
      ? photoUrl(firstPhoto.dateiname)
      : (p.legacyImage ?? "/images/kategorie-laufen.jpg"),
    images: sortedPhotos.filter((ph) => !ph.deletedAt).map((ph) => photoUrl(ph.dateiname)),
    fit: p.imageFit === "contain" ? "contain" : undefined,
    position: p.imagePosition ?? undefined,
    isNew: p.isNew,
    description: p.description ?? undefined,
    detailsMaterial: p.detailsMaterial ?? undefined,
    fitTip: p.fitTip ?? undefined,
  };
}

const publishedInclude = { photos: true } as const;

/** Alle veröffentlichten Produkte, neueste zuerst. */
export async function getPublishedProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { status: "veroeffentlicht" },
    orderBy: { createdAt: "desc" },
    include: publishedInclude,
  });
  return rows.map(toProduct);
}

export async function getPublishedProductBySlug(
  slug: string,
): Promise<Product | null> {
  const row = await prisma.product.findFirst({
    where: { slug, status: "veroeffentlicht" },
    include: publishedInclude,
  });
  return row ? toProduct(row) : null;
}

export async function getPublishedProductsByCategory(
  category: ShopCategory,
  limit?: number,
): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    // `categories` ist kommagetrennt; da sich keiner der ShopCategory-Keys
    // als Teilstring eines anderen überschneidet, reicht ein contains-Filter.
    where: { categories: { contains: category }, status: "veroeffentlicht" },
    orderBy: { createdAt: "desc" },
    include: publishedInclude,
    take: limit,
  });
  return rows.map(toProduct);
}

/** Startseite: die 4 neuesten veröffentlichten Paare. */
export async function getLatestProducts(limit = 4): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { status: "veroeffentlicht" },
    orderBy: { createdAt: "desc" },
    include: publishedInclude,
    take: limit,
  });
  return rows.map(toProduct);
}

/** Für den Checkout: Preis/Daten serverseitig aus der DB, nie vom Client. */
export async function getSellableProductBySlug(slug: string) {
  const row = await prisma.product.findFirst({
    where: { slug, status: "veroeffentlicht" },
    include: publishedInclude,
  });
  if (!row) return null;
  const firstPhoto = [...row.photos].sort((a, b) => a.sortIndex - b.sortIndex)[0];
  return {
    ...row,
    imagePath: firstPhoto
      ? photoUrl(firstPhoto.dateiname)
      : (row.legacyImage ?? "/images/kategorie-laufen.jpg"),
  };
}

/** Markiert ein Einzelstück nach erfolgreicher Zahlung als verkauft (idempotent). */
export async function markProductSold(productId: string) {
  await prisma.product.updateMany({
    where: { id: productId, status: "veroeffentlicht" },
    data: { status: "verkauft" },
  });
}

export async function getSimilarProducts(
  product: Product,
  limit = 4,
): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: {
      size: product.size,
      slug: { not: product.slug },
      status: "veroeffentlicht",
    },
    orderBy: { createdAt: "desc" },
    include: publishedInclude,
    take: limit,
  });
  return rows.map(toProduct);
}
