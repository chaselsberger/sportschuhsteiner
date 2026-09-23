import { Icon } from "./Icon";

/** Gezeichnete Karte aus dem Entwurf (Berg, Straße, Pin) – ohne externe Einbindung */
export function MapIllustration() {
  return (
    <>
      <svg
        viewBox="0 0 640 460"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        <rect width="640" height="460" fill="#E3EEF1" />
        <path
          d="M0 330 L120 280 L200 300 L300 220 L380 250 L470 170 L540 210 L640 150 L640 460 L0 460 Z"
          fill="#CFE3EA"
        />
        <path
          d="M-20 400 C 120 360, 240 390, 330 330 S 520 300, 660 260"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={14}
        />
        <path
          d="M-20 400 C 120 360, 240 390, 330 330 S 520 300, 660 260"
          fill="none"
          stroke="#F2E62B"
          strokeWidth={4}
        />
      </svg>
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-nachtblau"
      >
        <Icon name="pin" size={52} />
      </span>
    </>
  );
}
