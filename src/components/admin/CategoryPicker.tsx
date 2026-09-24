"use client";

import { shopCategories, type ShopCategory } from "@/lib/product-types";

/**
 * Kategorie-Mehrfachauswahl als Chip-Grid statt Dropdown: ein Produkt kann
 * mehreren Kategorien zugeordnet werden (z. B. "Laufen" + "Barfuß &
 * Freizeit"), damit es im Shop-Filter unter allen passenden Kategorien
 * auftaucht. Die zuerst gewählte Kategorie gilt als Hauptkategorie (Badge,
 * Produktseite). Für <form>-basiertes Absenden per FormData gibt es pro
 * ausgewählter Kategorie ein verstecktes Input-Feld `name="categories"`.
 */
export function CategoryPicker({
  name = "categories",
  selected,
  onChange,
}: {
  name?: string;
  selected: ShopCategory[];
  onChange: (next: ShopCategory[]) => void;
}) {
  function toggle(key: ShopCategory) {
    onChange(
      selected.includes(key) ? selected.filter((c) => c !== key) : [...selected, key],
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[13px] font-extrabold text-nachtblau">
        Kategorien <span className="font-normal text-text-muted">(Mehrfachauswahl)</span>
      </span>
      <div className="flex flex-wrap gap-1.5">
        {shopCategories.map((c) => {
          const active = selected.includes(c.key);
          const isPrimary = active && selected[0] === c.key;
          return (
            <button
              key={c.key}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(c.key)}
              className={`flex h-10 items-center gap-1.5 rounded-full border px-3.5 text-[14px] font-bold ${
                active
                  ? "border-nachtblau bg-nachtblau text-white"
                  : "border-formrand bg-white text-nachtblau hover:border-nachtblau"
              }`}
            >
              {c.label}
              {isPrimary && <span className="text-[11px] font-normal opacity-80">· Haupt</span>}
            </button>
          );
        })}
      </div>
      {selected.length === 0 && (
        <p className="m-0 text-[12px] text-[#b3261e]">Bitte mindestens eine Kategorie wählen.</p>
      )}
      {selected.map((key) => (
        <input key={key} type="hidden" name={name} value={key} />
      ))}
    </div>
  );
}
