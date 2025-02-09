import { NextRequest, NextResponse } from "next/server";

// const protectedRoute = ["/dashboard", "/profile"];

export function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const token = req.cookies.get("token");

  // if (protectedRoute.includes(pathname) && !token) {
  //   return NextResponse.redirect(new URL("/", origin)); // Gunakan `origin`
  // }

  return NextResponse.next();
}

// export const config = {
//   matcher: ["/dashboard", "/profile"], // Middleware hanya berjalan di path ini
// };
