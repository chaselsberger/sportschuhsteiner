import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json(
      { error: "E-Mail und Passwort erforderlich." },
      { status: 400 },
    );
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  const valid = user ? await bcrypt.compare(password, user.passwordHash) : false;

  if (!user || !valid) {
    return NextResponse.json(
      { error: "E-Mail oder Passwort falsch." },
      { status: 401 },
    );
  }

  const session = await getAdminSession();
  session.adminUserId = user.id;
  session.email = user.email;
  session.name = user.name;
  await session.save();

  return NextResponse.json({ ok: true });
}
