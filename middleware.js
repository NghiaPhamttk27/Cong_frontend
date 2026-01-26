import { NextResponse } from "next/server";
export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;
  const { pathname } = req.nextUrl;

  // Cho phép public
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/homepage") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  // Bắt buộc login cho /admin
  if (pathname.startsWith("/admin")) {
    if (!token || !role) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    // USER bị cấm vào các trang admin-level
    if (
      role === "User" &&
      (pathname === "/admin/dashboard" ||
        pathname.startsWith("/admin/dashboard/users"))
    ) {
      return NextResponse.redirect(new URL("/admin/dashboard/file", req.url));
    }
  }

  return NextResponse.next();
}
