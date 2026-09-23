import { getPlaceDetails } from "@/lib/google-places";
import { Icon } from "./Icon";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="relative h-4 w-4">
          <Icon name="star" className="absolute inset-0 h-4 w-4 text-linie" />
          <span
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${Math.max(0, Math.min(1, rating - i)) * 100}%` }}
          >
            <Icon name="star" className="h-4 w-4 text-logogelb" />
          </span>
        </span>
      ))}
    </div>
  );
}

export async function GoogleReviews() {
  const details = await getPlaceDetails();

  const mapsLink =
    details?.googleMapsUri ??
    "https://www.google.com/maps/search/?api=1&query=Sport+Schuh+Steiner+Scheffau";

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="rounded-[24px] border border-linie bg-white p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-[var(--font-heading)] text-2xl uppercase text-nachtblau">
              Google-Bewertungen
            </h2>
            {details ? (
              <div className="mt-2 flex items-center gap-3">
                <span className="text-3xl font-bold text-nachtblau">
                  {details.rating.toFixed(1)}
                </span>
                <div>
                  <Stars rating={details.rating} />
                  <p className="text-sm text-text-muted">
                    {details.userRatingCount} Bewertungen
                  </p>
                </div>
              </div>
            ) : (
              <p className="mt-2 flex items-center gap-1 text-text-muted">
                <Icon name="star" className="h-5 w-5 text-logogelb" />
                Bewertungen werden geladen, sobald die Google-Anbindung aktiv
                ist.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] rounded-full border-2 border-nachtblau px-5 py-2 text-center font-semibold text-nachtblau"
            >
              Alle Bewertungen lesen
            </a>
            <a
              href={`${mapsLink}${mapsLink.includes("?") ? "&" : "?"}review=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-linkblau underline"
            >
              Bewertung schreiben
            </a>
          </div>
        </div>

        {details && details.reviews.length > 0 && (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {details.reviews.map((review, i) => (
              <li
                key={i}
                className="flex flex-col gap-2 rounded-[16px] border border-linie/70 bg-stein-2/40 p-4"
              >
                <div className="flex items-center gap-2">
                  {review.authorPhotoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={review.authorPhotoUrl}
                      alt=""
                      className="h-8 w-8 rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-stein-2 text-sm font-semibold text-nachtblau">
                      {review.authorName.charAt(0)}
                    </span>
                  )}
                  <div>
                    <p className="text-sm font-semibold">
                      {review.authorName}
                    </p>
                    <Stars rating={review.rating} />
                  </div>
                </div>
                <p className="line-clamp-4 text-sm text-text-muted">
                  {review.text}
                </p>
                <p className="text-xs text-text-muted/70">
                  {review.relativeTime} · via Google
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
