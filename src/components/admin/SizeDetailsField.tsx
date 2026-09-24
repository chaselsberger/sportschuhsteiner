"use client";

import { useState } from "react";
import { suggestSizeDetails } from "@/lib/shoe-size";

type Gender = "Damen" | "Herren" | "Kinder";

/**
 * Größendetails-Feld mit automatischem UK/US-Vorschlag: sobald eine
 * EU-Größe gewählt ist, wird darunter z. B. "Vorschlag: UK 9,5 · US 10,5"
 * angezeigt. Ein Klick übernimmt den Vorschlag ins Feld – nie automatisch,
 * damit ein bereits vom Schuhkarton abgetipptes Detail nicht überschrieben
 * wird.
 */
export function SizeDetailsField({
  id,
  euSize,
  gender,
  defaultValue = "",
}: {
  id: string;
  euSize: number | null;
  gender: Gender;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue);

  const suggestion = euSize !== null ? suggestSizeDetails(euSize, gender) : null;
  const showSuggestion = suggestion && value.trim() !== suggestion;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-extrabold text-nachtblau">
        Größendetails
      </label>
      <input
        id={id}
        name="sizeDetails"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="UK 9,5 · US 10 · 28 cm"
        className="h-[52px] rounded-xl border border-formrand bg-white px-4 text-base"
      />
      {showSuggestion && (
        <button
          type="button"
          onClick={() => setValue(suggestion)}
          className="self-start text-[12px] font-bold text-linkblau"
        >
          Vorschlag: {suggestion} – übernehmen
        </button>
      )}
    </div>
  );
}
