import Image from "next/image";
import Link from "next/link";
import { brand } from "@/brand.config";
import { Icon } from "./Icon";
import { SizeAlertForm } from "./SizeAlertForm";

const columns = [
  {
    title: "Sortiment",
    links: [
      { href: "/sortiment/laufschuhe", label: "Laufen" },
      { href: "/sortiment/wanderschuhe", label: "Wandern & Berg" },
      { href: "/sortiment/skischuhe", label: "Ski & Skitour" },
      { href: "/sortiment/berufsschuhe", label: "Beruf & Alltag" },
    ],
  },
  {
    title: "Service",
    links: [
      { href: "/beratung-service#fussanalyse", label: "Fußanalyse" },
      { href: "/beratung-service#einlagen", label: "Einlagen" },
      { href: "/beratung-service#bootfitting", label: "Bootfitting" },
      { href: "/beratung-service#verleih", label: "Verleih" },
    ],
  },
  {
    title: "Shop",
    links: [
      { href: "/gutscheine", label: "Gutscheine" },
      { href: "/versand-rueckgabe", label: "Versand & Abholung" },
      { href: "/widerruf", label: "Rückgabe" },
      { href: "/versand-rueckgabe#zahlungsarten", label: "Zahlungsarten" },
      { href: "/agb", label: "AGB" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { href: "/impressum", label: "Impressum" },
      { href: "/datenschutz", label: "Datenschutz" },
      { href: "/barrierefreiheit", label: "Barrierefreiheit" },
      { href: "/cookie-einstellungen", label: "Cookie-Einstellungen" },
    ],
  },
];

const mobileLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/barrierefreiheit", label: "Barrierefreiheit" },
  { href: "/cookie-einstellungen", label: "Cookies" },
];

function SocialLinks() {
  return (
    <>
      <a
        href={brand.social.instagram}
        aria-label="Instagram"
        target="_blank"
        rel="noopener noreferrer"
        className="flex text-[#7FA6B3] hover:text-logogelb"
      >
        <Icon name="instagram" size={20} />
      </a>
      <a
        href={brand.social.facebook}
        aria-label="Facebook"
        target="_blank"
        rel="noopener noreferrer"
        className="flex text-[#7FA6B3] hover:text-logogelb"
      >
        <Icon name="facebook" size={20} />
      </a>
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-tiefblau text-hellblau">
      {/* Desktop */}
      <div className="page-x hidden flex-col gap-12 pb-10 pt-[72px] lg:flex">
        <div className="flex gap-16">
          <div className="flex w-[360px] shrink-0 flex-col gap-[22px]">
            <Image
              src="/brand/logo-weiss-gelb.svg"
              alt={brand.name}
              width={198}
              height={80}
              className="block h-20 w-[198px]"
            />
            <p className="m-0 text-[15px] leading-relaxed">
              Größen-Alarm für Einzelstücke: Wir schreiben Ihnen, sobald ein
              Paar in Ihrer Größe im Shop ist.
            </p>
            <SizeAlertForm />
          </div>
          <div className="grid flex-1 grid-cols-4 gap-8 text-[15px]">
            {columns.map((col) => (
              <nav
                key={col.title}
                aria-label={col.title}
                className="flex flex-col gap-3"
              >
                <p className="m-0 font-extrabold text-white">{col.title}</p>
                {col.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-hellblau hover:text-logogelb"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-[#23414C] pt-6 text-[13px] text-[#7FA6B3]">
          <span>
            © {brand.name} · {brand.owner} · {brand.address.city}
          </span>
          <div className="flex items-center gap-3.5">
            <span>Folgen Sie uns</span>
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* Mobil – unten Platz für die schwebende Leiste */}
      <div className="flex flex-col gap-[18px] px-4 pb-[120px] pt-7 text-sm sm:px-8 lg:hidden">
        <Image
          src="/brand/logo-weiss-gelb.svg"
          alt={brand.name}
          width={148}
          height={60}
          className="block h-[60px] w-[148px]"
        />
        <nav
          aria-label="Rechtliches"
          className="flex flex-wrap gap-x-3.5 gap-y-2"
        >
          {mobileLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-hellblau">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-3.5">
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
