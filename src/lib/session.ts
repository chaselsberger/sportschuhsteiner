import "server-only";
import { cookies } from "next/headers";
import { getIronSession, type SessionOptions } from "iron-session";

export type AdminSessionData = {
  adminUserId: string;
  email: string;
  name: string;
};

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret || sessionSecret.length < 32) {
  throw new Error(
    "SESSION_SECRET fehlt in der .env-Datei oder ist kürzer als 32 Zeichen.",
  );
}

export const sessionOptions: SessionOptions = {
  cookieName: "sss-admin-session",
  password: sessionSecret,
  ttl: 60 * 60 * 12, // 12 Stunden
  cookieOptions: {
    secure: process.env.NEXT_PUBLIC_SITE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  },
};

/** In Server Components und Route Handlern des App Routers verwenden. */
export async function getAdminSession() {
  return getIronSession<AdminSessionData>(await cookies(), sessionOptions);
}
