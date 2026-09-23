"use client";

import { useId, useState } from "react";
import { appointmentReasons, brand } from "@/brand.config";
import { BottomSheet } from "./BottomSheet";
import { Icon } from "./Icon";

function buildMessage(fields: {
  reason: string;
  day: string;
  time: string;
  name: string;
  note: string;
}) {
  const lines = [
    `Terminanfrage — ${brand.name}`,
    `Anliegen: ${fields.reason}`,
    fields.day && `Wunschtag: ${fields.day}`,
    fields.time && `Uhrzeit: ${fields.time}`,
    `Name: ${fields.name}`,
    fields.note && `Notiz: ${fields.note}`,
  ].filter(Boolean);
  return lines.join("\n");
}

export function AppointmentSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const formId = useId();
  const [reason, setReason] = useState<string>(appointmentReasons[0]);
  const [day, setDay] = useState("");
  const [time, setTime] = useState<"vormittag" | "nachmittag" | "">("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  const message = buildMessage({
    reason,
    day,
    time:
      time === "vormittag"
        ? "Vormittag"
        : time === "nachmittag"
          ? "Nachmittag"
          : "",
    name,
    note,
  });

  const whatsappHref = `https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent(message)}`;
  const mailHref = `mailto:${brand.contact.email}?subject=${encodeURIComponent(
    "Terminanfrage über die Webseite",
  )}&body=${encodeURIComponent(message)}`;

  return (
    <BottomSheet open={open} onClose={onClose} title="Termin anfragen">
      <form
        className="space-y-4"
        onSubmit={(e) => e.preventDefault()}
        aria-describedby={`${formId}-hint`}
      >
        <p id={`${formId}-hint`} className="text-sm text-text-muted">
          Kein Buchungssystem — wir bestätigen deine Anfrage persönlich per
          WhatsApp oder E-Mail.
        </p>

        <div>
          <label htmlFor={`${formId}-reason`} className="block text-sm font-medium">
            Anliegen
          </label>
          <select
            id={`${formId}-reason`}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-1 w-full rounded-[12px] border border-linie bg-white px-3 py-2.5"
          >
            {appointmentReasons.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor={`${formId}-day`} className="block text-sm font-medium">
              Wunschtag
            </label>
            <input
              id={`${formId}-day`}
              type="date"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="mt-1 w-full rounded-[12px] border border-linie bg-white px-3 py-2.5"
            />
          </div>
          <div>
            <span className="block text-sm font-medium">Tageszeit</span>
            <div className="mt-1 flex gap-2">
              {(["vormittag", "nachmittag"] as const).map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setTime(time === slot ? "" : slot)}
                  aria-pressed={time === slot}
                  className={`min-h-[44px] flex-1 rounded-full border px-2 text-sm capitalize ${
                    time === slot
                      ? "border-nachtblau bg-nachtblau text-stein"
                      : "border-linie bg-white"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor={`${formId}-name`} className="block text-sm font-medium">
            Name
          </label>
          <input
            id={`${formId}-name`}
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-[12px] border border-linie bg-white px-3 py-2.5"
          />
        </div>

        <div>
          <label htmlFor={`${formId}-note`} className="block text-sm font-medium">
            Notiz (optional)
          </label>
          <textarea
            id={`${formId}-note`}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-[12px] border border-linie bg-white px-3 py-2.5"
          />
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <a
            href={name ? whatsappHref : undefined}
            aria-disabled={!name}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!name) e.preventDefault();
            }}
            className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 font-semibold text-white aria-disabled:opacity-50"
          >
            <Icon name="whatsapp" className="h-5 w-5" />
            Per WhatsApp senden
          </a>
          <a
            href={name ? mailHref : undefined}
            aria-disabled={!name}
            onClick={(e) => {
              if (!name) e.preventDefault();
            }}
            className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full border-2 border-nachtblau px-4 py-2.5 font-semibold text-nachtblau aria-disabled:opacity-50"
          >
            <Icon name="mail" className="h-5 w-5" />
            Per E-Mail senden
          </a>
        </div>
        <p className="text-xs text-text-muted">
          Die Anfrage wird nicht gespeichert — dein Gerät öffnet WhatsApp bzw.
          dein E-Mail-Programm mit vorausgefüllter Nachricht.
        </p>
      </form>
    </BottomSheet>
  );
}
