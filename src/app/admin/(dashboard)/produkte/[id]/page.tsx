import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { photoUrl } from "@/lib/products";
import { parseCategories } from "@/lib/product-categories";
import { EditProductForm } from "@/components/admin/EditProductForm";

export const metadata: Metadata = { title: "Produkt bearbeiten" };
export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { photos: true },
  });
  if (!product) notFound();

  const photos = [...product.photos]
    .sort((a, b) => a.sortIndex - b.sortIndex)
    .map((p) => ({
      id: p.id,
      url: photoUrl(p.dateiname),
      deletedAt: p.deletedAt ? p.deletedAt.toISOString() : null,
    }));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <h1 className="t-h3 text-nachtblau">
          {product.brand} {product.model}
        </h1>
        <Link href="/admin/produkte" className="text-sm font-bold text-nachtblau">
          Zurück
        </Link>
      </div>

      <EditProductForm
        id={product.id}
        initial={{
          brand: product.brand,
          model: product.model,
          title: product.title,
          category: product.category,
          categories: parseCategories(product.categories),
          gender: product.gender,
          size: product.size,
          sizeDetails: product.sizeDetails,
          price: product.price,
          oldPrice: product.oldPrice,
          badge: product.badge ?? "",
          isRestposten: product.isRestposten,
          status: product.status,
          description: product.description ?? "",
          detailsMaterial: product.detailsMaterial ?? "",
          fitTip: product.fitTip ?? "",
        }}
        photos={photos}
      />
    </div>
  );
}
