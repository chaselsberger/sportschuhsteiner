import type { ShopCategory } from "./product-types";

/** Wandelt das kommagetrennte `categories`-Feld in ein Array um. */
export function parseCategories(categories: string): ShopCategory[] {
  return categories
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean) as ShopCategory[];
}

/** Kommagetrennter String aus einer Liste von Kategorien, für die DB. */
export function joinCategories(categories: ShopCategory[]): string {
  return categories.join(",");
}
