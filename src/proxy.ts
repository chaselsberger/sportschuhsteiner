import { getIronSession, nextProxyCookies } from "iron-session";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { AdminSessionData } from "@/lib/session";
import { sessionOptions } from "@/lib/session";

const PUBLIC_PATHS = [
  "/admin/login",
  "/api/admin/login",
  "/admin/manifest.webmanifest",
  "/admin/icon-",
  "/admin/sw.js",
];

/**
 * Schützt den Admin-Bereich (Login ausgenommen). In Next.js 16 heißt die
 * Middleware-Datei "proxy" (middleware.ts ist deprecated, siehe AGENTS.md).
 */
export async function proxy(request: NextRequest) {
  if (PUBLIC_PATHS.some((p) => request.nextUrl.pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const session = await getIronSession<AdminSessionData>(
    nextProxyCookies(request, response),
    sessionOptions,
  );

  if (!session.adminUserId) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
