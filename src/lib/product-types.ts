/** Produkte kommen jetzt aus der Datenbank (siehe src/lib/products.ts) –
 * hier stehen nur noch der gemeinsame Typ und reine Formatierungs-Helfer. */

export type ShopCategory =
  "laufen" | "wandern" | "ski" | "schneeschuh" | "beruf" | "barfuss";

export type Product = {
  slug: string;
  brand: string;
  model: string;
  /** Kurzname für Karten */
  title: string;
  category: ShopCategory;
  categoryLabel: string;
  gender: "Damen" | "Herren" | "Kinder";
  size: number;
  sizeDetails: string;
  price: number;
  oldPrice: number;
  badge?: string;
  image: string;
  /** Freigestellte Produktfotos (schwarzer Grund) ganz zeigen statt beschneiden */
  fit?: "contain";
  position?: string;
  isNew?: boolean;
  description?: string;
  detailsMaterial?: string;
  fitTip?: string;
};

export const shopCategories: {
  key: ShopCategory;
  label: string;
  icon: "run" | "hike" | "ski" | "snowshoe" | "work" | "barefoot";
}[] = [
  { key: "laufen", label: "Laufen", icon: "run" },
  { key: "wandern", label: "Wandern & Berg", icon: "hike" },
  { key: "ski", label: "Ski & Skitour", icon: "ski" },
  { key: "schneeschuh", label: "Schneeschuh", icon: "snowshoe" },
  { key: "beruf", label: "Beruf & Alltag", icon: "work" },
  { key: "barfuss", label: "Barfuß & Freizeit", icon: "barefoot" },
];

export function discountLabel(p: Product) {
  return `−${Math.round((1 - p.price / p.oldPrice) * 100)} %`;
}

/** Plakette oben links: gesetzte Plakette, sonst „Neu“ oder der Rabatt */
export function badgeFor(p: Product) {
  if (p.isNew) return "Neu";
  return p.badge ?? discountLabel(p);
}

export const euro = (value: number) =>
  `€ ${value.toLocaleString("de-AT", { minimumFractionDigits: 0 })},–`;

export const shopSizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47];
