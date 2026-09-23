"use client";

import { useEffect, useState } from "react";
import { currentOpenStatus, type OpenStatus } from "@/lib/opening-hours";

/**
 * Live-Statuszeile („Jetzt geöffnet · heute bis 12:00“). Der Server liefert
 * einen Startwert, im Browser wird er sofort und danach jede Minute neu
 * berechnet – so stimmt die Anzeige auch bei zwischengespeicherten Seiten.
 */
export function OpenStatusLive({
  initial,
  variant,
  fromGoogle = false,
}: {
  initial: OpenStatus;
  variant: "bar" | "pill";
  fromGoogle?: boolean;
}) {
  const [status, setStatus] = useState(initial);

  useEffect(() => {
    const update = () => setStatus(currentOpenStatus());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const dot = (
    <span
      aria-hidden="true"
      className={`inline-block h-2 w-2 shrink-0 rounded-full ${
        status.open ? "pulse-dot bg-[#58C878]" : "bg-[#C9C1B0]"
      }`}
    />
  );

  if (variant === "pill") {
    return (
      <p className="flex h-[34px] items-center gap-1.5 rounded-full border border-[#E3DDD0] bg-white px-3 text-xs font-extrabold text-nachtblau">
        {dot}
        {status.open
          ? `Offen bis ${status.until}`
          : status.opensAt
            ? `Öffnet ${status.opensDay === "heute" ? "" : `${status.opensDay} `}${status.opensAt}`
            : "Geschlossen"}
      </p>
    );
  }

  return (
    <p className="flex items-center gap-2.5">
      {dot}
      <span>
        {status.open ? (
          <>
            <b className="text-white">Jetzt geöffnet</b> · heute bis{" "}
            {status.until}
          </>
        ) : (
          <>
            <b className="text-white">Jetzt geschlossen</b>
            {status.opensAt &&
              ` · öffnet ${status.opensDay === "heute" || status.opensDay === "morgen" ? status.opensDay : `am ${status.opensDay}`} um ${status.opensAt}`}
          </>
        )}
      </span>
      {fromGoogle && (
        <span className="text-[#7FA6B3]">· automatisch aus Google</span>
      )}
    </p>
  );
}
