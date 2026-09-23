import Image from "next/image";
import Link from "next/link";
import { type Product, euro } from "@/lib/product-types";
import { Icon } from "./Icon";

function ProductImage({ product, sizes }: { product: Product; sizes: string }) {
  return (
    <Image
      src={product.image}
      alt={`${product.brand} ${product.model}`}
      fill
      sizes={sizes}
      className={product.fit === "contain" ? "object-contain" : "object-cover"}
      style={{ objectPosition: product.position ?? "50% 50%" }}
    />
  );
}

const badgeClass =
  "absolute left-3.5 top-3.5 rounded-full bg-nachtblau px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.06em] text-logogelb";

/**
 * Produktkarte.
 * - home: Startseite Desktop („Nur Gr. 39 · 1 Paar“, Merken-Herz)
 * - shop: Shop-Übersicht (Größe als gelbe Plakette unten links)
 */
export function ProductCard({
  product,
  badge,
  variant,
}: {
  product: Product;
  badge: string;
  variant: "home" | "shop";
}) {
  const imageHeight = variant === "home" ? "h-[260px]" : "h-[280px]";
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="lift zoom flex flex-col overflow-hidden rounded-[18px] bg-white text-text"
    >
      <div className={`relative ${imageHeight} overflow-hidden bg-bild-grund`}>
        <ProductImage
          product={product}
          sizes="(min-width: 1024px) 25vw, 50vw"
        />
        <span className={badgeClass}>{badge}</span>
        {variant === "home" ? (
          <span
            aria-hidden="true"
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-nachtblau"
          >
            <Icon name="heart" size={20} />
          </span>
        ) : (
          <span className="absolute bottom-3.5 left-3.5 flex h-10 min-w-10 items-center justify-center rounded-full bg-logogelb px-3 text-[15px] font-extrabold text-nachtblau">
            <span className="sr-only">Größe </span>
            {product.size}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1.5 px-5 pb-[22px] pt-[18px]">
        <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-linkblau">
          {product.brand}
        </span>
        <span className="text-[17px] font-bold">
          {variant === "home" ? product.model : product.title}
        </span>
        {variant === "home" && (
          <span className="flex items-center gap-2 text-sm text-text-muted">
            <Icon name="run" size={18} />
            Nur Gr. {product.size} · 1 Paar
          </span>
        )}
        <span
          className={`flex items-baseline gap-2.5 ${variant === "home" ? "mt-1.5" : "mt-1"}`}
        >
          <span className="text-[22px] font-extrabold text-nachtblau">
            {euro(product.price)}
          </span>
          <s className="text-[15px] text-grau">
            <span className="sr-only">statt </span>
            {euro(product.oldPrice)}
          </s>
        </span>
      </div>
    </Link>
  );
}

/** Kompakte Karte für die Wischleiste am Handy */
export function ProductCardMobile({
  product,
  badge,
}: {
  product: Product;
  badge: string;
}) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="flex w-[220px] shrink-0 flex-col overflow-hidden rounded-2xl bg-white text-text"
    >
      <div className="relative h-[180px] bg-bild-grund">
        <ProductImage product={product} sizes="220px" />
        <span className="absolute left-2.5 top-2.5 rounded-full bg-nachtblau px-2.5 py-1 text-[11px] font-extrabold uppercase text-logogelb">
          {badge}
        </span>
        <span className="absolute bottom-2.5 left-2.5 flex h-8 items-center rounded-full bg-logogelb px-2.5 text-[13px] font-extrabold text-nachtblau">
          Gr. {product.size}
        </span>
      </div>
      <div className="flex flex-col gap-1 px-3.5 pb-4 pt-3">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-linkblau">
          {product.brand}
        </span>
        <span className="text-[15px] font-bold">{product.model}</span>
        <span className="flex items-baseline gap-2">
          <b className="text-lg text-nachtblau">{euro(product.price)}</b>
          <s className="text-[13px] text-grau">
            <span className="sr-only">statt </span>
            {euro(product.oldPrice)}
          </s>
        </span>
      </div>
    </Link>
  );
}
