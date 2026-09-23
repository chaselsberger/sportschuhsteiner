import Image from "next/image";
import Link from "next/link";
import { brand } from "@/brand.config";
import { currentOpenStatus } from "@/lib/opening-hours";
import { Icon } from "./Icon";
import { MainNav } from "./MainNav";
import { OpenStatusLive } from "./OpenStatusLive";

const tel = `tel:${brand.contact.phone.replace(/\s+/g, "")}`;

export async function Header() {
  const status = currentOpenStatus();

  return (
    <>
      {/* Desktop: Info-Leiste mit Live-Status, Adresse, Telefon */}
      <div className="page-x hidden h-10 items-center justify-between bg-nachtblau text-[13px] text-hellblau lg:flex">
        <OpenStatusLive initial={status} variant="bar" />
        <div className="flex items-center gap-7">
          <span>
            {brand.address.street} · {brand.address.zip} {brand.address.city}
          </span>
          <a href={tel} className="font-bold text-white hover:text-logogelb">
            {brand.contact.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Desktop-Kopf */}
      <header className="page-x hidden h-24 items-center justify-between border-b border-karte-rand bg-stein lg:flex">
        <Link
          href="/"
          aria-label={`${brand.name} – Startseite`}
          className="flex shrink-0"
        >
          <Image
            src="/brand/logo-full-nachtblau.svg"
            alt={brand.name}
            width={139}
            height={56}
            loading="eager"
            className="block h-14 w-[139px]"
          />
        </Link>
        <MainNav />
        <div className="flex items-center gap-3.5">
          <Link
            href="/shop"
            aria-label="Warenkorb"
            className="hidden h-12 w-12 items-center justify-center rounded-full border border-linie text-nachtblau hover:bg-white xl:flex"
          >
            <Icon name="bag" size={22} />
          </Link>
          <a
            href="#termin"
            className="flex h-12 items-center gap-2.5 rounded-full bg-nachtblau px-6 text-[15px] font-extrabold text-white hover:bg-tiefblau"
          >
            <Icon name="calendar" size={20} />
            Termin buchen
          </a>
        </div>
      </header>

      {/* Mobil-Kopf: Logo + Öffnungsstatus */}
      <header className="flex h-[68px] items-center justify-between bg-stein px-4 sm:px-8 lg:hidden">
        <Link
          href="/"
          aria-label={`${brand.name} – Startseite`}
          className="flex"
        >
          <Image
            src="/brand/logo-full-nachtblau.svg"
            alt={brand.name}
            width={104}
            height={42}
            loading="eager"
            className="block h-[42px] w-[104px]"
          />
        </Link>
        <OpenStatusLive initial={status} variant="pill" />
      </header>
    </>
  );
}
