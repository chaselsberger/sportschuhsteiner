"use client";

import { useEffect, useId, useState } from "react";
import { brand } from "@/brand.config";
import { type Product, euro } from "@/lib/demo-products";
import { BottomSheet } from "../BottomSheet";
import { Icon } from "../Icon";

/**
 * Kaufen (Stripe Checkout, Menge immer 1 – Einzelstück) / Reservieren
 * (Paar wird per WhatsApp, E-Mail oder Anruf zurückgelegt).
 */
export function ProductActions({ product }: { product: Product }) {
  const [open, setOpen] = useState<null | "reservieren">(null);
  const [name, setName] = useState("");
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const id = useId();
  const [checkoutAbgebrochen, setCheckoutAbgebrochen] = useState(false);

  useEffect(() => {
    // Nur clientseitig lesbar (SSR kennt die Query nicht) – daher erst nach dem Mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCheckoutAbgebrochen(
      new URLSearchParams(window.location.search).get("checkout") ===
        "abgebrochen",
    );
  }, []);

  async function handleKaufen() {
    setCheckoutError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: product.slug }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Checkout fehlgeschlagen.");
      }
      window.location.href = data.url;
    } catch {
      setCheckoutError(
        "Der Checkout konnte nicht gestartet werden. Bitte versuchen Sie es erneut oder reservieren Sie das Paar.",
      );
      setLoading(false);
    }
  }

  const message = [
    `Reservierung – ${brand.name}`,
    `${product.brand} ${product.model}, Gr. ${product.size} (${euro(product.price)})`,
    name && `Name: ${name}`,
  ]
    .filter(Boolean)
    .join("\n");

  const whatsapp = `https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent(message)}`;
  const mail = `mailto:${brand.contact.email}?subject=${encodeURIComponent(
    `Reservierung ${product.brand} ${product.model} Gr. ${product.size}`,
  )}&body=${encodeURIComponent(message)}`;

  return (
    <>
      {/* Desktop */}
      <div className="hidden flex-col gap-2.5 lg:flex">
        {checkoutAbgebrochen && (
          <p className="m-0 rounded-xl bg-[#fff6e0] px-4 py-3 text-[13px] text-nachtblau">
            Zahlung abgebrochen – Sie können es jederzeit erneut versuchen.
          </p>
        )}
        <button
          type="button"
          onClick={handleKaufen}
          disabled={loading}
          className="flex h-[60px] items-center justify-center gap-3 rounded-full bg-nachtblau text-[17px] font-extrabold text-white hover:bg-tiefblau disabled:opacity-60"
        >
          <Icon name={loading ? "loading" : "bag"} size={22} />
          {loading ? "Weiter zur Kasse …" : "Jetzt kaufen"}
        </button>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleKaufen}
            disabled={loading}
            className="h-[54px] rounded-full bg-black text-base font-extrabold text-white disabled:opacity-60"
          >
            Apple Pay
          </button>
          <button
            type="button"
            onClick={handleKaufen}
            disabled={loading}
            className="h-[54px] rounded-full border border-text bg-white text-base font-extrabold text-text disabled:opacity-60"
          >
            Google Pay
          </button>
        </div>
        {checkoutError && (
          <p className="m-0 text-[13px] text-[#b3261e]">{checkoutError}</p>
        )}
        <button
          type="button"
          onClick={() => setOpen("reservieren")}
          className="flex h-14 items-center justify-center gap-2.5 rounded-full border-2 border-nachtblau text-base font-extrabold text-nachtblau hover:bg-white"
        >
          <Icon name="store" size={22} />
          Reservieren &amp; im Geschäft anprobieren
        </button>
        <p className="m-0 flex items-center justify-center gap-2 text-[13px] text-text-muted">
          <span
            aria-hidden="true"
            className="pulse-dot inline-block h-2 w-2 rounded-full bg-[#58C878]"
          />
          48 Stunden für Sie zurückgelegt · kostenlos und unverbindlich
        </p>
      </div>

      {/* Mobil: feste Leiste unten */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 flex flex-col gap-2.5 border-t border-karte-rand bg-white px-4 pt-3.5 lg:hidden"
        style={{ paddingBottom: "calc(14px + env(safe-area-inset-bottom))" }}
      >
        {checkoutAbgebrochen && (
          <p className="m-0 rounded-xl bg-[#fff6e0] px-3.5 py-2.5 text-[13px] text-nachtblau">
            Zahlung abgebrochen – erneut versuchen?
          </p>
        )}
        {checkoutError && (
          <p className="m-0 text-[13px] text-[#b3261e]">{checkoutError}</p>
        )}
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={handleKaufen}
            disabled={loading}
            className="h-[54px] flex-1 rounded-full bg-black text-base font-extrabold text-white disabled:opacity-60"
          >
            Apple Pay
          </button>
          <button
            type="button"
            onClick={handleKaufen}
            disabled={loading}
            className="flex h-[54px] flex-1 items-center justify-center gap-2 rounded-full bg-nachtblau text-base font-extrabold text-white disabled:opacity-60"
          >
            <Icon name={loading ? "loading" : "bag"} size={20} />
            {loading ? "Weiter …" : "Kaufen"}
          </button>
        </div>
        <button
          type="button"
          onClick={() => setOpen("reservieren")}
          className="flex h-11 items-center justify-center gap-2 text-sm font-extrabold text-nachtblau"
        >
          <Icon name="store" size={20} />
          Reservieren &amp; im Geschäft probieren
        </button>
      </div>

      <BottomSheet
        open={open !== null}
        onClose={() => setOpen(null)}
        title="Paar reservieren"
      >
        <div className="flex flex-col gap-4">
          <p className="m-0 text-[15px] leading-relaxed text-text-muted">
            Wir legen Ihnen das Paar 48 Stunden kostenlos und unverbindlich
            zurück – anprobieren mit Beratung inklusive.
          </p>
          <p className="m-0 text-[13px] leading-relaxed text-text-muted">
            Hinweis: Da es sich um ein Restposten-Einzelstück handelt, ist die
            Rückgabe ausgeschlossen.
          </p>
          <div className="flex items-center gap-3 rounded-2xl border border-karte-rand bg-white p-3.5">
            <span className="flex h-11 items-center rounded-[10px] bg-nachtblau px-3.5 font-extrabold text-white">
              EU {product.size}
            </span>
            <span className="text-sm leading-snug">
              <b className="text-nachtblau">
                {product.brand} {product.model}
              </b>
              <br />
              {euro(product.price)}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={`${id}-name`}
              className="text-[13px] font-extrabold text-nachtblau"
            >
              Ihr Name
            </label>
            <input
              id={`${id}-name`}
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-[52px] rounded-xl border border-formrand bg-white px-4 text-base"
            />
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-[#1f7a4a] font-extrabold text-white"
            >
              <Icon name="whatsapp" size={20} />
              Per WhatsApp
            </a>
            <a
              href={mail}
              className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-full border-2 border-nachtblau font-extrabold text-nachtblau"
            >
              <Icon name="mail" size={20} />
              Per E-Mail
            </a>
          </div>
          <a
            href={`tel:${brand.contact.phone.replace(/\s+/g, "")}`}
            className="flex items-center justify-center gap-2 text-sm font-extrabold"
          >
            <Icon name="phone" size={18} />
            Oder anrufen: {brand.contact.phoneDisplay}
          </a>
        </div>
      </BottomSheet>
    </>
  );
}
