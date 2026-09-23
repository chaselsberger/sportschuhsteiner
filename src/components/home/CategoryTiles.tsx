import Image from "next/image";
import Link from "next/link";
import { homeCategories } from "@/brand.config";
import { Icon } from "../Icon";

/** „Wohin soll Ihr Schuh Sie tragen?“ – Foto-Kacheln je Sportart */
export function CategoryTiles() {
  return (
    <section
      id="sortiment"
      className="flex flex-col gap-3.5 px-4 py-5 sm:px-8 lg:gap-9 lg:px-16 lg:pb-10 lg:pt-[72px]"
    >
      <div className="flex items-end justify-between gap-10">
        <div className="flex flex-col gap-3.5">
          <p className="t-eyebrow m-0 hidden text-linkblau lg:block">
            Sortiment
          </p>
          <h2 className="t-h2 text-nachtblau">
            Wohin soll Ihr Schuh Sie tragen?
          </h2>
        </div>
        <p className="m-0 hidden max-w-[420px] text-base leading-relaxed text-text-muted lg:block">
          Vom Trailrun am Hintersteiner See bis zur Skitour auf die Hohe Salve –
          wir finden den Schuh, der zu Ihrem Fuß und Ihrem Vorhaben passt.
        </p>
      </div>

      <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0 md:grid-cols-3 lg:gap-6">
        {homeCategories.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/sortiment/${cat.slug}`}
              className="lift zoom relative block h-[176px] overflow-hidden rounded-[18px] text-white sm:h-[240px] lg:h-[330px] lg:rounded-[22px]"
            >
              <Image
                src={cat.image}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover"
                style={{ objectPosition: cat.position }}
              />
              {/* Mobil: kompakte Beschriftung */}
              <span className="absolute inset-x-2 bottom-2 flex items-center gap-2 rounded-xl bg-[rgba(19,48,59,0.9)] px-3 py-2.5 lg:hidden">
                <span className="flex text-logogelb">
                  <Icon name={cat.icon} size={26} />
                </span>
                <span className="text-sm font-extrabold">{cat.shortLabel}</span>
              </span>
              {/* Desktop: Titel, Unterzeile, Pfeil */}
              <span className="absolute inset-x-3.5 bottom-3.5 hidden items-center gap-4 rounded-2xl bg-[rgba(19,48,59,0.9)] px-5 py-[18px] lg:flex">
                <span className="shrink-0 text-logogelb">
                  <Icon name={cat.icon} size={44} />
                </span>
                <span className="flex flex-1 flex-col gap-0.5">
                  <span className="t-h4">{cat.label}</span>
                  <span className="text-sm text-hellblau">{cat.teaser}</span>
                </span>
                <span className="shrink-0">
                  <Icon name="arrow" size={22} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
