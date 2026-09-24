-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "categoryLabel" TEXT NOT NULL,
    "categories" TEXT NOT NULL DEFAULT '',
    "gender" TEXT NOT NULL,
    "size" REAL NOT NULL,
    "sizeDetails" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "oldPrice" INTEGER,
    "badge" TEXT,
    "isRestposten" BOOLEAN NOT NULL DEFAULT false,
    "isNew" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'entwurf',
    "description" TEXT,
    "detailsMaterial" TEXT,
    "fitTip" TEXT,
    "legacyImage" TEXT,
    "imageFit" TEXT,
    "imagePosition" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("badge", "brand", "category", "categoryLabel", "createdAt", "description", "detailsMaterial", "fitTip", "gender", "id", "imageFit", "imagePosition", "isNew", "isRestposten", "legacyImage", "model", "oldPrice", "price", "size", "sizeDetails", "slug", "status", "title", "updatedAt") SELECT "badge", "brand", "category", "categoryLabel", "createdAt", "description", "detailsMaterial", "fitTip", "gender", "id", "imageFit", "imagePosition", "isNew", "isRestposten", "legacyImage", "model", "oldPrice", "price", "size", "sizeDetails", "slug", "status", "title", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- Bestehende Produkte: bisherige Einzelkategorie auch in "categories" eintragen.
UPDATE "Product" SET "categories" = "category" WHERE "categories" = '';
