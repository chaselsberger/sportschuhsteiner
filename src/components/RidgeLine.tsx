/**
 * Gezackte Grat-Linie – Bergkante, die zugleich die Kante zum nächsten
 * Abschnitt bildet. Die Linie zeichnet sich gelb (.ridge), ein kleiner
 * Laufschuh wandert den Grat entlang (Desktop).
 *
 * Skalierung: unter der Entwurfsbreite wird seitlich beschnitten, darüber
 * gleichmäßig vergrößert – so bleibt der Grat unverzerrt und der Schuh rund.
 */

const DESKTOP_RIDGE =
  "M0 118 L90 102 L160 108 L240 80 L300 90 L370 56 L420 68 L470 36 L510 50 L560 20 L600 44 L650 32 L700 62 L770 48 L840 84 L900 70 L960 94 L1040 64 L1100 78 L1170 46 L1220 58 L1280 88 L1360 82 L1440 108";

const MOBILE_RIDGE =
  "M0 52 L30 44 L58 48 L84 30 L108 38 L132 18 L152 26 L176 10 L200 24 L228 16 L252 34 L282 26 L310 42 L340 30 L366 40 L390 34";

/** Laufschuh-Icon (48er-Raster) auf 26 px, Auflagepunkt 50 % / 92 % */
function Hiker() {
  return (
    <g
      transform="translate(-13 -24) scale(0.5417)"
      fill="none"
      stroke="#13303B"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 33V19.5c0-1 .9-1.6 1.8-1.2l2.4 1c3 1.3 6.4.8 8.9-1.3l3.7-3.2c.9-.8 2.3-.6 3 .4l4.8 6.6 8.3 2.4c4.2 1.2 7.1 3.8 7.1 6.7V33z" />
      <path d="M4 38h40" />
      <path d="M19 22l2.6-2.2M23 25l2.6-2.2" />
    </g>
  );
}

export function HeroRidge() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -bottom-[2px] z-[3]"
      style={{ height: "max(140px, 9.7222vw)" }}
    >
      <svg
        viewBox="0 0 1440 140"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <path d={`${DESKTOP_RIDGE} L1440 142 L0 142 Z`} fill="#F4F1EA" />
        <path
          className="ridge"
          d={DESKTOP_RIDGE}
          fill="none"
          stroke="#F2E62B"
          strokeWidth={3}
          pathLength={1}
        />
        <g className="hiker-moving" opacity={0}>
          <set attributeName="opacity" to="1" begin="3s" fill="freeze" />
          <animateMotion
            dur="18s"
            begin="3s"
            repeatCount="indefinite"
            rotate="auto"
            path={DESKTOP_RIDGE}
          />
          <Hiker />
        </g>
        <g className="hiker-static" transform="translate(300 90)">
          <Hiker />
        </g>
      </svg>
    </div>
  );
}

/** Mobil: Grat am unteren Rand des Einstiegsfotos, darunter nachtblau */
export function HeroRidgeMobile() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -bottom-px"
      style={{ height: "max(60px, 15.385vw)" }}
    >
      <svg
        viewBox="0 0 390 60"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full"
      >
        <path d={`${MOBILE_RIDGE} L390 61 L0 61 Z`} fill="#13303B" />
        <path
          className="ridge"
          d={MOBILE_RIDGE}
          fill="none"
          stroke="#F2E62B"
          strokeWidth={2.5}
          pathLength={1}
        />
      </svg>
    </div>
  );
}

/** Oberkante eines dunklen Abschnitts: Steingrund greift als Grat hinein */
export function SectionRidgeTop({ fill = "#F4F1EA" }: { fill?: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-px"
      style={{ height: "max(70px, 4.8611vw)" }}
    >
      <svg
        viewBox="0 0 1440 70"
        preserveAspectRatio="xMidYMin slice"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M0 -1 L1440 -1 L1440 18 L1300 40 L1200 22 L1080 52 L960 30 L860 58 L760 26 L690 44 L620 14 L560 34 L470 8 L380 40 L300 22 L180 50 L90 30 L0 46 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
