"use client";

import { useEffect, useState } from "react";
import { Icon } from "../Icon";

const PRESETS = [25, 50, 100, 150, 200];
const MIN = 10;
const MAX = 500;

export function VoucherPurchaseForm() {
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [recipientFirstName, setRecipientFirstName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [abgebrochen, setAbgebrochen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAbgebrochen(
      new URLSearchParams(window.location.search).get("checkout") === "abgebrochen",
    );
  }, []);

  const effectiveAmount = useCustom ? Number(customAmount) : amount;
  const validAmount =
    Number.isFinite(effectiveAmount) &&
    Number.isInteger(effectiveAmount) &&
    effectiveAmount >= MIN &&
    effectiveAmount <= MAX;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validAmount) {
      setError(`Bitte einen Betrag zwischen € ${MIN} und € ${MAX} wählen.`);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout/gutschein", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: effectiveAmount,
          recipientFirstName,
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Checkout fehlgeschlagen.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Der Checkout konnte nicht gestartet werden.",
      );
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-3xl border border-karte-rand bg-white p-7"
    >
      <div className="flex flex-col gap-3">
        <label className="t-h3 m-0 text-nachtblau">Betrag wählen</label>
        <div className="flex flex-wrap gap-2.5">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setAmount(p);
                setUseCustom(false);
              }}
              className={`flex h-12 items-center rounded-xl border-2 px-4 font-extrabold transition-colors ${
                !useCustom && amount === p
                  ? "border-nachtblau bg-nachtblau text-white"
                  : "border-linie bg-white text-nachtblau hover:border-nachtblau"
              }`}
            >
              € {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setUseCustom(true)}
            className={`flex h-12 items-center rounded-xl border-2 px-4 font-extrabold transition-colors ${
              useCustom
                ? "border-nachtblau bg-nachtblau text-white"
                : "border-linie bg-white text-nachtblau hover:border-nachtblau"
            }`}
          >
            Anderer Betrag
          </button>
        </div>
        {useCustom && (
          <div className="flex items-center gap-2">
            <span className="text-lg font-extrabold text-nachtblau">€</span>
            <input
              type="number"
              min={MIN}
              max={MAX}
              step={1}
              inputMode="numeric"
              autoFocus
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder={`${MIN}–${MAX}`}
              className="h-12 w-36 rounded-xl border-2 border-linie px-3 font-extrabold text-nachtblau outline-none focus:border-nachtblau"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="recipientFirstName" className="font-bold text-nachtblau">
          Vorname der beschenkten Person{" "}
          <span className="font-normal text-text-muted">(optional)</span>
        </label>
        <input
          id="recipientFirstName"
          type="text"
          maxLength={30}
          value={recipientFirstName}
          onChange={(e) => setRecipientFirstName(e.target.value)}
          placeholder="z. B. Anna"
          className="h-12 rounded-xl border-2 border-linie px-3.5 text-nachtblau outline-none focus:border-nachtblau"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-bold text-nachtblau">
          Persönliche Nachricht{" "}
          <span className="font-normal text-text-muted">(optional)</span>
        </label>
        <textarea
          id="message"
          maxLength={120}
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Für deine nächste Tour!"
          className="resize-none rounded-xl border-2 border-linie px-3.5 py-2.5 text-nachtblau outline-none focus:border-nachtblau"
        />
      </div>

      {abgebrochen && (
        <p className="m-0 rounded-xl bg-[#fff6e0] p-3 text-[13px] text-nachtblau">
          Der Checkout wurde abgebrochen. Sie können es gerne erneut versuchen.
        </p>
      )}
      {error && (
        <p className="m-0 rounded-xl bg-[#fde8e6] p-3 text-[13px] text-[#b3261e]">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading || !validAmount}
        className="flex h-14 items-center justify-center gap-2.5 rounded-full bg-logogelb px-7 font-extrabold text-nachtblau hover:brightness-95 disabled:opacity-60"
      >
        <Icon name="cart" size={20} />
        {loading
          ? "Weiterleitung zu Stripe …"
          : `Gutschein kaufen${validAmount ? ` · € ${effectiveAmount}` : ""}`}
      </button>
      <p className="m-0 text-center text-[13px] text-text-muted">
        Sichere Zahlung über Stripe. Sie erhalten den Gutschein sofort als PDF
        per E-Mail sowie eine Zahlungsbestätigung.
      </p>
    </form>
  );
}
