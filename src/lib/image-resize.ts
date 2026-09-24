import sharp from "sharp";

/** Maximale Kantenlänge (Breite/Höhe) für hochgeladene Produktfotos. */
const MAX_DIMENSION = 1600;
const WEBP_QUALITY = 82;

/**
 * Verkleinert ein hochgeladenes Produktfoto auf eine web-taugliche Größe und
 * konvertiert es nach WebP (EXIF-Rotation wird dabei eingebrannt). Schlägt
 * die Konvertierung fehl (z. B. bei einem HEIC-Format, das die
 * sharp/libvips-Installation nicht lesen kann), wird die Originaldatei
 * unverändert zurückgegeben – lieber ein unoptimiertes Foto als ein
 * fehlgeschlagener Upload.
 */
export async function resizeForWeb(
  buffer: Buffer,
  originalExt: string,
): Promise<{ buffer: Buffer; ext: string }> {
  try {
    const webp = await sharp(buffer)
      .rotate()
      .resize({
        width: MAX_DIMENSION,
        height: MAX_DIMENSION,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();
    return { buffer: webp, ext: ".webp" };
  } catch {
    return { buffer, ext: originalExt };
  }
}
