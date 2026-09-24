import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { euro } from "@/lib/product-types";
import { photoUrl } from "@/lib/products";
import { ProductRow } from "@/components/admin/ProductRow";

export const metadata: Metadata = { title: "Produkte" };
export const dynamic = "force-dynamic";

export default async function AdminProdukteePage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { photos: true },
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <h1 className="t-h3 text-nachtblau">Produkte</h1>
        <span className="text-sm text-text-muted">{products.length} gesamt</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {products.map((p) => {
          const firstPhoto = [...p.photos].sort((a, b) => a.sortIndex - b.sortIndex)[0];
          return (
            <ProductRow
              key={p.id}
              id={p.id}
              title={`${p.brand} ${p.model}`}
              size={p.size}
              priceLabel={euro(p.price)}
              status={p.status}
              imageUrl={
                firstPhoto
                  ? firstPhoto.deletedAt
                    ? "/images/produkt-platzhalter.svg"
                    : photoUrl(firstPhoto.dateiname)
                  : (p.legacyImage ?? null)
              }
            />
          );
        })}
        {products.length === 0 && (
          <p className="m-0 text-sm text-text-muted">
            Noch keine Produkte angelegt.
          </p>
        )}
      </div>
    </div>
  );
}
