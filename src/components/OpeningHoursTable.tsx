"use client";

import { useEffect, useState } from "react";
import {
  formatRange,
  hoursRowsConsecutive,
  hoursRowsGrouped,
  shopClock,
} from "@/lib/opening-hours";

/**
 * Öffnungszeiten-Tabelle mit hervorgehobenem „heute“.
 * - light: heller Grund, Zeile „heute“ nachtblau (Startseite Desktop, Kontakt)
 * - dark: nachtblauer Grund, Zeile „heute“ gelb (Startseite Mobil)
 */
export function OpeningHoursTable({
  initialToday,
  tone,
}: {
  initialToday: number;
  tone: "light" | "dark";
}) {
  const [today, setToday] = useState(initialToday);

  useEffect(() => {
    const update = () => setToday(shopClock().dayIndex);
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (tone === "dark") {
    const rows = hoursRowsGrouped(today);
    return (
      <dl className="flex flex-col text-[15px]">
        {rows.map((row, i) => {
          const next = rows[i + 1];
          return (
            <div
              key={row.label}
              className={
                row.isToday
                  ? "-mx-3 my-1 flex justify-between rounded-[10px] bg-logogelb px-3 py-2.5 font-extrabold text-nachtblau"
                  : `flex justify-between py-2.5 ${row.closed ? "text-[#9CCAD9]" : ""} ${
                      next && !next.isToday ? "border-b border-[#2E4C57]" : ""
                    }`
              }
            >
              <dt>{row.label}</dt>
              <dd className="text-right">
                {row.closed
                  ? "geschlossen"
                  : row.ranges.map((r) => (
                      <span key={r[0]} className="block">
                        {formatRange(r)}
                      </span>
                    ))}
              </dd>
            </div>
          );
        })}
      </dl>
    );
  }

  const rows = hoursRowsConsecutive(today);
  return (
    <dl className="flex flex-col border-t border-linie">
      {rows.map((row) => (
        <div
          key={row.label}
          className={
            row.isToday
              ? "-mx-3.5 flex justify-between gap-4 rounded-[10px] bg-nachtblau px-3.5 py-[13px] font-extrabold text-white"
              : `flex justify-between gap-4 border-b border-linie py-[13px] ${
                  row.closed ? "text-[#6B7A80]" : ""
                }`
          }
        >
          <dt>{row.label}</dt>
          <dd className="text-right">
            {row.closed
              ? "geschlossen"
              : row.ranges.map(formatRange).join(" · ")}
          </dd>
        </div>
      ))}
    </dl>
  );
}
