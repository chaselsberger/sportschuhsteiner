"use client";

import { useId, useState } from "react";
import { brand } from "@/brand.config";
import { Icon } from "./Icon";

/**
 * Größen-Alarm (Fußzeile). Bis der Shop mit Double-Opt-in live ist, öffnet das
 * Formular eine vorbefüllte E-Mail ans Geschäft – gespeichert wird nichts.
 */
export function SizeAlertForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [size, setSize] = useState("");

  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        const body = `Bitte informieren Sie mich, sobald ein Paar in Größe ${size || "[Größe]"} im Shop ist.\n\nMeine E-Mail-Adresse: ${email}`;
        window.location.href = `mailto:${brand.contact.email}?subject=${encodeURIComponent(
          `Größen-Alarm Gr. ${size}`,
        )}&body=${encodeURIComponent(body)}`;
      }}
    >
      <label htmlFor={`${id}-mail`} className="sr-only">
        E-Mail-Adresse
      </label>
      <input
        id={`${id}-mail`}
        type="email"
        required
        autoComplete="email"
        placeholder="E-Mail-Adresse"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 min-w-0 flex-1 rounded-full border border-dunkelrand bg-nachtblau px-4 text-[15px] text-white placeholder:text-[#9FB7BF]"
      />
      <label htmlFor={`${id}-size`} className="sr-only">
        Schuhgröße (EU)
      </label>
      <input
        id={`${id}-size`}
        type="text"
        inputMode="decimal"
        required
        placeholder="Gr."
        value={size}
        onChange={(e) => setSize(e.target.value)}
        className="h-12 w-16 rounded-full border border-dunkelrand bg-nachtblau px-3 text-center text-[15px] text-white placeholder:text-[#9FB7BF]"
      />
      <button
        type="submit"
        aria-label="Größen-Alarm aktivieren"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-logogelb text-nachtblau hover:brightness-95"
      >
        <Icon name="bell" size={20} />
      </button>
    </form>
  );
}
