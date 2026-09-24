/** Umrechnung EU-Schuhgröße → UK/US, für die Vorschläge im Admin-Formular.
 * Basiert auf gängigen Umrechnungstabellen (Richtwerte – die exakte Größe
 * steht immer auf dem Schuhkarton und hat Vorrang). */

type Gender = "Damen" | "Herren" | "Kinder";

const EU_ANCHORS: Record<number, { uk: number; usHerren: number; usDamen: number }> = {
  35: { uk: 2.5, usHerren: 3.5, usDamen: 5 },
  36: { uk: 3.5, usHerren: 4.5, usDamen: 6 },
  37: { uk: 4, usHerren: 5, usDamen: 6.5 },
  38: { uk: 5, usHerren: 6, usDamen: 7.5 },
  39: { uk: 5.5, usHerren: 6.5, usDamen: 8 },
  40: { uk: 6.5, usHerren: 7.5, usDamen: 9 },
  41: { uk: 7, usHerren: 8, usDamen: 9.5 },
  42: { uk: 8, usHerren: 9, usDamen: 10.5 },
  43: { uk: 9, usHerren: 10, usDamen: 11.5 },
  44: { uk: 9.5, usHerren: 10.5, usDamen: 12 },
  45: { uk: 10.5, usHerren: 11.5, usDamen: 13 },
  46: { uk: 11, usHerren: 12, usDamen: 13.5 },
  47: { uk: 12, usHerren: 13, usDamen: 14.5 },
  48: { uk: 12.5, usHerren: 13.5, usDamen: 15 },
};

function interpolate(eu: number, key: "uk" | "usHerren" | "usDamen"): number | null {
  const lower = Math.floor(eu);
  const upper = Math.ceil(eu);
  const lowVal = EU_ANCHORS[lower]?.[key];
  const highVal = EU_ANCHORS[upper]?.[key];
  if (lowVal === undefined || highVal === undefined) return null;
  if (lower === upper) return lowVal;
  const raw = lowVal + (highVal - lowVal) * (eu - lower);
  return Math.round(raw * 2) / 2;
}

export function euToUk(eu: number): number | null {
  return interpolate(eu, "uk");
}

export function euToUs(eu: number, gender: Gender): number | null {
  return interpolate(eu, gender === "Herren" ? "usHerren" : "usDamen");
}

function fmt(n: number) {
  return n.toString().replace(".", ",");
}

/** Vorschlag für das Größendetails-Feld, z. B. "UK 9,5 · US 10,5". Rein
 * informativ – ersetzt nie den Aufdruck auf dem Schuhkarton. */
export function suggestSizeDetails(eu: number, gender: Gender): string | null {
  const uk = euToUk(eu);
  const us = euToUs(eu, gender);
  const parts: string[] = [];
  if (uk !== null) parts.push(`UK ${fmt(uk)}`);
  if (us !== null) parts.push(`US ${fmt(us)}`);
  return parts.length > 0 ? parts.join(" · ") : null;
}
