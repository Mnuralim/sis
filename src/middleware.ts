import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptJWT } from "./actions/session";

const adminProtectedRoutes = [
  "/admin",
  "/admin/profile",
  "/admin/facilities",
  "/admin/activities",
  "/admin/announcements",
  "/admin/galleries",
  "/admin/settings",
];
const adminPublicRoutes = ["/admin/login"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isAdminProtected = adminProtectedRoutes.includes(path);
  const isAdminPublic = adminPublicRoutes.includes(path);

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", path);
  requestHeaders.set("x-url", req.nextUrl.href);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decryptJWT(cookie);

  if (isAdminProtected) {
    if (!session?.id) {
      return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
    }
  }
  if (isAdminPublic && session?.id) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
