"use client";

import { useState } from "react";
import { suggestSizeDetails } from "@/lib/shoe-size";

type Gender = "Damen" | "Herren" | "Kinder";

/**
 * Größendetails-Feld mit automatischem UK/US-Vorschlag: sobald eine
 * EU-Größe gewählt ist, wird das Feld direkt mit z. B. "UK 9,5 · US 10"
 * befüllt – ohne extra Klick. Sobald jemand das Feld von Hand ändert
 * (z. B. cm ergänzt oder den Wert vom Schuhkarton korrigiert), wird es bei
 * weiteren Größenänderungen nicht mehr automatisch überschrieben.
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
  // null = noch nicht von Hand bearbeitet -> automatischer Vorschlag greift.
  const [manualValue, setManualValue] = useState<string | null>(
    defaultValue.trim() !== "" ? defaultValue : null,
  );

  const suggestion = euSize !== null ? suggestSizeDetails(euSize, gender) : null;
  const value = manualValue ?? suggestion ?? "";

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
        onChange={(e) => setManualValue(e.target.value)}
        placeholder="UK 9,5 · US 10 · 28 cm"
        className="h-[52px] rounded-xl border border-formrand bg-white px-4 text-base"
      />
    </div>
  );
}
