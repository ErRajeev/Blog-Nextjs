// src/middleware.ts
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  console.log("token", token);
  
  const { nextUrl } = req;
  const protectedRoutes = ["/contact", "/profile"];
  const openRoutes = ["/home", "/blog"];

  const isAuthenticated = !!token;

  // Handle open routes
  if (openRoutes.includes(nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users from protected routes
  if (protectedRoutes.includes(nextUrl.pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth).*)"],
};