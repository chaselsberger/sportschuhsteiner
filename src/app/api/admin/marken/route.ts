import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** Liste aller Marken, alphabetisch sortiert – für das Autocomplete im Admin-Formular. */
export async function GET() {
  const brands = await prisma.brand.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json({ brands: brands.map((b) => b.name) });
}

/** Legt eine neue Marke an, falls sie noch nicht existiert (idempotent). */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  if (!name) {
    return NextResponse.json({ error: "Markenname fehlt." }, { status: 400 });
  }

  const brand = await prisma.brand.upsert({
    where: { name },
    update: {},
    create: { name },
  });

  return NextResponse.json({ ok: true, brand: brand.name });
}
