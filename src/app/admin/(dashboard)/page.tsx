import type { Metadata } from "next";
import { NewProductForm } from "@/components/admin/NewProductForm";

export const metadata: Metadata = { title: "Erfassen" };

export default function AdminErfassenPage() {
  return (
    <div className="mx-auto flex max-w-[560px] flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="t-h3 text-nachtblau">Restposten erfassen</h1>
        <p className="m-0 text-sm text-text-muted">
          Foto aufnehmen, Angaben ausfüllen, veröffentlichen – erscheint
          sofort im Shop.
        </p>
      </div>
      <NewProductForm />
    </div>
  );
}
