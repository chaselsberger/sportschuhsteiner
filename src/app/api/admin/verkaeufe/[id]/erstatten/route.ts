import { NextResponse } from "next/server";
import { refundOrder } from "@/lib/orders";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    await refundOrder(id);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erstattung fehlgeschlagen.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
