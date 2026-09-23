import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/brand.config";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { BrandBand } from "@/components/home/VisitSection";

export const metadata: Metadata = {
  title: "Sortiment",
  description:
    "Lauf-, Trail-, Berg- und Wanderschuhe, Ski- und Skitourenschuhe, Schneeschuhe, Berufsschuhe und Barfußschuhe – beraten und angepasst in Scheffau am Wilden Kaiser.",
};

export default function SortimentPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Start" }, { label: "Sortiment" }]}
        title="Wohin soll Ihr Schuh Sie tragen?"
        lead="Vom Trailrun am Hintersteiner See bis zur Skitour auf die Hohe Salve – jedes Paar wird bei uns angepasst, nicht nur verkauft."
      />

      <section className="page-x py-10 lg:py-16">
        <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/sortiment/${cat.slug}`}
                className="lift zoom relative block h-[176px] overflow-hidden rounded-[18px] text-white sm:h-[240px] lg:h-[300px] lg:rounded-[22px]"
              >
                <Image
                  src={cat.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                  style={{ objectPosition: cat.position }}
                />
                <span className="absolute inset-x-2 bottom-2 flex items-center gap-2 rounded-xl bg-[rgba(19,48,59,0.9)] px-3 py-2.5 lg:inset-x-3 lg:bottom-3 lg:gap-3 lg:rounded-2xl lg:px-4 lg:py-3.5">
                  <span className="flex text-logogelb">
                    <Icon name={cat.icon} size={26} />
                  </span>
                  <span className="flex-1 text-sm font-extrabold lg:text-base">
                    {cat.label}
                  </span>
                  <span className="hidden lg:flex">
                    <Icon name="arrow" size={20} />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <BrandBand />

      <section className="page-x py-12 lg:py-20">
        <div className="flex flex-col gap-4 rounded-3xl bg-stein-2 p-7 lg:flex-row lg:items-center lg:justify-between lg:p-10">
          <div className="flex flex-col gap-2">
            <p className="t-h3 m-0 text-nachtblau">
              Nicht sicher, welcher Schuh passt?
            </p>
            <p className="m-0 max-w-[620px] text-base leading-relaxed text-text-muted">
              Kommen Sie zur Fußanalyse – danach wissen wir beide, welcher Schuh
              zu Ihrem Fuß und Ihrem Vorhaben passt.
            </p>
          </div>
          <a
            href="#termin"
            className="flex h-14 shrink-0 items-center gap-2.5 self-start rounded-full bg-nachtblau px-7 font-extrabold text-white hover:bg-tiefblau lg:self-auto"
          >
            <Icon name="calendar" size={20} />
            Beratungstermin buchen
          </a>
        </div>
      </section>
    </>
  );
}
