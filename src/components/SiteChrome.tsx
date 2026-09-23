"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileTabBar } from "./MobileTabBar";
import { CookieBanner } from "./CookieBanner";

/**
 * Shop-Navigation (Header/Footer/Tableiste/Cookie-Banner) blenden wir im
 * Admin-Bereich aus – die PWA soll wie eine eigene App wirken, nicht wie
 * eine Unterseite des Shops.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileTabBar />
      <CookieBanner />
    </>
  );
}
