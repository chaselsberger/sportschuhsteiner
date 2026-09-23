import { brand } from "@/brand.config";

export type DayKey = keyof typeof brand.openingHours;

const dayOrder: DayKey[] = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const dayLabels: Record<DayKey, string> = {
  mo: "Montag",
  di: "Dienstag",
  mi: "Mittwoch",
  do: "Donnerstag",
  fr: "Freitag",
  sa: "Samstag",
  so: "Sonntag",
};

export function groupedOpeningHours() {
  // Fasst aufeinanderfolgende Tage mit identischen Zeiten zusammen (Mo,Di,Do,Fr / Mi,Sa / So)
  const groups: { days: DayKey[]; ranges: string[][] }[] = [];
  for (const day of dayOrder) {
    const ranges = brand.openingHours[day] as unknown as string[][];
    const key = JSON.stringify(ranges);
    const existing = groups.find((g) => JSON.stringify(g.ranges) === key);
    if (existing) {
      existing.days.push(day);
    } else {
      groups.push({ days: [day], ranges });
    }
  }
  return groups.map((g) => ({
    label: formatDayRange(g.days),
    ranges: g.ranges,
  }));
}

function formatDayRange(days: DayKey[]) {
  // Mo,Di,Do,Fr statt Mo–Fr, da Mi im Beispiel nicht dieselben Zeiten hat
  return days.map((d) => dayLabels[d].slice(0, 2)).join(", ");
}

export function currentOpenStatus(now = new Date()) {
  const idx = (now.getDay() + 6) % 7; // Montag = 0
  const day = dayOrder[idx];
  const ranges = brand.openingHours[day] as unknown as string[][];
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  for (const [start, end] of ranges) {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const startMin = sh * 60 + sm;
    const endMin = eh * 60 + em;
    if (minutesNow >= startMin && minutesNow < endMin) {
      return { open: true, until: end };
    }
  }
  return { open: false, ranges };
}
