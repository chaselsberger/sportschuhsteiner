import { NextResponse } from "next/server";
import { setOrderNote } from "@/lib/orders";

/** Speichert die interne Notiz zu einem Verkauf. */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const note = typeof body?.note === "string" ? body.note : "";

  try {
    const order = await setOrderNote(id, note);
    return NextResponse.json({ ok: true, note: order.note });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Fehlgeschlagen.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
