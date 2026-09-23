import type { Metadata } from "next";
import "./globals.css";
import { bodyFont, headingFont } from "@/lib/fonts";
import { brand, serviceAreas } from "@/brand.config";
import { SiteChrome } from "@/components/SiteChrome";
import { CookieConsentProvider } from "@/lib/cookie-consent";
import { AppointmentProvider } from "@/lib/appointment";

const siteUrl = brand.isStaging
  ? "https://vorschau.sport-schuh-steiner.at"
  : "https://www.sport-schuh-steiner.at";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.name} — Scheffau am Wilden Kaiser`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Sportschuh-Fachgeschäft in Scheffau am Wilden Kaiser: Fußanalyse, Einlagen nach Maß, Bootfitting seit 2006, Reparaturen. Lauf-, Wander-, Ski- und Skitourenschuhe.",
  robots: brand.isStaging
    ? { index: false, follow: false }
    : { index: true, follow: true },
};

const schemaDays = {
  mo: "Monday",
  di: "Tuesday",
  mi: "Wednesday",
  do: "Thursday",
  fr: "Friday",
  sa: "Saturday",
  so: "Sunday",
};

function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ShoeStore",
    name: brand.name,
    image: `${siteUrl}/brand/logo-full.svg`,
    telephone: brand.contact.phone,
    email: brand.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: brand.address.street,
      postalCode: brand.address.zip,
      addressLocality: brand.address.city,
      addressRegion: brand.address.region,
      addressCountry: brand.address.country,
    },
    url: siteUrl,
    sameAs: [brand.social.instagram, brand.social.facebook],
    areaServed: serviceAreas,
    openingHoursSpecification: Object.entries(brand.openingHours).flatMap(
      ([day, ranges]) =>
        (ranges as unknown as [string, string][]).map(([opens, closes]) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: `https://schema.org/${schemaDays[day as keyof typeof schemaDays]}`,
          opens,
          closes,
        })),
    ),
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-stein text-text">
        <a href="#main" className="skip-link">
          Zum Inhalt springen
        </a>
        <CookieConsentProvider>
          <AppointmentProvider>
            <SiteChrome>{children}</SiteChrome>
          </AppointmentProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}
