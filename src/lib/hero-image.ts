import fs from "node:fs";
import path from "node:path";

/**
 * Hero-Bildauswahl für die Startseite: Winter/Sommer je nach Datum, ein
 * zufälliges Bild pro Tag aus dem passenden Ordner, mit gelegentlichem
 * Team-/Shop-Foto zur Auflockerung. Neue Fotos einfach in den jeweiligen
 * Ordner unter public/images/hero/ legen – keine Code-Änderung nötig.
 */

const HERO_DIR = path.join(process.cwd(), "public", "images", "hero");

const CATEGORY_DIRS = {
  winter: "winter",
  sommer: "sommer",
  team: "team",
} as const;

type HeroCategory = keyof typeof CATEGORY_DIRS;

const FALLBACK: Record<HeroCategory, { src: string; alt: string }> = {
  winter: {
    src: "/images/hero-schneeschuh-wilder-kaiser.jpg",
    alt: "Schneeschuhwanderung vor dem Wilden Kaiser",
  },
  sommer: {
    src: "/images/hero-schneeschuh-wilder-kaiser.jpg",
    alt: "Der Wilde Kaiser",
  },
  team: {
    src: "/images/hero-schneeschuh-wilder-kaiser.jpg",
    alt: "Schneeschuhwanderung vor dem Wilden Kaiser",
  },
};

const ALT_TEXTS: Record<string, string> = {
  "hero-schneeschuh-wilder-kaiser.jpg": "Schneeschuhwanderung vor dem Wilden Kaiser",
  "hero-wanderung-wilder-kaiser.jpg": "Wanderer auf dem Weg am Wilden Kaiser",
  "ueber-uns-georg.webp": "Georg Steiner berät im Fachgeschäft",
  "ueber-uns-martina.webp": "Martina Steiner im Sportschuh-Fachgeschäft",
};

// Jeder 8. Tag zeigt statt des Saisonfotos ein Team-/Shop-/Naturbild.
const TEAM_PHOTO_FREQUENCY = 8;

function listImages(category: HeroCategory): string[] {
  const dir = path.join(HERO_DIR, CATEGORY_DIRS[category]);
  try {
    return fs
      .readdirSync(dir)
      .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file))
      .sort();
  } catch {
    return [];
  }
}

function dayIndex(date: Date): number {
  return Math.floor(date.getTime() / 86_400_000);
}

// Winter: 1.11. bis 20.3., sonst Sommer.
function isWinter(date: Date): boolean {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  if (month === 11 || month === 12 || month === 1 || month === 2) return true;
  if (month === 3 && day <= 20) return true;
  return false;
}

function pick<T>(items: T[], seed: number): T {
  const index = ((seed % items.length) + items.length) % items.length;
  return items[index];
}

function imageFrom(category: HeroCategory, seed: number): { src: string; alt: string } | null {
  const files = listImages(category);
  if (files.length === 0) return null;
  const file = pick(files, seed);
  return {
    src: `/images/hero/${CATEGORY_DIRS[category]}/${file}`,
    alt: ALT_TEXTS[file] ?? FALLBACK[category].alt,
  };
}

export function getHeroImage(date: Date = new Date()): { src: string; alt: string } {
  const seed = dayIndex(date);
  const season: HeroCategory = isWinter(date) ? "winter" : "sommer";
  const showTeamPhoto = seed % TEAM_PHOTO_FREQUENCY === 0;

  const category: HeroCategory = showTeamPhoto ? "team" : season;
  return (
    imageFrom(category, seed) ??
    imageFrom(season, seed) ??
    FALLBACK[season]
  );
}
