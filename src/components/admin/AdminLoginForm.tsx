"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const id = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Anmeldung fehlgeschlagen.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Anmeldung fehlgeschlagen. Bitte erneut versuchen.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-email`} className="text-[13px] font-extrabold text-nachtblau">
          E-Mail
        </label>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-[52px] rounded-xl border border-formrand bg-white px-4 text-base"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-password`} className="text-[13px] font-extrabold text-nachtblau">
          Passwort
        </label>
        <input
          id={`${id}-password`}
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-[52px] rounded-xl border border-formrand bg-white px-4 text-base"
        />
      </div>
      {error && <p className="m-0 text-[13px] text-[#b3261e]">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="flex h-[52px] items-center justify-center rounded-full bg-nachtblau text-base font-extrabold text-white hover:bg-tiefblau disabled:opacity-60"
      >
        {loading ? "Anmelden …" : "Anmelden"}
      </button>
    </form>
  );
}
