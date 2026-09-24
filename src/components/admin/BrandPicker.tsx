"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Markenfeld mit Chip-Auswahl statt reinem Freitext: bestehende Marken aus
 * der Marken-Datenbank (/api/admin/marken) werden als antippbare Chips
 * angezeigt und gefiltert, während getippt wird. Das verhindert Tippfehler
 * (z. B. "Salomon" vs. "salomon "), die auf der Shop-Seite sonst zu
 * doppelten/kaputten Marken-Filtern führen. Neue Marken bleiben weiterhin
 * möglich und werden beim Speichern automatisch angelegt.
 */
export function BrandPicker({
  id,
  name,
  defaultValue = "",
  required,
}: {
  id: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  const [brands, setBrands] = useState<string[]>([]);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    fetch("/api/admin/marken")
      .then((res) => res.json())
      .then((data) => setBrands(Array.isArray(data?.brands) ? data.brands : []))
      .catch(() => {});
  }, []);

  const query = value.trim().toLowerCase();
  const matches = useMemo(() => {
    const list = query ? brands.filter((b) => b.toLowerCase().includes(query)) : brands;
    return list.slice(0, 8);
  }, [brands, query]);

  const isNew = query.length > 0 && !brands.some((b) => b.toLowerCase() === query);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-extrabold text-nachtblau">
        Marke
      </label>
      <input
        id={id}
        name={name}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
        autoComplete="off"
        placeholder="Marke suchen oder neu eingeben …"
        className="h-[52px] rounded-xl border border-formrand bg-white px-4 text-base"
      />
      {matches.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {matches.map((b) => {
            const active = b.toLowerCase() === query;
            return (
              <button
                key={b}
                type="button"
                aria-pressed={active}
                onClick={() => setValue(b)}
                className={`h-8 rounded-full border px-3 text-[13px] font-bold ${
                  active
                    ? "border-nachtblau bg-nachtblau text-white"
                    : "border-formrand bg-white text-nachtblau hover:border-nachtblau"
                }`}
              >
                {b}
              </button>
            );
          })}
        </div>
      )}
      {isNew && (
        <p className="m-0 text-[12px] text-text-muted">
          „{value.trim()}“ ist neu – wird beim Speichern als Marke angelegt.
        </p>
      )}
    </div>
  );
}
