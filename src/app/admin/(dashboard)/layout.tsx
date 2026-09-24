import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { getAdminSession } from "@/lib/session";

/**
 * Eigene Layout-Gruppe für die eingeloggten Admin-Seiten (Login liegt
 * außerhalb, ohne Navigation/Logout-Button). proxy.ts schützt die Routen
 * bereits; die Prüfung hier ist nur, um den eingeloggten Namen anzuzeigen.
 */
export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session.adminUserId) redirect("/admin/login");

  return (
    <div className="flex min-h-full flex-col">
      <header className="flex items-center justify-between gap-4 border-b border-karte-rand bg-nachtblau px-4 py-3.5 text-white">
        <Link href="/admin" className="text-[15px] font-extrabold">
          Sport Schuh Steiner · Shop-Verwaltung
        </Link>
        <nav className="flex items-center gap-4 text-sm font-bold">
          <Link href="/admin">Erfassen</Link>
          <Link href="/admin/produkte">Produkte</Link>
          <Link href="/admin/verkaeufe">Verkäufe</Link>
          <AdminLogoutButton />
        </nav>
      </header>
      <div className="flex-1 px-4 py-6 sm:px-6">{children}</div>
    </div>
  );
}
