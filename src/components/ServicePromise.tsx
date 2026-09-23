import Link from "next/link";
import { services } from "@/brand.config";
import { Icon } from "./Icon";

const serviceIcons = {
  fussanalyse: "insole",
  einlagen: "insole",
  bootfitting: "ski",
  reparaturen: "work",
  laufberatung: "run",
} as const;

export function ServicePromise() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" id="service">
      <h2 className="font-[var(--font-heading)] text-3xl uppercase text-nachtblau">
        Beratung zuerst
      </h2>
      <p className="mt-2 max-w-2xl text-text-muted">
        Kund:innen fahren viele Kilometer wegen unserer Beratung — deshalb
        steht sie auf jeder Seite vor dem Verkauf.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/beratung-service#${service.slug}`}
            className="group flex flex-col gap-3 rounded-[24px] border border-linie bg-white p-5 transition hover:border-logoblau"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-stein-2 text-nachtblau">
              <Icon name={serviceIcons[service.slug]} className="h-5 w-5" />
            </span>
            <span className="font-semibold text-nachtblau">
              {service.label}
            </span>
            <span className="text-sm text-text-muted">{service.short}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
