import "server-only";

export type GoogleReview = {
  authorName: string;
  authorPhotoUrl?: string;
  rating: number;
  text: string;
  relativeTime: string;
};

export type PlaceDetails = {
  rating: number;
  userRatingCount: number;
  googleMapsUri: string;
  reviews: GoogleReview[];
  openNow: boolean | null;
  weekdayDescriptions: string[];
};

const FIELD_MASK = [
  "rating",
  "userRatingCount",
  "googleMapsUri",
  "reviews",
  "regularOpeningHours",
  "currentOpeningHours",
].join(",");

/**
 * Serverseitiger Abruf der Google Places API (New). Der API-Key erscheint nie
 * im Browser. Next.js cacht die Antwort für 1h (next.revalidate) — läuft der
 * Abruf schief, bleiben laut Cache-Verhalten automatisch die zuletzt
 * erfolgreich geladenen Daten stehen (stale-while-revalidate), bis der
 * nächste Abruf wieder klappt. Gibt null zurück, wenn Key/Place-ID fehlen
 * oder offensichtlich noch Platzhalter sind.
 */
export async function getPlaceDetails(): Promise<PlaceDetails | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId || placeId.length < 10) {
    return null;
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?languageCode=de`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": FIELD_MASK,
        },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      console.error(
        `Google Places API: ${res.status} ${res.statusText} — ${await res.text()}`,
      );
      return null;
    }

    const data = await res.json();

    return {
      rating: data.rating ?? 0,
      userRatingCount: data.userRatingCount ?? 0,
      googleMapsUri:
        data.googleMapsUri ??
        "https://www.google.com/maps/search/?api=1&query=Sport+Schuh+Steiner+Scheffau",
      // Places API (New) hat keinen reviewsSort-Parameter mehr (anders als
      // die alte API) und liefert die bis zu 5 Reviews in Google-eigener
      // "Relevanz"-Reihenfolge — hier nach publishTime neu sortiert.
      reviews: (data.reviews ?? [])
        .slice()
        .sort(
          (
            a: { publishTime?: string },
            b: { publishTime?: string },
          ) =>
            new Date(b.publishTime ?? 0).getTime() -
            new Date(a.publishTime ?? 0).getTime(),
        )
        .slice(0, 5)
        .map(
          (r: {
            authorAttribution?: { displayName?: string; photoUri?: string };
            rating?: number;
            text?: { text?: string };
            relativePublishTimeDescription?: string;
          }): GoogleReview => ({
            authorName: r.authorAttribution?.displayName ?? "Google-Nutzer:in",
            authorPhotoUrl: r.authorAttribution?.photoUri,
            rating: r.rating ?? 0,
            text: r.text?.text ?? "",
            relativeTime: r.relativePublishTimeDescription ?? "",
          }),
        ),
      openNow:
        data.currentOpeningHours?.openNow ??
        data.regularOpeningHours?.openNow ??
        null,
      weekdayDescriptions: data.regularOpeningHours?.weekdayDescriptions ?? [],
    };
  } catch (err) {
    console.error("Google Places API nicht erreichbar:", err);
    return null;
  }
}
