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
    phoneDisplay: "+43 680 307 98 14",
    email: "info@sport-schuh-steiner.at",
    // TODO(Kunde): WhatsApp-Nummer für Terminanfragen bestätigen (aktuell = Mobilnummer oben angenommen)
    whatsapp: "436803079814",
  },
  social: {
    instagram: "https://www.instagram.com/sportschuhsteiner",
    facebook: "https://www.facebook.com/sportschuhsteiner/",
  },
  /** Routenplaner-Link (öffnet Google Maps, keine Einbettung → keine Zustimmung nötig) */
  routeUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Sport+Schuh+Steiner%2C+Blaiken+72%2C+6351+Scheffau+am+Wilden+Kaiser",
  legalName: "Sport Schuh Steiner, Georg Steiner",
  openingHours: {
    // Fallback-Werte, bis die Google-Places-Anbindung live ist (stündlicher Cron, siehe lib/google-places.ts)
    mo: [
      ["08:30", "12:00"],
      ["15:00", "18:00"],
    ],
    di: [
      ["08:30", "12:00"],
      ["15:00", "18:00"],
    ],
    mi: [["08:30", "12:00"]],
    do: [
      ["08:30", "12:00"],
      ["15:00", "18:00"],
    ],
    fr: [
      ["08:30", "12:00"],
      ["15:00", "18:00"],
    ],
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

/**
 * Kategorie-Seiten unter /sortiment/. `shop` verknüpft mit den Shop-Filtern,
 * `image` ist das Kategorie-Foto.
 */
export const categories = [
  {
    slug: "laufschuhe",
    label: "Laufschuhe",
    icon: "run",
    shop: "laufen",
    image: "/images/kategorie-laufen.jpg",
    position: "50% 50%",
  },
  {
    slug: "trailschuhe",
    label: "Trailschuhe",
    icon: "trail",
    shop: "laufen",
    image: "/images/kategorie-wandern.jpg",
    position: "50% 60%",
  },
  {
    slug: "wanderschuhe",
    label: "Berg- & Wanderschuhe",
    icon: "hike",
    shop: "wandern",
    image: "/images/kategorie-wandern.jpg",
    position: "50% 60%",
  },
  {
    slug: "skischuhe",
    label: "Skischuhe",
    icon: "ski",
    shop: "ski",
    image: "/images/kategorie-ski.jpg",
    position: "50% 30%",
  },
  {
    slug: "skitourenschuhe",
    label: "Skitourenschuhe",
    icon: "skitour",
    shop: "ski",
    image: "/images/ueber-uns-georg.webp",
    position: "50% 40%",
  },
  {
    slug: "schneeschuhe",
    label: "Schneeschuhe",
    icon: "snowshoe",
    shop: "schneeschuh",
    image: "/images/hero-schneeschuh-wilder-kaiser.jpg",
    position: "70% 60%",
  },
  {
    slug: "berufsschuhe",
    label: "Berufsschuhe",
    icon: "work",
    shop: "beruf",
    image: "/images/kategorie-beruf.jpg",
    position: "50% 55%",
  },
  {
    slug: "barfussschuhe",
    label: "Barfußschuhe",
    icon: "barefoot",
    shop: "barfuss",
    image: "/images/kategorie-barfuss.jpg",
    position: "50% 50%",
  },
] as const;

/**
 * Startseite: Sortiment-Kacheln mit Foto (Reihenfolge und Texte laut Entwurf).
 * `slug` verweist auf die Kategorie-Seite unter /sortiment/.
 */
export const homeCategories = [
  {
    slug: "laufschuhe",
    label: "Laufen & Trailrunning",
    shortLabel: "Laufen",
    teaser: "Mit Laufanalyse zum richtigen Modell",
    icon: "run",
    image: "/images/kategorie-laufen.jpg",
    position: "50% 50%",
  },
  {
    slug: "wanderschuhe",
    label: "Wandern & Berg",
    shortLabel: "Wandern",
    teaser: "Zustieg, Klettersteig, Hochtour",
    icon: "hike",
    image: "/images/kategorie-wandern.jpg",
    position: "50% 60%",
  },
  {
    slug: "skischuhe",
    label: "Ski & Skitour",
    shortLabel: "Ski & Tour",
    teaser: "Bootfitting und Schaumanpassung",
    icon: "ski",
    image: "/images/kategorie-ski.jpg",
    position: "50% 30%",
  },
  {
    slug: "schneeschuhe",
    label: "Schneeschuh",
    shortLabel: "Schneeschuh",
    teaser: "Kauf und Verleih",
    icon: "snowshoe",
    image: "/images/hero-schneeschuh-wilder-kaiser.jpg",
    position: "70% 60%",
  },
  {
    slug: "berufsschuhe",
    label: "Beruf & Alltag",
    shortLabel: "Beruf",
    teaser: "Für Post, Gastro und Pflege",
    icon: "work",
    image: "/images/kategorie-beruf.jpg",
    position: "50% 55%",
  },
  {
    slug: "barfussschuhe",
    label: "Barfuß & Freizeit",
    shortLabel: "Barfuß",
    teaser: "Natürlich gehen, jeden Tag",
    icon: "barefoot",
    image: "/images/kategorie-barfuss.jpg",
    position: "50% 50%",
  },
] as const;

/** Leistungs-Leiste unter dem Einstieg (Desktop) bzw. „Unser Service“ (Mobil) */
export const serviceHighlights = [
  {
    slug: "fussanalyse",
    label: "Fußanalyse",
    text: "Hochauflösende Druckmessplatte und moderne Analysesoftware.",
    short: "Druckmessplatte",
    icon: "footscan",
  },
  {
    slug: "einlagen",
    label: "Einlagen nach Maß",
    mobileLabel: "Einlagen",
    text: "Sporteinlagen – auch für Business- und Festschuhe.",
    short: "nach Maß",
    icon: "insole",
  },
  {
    slug: "bootfitting",
    label: "Bootfitting",
    text: "Ski- und Tourenschuhe individuell angepasst, seit 2006.",
    short: "seit 2006",
    icon: "ski",
  },
  {
    slug: "reparaturen",
    label: "Reparaturen",
    text: "Wir reparieren, was sich zu reparieren lohnt.",
    short: "lohnt sich",
    icon: "repair",
  },
  {
    slug: "verleih",
    label: "Schneeschuh-Verleih",
    mobileLabel: "Verleih",
    text: "Schneeschuhe und Stöcke für den Wilden Kaiser.",
    short: "Schneeschuhe",
    icon: "snowshoe",
  },
] as const;

/** „Unser Beratungsversprechen“ – vier Schritte */
export const promiseSteps = [
  {
    step: "01 · Zuhören",
    title: "Gespräch",
    text: "Wofür, wie oft, was drückt? Ihre Ziele und Ihre Füße stehen am Anfang.",
  },
  {
    step: "02 · Messen",
    title: "Fußanalyse",
    text: "Druckmessplatte und Laufanalyse zeigen, wie Ihr Fuß wirklich arbeitet.",
  },
  {
    step: "03 · Anpassen",
    title: "Einlage & Fitting",
    text: "Einlagen nach Maß, Bootfitting und Schaumanpassung für Ski- und Tourenschuhe.",
  },
  {
    step: "04 · Begleiten",
    title: "Nachbetreuung",
    text: "Drückt nach der ersten Tour etwas? Kommen Sie vorbei – wir passen nach.",
  },
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
