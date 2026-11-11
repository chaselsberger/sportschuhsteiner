/**
 * Gezackte Grat-Linie – Bergkante, die zugleich die Kante zum nächsten
 * Abschnitt bildet. Die Linie zeichnet sich gelb (.ridge), ein kleiner
 * Laufschuh wandert den Grat entlang (Desktop).
 *
 * Skalierung: unter der Entwurfsbreite wird seitlich beschnitten, darüber
 * gleichmäßig vergrößert – so bleibt der Grat unverzerrt und der Schuh rund.
 */

import { laufIcon } from "./shoeIcons";

const DESKTOP_RIDGE =
  "M0 118 L60 104 L110 110 L170 84 L205 92 L260 52 L290 66 L318 58 L360 96 L400 88 L450 60 L478 70 L520 30 L545 48 L565 40 L610 92 L660 84 L720 62 L752 74 L800 22 L825 44 L850 36 L880 70 L905 62 L960 100 L1010 90 L1060 54 L1090 66 L1130 40 L1160 62 L1200 84 L1240 76 L1290 98 L1340 90 L1390 108 L1440 112";

/** Schattenseiten und Felsrinnen der Gipfel (Desktop), zackig wie im Vorbild */
const DESKTOP_FACETS =
  "M260 52 L290 66 L318 58 L360 96 L330 80 L312 84 L300 72 L282 80 L270 66 Z " +
  "M520 30 L545 48 L565 40 L610 92 L580 76 L562 82 L552 62 L536 70 L530 52 Z " +
  "M800 22 L825 44 L850 36 L880 70 L848 58 L832 70 L820 56 L806 62 L808 42 Z " +
  "M1130 40 L1160 62 L1200 84 L1172 74 L1158 80 L1146 64 L1136 66 Z " +
  "M450 60 L478 70 L500 98 L476 84 L462 82 Z " +
  "M1060 54 L1090 66 L1110 98 L1086 84 L1072 82 Z " +
  "M170 84 L205 92 L214 108 L190 100 Z " +
  "M720 62 L752 74 L770 100 L744 88 L730 86 Z";

const MOBILE_RIDGE =
  "M0 54 L28 46 L50 50 L82 22 L98 34 L112 28 L136 48 L160 40 L196 8 L214 24 L226 18 L252 44 L278 36 L312 16 L330 30 L346 26 L368 44 L390 40";

const MOBILE_FACETS =
  "M82 22 L98 34 L112 28 L136 48 L116 42 L104 46 L96 38 L88 42 Z " +
  "M196 8 L214 24 L226 18 L252 44 L228 34 L216 40 L208 28 L200 30 Z " +
  "M312 16 L330 30 L346 26 L368 44 L344 38 L334 42 L326 32 L318 34 Z";

/**
 * Laufschuh des Kunden (icon-lauf.svg der alten Seite, 199,9 × 113,7) auf
 * 38 px Breite, Mitte auf dem Grat, Sohle auf der Linie.
 */
function Hiker() {
  return (
    <g transform="translate(-19 -22) scale(0.19)" fill="#FFFFFF" stroke="none">
      {laufIcon.node}
    </g>
  );
}

export function HeroRidge() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none sticky -bottom-[2px]"
      style={{ height: "max(140px, 9.7222vw)" }}
    >
      <svg
        viewBox="0 0 1440 140"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <path d={`${DESKTOP_RIDGE} L1440 142 L0 142 Z`} fill="#F4F1EA" />
        <path
          className="mtn-fill"
          d={DESKTOP_FACETS}
          fill="#13303B"
          fillOpacity={0.16}
        />
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
          className="mtn-fill"
          d={MOBILE_FACETS}
          fill="#FFFFFF"
          fillOpacity={0.1}
        />
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
