"use client";

import { useEffect, useState } from "react";
import { AppointmentSheet } from "@/components/AppointmentSheet";

export function KontaktTermin() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#termin") setOpen(true);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-5 min-h-[44px] rounded-full bg-logogelb px-6 py-2.5 font-bold text-nachtblau"
      >
        Termin-Formular öffnen
      </button>
      <AppointmentSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}
