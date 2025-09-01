// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  const { pathname } = req.nextUrl;

  // Cho phép login + register thoải mái
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/homepage") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  // Nếu vào /admin thì bắt buộc phải là admin
  if (pathname.startsWith("/admin")) {
    if (!token || role !== "Admin") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  //   // Nếu vào /homepage thì chỉ cần có token
  //   if (pathname.startsWith("/homepage")) {
  //     if (!token) {
  //       return NextResponse.redirect(new URL("/login", req.url));
  //     }
  //   }

  return NextResponse.next();
}

// Chỉ áp dụng middleware cho homepage và admin
export const config = {
  matcher: ["/admin/:path*", "/homepage/:path*"],
};
