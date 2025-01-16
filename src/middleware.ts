import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "../auth";

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const isAuth = !!session;
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/register');
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');
  const isHomePage = request.nextUrl.pathname === '/index';
  const isAbout = request.nextUrl.pathname === '/about';
  const isForgotPasswrd = request.nextUrl.pathname === '/forgot-password';
  const isResetPasswrd = request.nextUrl.pathname === '/reset-password';
  const isImagePath = request.nextUrl.pathname.startsWith('/images/');

  // Allow the home page and image paths to be accessed without login
  if (isHomePage || isImagePath || isAbout || isForgotPasswrd || isResetPasswrd) {

    return NextResponse.next();
  }

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return null;
  }

  if (!isAuth) {
    let from = request.nextUrl.pathname;
    if (request.nextUrl.search) {
      from += request.nextUrl.search;
    }
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, request.url)
    );
  }

  // Restrict access to admin pages
  if (isAdminPage) {
    const userRole = session?.user?.role;
    if (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except API routes, _next static files, and public files like favicon.ico
    '/((?!api|_next/static|_next/image|favicon.ico|images/).*)',
  ],
};
