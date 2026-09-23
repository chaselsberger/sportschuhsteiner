export type IconName =
  | "run"
  | "trail"
  | "hike"
  | "ski"
  | "skitour"
  | "snowshoe"
  | "work"
  | "barefoot"
  | "insole"
  | "cart"
  | "loading"
  | "whatsapp"
  | "mail"
  | "star"
  | "check"
  | "menu"
  | "close"
  | "home"
  | "shop"
  | "calendar";

const paths: Record<IconName, React.ReactNode> = {
  run: (
    <>
      <circle cx="15.5" cy="5" r="1.8" />
      <path d="M9 20l3-4 2-2.5-1.5-4L9 11l-2 4" />
      <path d="M11 9l3 1 2 4 3 1.5" />
    </>
  ),
  trail: (
    <>
      <path d="M4 19l4-9 3 5 2-4 2 3 5-5" />
      <path d="M4 19h16" />
    </>
  ),
  hike: (
    <>
      <path d="M3 19l6-13 3 6 2-3 7 10" />
      <circle cx="9" cy="4" r="1.6" />
    </>
  ),
  ski: (
    <>
      <path d="M3 17l17-4" />
      <path d="M4 20l17-4" />
      <circle cx="14" cy="7" r="1.8" />
      <path d="M12 10l3-2 2 5" />
    </>
  ),
  skitour: (
    <>
      <path d="M3 20l6-14 4 8 8-6" />
      <path d="M13 6l4-1 1 4" />
    </>
  ),
  snowshoe: (
    <>
      <ellipse cx="12" cy="12" rx="6" ry="9" />
      <path d="M12 6v12M9 10h6M9 15h6" />
    </>
  ),
  work: (
    <>
      <rect x="4" y="10" width="16" height="9" rx="2" />
      <path d="M8 10V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" />
    </>
  ),
  barefoot: (
    <>
      <path d="M7 20c-2 0-3-1.5-3-3.5 0-3 2-4 2-7 0-2 1-4 3-4s2 2 2 3.5c0 2 1.5 2.5 2.5 4.5s2.5 2 3.5 3.5" />
      <circle cx="9" cy="4.5" r="1" />
      <circle cx="11.5" cy="4" r="1" />
      <circle cx="14" cy="4.5" r="1" />
    </>
  ),
  insole: (
    <>
      <path d="M8 20c-2.5-1-3-4-2-7 .8-2.4 0-4.5 1-6.5C7.8 4.6 9 4 10.5 4c3 0 4.5 3 4.5 6 0 3.5-1.5 5-1 8 .3 1.7 1.5 2.5 3 3" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
      <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6" />
    </>
  ),
  loading: (
    <>
      <path d="M4 12a8 8 0 0 1 8-8" />
      <circle cx="12" cy="12" r="8" strokeDasharray="2 4" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M7 17l-1.4 3.4L9 19a8 8 0 1 0-3-2.5z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 .9-.3.9-.8v-1c0-.4-.3-.7-.6-.8l-1.6-.4c-.3 0-.6 0-.8.3l-.3.5a5 5 0 0 1-2.2-2.2l.5-.3c.3-.2.3-.5.3-.8l-.4-1.6c-.1-.3-.4-.6-.8-.6h-1c-.5 0-.8.3-.8.9z" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  star: (
    <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z" />
  ),
  check: <path d="M4 12.5l5 5L20 7" />,
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  close: <path d="M5 5l14 14M19 5L5 19" />,
  home: (
    <>
      <path d="M4 11l8-7 8 7" />
      <path d="M6 10v9h12v-9" />
    </>
  ),
  shop: (
    <>
      <path d="M4 9l1.5-4h13L20 9" />
      <path d="M4 9h16v10H4z" />
      <path d="M9 13v6M15 13v6" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14" rx="2" />
      <path d="M4 10h16M8 3.5v3M16 3.5v3" />
    </>
  ),
};

export function Icon({
  name,
  className,
  strokeWidth = 1.7,
  label,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-6 w-6"}
      role={label ? "img" : "presentation"}
      aria-hidden={label ? undefined : true}
      aria-label={label}
    >
      {paths[name]}
    </svg>
  );
}
