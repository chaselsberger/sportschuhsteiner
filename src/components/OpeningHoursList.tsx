import { groupedOpeningHours } from "@/lib/opening-hours";

export function OpeningHoursList({ compact = false }: { compact?: boolean }) {
  const groups = groupedOpeningHours();
  return (
    <dl className={compact ? "space-y-0.5" : "space-y-2"}>
      {groups.map((g) => (
        <div key={g.label} className="flex gap-2">
          <dt className="font-medium">{g.label}:</dt>
          <dd>
            {g.ranges.length === 0
              ? "geschlossen"
              : g.ranges.map((r) => r.join("–")).join(" & ")}
          </dd>
        </div>
      ))}
      <p className={compact ? "pt-1 text-xs opacity-70" : "pt-2 text-sm opacity-70"}>
        Termine gerne auch nach Vereinbarung.
      </p>
    </dl>
  );
}
