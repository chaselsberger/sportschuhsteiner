/**
 * BEISPIELDATEN aus dem Entwurf – Produkte, Preise und Größen sind erfunden.
 * Werden ersetzt, sobald der Shop (Payload CMS + Stripe) angebunden ist.
 * Jedes Produkt = genau 1 Paar in 1 Größe.
 */

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

export const demoProducts: Product[] = [
  {
    slug: "salomon-x-mission-3",
    brand: "Salomon",
    model: "X-Mission 3",
    title: "X-Mission 3 · Herren",
    category: "laufen",
    categoryLabel: "Trailrunning",
    gender: "Herren",
    size: 44,
    sizeDetails: "UK 9,5 · US 10 · 28 cm",
    price: 89,
    oldPrice: 130,
    image: "/images/produkt-salomon-xmission3.jpg",
    fit: "contain",
    isNew: true,
  },
  {
    slug: "on-laufschuh-damen",
    brand: "On",
    model: "Laufschuh Damen",
    title: "Laufschuh Damen",
    category: "laufen",
    categoryLabel: "Laufen",
    gender: "Damen",
    size: 39,
    sizeDetails: "UK 6 · US 8 · 24,5 cm",
    price: 139,
    oldPrice: 179,
    badge: "Einzelstück",
    image: "/images/kategorie-laufen.jpg",
  },
  {
    slug: "leguano-jaspar",
    brand: "leguano",
    model: "Jaspar",
    title: "Jaspar · Barfußschuh",
    category: "barfuss",
    categoryLabel: "Barfuß",
    gender: "Damen",
    size: 42,
    sizeDetails: "UK 8 · US 10 · 26,5 cm",
    price: 119,
    oldPrice: 149,
    badge: "Restposten",
    image: "/images/kategorie-barfuss.jpg",
  },
  {
    slug: "diadora-sicherheitsschuh-s3",
    brand: "Diadora",
    model: "Sicherheitsschuh S3",
    title: "Sicherheitsschuh S3",
    category: "beruf",
    categoryLabel: "Beruf",
    gender: "Herren",
    size: 43,
    sizeDetails: "UK 9 · US 10 · 27,5 cm",
    price: 99,
    oldPrice: 139,
    badge: "Einzelstück",
    image: "/images/produkt-diadora-s3.jpg",
    position: "50% 65%",
  },
  {
    slug: "on-laufschuh-herren",
    brand: "On",
    model: "Laufschuh Herren",
    title: "Laufschuh · Herren",
    category: "laufen",
    categoryLabel: "Laufen",
    gender: "Herren",
    size: 44,
    sizeDetails: "UK 9,5 · US 10 · 28 cm",
    price: 139,
    oldPrice: 179,
    badge: "Einzelstück",
    image: "/images/kategorie-laufen.jpg",
  },
  {
    slug: "zustiegsschuh-herren",
    brand: "[Marke]",
    model: "Zustiegsschuh",
    title: "Zustiegsschuh · Herren",
    category: "wandern",
    categoryLabel: "Wandern & Berg",
    gender: "Herren",
    size: 44,
    sizeDetails: "UK 9,5 · US 10 · 28 cm",
    price: 134,
    oldPrice: 179,
    image: "/images/kategorie-wandern.jpg",
    position: "50% 60%",
  },
  {
    slug: "arbeitsschuh-s3-gore-tex",
    brand: "Arbeitsschuh",
    model: "S3 Gore-Tex",
    title: "S3 Gore-Tex · Herren",
    category: "beruf",
    categoryLabel: "Beruf",
    gender: "Herren",
    size: 44,
    sizeDetails: "UK 9,5 · US 10 · 28 cm",
    price: 149,
    oldPrice: 199,
    badge: "Einzelstück",
    image: "/images/kategorie-beruf.jpg",
    position: "50% 55%",
  },
  {
    slug: "leguano-jaspar-44",
    brand: "leguano",
    model: "Jaspar",
    title: "Jaspar · Barfußschuh",
    category: "barfuss",
    categoryLabel: "Barfuß",
    gender: "Herren",
    size: 44,
    sizeDetails: "UK 9,5 · US 10 · 28 cm",
    price: 119,
    oldPrice: 149,
    badge: "Restposten",
    image: "/images/kategorie-barfuss.jpg",
  },
  {
    slug: "nordica-skischuh-herren",
    brand: "Nordica",
    model: "Skischuh Herren",
    title: "Skischuh · Herren",
    category: "ski",
    categoryLabel: "Ski",
    gender: "Herren",
    size: 44,
    sizeDetails: "Mondo 28,5 · UK 9,5",
    price: 299,
    oldPrice: 449,
    badge: "Bootfitting inkl.",
    image: "/images/kategorie-ski.jpg",
    position: "50% 30%",
  },
  {
    slug: "dolomite-trekkingschuh",
    brand: "Dolomite",
    model: "Trekkingschuh",
    title: "Trekkingschuh · Herren",
    category: "wandern",
    categoryLabel: "Wandern & Berg",
    gender: "Herren",
    size: 44,
    sizeDetails: "UK 9,5 · US 10 · 28 cm",
    price: 112,
    oldPrice: 160,
    image: "/images/produkt-dolomite-trekking.jpg",
  },
];

/** Startseite: die 4 neuesten Paare (Reihenfolge laut Entwurf) */
export const latestProducts = [
  "on-laufschuh-damen",
  "salomon-x-mission-3",
  "leguano-jaspar",
  "diadora-sicherheitsschuh-s3",
].map((slug) => demoProducts.find((p) => p.slug === slug)!);

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
