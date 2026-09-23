import Link from "next/link";
import { brand } from "@/brand.config";
import { LogoMountain } from "./LogoMountain";
import { RidgeLine } from "./RidgeLine";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-nachtblau text-stein">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-14 sm:px-6 sm:pt-20">
        <div className="mx-auto max-w-xs sm:max-w-sm">
          <LogoMountain />
        </div>

        <h1 className="mt-8 max-w-2xl font-[var(--font-heading)] text-4xl uppercase leading-[1.05] tracking-wide sm:text-6xl">
          {brand.claim}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-stein/80">
          Fußanalyse, Einlagen nach Maß und Bootfitting seit 2006 — in{" "}
          {brand.address.city}, mitten im Wilden Kaiser.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/kontakt#termin"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-logogelb px-6 font-bold text-nachtblau"
          >
            Termin anfragen
          </Link>
          <Link
            href="/beratung-service"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-stein/40 px-6 font-semibold text-stein hover:border-stein"
          >
            Beratung & Service
          </Link>
        </div>
      </div>
      <RidgeLine className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
