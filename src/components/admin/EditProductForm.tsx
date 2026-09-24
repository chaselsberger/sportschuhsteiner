"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { adminSizeOptions, MAX_PRODUCT_PHOTOS, shopCategories, type ShopCategory } from "@/lib/product-types";
import { BrandPicker } from "./BrandPicker";
import { SizeDetailsField } from "./SizeDetailsField";

const genders = ["Damen", "Herren", "Kinder"] as const;
const statusOptions = [
  { value: "entwurf", label: "Entwurf" },
  { value: "veroeffentlicht", label: "Im Shop" },
  { value: "verkauft", label: "Verkauft" },
] as const;

type Initial = {
  brand: string;
  model: string;
  title: string;
  category: ShopCategory;
  gender: (typeof genders)[number];
  size: number;
  sizeDetails: string;
  price: number;
  oldPrice: number | null;
  badge: string;
  isRestposten: boolean;
  status: string;
  description: string;
  detailsMaterial: string;
  fitTip: string;
};

export function EditProductForm({
  id,
  initial,
  photos,
}: {
  id: string;
  initial: Initial;
  photos: { id: string; url: string; deletedAt: string | null }[];
}) {
  const fieldId = useId();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [busyPhotoId, setBusyPhotoId] = useState<string | null>(null);
  const [euSize, setEuSize] = useState<number | null>(initial.size);
  const [gender, setGender] = useState<(typeof genders)[number]>(initial.gender);

  const remainingPhotoSlots = MAX_PRODUCT_PHOTOS - photos.length;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current?.reportValidity()) return;
    setError(null);
    setSaving(true);

    const form = new FormData(formRef.current);
    const body = {
      brand: String(form.get("brand") ?? ""),
      model: String(form.get("model") ?? ""),
      title: String(form.get("title") ?? ""),
      category: String(form.get("category") ?? ""),
      gender: String(form.get("gender") ?? ""),
      size: String(form.get("size") ?? ""),
      sizeDetails: String(form.get("sizeDetails") ?? ""),
      price: String(form.get("price") ?? ""),
      oldPrice: form.get("oldPrice") ? String(form.get("oldPrice")) : null,
      badge: String(form.get("badge") ?? ""),
      isRestposten: form.get("isRestposten") === "on",
      status: String(form.get("status") ?? ""),
      description: String(form.get("description") ?? ""),
      detailsMaterial: String(form.get("detailsMaterial") ?? ""),
      fitTip: String(form.get("fitTip") ?? ""),
    };

    try {
      const res = await fetch(`/api/admin/produkte/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "Speichern fehlgeschlagen.");
        setSaving(false);
        return;
      }
      router.push("/admin/produkte");
      router.refresh();
    } catch {
      setError("Speichern fehlgeschlagen. Bitte erneut versuchen.");
      setSaving(false);
    }
  }

  async function addPhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    if (files.length > remainingPhotoSlots) {
      setError(
        `Es sind maximal ${MAX_PRODUCT_PHOTOS} Fotos pro Produkt erlaubt (noch ${Math.max(remainingPhotoSlots, 0)} frei).`,
      );
      e.target.value = "";
      return;
    }
    setUploadingPhoto(true);
    setError(null);
    const form = new FormData();
    files.forEach((f) => form.append("photos", f));
    try {
      const res = await fetch(`/api/admin/produkte/${id}/fotos`, {
        method: "POST",
        body: form,
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "Foto-Upload fehlgeschlagen.");
      } else {
        router.refresh();
      }
    } finally {
      setUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function removePhoto(photoId: string) {
    if (!confirm("Foto wirklich löschen?")) return;
    setBusyPhotoId(photoId);
    await fetch(`/api/admin/produkte/${id}/fotos/${photoId}`, { method: "DELETE" });
    router.refresh();
    setBusyPhotoId(null);
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-[22px] border border-karte-rand bg-white p-5"
    >
      <div className="flex flex-col gap-2.5">
        <span className="text-[13px] font-extrabold text-nachtblau">
          Fotos <span className="font-normal text-text-muted">(max. {MAX_PRODUCT_PHOTOS})</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {photos.map((p) =>
            p.deletedAt ? (
              <div
                key={p.id}
                className="relative h-24 w-24 overflow-hidden rounded-lg bg-bild-grund"
                title={`Original gelöscht am ${new Date(p.deletedAt).toLocaleDateString("de-AT")} (Aufbewahrungsfrist von 1 Monat nach Verkauf abgelaufen)`}
              >
                <Image
                  src="/images/produkt-platzhalter.svg"
                  alt="Foto gelöscht (Aufbewahrungsfrist abgelaufen)"
                  fill
                  sizes="96px"
                  className="object-contain p-3"
                />
              </div>
            ) : (
              <div key={p.id} className="relative h-24 w-24 overflow-hidden rounded-lg bg-bild-grund">
                <Image src={p.url} alt="" fill sizes="96px" className="object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(p.id)}
                  disabled={busyPhotoId === p.id}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs font-bold text-white disabled:opacity-60"
                  aria-label="Foto löschen"
                >
                  ✕
                </button>
              </div>
            ),
          )}
          {remainingPhotoSlots > 0 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingPhoto}
              className="flex h-24 w-24 flex-col items-center justify-center rounded-lg border-2 border-dashed border-formrand text-sm font-bold text-nachtblau disabled:opacity-60"
            >
              {uploadingPhoto ? "…" : "+ Foto"}
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={addPhotos}
          className="sr-only"
        />
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        <BrandPicker id={`${fieldId}-brand`} name="brand" defaultValue={initial.brand} required />
        <Field label="Modell" name="model" id={`${fieldId}-model`} defaultValue={initial.model} required />
      </div>

      <Field label="Titel" name="title" id={`${fieldId}-title`} defaultValue={initial.title} />

      <div className="grid grid-cols-2 gap-3.5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${fieldId}-category`} className="text-[13px] font-extrabold text-nachtblau">
            Kategorie
          </label>
          <select
            id={`${fieldId}-category`}
            name="category"
            defaultValue={initial.category}
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
          <label htmlFor={`${fieldId}-gender`} className="text-[13px] font-extrabold text-nachtblau">
            Für
          </label>
          <select
            id={`${fieldId}-gender`}
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value as (typeof genders)[number])}
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
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${fieldId}-size`} className="text-[13px] font-extrabold text-nachtblau">
            Größe (EU)
          </label>
          <select
            id={`${fieldId}-size`}
            name="size"
            required
            defaultValue={initial.size}
            onChange={(e) => setEuSize(e.target.value ? Number(e.target.value) : null)}
            className="h-[52px] rounded-xl border border-formrand bg-white px-3 text-base"
          >
            {!adminSizeOptions.includes(initial.size) && (
              <option value={initial.size}>{initial.size.toString().replace(".", ",")}</option>
            )}
            {adminSizeOptions.map((s) => (
              <option key={s} value={s}>
                {s.toString().replace(".", ",")}
              </option>
            ))}
          </select>
        </div>
        <SizeDetailsField
          id={`${fieldId}-sizeDetails`}
          euSize={euSize}
          gender={gender}
          defaultValue={initial.sizeDetails}
        />
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        <Field
          label="Preis (€)"
          name="price"
          id={`${fieldId}-price`}
          type="number"
          step="1"
          defaultValue={initial.price}
          required
        />
        <Field
          label="Ursprungspreis (€)"
          name="oldPrice"
          id={`${fieldId}-oldPrice`}
          type="number"
          step="1"
          defaultValue={initial.oldPrice ?? ""}
          placeholder="optional"
        />
      </div>

      <Field
        label="Plakette / Notiz"
        name="badge"
        id={`${fieldId}-badge`}
        defaultValue={initial.badge}
        placeholder="Restposten"
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${fieldId}-status`} className="text-[13px] font-extrabold text-nachtblau">
          Status
        </label>
        <select
          id={`${fieldId}-status`}
          name="status"
          defaultValue={initial.status}
          className="h-[52px] rounded-xl border border-formrand bg-white px-3 text-base"
        >
          {statusOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-2 text-[15px] text-nachtblau">
        <input type="checkbox" name="isRestposten" defaultChecked={initial.isRestposten} />
        Restposten
      </label>

      <hr className="border-linie" />

      <TextArea
        label="Beschreibung"
        name="description"
        id={`${fieldId}-description`}
        defaultValue={initial.description}
        placeholder="Freitext für das Beschreibung-Feld auf der Produktseite"
      />
      <TextArea
        label="Details & Material"
        name="detailsMaterial"
        id={`${fieldId}-detailsMaterial`}
        defaultValue={initial.detailsMaterial}
        placeholder="Material, Sprengung, Gewicht …"
      />
      <TextArea
        label="Passform-Tipp aus dem Geschäft"
        name="fitTip"
        id={`${fieldId}-fitTip`}
        defaultValue={initial.fitTip}
        placeholder="z. B. „fällt eher schmal aus …“"
      />

      {error && <p className="m-0 text-[13px] text-[#b3261e]">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="flex h-[52px] items-center justify-center rounded-full bg-nachtblau text-base font-extrabold text-white hover:bg-tiefblau disabled:opacity-60"
      >
        {saving ? "Wird gespeichert …" : "Speichern"}
      </button>
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
  defaultValue,
}: {
  label: string;
  name: string;
  id: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  step?: string;
  defaultValue?: string | number;
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
        defaultValue={defaultValue}
        className="h-[52px] rounded-xl border border-formrand bg-white px-4 text-base"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  id,
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  id: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-extrabold text-nachtblau">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={4}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="rounded-xl border border-formrand bg-white px-4 py-3 text-base"
      />
    </div>
  );
}
