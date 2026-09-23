import { getPlaceDetails } from "@/lib/google-places";
import { currentOpenStatus } from "@/lib/opening-hours";

/**
 * Live-Statuszeile ("Jetzt geöffnet · bis 18:00"). Der offen/geschlossen-Status
 * kommt nach Möglichkeit von Google (berücksichtigt Feiertage/Sondertage),
 * die Uhrzeit "bis wann" aus den lokal hinterlegten Öffnungszeiten. Ohne
 * Google-Anbindung läuft alles rein lokal.
 */
export async function OpenStatusBadge() {
  const details = await getPlaceDetails();
  const local = currentOpenStatus();
  const isOpen = details?.openNow ?? local.open;

  return (
    <p className="flex items-center gap-1.5 text-xs font-medium">
      <span
        className={`h-2 w-2 rounded-full ${isOpen ? "bg-green-500" : "bg-text-muted/50"}`}
        aria-hidden="true"
      />
      {isOpen
        ? local.open
          ? `Jetzt geöffnet · bis ${local.until}`
          : "Jetzt geöffnet"
        : "Geschlossen"}
    </p>
  );
}
