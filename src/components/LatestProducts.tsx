import { Icon } from "./Icon";

/**
 * Auf der Startseite: die 4 neuesten Einzelstücke. Der Shop (Payload + Stripe)
 * braucht eine Datenbank und läuft daher erst, sobald für die Domain
 * Node.js-Hosting eingerichtet ist — bis dahin bewusst kein Fake-Bestand.
 */
export function LatestProducts() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex items-center justify-between">
        <h2 className="font-[var(--font-heading)] text-3xl uppercase text-nachtblau">
          Neu im Shop
        </h2>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-[24px] border border-dashed border-linie bg-stein-2/60 p-6 text-center"
          >
            <Icon name="shop" className="h-8 w-8 text-linie" />
            <p className="text-sm text-text-muted">
              Shop startet in Kürze — jedes Paar ein Einzelstück.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
