/**
 * Einmalig ausführen (`npm run seed`), um die ehemaligen Beispieldaten aus
 * demo-products.ts in die Datenbank zu übernehmen und den ersten
 * Admin-Zugang anzulegen. Danach über /admin verwalten.
 */
import bcrypt from "bcryptjs";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

process.loadEnvFile(".env");

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL fehlt in .env");

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: databaseUrl }),
});

const legacyProducts = [
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
    legacyImage: "/images/produkt-salomon-xmission3.jpg",
    imageFit: "contain",
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
    legacyImage: "/images/kategorie-laufen.jpg",
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
    legacyImage: "/images/kategorie-barfuss.jpg",
    isRestposten: true,
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
    legacyImage: "/images/produkt-diadora-s3.jpg",
    imagePosition: "50% 65%",
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
    legacyImage: "/images/kategorie-laufen.jpg",
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
    legacyImage: "/images/kategorie-wandern.jpg",
    imagePosition: "50% 60%",
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
    legacyImage: "/images/kategorie-beruf.jpg",
    imagePosition: "50% 55%",
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
    legacyImage: "/images/kategorie-barfuss.jpg",
    isRestposten: true,
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
    legacyImage: "/images/kategorie-ski.jpg",
    imagePosition: "50% 30%",
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
    legacyImage: "/images/produkt-dolomite-trekking.jpg",
  },
] as const;

async function main() {
  for (const p of legacyProducts) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      create: { ...p, status: "veroeffentlicht" },
      update: {},
    });
  }
  console.log(`${legacyProducts.length} Produkte angelegt/vorhanden.`);

  const adminEmail = process.env.ADMIN_SEED_EMAIL;
  const adminPassword = process.env.ADMIN_SEED_PASSWORD;
  if (!adminEmail || !adminPassword) {
    console.log(
      "ADMIN_SEED_EMAIL/ADMIN_SEED_PASSWORD fehlen in .env — kein Admin-Zugang angelegt.",
    );
    return;
  }
  const existing = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  });
  if (existing) {
    console.log(`Admin-Zugang für ${adminEmail} existiert bereits.`);
    return;
  }
  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.adminUser.create({
    data: { email: adminEmail, passwordHash, name: "Inhaber" },
  });
  console.log(`Admin-Zugang für ${adminEmail} angelegt.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
