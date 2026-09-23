"use client";

import { useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { shopCategories } from "@/lib/product-types";

const genders = ["Damen", "Herren", "Kinder"] as const;

export function NewProductForm() {
  const id = useId();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<"veroeffentlicht" | "entwurf" | null>(null);

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  }

  async function submitForm(status: "veroeffentlicht" | "entwurf") {
    if (!formRef.current?.reportValidity()) return;
    setError(null);
    setLoading(status);

    const form = new FormData(formRef.current);
    form.set("status", status);
    form.set("isRestposten", "true");
    if (!form.get("badge")) form.set("badge", "Restposten");

    try {
      const res = await fetch("/api/admin/produkte", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Anlegen fehlgeschlagen.");
        setLoading(null);
        return;
      }
      router.push("/admin/produkte");
      router.refresh();
    } catch {
      setError("Anlegen fehlgeschlagen. Bitte erneut versuchen.");
      setLoading(null);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-5 rounded-[22px] border border-karte-rand bg-white p-5"
    >
      <div className="flex flex-col gap-2.5">
        <span className="text-[13px] font-extrabold text-nachtblau">Foto(s)</span>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex h-[140px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-formrand bg-stein text-sm font-bold text-nachtblau"
        >
          {previews.length === 0 ? (
            "📷 Foto aufnehmen / auswählen"
          ) : (
            <div className="flex flex-wrap justify-center gap-2 px-3">
              {previews.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="h-24 w-24 rounded-lg object-cover"
                />
              ))}
            </div>
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          name="photos"
          accept="image/*"
          capture="environment"
          multiple
          required
          onChange={handleFiles}
          className="sr-only"
        />
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        <Field label="Marke" name="brand" id={`${id}-brand`} required />
        <Field label="Modell" name="model" id={`${id}-model`} required />
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-category`} className="text-[13px] font-extrabold text-nachtblau">
            Kategorie
          </label>
          <select
            id={`${id}-category`}
            name="category"
            required
            className="h-[52px] rounded-xl border border-formrand bg-white px-3 text-base"
          >
            {shopCategories.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-gender`} className="text-[13px] font-extrabold text-nachtblau">
            Für
          </label>
          <select
            id={`${id}-gender`}
            name="gender"
            required
            className="h-[52px] rounded-xl border border-formrand bg-white px-3 text-base"
          >
            {genders.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        <Field label="Größe (EU)" name="size" id={`${id}-size`} type="number" step="0.5" required />
        <Field
          label="Größendetails"
          name="sizeDetails"
          id={`${id}-sizeDetails`}
          placeholder="UK 9,5 · US 10 · 28 cm"
        />
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        <Field label="Preis (€)" name="price" id={`${id}-price`} type="number" step="1" required />
        <Field
          label="Ursprungspreis (€)"
          name="oldPrice"
          id={`${id}-oldPrice`}
          type="number"
          step="1"
          placeholder="optional"
        />
      </div>

      <Field
        label="Plakette / Notiz"
        name="badge"
        id={`${id}-badge`}
        placeholder="Restposten"
      />

      {error && <p className="m-0 text-[13px] text-[#b3261e]">{error}</p>}

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <button
          type="button"
          onClick={() => submitForm("veroeffentlicht")}
          disabled={loading !== null}
          className="flex h-[52px] flex-1 items-center justify-center rounded-full bg-nachtblau text-base font-extrabold text-white hover:bg-tiefblau disabled:opacity-60"
        >
          {loading === "veroeffentlicht" ? "Wird veröffentlicht …" : "Veröffentlichen"}
        </button>
        <button
          type="button"
          onClick={() => submitForm("entwurf")}
          disabled={loading !== null}
          className="flex h-[52px] flex-1 items-center justify-center rounded-full border-2 border-nachtblau text-base font-extrabold text-nachtblau disabled:opacity-60"
        >
          {loading === "entwurf" ? "Wird gespeichert …" : "Als Entwurf speichern"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  id,
  type = "text",
  required,
  placeholder,
  step,
}: {
  label: string;
  name: string;
  id: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  step?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-extrabold text-nachtblau">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        step={step}
        required={required}
        placeholder={placeholder}
        className="h-[52px] rounded-xl border border-formrand bg-white px-4 text-base"
      />
    </div>
  );
}
