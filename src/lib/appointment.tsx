"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AppointmentSheet } from "@/components/AppointmentSheet";

type AppointmentContextValue = { openAppointment: () => void };

const AppointmentContext = createContext<AppointmentContextValue>({
  openAppointment: () => {},
});

export const useAppointment = () => useContext(AppointmentContext);

/**
 * Hält das Termin-Bottom-Sheet einmal pro Seite bereit. Jeder Link auf
 * „#termin“ (auch aus Server-Komponenten) öffnet es – ohne JavaScript bleibt
 * es ein normaler Sprung-Link.
 */
export function AppointmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const openAppointment = useCallback(() => setOpen(true), []);

  useEffect(() => {
    function fromHash() {
      if (window.location.hash !== "#termin") return;
      setOpen(true);
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const url = new URL(
        (link as HTMLAnchorElement).href,
        window.location.href,
      );
      if (url.hash !== "#termin" || url.pathname !== window.location.pathname)
        return;
      e.preventDefault();
      setOpen(true);
    }
    fromHash();
    window.addEventListener("hashchange", fromHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", fromHash);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const value = useMemo(() => ({ openAppointment }), [openAppointment]);

  return (
    <AppointmentContext.Provider value={value}>
      {children}
      <AppointmentSheet open={open} onClose={() => setOpen(false)} />
    </AppointmentContext.Provider>
  );
}
