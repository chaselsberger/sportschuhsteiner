import { brand } from "@/brand.config";
import { Icon } from "./Icon";

/**
 * Gezeichnete Karte (Wilder Kaiser als Bergsilhouette, Straße Kufstein/München
 * ↔ Ellmau/Salzburg, Standort-Pin) – ohne externe Einbindung. Klick öffnet
 * Google Maps mit dem Standort.
 */
export function MapIllustration() {
  return (
    <a
      href={brand.routeUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Route zu ${brand.name} auf Google Maps planen`}
      className="absolute inset-0 block"
    >
      <svg
        viewBox="0 0 640 460"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="h-full w-full"
      >
        <rect width="640" height="460" fill="#E3EEF1" />

        {/* Wilder Kaiser – Bergsilhouette, Hintergrund */}
        <path
          d="M-20 210
             L40 150 L70 175 L110 110 L150 150 L190 90 L215 120
             L260 55 L285 90 L330 40 L360 85 L400 60 L430 105
             L470 70 L510 115 L545 85 L580 130 L620 100 L660 150
             V0 H-20 Z"
          fill="#B9D3DC"
        />
        {/* Schneefelder / Gipfelkanten */}
        <path
          d="M250 62 L260 55 L285 90 L270 95 Z
             M320 50 L330 40 L360 85 L343 90 Z
             M460 78 L470 70 L510 115 L492 118 Z"
          fill="#FFFFFF"
          opacity={0.85}
        />
        {/* Näherer, dunklerer Bergkamm */}
        <path
          d="M-20 260 L60 205 L130 245 L210 175 L270 215 L350 165
             L420 210 L490 160 L560 200 L660 155 V0 H-20 Z"
          fill="#CFE3EA"
        />

        {/* Straße mit Fahrbahnmarkierung */}
        <path
          d="M-20 340 C 120 300, 240 330, 330 300 S 520 270, 660 245"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={16}
        />
        <path
          d="M-20 340 C 120 300, 240 330, 330 300 S 520 270, 660 245"
          fill="none"
          stroke="#F2E62B"
          strokeWidth={4}
          strokeDasharray="18 14"
        />

        {/* Pfeil + Label Richtung Westen: Kufstein / München */}
        <g transform="translate(60 372)">
          <path
            d="M28 0 L4 0 M4 0 L14 -9 M4 0 L14 9"
            fill="none"
            stroke="#132A3A"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="34"
            y="5"
            fontSize="15"
            fontWeight="800"
            fill="#132A3A"
            fontFamily="inherit"
          >
            Kufstein / München
          </text>
        </g>

        {/* Pfeil + Label Richtung Osten: Ellmau / Salzburg */}
        <g transform="translate(430 300)">
          <path
            d="M0 0 L24 0 M24 0 L14 -9 M24 0 L14 9"
            fill="none"
            stroke="#132A3A"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="-6"
            y="-14"
            fontSize="15"
            fontWeight="800"
            fill="#132A3A"
            fontFamily="inherit"
            textAnchor="end"
          >
            Ellmau / Salzburg
          </text>
        </g>
      </svg>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-nachtblau"
      >
        <Icon name="pin" size={52} />
      </span>
    </a>
  );
}
