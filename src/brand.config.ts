/**
 * Alles Markenspezifische für Sport Schuh Steiner an einem Ort.
 * Für einen anderen Kunden: diese Datei (+ Farben in globals.css, + Fonts) austauschen.
 */

const isStaging = process.env.NEXT_PUBLIC_SITE_ENV !== "production";

export const brand = {
  name: "Sport Schuh Steiner",
  owner: "Georg Steiner",
  claim: "Beratung, für die man gerne ein paar Kilometer fährt.",
  address: {
    street: "Blaiken 72",
    zip: "6351",
    city: "Scheffau am Wilden Kaiser",
    region: "Tirol",
    country: "AT",
  },
  contact: {
    phone: "+43 680 3079814",
    phoneDisplay: "+43 680 3079814",
    email: "info@sport-schuh-steiner.at",
    // TODO(Kunde): WhatsApp-Nummer für Terminanfragen bestätigen (aktuell = Mobilnummer oben angenommen)
    whatsapp: "436803079814",
  },
  social: {
    // TODO(Kunde): Instagram-Handle ergänzen
    instagram: "",
  },
  legalName: "Sport Schuh Steiner, Georg Steiner",
  openingHours: {
    // Fallback-Werte, bis die Google-Places-Anbindung live ist (stündlicher Cron, siehe lib/google-places.ts)
    mo: [["08:30", "12:00"], ["15:00", "18:00"]],
    di: [["08:30", "12:00"], ["15:00", "18:00"]],
    mi: [["08:30", "12:00"]],
    do: [["08:30", "12:00"], ["15:00", "18:00"]],
    fr: [["08:30", "12:00"], ["15:00", "18:00"]],
    sa: [["08:30", "12:00"]],
    so: [],
  },
  google: {
    placeId: process.env.GOOGLE_PLACE_ID ?? "",
  },
  stripe: {
    // Vorschau (isStaging) nutzt immer die Stripe-Testschlüssel, Produktion die Live-Schlüssel.
    // Der geheime Schlüssel (STRIPE_SECRET_KEY / _TEST) wird bewusst NICHT hier gelesen,
    // da brand.config.ts auch von Client-Komponenten importiert wird — siehe lib/stripe.ts.
    publishableKey:
      (isStaging
        ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST
        : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) ?? "",
  },
  isStaging,
} as const;

export const categories = [
  { slug: "laufschuhe", label: "Laufschuhe", icon: "run" },
  { slug: "trailschuhe", label: "Trailschuhe", icon: "trail" },
  { slug: "wanderschuhe", label: "Berg- & Wanderschuhe", icon: "hike" },
  { slug: "skischuhe", label: "Skischuhe", icon: "ski" },
  { slug: "skitourenschuhe", label: "Skitourenschuhe", icon: "skitour" },
  { slug: "schneeschuhe", label: "Schneeschuhe", icon: "snowshoe" },
  { slug: "berufsschuhe", label: "Berufsschuhe", icon: "work" },
  { slug: "barfussschuhe", label: "Barfußschuhe", icon: "barefoot" },
] as const;

export const services = [
  {
    slug: "fussanalyse",
    label: "Fußanalyse",
    short: "Druckmessplatte, digitale Auswertung, ehrliche Empfehlung.",
  },
  {
    slug: "einlagen",
    label: "Einlagen nach Maß",
    short: "Individuell gefertigt, abgestimmt auf Fuß, Schuh und Sportart.",
  },
  {
    slug: "bootfitting",
    label: "Bootfitting",
    short: "Seit 2006 · Skischuhe, die wirklich passen.",
  },
  {
    slug: "reparaturen",
    label: "Reparaturen",
    short: "Sohlen, Nähte, Verschlüsse — bevor ein neues Paar nötig wird.",
  },
  {
    slug: "laufberatung",
    label: "Laufschuh-Beratung",
    short: "Lauf- und Gangbild-Analyse für die passende Dämpfung.",
  },
] as const;

export const serviceAreas = [
  "Scheffau",
  "Wilder Kaiser",
  "Söll",
  "Ellmau",
  "Kufstein",
  "Wörgl",
];

export const appointmentReasons = [
  "Fußanalyse",
  "Einlagen",
  "Bootfitting",
  "Laufschuh-Beratung",
  "Sonstiges",
] as const;
