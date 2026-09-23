import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/session";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = { title: "Anmelden" };

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session.adminUserId) redirect("/admin");

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-16">
      <div className="flex w-full max-w-[380px] flex-col gap-6 rounded-[22px] border border-karte-rand bg-white p-7">
        <div className="flex flex-col gap-1.5">
          <h1 className="t-h3 text-nachtblau">Shop-Verwaltung</h1>
          <p className="m-0 text-sm text-text-muted">
            Nur für Inhaber und Mitarbeiter.
          </p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}
