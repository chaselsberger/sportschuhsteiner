import { redirect } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
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
      <AdminHeader />
      <div className="flex-1 px-4 py-6 sm:px-6">{children}</div>
    </div>
  );
}
