import { getPlaceDetails, type GoogleReview } from "@/lib/google-places";
import { Icon } from "./Icon";

const FALLBACK_MAPS =
  "https://www.google.com/maps/search/?api=1&query=Sport+Schuh+Steiner+Scheffau";

/** Sterne mit Teilfüllung (z. B. 4,7) */
function Stars({ rating, size }: { rating: number; size: number }) {
  return (
    <span className="flex gap-0.5 text-sterne" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span
            key={i}
            className="relative"
            style={{ width: size, height: size }}
          >
            <Icon name="star" size={size} />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <svg
                viewBox="0 0 48 48"
                width={size}
                height={size}
                fill="currentColor"
              >
                <path d="M24 5l5.8 12 13.2 1.8-9.6 9.1 2.4 13.1L24 34.7 12.2 41l2.4-13.1L5 18.8 18.2 17z" />
              </svg>
            </span>
          </span>
        );
      })}
    </span>
  );
}

function Avatar({ review }: { review: GoogleReview }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-stein-2 font-extrabold text-nachtblau">
      {review.authorName.charAt(0)}
    </span>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <li className="flex flex-col gap-4 rounded-[20px] border border-karte-rand bg-white p-7">
      <div className="flex items-center gap-3">
        <Avatar review={review} />
        <div className="flex flex-col gap-1">
          <span className="text-[15px] font-extrabold">
            {review.authorName}
          </span>
          <span className="text-[13px] text-grau">
            {review.relativeTime} · Google
          </span>
        </div>
      </div>
      <Stars rating={review.rating} size={20} />
      <span className="sr-only">{review.rating} von 5 Sternen</span>
      <p className="m-0 line-clamp-6 text-[15px] leading-relaxed text-text-muted">
        {review.text}
      </p>
    </li>
  );
}

function SkeletonCard() {
  return (
    <li
      aria-hidden="true"
      className="flex flex-col gap-4 rounded-[20px] border border-karte-rand bg-white p-7"
    >
      <div className="flex items-center gap-3">
        <div className="shim h-11 w-11 rounded-full" />
        <div className="flex flex-col gap-2">
          <div className="shim h-3 w-24 rounded-md" />
          <div className="shim h-2.5 w-32 rounded-md" />
        </div>
      </div>
      <Stars rating={0} size={20} />
      <div className="flex flex-col gap-2">
        <div className="shim h-2.5 w-full rounded-md" />
        <div className="shim h-2.5 w-11/12 rounded-md" />
        <div className="shim h-2.5 w-4/5 rounded-md" />
      </div>
    </li>
  );
}

/**
 * Google-Bewertungen: Gesamtwertung groß, dazu die Textbewertungen von Google
 * (mit Autor, Datum und Google-Kennzeichnung). Abruf serverseitig, stündlich.
 */
export async function GoogleReviews() {
  const details = await getPlaceDetails();
  const mapsLink = details?.googleMapsUri ?? FALLBACK_MAPS;
  const rating = details
    ? details.rating.toLocaleString("de-AT", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      })
    : null;
  const reviews = details?.reviews ?? [];

  const summary = (big: string, starSize: number) =>
    details ? (
      <div className="flex items-center gap-3 lg:mt-2.5 lg:gap-3.5">
        <span className={`${big} font-extrabold leading-none text-nachtblau`}>
          {rating}
        </span>
        <div className="flex flex-col gap-1">
          <Stars rating={details.rating} size={starSize} />
          <span className="text-[13px] text-text-muted lg:text-sm">
            aus {details.userRatingCount.toLocaleString("de-AT")} Bewertungen
          </span>
        </div>
        <span className="sr-only">
          {rating} von 5 Sternen bei {details.userRatingCount}{" "}
          Google-Bewertungen
        </span>
      </div>
    ) : (
      <p className="m-0 text-sm text-text-muted lg:mt-2.5">
        Die Gesamtbewertung und die neuesten Bewertungen erscheinen hier
        automatisch, sobald die Google-Anbindung aktiv ist.
      </p>
    );

  return (
    <>
      {/* Desktop */}
      <section className="hidden gap-12 px-16 pb-10 pt-[72px] lg:flex">
        <div className="flex w-[340px] shrink-0 flex-col gap-3.5">
          <p className="t-eyebrow m-0 text-linkblau">Google-Bewertungen</p>
          <h2 className="t-h2 text-nachtblau">
            Was Kundinnen und Kunden sagen
          </h2>
          {summary("text-[56px]", 20)}
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-2 font-extrabold"
          >
            Alle auf Google lesen
            <Icon name="arrow" size={18} />
          </a>
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-bold text-text-muted"
          >
            Bewertung schreiben
          </a>
        </div>
        <ul className="m-0 grid flex-1 list-none grid-cols-3 content-start gap-5 p-0">
          {reviews.length > 0
            ? reviews
                .slice(0, 3)
                .map((r, i) => <ReviewCard key={i} review={r} />)
            : [0, 1, 2].map((i) => <SkeletonCard key={i} />)}
        </ul>
      </section>

      {/* Mobil */}
      <section className="flex flex-col gap-3 px-4 py-7 sm:px-8 lg:hidden">
        <h2 className="t-h2 text-nachtblau">Google-Bewertungen</h2>
        {summary("text-[40px]", 16)}
        {reviews.length > 0 ? (
          <ul className="scroll-row m-0 flex list-none gap-3 overflow-x-auto p-0">
            {reviews.map((r, i) => (
              <li
                key={i}
                className="flex w-[85%] shrink-0 flex-col gap-2.5 rounded-2xl border border-karte-rand bg-white p-[18px]"
              >
                <b className="text-sm">{r.authorName} · Google</b>
                <Stars rating={r.rating} size={14} />
                <p className="m-0 line-clamp-5 text-sm leading-relaxed text-text-muted">
                  {r.text}
                </p>
                <span className="text-xs text-grau">{r.relativeTime}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div
            aria-hidden="true"
            className="flex flex-col gap-2.5 rounded-2xl border border-karte-rand bg-white p-[18px]"
          >
            <div className="shim h-3 w-28 rounded-md" />
            <div className="shim h-2.5 w-full rounded-md" />
            <div className="shim h-2 w-[70%] rounded-md" />
          </div>
        )}
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-extrabold"
        >
          Alle auf Google lesen →
        </a>
      </section>
    </>
  );
}
