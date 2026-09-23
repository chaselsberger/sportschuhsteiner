"use client";

import { useEffect, useRef } from "react";
import { Icon } from "./Icon";

/**
 * Gemeinsames Bottom-Sheet für Termin-Anfrage und mobiles Menü.
 * Fokus bleibt im Sheet (Tab-Trap), Escape schließt, Fokus kehrt zum Auslöser zurück.
 */
export function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
      dialogRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        aria-label="Schließen"
        onClick={onClose}
        className="absolute inset-0 bg-tiefblau/60"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-[24px] bg-stein p-6 shadow-xl sm:rounded-[24px]"
        style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="t-h3 text-nachtblau">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Schließen"
            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-stein-2"
          >
            <Icon name="close" size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
