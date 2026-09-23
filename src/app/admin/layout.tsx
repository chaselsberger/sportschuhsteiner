import type { Metadata } from "next";
import { RegisterServiceWorker } from "@/components/admin/RegisterServiceWorker";

export const metadata: Metadata = {
  title: {
    default: "Shop-Verwaltung",
    template: "%s · Shop-Verwaltung",
  },
  robots: { index: false, follow: false },
  manifest: "/admin/manifest.webmanifest",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-stein-2">
      <RegisterServiceWorker />
      <main id="main" className="flex-1">
        {children}
      </main>
    </div>
  );
}
