/**
 * Löscht die physischen Originalfotos verkaufter Produkte 1 Monat nach dem
 * Kaufdatum (Order.createdAt), damit dauerhaft Speicherplatz frei wird. Die
 * ProductPhoto-Datensätze selbst bleiben erhalten (nur `deletedAt` wird
 * gesetzt) – so bleibt die Historie für Statistik/Nachvollziehbarkeit
 * erhalten, siehe README für die Einrichtung als geplante Aufgabe.
 *
 * Aufruf: `npm run cleanup:photos`
 */
import { unlink } from "node:fs/promises";
import path from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

process.loadEnvFile(".env");

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL fehlt in .env");

const photosDirEnv = process.env.PRODUCT_PHOTOS_DIR;
if (!photosDirEnv) throw new Error("PRODUCT_PHOTOS_DIR fehlt in .env");
const photosDir: string = photosDirEnv;

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: databaseUrl }),
});

const RETENTION_DAYS = 30;

async function main() {
  const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000);

  // Verkaufte Produkte, deren zugehörige Order älter als die Aufbewahrungsfrist ist.
  const soldProducts = await prisma.product.findMany({
    where: {
      status: "verkauft",
      orders: { some: { createdAt: { lt: cutoff } } },
    },
    include: {
      photos: { where: { deletedAt: null } },
      orders: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  let deletedFiles = 0;
  let failedFiles = 0;

  for (const product of soldProducts) {
    const lastOrder = product.orders[0];
    if (!lastOrder || lastOrder.createdAt >= cutoff) continue;

    for (const photo of product.photos) {
      try {
        await unlink(path.join(/* turbopackIgnore: true */ photosDir, photo.dateiname));
      } catch (err: unknown) {
        // Datei war evtl. schon weg – trotzdem als gelöscht markieren.
        if ((err as NodeJS.ErrnoException)?.code !== "ENOENT") {
          failedFiles += 1;
          console.error(`Konnte ${photo.dateiname} nicht löschen:`, err);
          continue;
        }
      }
      await prisma.productPhoto.update({
        where: { id: photo.id },
        data: { deletedAt: new Date() },
      });
      deletedFiles += 1;
    }
  }

  console.log(
    `Aufräumen abgeschlossen: ${deletedFiles} Foto(s) bei ${soldProducts.length} verkauften Produkt(en) gelöscht` +
      (failedFiles > 0 ? `, ${failedFiles} Fehler beim Löschen.` : "."),
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
