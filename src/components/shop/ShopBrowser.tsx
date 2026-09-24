"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { brand } from "@/brand.config";
import {
  type Product,
  type ShopCategory,
  badgeFor,
  shopCategories,
  shopSizes,
} from "@/lib/product-types";
import { BottomSheet } from "../BottomSheet";
import { Icon } from "../Icon";
import { ProductCard } from "../ProductCard";

const SIZE_KEY = "sss-groesse";
const SIZE_EVENT = "sss-groesse-change";

/** Gemerkte Größe (nur im Browser, reine Komfortfunktion) */
function readSize(): number | null {
  try {
    const stored = Number(localStorage.getItem(SIZE_KEY));
    return shopSizes.includes(stored) ? stored : null;
  } catch {
    return null;
  }
}
function subscribeSize(onChange: () => void) {
  window.addEventListener(SIZE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(SIZE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}
function writeSize(size: number | null) {
  try {
    if (size) localStorage.setItem(SIZE_KEY, String(size));
    else localStorage.removeItem(SIZE_KEY);
  } catch {}
  window.dispatchEvent(new Event(SIZE_EVENT));
}
const genders = ["Damen", "Herren", "Kinder"] as const;
const PRICE_MIN = 40;
const PRICE_MAX = 460;

type Sort = "neu" | "preis-auf" | "preis-ab";

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex min-h-[32px] cursor-pointer items-center gap-2.5 text-[15px] text-text">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={`flex h-[22px] w-[22px] items-center justify-center rounded-md border-2 peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-logoblau ${
          checked
            ? "border-nachtblau bg-nachtblau text-logogelb"
            : "border-formrand bg-white text-transparent"
        }`}
      >
        <Icon name="check" size={16} />
      </span>
      {label}
    </label>
  );
}

/**
 * Shop-Übersicht laut Entwurf: Größe zuerst (wird gemerkt), Filter für
 * Kategorie, Für, Marke und Preis. Jedes Paar gibt es genau einmal.
 * Kategorie ist – wie Für und Marke – als Mehrfachauswahl nutzbar, z. B.
 * "Laufen" + "Wandern & Berg" gleichzeitig.
 */
export function ShopBrowser({ products }: { products: Product[] }) {
  const size = useSyncExternalStore(subscribeSize, readSize, () => null);
  const [categories, setCategories] = useState<ShopCategory[]>([]);
  const [gender, setGender] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [minPrice, setMinPrice] = useState(PRICE_MIN);
  const [sort, setSort] = useState<Sort>("neu");
  const [allBrands, setAllBrands] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  function chooseSize(s: number) {
    writeSize(size === s ? null : s);
  }

  const brandList = useMemo(
    () =>
      [...new Set(products.map((p) => p.brand))].sort((a, b) =>
        a.localeCompare(b, "de"),
      ),
    [products],
  );

  const bySize = size ? products.filter((p) => p.size === size) : products;
  const filtered = bySize
    .filter((p) => categories.length === 0 || categories.includes(p.category))
    .filter((p) => gender.length === 0 || gender.includes(p.gender))
    .filter((p) => brands.length === 0 || brands.includes(p.brand))
    .filter((p) => p.price >= minPrice && p.price <= maxPrice)
    .sort((a, b) =>
      sort === "preis-auf"
        ? a.price - b.price
        : sort === "preis-ab"
          ? b.price - a.price
          : 0,
    );

  function toggle<T>(list: T[], value: T): T[] {
    return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
  }

  const chips = [
    ...categories.map((key) => ({
      label: shopCategories.find((c) => c.key === key)!.label,
      clear: () => setCategories(toggle(categories, key)),
    })),
    ...gender.map((g) => ({
      label: g,
      clear: () => setGender(toggle(gender, g)),
    })),
    ...brands.map((b) => ({
      label: b,
      clear: () => setBrands(toggle(brands, b)),
    })),
    ...(minPrice > PRICE_MIN || maxPrice < PRICE_MAX
      ? [
          {
            label: `€ ${minPrice}–${maxPrice}`,
            clear: () => {
              setMinPrice(PRICE_MIN);
              setMaxPrice(PRICE_MAX);
            },
          },
        ]
      : []),
  ];

  const categoryCount = (key: ShopCategory) =>
    bySize.filter((p) => p.category === key).length;

  const filters = (
    <>
      <div className="flex flex-col gap-3">
        <p className="m-0 text-[13px] font-extrabold uppercase tracking-[0.14em] text-text-muted">
          Für
        </p>
        {genders.map((g) => (
          <Checkbox
            key={g}
            label={g}
            checked={gender.includes(g)}
            onChange={() => setGender(toggle(gender, g))}
          />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <p className="m-0 text-[13px] font-extrabold uppercase tracking-[0.14em] text-text-muted">
          Marke
        </p>
        {(allBrands ? brandList : brandList.slice(0, 5)).map((b) => (
          <Checkbox
            key={b}
            label={b}
            checked={brands.includes(b)}
            onChange={() => setBrands(toggle(brands, b))}
          />
        ))}
        {brandList.length > 5 && (
          <button
            type="button"
            onClick={() => setAllBrands(!allBrands)}
            className="self-start text-sm font-extrabold text-linkblau"
          >
            {allBrands
              ? "Weniger anzeigen"
              : `+ ${brandList.length - 5} weitere`}
          </button>
        )}
      </div>
      <div className="flex flex-col gap-3.5">
        <p className="m-0 text-[13px] font-extrabold uppercase tracking-[0.14em] text-text-muted">
          Preis
        </p>
        <div className="price-range relative h-6">
          <div className="absolute inset-x-0 top-2.5 h-1 rounded bg-linie" />
          <div
            className="absolute top-2.5 h-1 rounded bg-nachtblau"
            style={{
              left: `${((minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
              right: `${100 - ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
            }}
          />
          <label className="sr-only" htmlFor="preis-min">
            Preis ab
          </label>
          <input
            id="preis-min"
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={10}
            value={minPrice}
            onChange={(e) =>
              setMinPrice(Math.min(Number(e.target.value), maxPrice - 10))
            }
          />
          <label className="sr-only" htmlFor="preis-max">
            Preis bis
          </label>
          <input
            id="preis-max"
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={10}
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(Math.max(Number(e.target.value), minPrice + 10))
            }
          />
        </div>
        <div className="flex justify-between text-sm text-text-muted">
          <span>€ {minPrice}</span>
          <span>€ {maxPrice}</span>
        </div>
      </div>
    </>
  );

  const alarm = (
    <div className="flex flex-col justify-between gap-4 rounded-[18px] bg-nachtblau p-[30px] text-white">
      <span className="text-logogelb">
        <Icon name="bell" size={40} />
      </span>
      <div className="flex flex-col gap-2.5">
        <p className="t-h3 m-0 text-white">
          Nichts dabei{size ? ` in ${size}` : ""}?
        </p>
        <p className="m-0 text-[15px] leading-relaxed text-hellblau">
          Schreiben Sie uns, wonach Sie suchen. Wir melden uns mit einem
          passenden Vorschlag.
        </p>
      </div>
      <a
        href={`mailto:${brand.contact.email}?subject=${encodeURIComponent(`Anfrage${size ? ` Gr. ${size}` : ""}`)}`}
        className="flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-logogelb px-5 font-extrabold text-nachtblau hover:brightness-95"
      >
        Anfrage senden
      </a>
    </div>
  );

  return (
    <>
      {/* Größe zuerst */}
      <section
        aria-label="Größe wählen"
        className="page-x flex flex-col gap-4 border-b border-karte-rand bg-white py-5 lg:flex-row lg:items-center lg:gap-7 lg:py-7"
      >
        <div className="flex shrink-0 flex-col gap-0.5 lg:w-[170px]">
          <p className="m-0 text-[17px] font-extrabold text-nachtblau">
            Ihre Größe zuerst
          </p>
          <p className="m-0 text-[13px] text-text-muted">
            EU · wir merken sie uns
          </p>
        </div>
        <div className="scroll-row -mx-4 flex flex-1 gap-2 overflow-x-auto px-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:px-0">
          {shopSizes.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={size === s}
              onClick={() => chooseSize(s)}
              className={`h-12 w-14 shrink-0 rounded-xl border-2 text-base font-extrabold ${
                size === s
                  ? "border-nachtblau bg-nachtblau text-white"
                  : "border-linie bg-white text-nachtblau hover:border-nachtblau"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <a
          href="#groessentabelle"
          className="flex shrink-0 items-center gap-2 text-sm font-extrabold"
        >
          <Icon name="ruler" size={20} />
          Größentabelle
        </a>
      </section>

      <div className="page-x flex gap-10 pb-16 pt-6 lg:pt-9">
        {/* Filter Desktop */}
        <aside
          aria-label="Filter"
          className="hidden w-[272px] shrink-0 flex-col gap-[30px] lg:flex"
        >
          <div className="flex flex-col gap-1">
            <p className="m-0 mb-1.5 text-[13px] font-extrabold uppercase tracking-[0.14em] text-text-muted">
              Kategorie
            </p>
            {shopCategories.map((c) => {
              const active = categories.includes(c.key);
              return (
                <button
                  key={c.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategories(toggle(categories, c.key))}
                  className={`flex items-center gap-3 rounded-xl py-2.5 pl-0 pr-3 text-left text-[15px] font-bold ${
                    active
                      ? "bg-nachtblau text-white"
                      : "text-nachtblau hover:bg-stein-2"
                  }`}
                >
                  <span className={active ? "text-logogelb" : "text-linkblau"}>
                    <Icon name={c.icon} size={24} />
                  </span>
                  <span className="flex-1">{c.label}</span>
                  <span className="text-[13px] opacity-70">
                    {categoryCount(c.key)}
                  </span>
                </button>
              );
            })}
          </div>
          {filters}
          <div className="flex flex-col gap-2.5 rounded-[18px] bg-stein-2 p-[22px]">
            <span className="text-nachtblau">
              <Icon name="phone" size={28} />
            </span>
            <p className="m-0 text-base font-extrabold text-nachtblau">
              Unsicher bei der Größe?
            </p>
            <p className="m-0 text-sm leading-normal text-text-muted">
              Rufen Sie kurz an – wir sagen Ihnen ehrlich, ob der Schuh zu Ihrem
              Fuß passt.
            </p>
            <a
              href={`tel:${brand.contact.phone.replace(/\s+/g, "")}`}
              className="text-[15px] font-extrabold"
            >
              {brand.contact.phoneDisplay}
            </a>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          {/* Mobil: Kategorien + Filter-Knopf */}
          <div className="scroll-row -mx-4 flex gap-2 overflow-x-auto px-4 sm:-mx-8 sm:px-8 lg:hidden">
            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className="flex h-11 shrink-0 items-center gap-2 rounded-full bg-nachtblau px-4 text-sm font-extrabold text-white"
            >
              Filter{chips.length > 0 ? ` (${chips.length})` : ""}
            </button>
            {shopCategories.map((c) => {
              const active = categories.includes(c.key);
              return (
                <button
                  key={c.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategories(toggle(categories, c.key))}
                  className={`flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-bold ${
                    active
                      ? "border-nachtblau bg-nachtblau text-white"
                      : "border-linie bg-white text-nachtblau"
                  }`}
                >
                  <Icon name={c.icon} size={20} />
                  {c.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[15px] text-text-muted" aria-live="polite">
                <b className="text-nachtblau">
                  {filtered.length} {filtered.length === 1 ? "Paar" : "Paare"}
                </b>
                {size ? ` in Gr. ${size}` : " in allen Größen"}
              </span>
              {chips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={chip.clear}
                  aria-label={`Filter ${chip.label} entfernen`}
                  className="flex h-[34px] items-center gap-1.5 rounded-full border border-linie bg-white px-3 text-[13px] font-bold text-nachtblau"
                >
                  {chip.label} <span aria-hidden="true">✕</span>
                </button>
              ))}
            </div>
            <label className="relative flex h-11 items-center rounded-xl border border-linie bg-white text-sm font-bold text-nachtblau">
              <span className="sr-only">Sortieren</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="h-full appearance-none bg-transparent pl-4 pr-10 font-bold"
              >
                <option value="neu">Sortieren: Neueste zuerst</option>
                <option value="preis-auf">Sortieren: Preis aufsteigend</option>
                <option value="preis-ab">Sortieren: Preis absteigend</option>
              </select>
              <span className="pointer-events-none absolute right-3">
                <Icon name="chevron-down" size={18} />
              </span>
            </label>
          </div>

          {brand.isStaging && (
            <p className="-mt-3 mb-0 text-[13px] text-grau">
              Vorschau: Produkte, Preise und Größen sind Beispieldaten.
            </p>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3">
            {filtered.slice(0, 4).map((p) => (
              <ProductCard
                key={p.slug}
                product={p}
                badge={badgeFor(p)}
                variant="shop"
              />
            ))}
            {alarm}
            {filtered.slice(4).map((p) => (
              <ProductCard
                key={p.slug}
                product={p}
                badge={badgeFor(p)}
                variant="shop"
              />
            ))}
          </div>
        </div>
      </div>

      <BottomSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        title="Filter"
      >
        <div className="flex flex-col gap-7">
          {filters}
          <button
            type="button"
            onClick={() => setFilterOpen(false)}
            className="h-[52px] rounded-full bg-nachtblau font-extrabold text-white"
          >
            {filtered.length} {filtered.length === 1 ? "Paar" : "Paare"}{" "}
            anzeigen
          </button>
        </div>
      </BottomSheet>
    </>
  );
}
