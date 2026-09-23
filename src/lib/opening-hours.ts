import { brand } from "@/brand.config";

/**
 * Öffnungszeiten-Logik (läuft auf Server und im Browser). Gerechnet wird immer
 * in der Zeitzone des Geschäfts, unabhängig von Server- oder Gerätezeit.
 */

export type DayKey = keyof typeof brand.openingHours;

export const dayOrder: DayKey[] = ["mo", "di", "mi", "do", "fr", "sa", "so"];

const dayLabels: Record<DayKey, string> = {
  mo: "Montag",
  di: "Dienstag",
  mi: "Mittwoch",
  do: "Donnerstag",
  fr: "Freitag",
  sa: "Samstag",
  so: "Sonntag",
};

const TIME_ZONE = "Europe/Vienna";

function rangesFor(day: DayKey) {
  return brand.openingHours[day] as unknown as [string, string][];
}

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** Wochentag (0 = Montag) und Minuten seit Mitternacht in Wien */
export function shopClock(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return {
    dayIndex: Math.max(0, weekdays.indexOf(get("weekday"))),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export type OpenStatus =
  | { open: true; until: string }
  | {
      open: false;
      opensAt: string | null;
      opensDay: "heute" | "morgen" | string;
    };

export function currentOpenStatus(now = new Date()): OpenStatus {
  const { dayIndex, minutes } = shopClock(now);
  const today = rangesFor(dayOrder[dayIndex]);

  for (const [start, end] of today) {
    if (minutes >= toMinutes(start) && minutes < toMinutes(end)) {
      return { open: true, until: end };
    }
  }

  const laterToday = today.find(([start]) => toMinutes(start) > minutes);
  if (laterToday) {
    return { open: false, opensAt: laterToday[0], opensDay: "heute" };
  }

  for (let offset = 1; offset <= 7; offset++) {
    const day = dayOrder[(dayIndex + offset) % 7];
    const ranges = rangesFor(day);
    if (ranges.length > 0) {
      return {
        open: false,
        opensAt: ranges[0][0],
        opensDay: offset === 1 ? "morgen" : dayLabels[day],
      };
    }
  }
  return { open: false, opensAt: null, opensDay: "" };
}

export type HoursRow = {
  label: string;
  ranges: [string, string][];
  isToday: boolean;
  closed: boolean;
};

/**
 * Desktop: aufeinanderfolgende Tage mit gleichen Zeiten zusammengefasst
 * („Montag, Dienstag“), der heutige Tag steht immer allein und markiert.
 */
export function hoursRowsConsecutive(todayIndex: number): HoursRow[] {
  const rows: (HoursRow & { key: string })[] = [];
  dayOrder.forEach((day, i) => {
    const ranges = rangesFor(day);
    const key = JSON.stringify(ranges);
    const isToday = i === todayIndex;
    const prev = rows[rows.length - 1];
    if (prev && !isToday && !prev.isToday && prev.key === key) {
      prev.label += `, ${dayLabels[day]}`;
      return;
    }
    rows.push({
      key,
      label: dayLabels[day],
      ranges,
      isToday,
      closed: ranges.length === 0,
    });
  });
  return rows.map(({ key: _key, ...row }) => {
    void _key;
    return row.isToday ? { ...row, label: `${row.label} · heute` } : row;
  });
}

/**
 * Mobil: alle Tage mit gleichen Zeiten zusammengefasst („Mo, Di, Do, Fr“),
 * der heutige Tag steht allein und markiert.
 */
export function hoursRowsGrouped(todayIndex: number): HoursRow[] {
  const groups: {
    days: DayKey[];
    ranges: [string, string][];
    isToday: boolean;
  }[] = [];
  dayOrder.forEach((day, i) => {
    const ranges = rangesFor(day);
    const isToday = i === todayIndex;
    const match = isToday
      ? undefined
      : groups.find(
          (g) =>
            !g.isToday && JSON.stringify(g.ranges) === JSON.stringify(ranges),
        );
    if (match) match.days.push(day);
    else groups.push({ days: [day], ranges, isToday });
  });
  return groups.map((g) => ({
    label:
      g.days.length === 1
        ? `${dayLabels[g.days[0]]}${g.isToday ? " · heute" : ""}`
        : g.days.map((d) => dayLabels[d].slice(0, 2)).join(", "),
    ranges: g.ranges,
    isToday: g.isToday,
    closed: g.ranges.length === 0,
  }));
}

export const formatRange = ([start, end]: [string, string]) =>
  `${start}–${end}`;
