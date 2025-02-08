import { NextRequest, NextResponse } from "next/server";

const protectedRoute = ["/dashboard", "/profile"];
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token");

  if (protectedRoute.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/", pathname));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard", "/profile"], // Only run on these paths
};
