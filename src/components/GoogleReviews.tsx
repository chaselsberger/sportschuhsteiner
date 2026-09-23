import { Icon } from "./Icon";

/**
 * Platzhalter bis die Places-API-Anbindung (stündlicher Cron, siehe Briefing
 * Punkt 5) live ist. Zeigt bewusst keine erfundenen Bewertungen — nur einen
 * echten Link zu Google, bis Place ID und API-Key vom Kunden vorliegen.
 */
export function GoogleReviews() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-col items-start gap-6 rounded-[24px] border border-linie bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-[var(--font-heading)] text-2xl uppercase text-nachtblau">
            Google-Bewertungen
          </h2>
          <p className="mt-2 flex items-center gap-1 text-text-muted">
            <Icon name="star" className="h-5 w-5 text-logogelb" />
            Wird automatisch angezeigt, sobald die Google-Anbindung
            eingerichtet ist (Platzhalter in der Vorschau).
          </p>
        </div>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Sport+Schuh+Steiner+Scheffau"
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] shrink-0 rounded-full border-2 border-nachtblau px-5 py-2 font-semibold text-nachtblau"
        >
          Alle Bewertungen auf Google lesen
        </a>
      </div>
    </section>
  );
}
