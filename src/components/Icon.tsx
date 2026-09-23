/**
 * Linien-Icons aus dem Claude-Design-Entwurf (48er-Raster, Strich 2,2).
 * Die Schuh-Icons sind Entwurfs-Icons und werden 1:1 durch die Original-Icons
 * der alten Seite ersetzt, sobald diese vorliegen.
 */
export type IconName =
  // Sortiment
  | "run"
  | "trail"
  | "hike"
  | "ski"
  | "skitour"
  | "snowshoe"
  | "work"
  | "barefoot"
  | "insole"
  // Leistungen
  | "footscan"
  | "repair"
  // Oberfläche
  | "bag"
  | "cart"
  | "shop"
  | "store"
  | "calendar"
  | "arrow"
  | "heart"
  | "bell"
  | "pin"
  | "clock"
  | "phone"
  | "mail"
  | "whatsapp"
  | "instagram"
  | "facebook"
  | "star"
  | "check"
  | "menu"
  | "close"
  | "home"
  | "search"
  | "ruler"
  | "chevron-down"
  | "truck"
  | "return"
  | "lock"
  | "plus"
  | "minus"
  | "loading";

const runShoe = (
  <>
    <path d="M4 33V19.5c0-1 .9-1.6 1.8-1.2l2.4 1c3 1.3 6.4.8 8.9-1.3l3.7-3.2c.9-.8 2.3-.6 3 .4l4.8 6.6 8.3 2.4c4.2 1.2 7.1 3.8 7.1 6.7V33z" />
    <path d="M4 38h40" />
    <path d="M19 22l2.6-2.2M23 25l2.6-2.2" />
  </>
);

const skiBoot = (
  <>
    <path d="M12 5h14l2 10 8 5c2.3 1.4 3 3 3 5v9H9l2-14z" />
    <path d="M5 40h38" />
    <path d="M13 13h13M12 20h16M11 27h25" />
  </>
);

const footprint = (
  <>
    <path d="M24 4c7 0 10 7 10 15 0 6-3 9-3 14 0 6-2 11-7 11s-7-5-7-10c0-6-3-9-3-15C14 11 17 4 24 4z" />
    <path d="M20 31c2.5 1 5.5 1 8 0" />
    <path d="M19 15c3-1 7-1 10 0" />
  </>
);

const bag = (
  <>
    <path d="M9 16h30l-2.5 26h-25z" />
    <path d="M17 20v-6a7 7 0 0 1 14 0v6" />
  </>
);

const store = (
  <>
    <path d="M6 18l3-10h30l3 10" />
    <path d="M6 18c0 3 2.5 5 5.5 5s5.5-2 5.5-5c0 3 2.5 5 5.5 5h3c3 0 5.5-2 5.5-5 0 3 2.5 5 5.5 5S42 21 42 18" />
    <path d="M9 23v19h30V23M20 42V31h8v11" />
  </>
);

const paths: Record<IconName, React.ReactNode> = {
  run: runShoe,
  trail: runShoe,
  hike: (
    <>
      <path d="M8 6h11v13l10 4.5c6 2.4 11 3.4 13 6.4V36H6z" />
      <path d="M6 40h38" />
      <path d="M19 12h-5M19 16h-5" />
      <path d="M11 36v4M19 36v4M27 36v4M35 36v4" />
    </>
  ),
  ski: skiBoot,
  skitour: skiBoot,
  snowshoe: (
    <>
      <ellipse cx="24" cy="24" rx="10" ry="19" />
      <path d="M15.5 16h17M15 32h18M24 5v38" />
      <path d="M19 21h10v7H19z" />
    </>
  ),
  work: (
    <>
      <path d="M9 7h10v13l9 3c7 2 14 3 14 9v4H7z" />
      <path d="M31 24c-2 4-2 8 0 12" />
      <path d="M5 40h40" />
      <path d="M19 12h-5" />
    </>
  ),
  barefoot: footprint,
  insole: footprint,
  footscan: (
    <>
      <rect x="5" y="14" width="38" height="22" rx="4" />
      <path d="M19 19c3 0 5 3 5 7s-2 6-4 6-3-2-3-5 0-8 2-8zM30 21c2 0 3 2 3 5s-1 5-3 5-3-2-3-5 1-5 3-5z" />
    </>
  ),
  repair: (
    <path d="M29 7a9 9 0 0 0-8.5 12L7 32.5a3.5 3.5 0 0 0 5 5L25.5 24A9 9 0 0 0 38 15.5l-6 2-3.5-3.5 2-6c-.5-.7-1-1-1.5-1z" />
  ),
  bag,
  cart: bag,
  shop: bag,
  store,
  calendar: (
    <>
      <rect x="6" y="9" width="36" height="33" rx="4" />
      <path d="M6 19h36M16 5v8M32 5v8" />
    </>
  ),
  arrow: <path d="M8 24h32M28 12l12 12-12 12" />,
  heart: (
    <path d="M24 41S6 30 6 17a9 9 0 0 1 18-2 9 9 0 0 1 18 2c0 13-18 24-18 24z" />
  ),
  bell: (
    <>
      <path d="M12 34V21a12 12 0 0 1 24 0v13l4 4H8z" />
      <path d="M20 42a4 4 0 0 0 8 0" />
    </>
  ),
  pin: (
    <>
      <path d="M24 44s14-12.5 14-24a14 14 0 0 0-28 0c0 11.5 14 24 14 24z" />
      <circle cx="24" cy="20" r="5" />
    </>
  ),
  clock: (
    <>
      <circle cx="24" cy="24" r="18" />
      <path d="M24 13v11l7 5" />
    </>
  ),
  phone: (
    <path d="M16 6l-6 1.5C8.5 8 7.5 9.5 7.8 11 10 26 22 38 37 40.2c1.5.3 3-.7 3.5-2.2L42 32l-8-4-4 4c-5-2.5-9.5-7-12-12l4-4z" />
  ),
  mail: (
    <>
      <rect x="5" y="10" width="38" height="28" rx="3" />
      <path d="M6 12l18 14 18-14" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M14 34l-3 7 7.5-2.5A16 16 0 1 0 12 32z" />
      <path d="M18 19c0 6 5 11 11 11 1.2 0 1.8-.6 1.8-1.6v-2c0-.8-.6-1.4-1.2-1.6l-3.2-.8c-.6 0-1.2 0-1.6.6l-.6 1a10 10 0 0 1-4.4-4.4l1-.6c.6-.4.6-1 .6-1.6l-.8-3.2c-.2-.6-.8-1.2-1.6-1.2h-2c-1 0-1.6.6-1.6 1.8z" />
    </>
  ),
  instagram: (
    <>
      <rect x="7" y="7" width="34" height="34" rx="10" />
      <circle cx="24" cy="24" r="8" />
      <circle cx="34" cy="14" r="1.2" />
    </>
  ),
  facebook: (
    <path d="M28 42V26h6l1-7h-7v-4c0-2 1-3 3-3h4V6h-6c-6 0-9 3-9 9v4h-5v7h5v16" />
  ),
  star: (
    <path d="M24 5l5.8 12 13.2 1.8-9.6 9.1 2.4 13.1L24 34.7 12.2 41l2.4-13.1L5 18.8 18.2 17z" />
  ),
  check: <path d="M10 25l9 9 19-20" />,
  menu: <path d="M7 14h34M7 24h34M7 34h34" />,
  close: <path d="M11 11l26 26M37 11L11 37" />,
  home: (
    <>
      <path d="M7 22L24 8l17 14" />
      <path d="M11 19v22h26V19" />
    </>
  ),
  search: (
    <>
      <circle cx="21" cy="21" r="13" />
      <path d="M31 31l10 10" />
    </>
  ),
  ruler: (
    <>
      <rect x="4" y="16" width="40" height="16" rx="2" />
      <path d="M11 16v6M18 16v9M25 16v6M32 16v9M39 16v6" />
    </>
  ),
  "chevron-down": <path d="M14 18l10 10 10-10" />,
  truck: (
    <>
      <path d="M4 12h24v20H4zM28 19h8l6 7v6H28" />
      <circle cx="12" cy="35" r="4" />
      <circle cx="34" cy="35" r="4" />
    </>
  ),
  return: (
    <>
      <path d="M16 14L8 22l8 8" />
      <path d="M8 22h22a10 10 0 0 1 0 20h-6" />
    </>
  ),
  lock: (
    <>
      <rect x="9" y="21" width="30" height="21" rx="4" />
      <path d="M16 21v-6a8 8 0 0 1 16 0v6" />
    </>
  ),
  plus: <path d="M10 24h28M24 10v28" />,
  minus: <path d="M10 24h28" />,
  loading: (
    <>
      <path d="M8 24a16 16 0 0 1 16-16" />
      <circle cx="24" cy="24" r="16" strokeDasharray="4 8" />
    </>
  ),
};

export function Icon({
  name,
  className,
  size,
  strokeWidth = 2.2,
  label,
}: {
  name: IconName;
  className?: string;
  /** Kantenlänge in px (sonst über className steuern) */
  size?: number;
  strokeWidth?: number;
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? (size ? "shrink-0" : "h-6 w-6 shrink-0")}
      role={label ? "img" : undefined}
      aria-hidden={label ? undefined : true}
      aria-label={label}
    >
      {paths[name]}
    </svg>
  );
}
