
// import { NextResponse, NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export default async function middleware(req: NextRequest) {
//   const token = await getToken({ req, secret: process.env.AUTH_SECRET });

//   console.log("token in middleware", token);
  
//   const { nextUrl } = req;
//   const protectedRoutes = ["/contact", "/profile"];
//   const openRoutes = ["/home", "/blog"];

//   const isAuthenticated = !!token;  

//   // Handle open routes
//   if (openRoutes.includes(nextUrl.pathname)) {
//     return NextResponse.next();
//   }

//   // Redirect unauthenticated users from protected routes
//   if (protectedRoutes.includes(nextUrl.pathname) && !isAuthenticated) {
//     return NextResponse.redirect(new URL("/auth", req.url));
//   }

//   return NextResponse.next();
// }

import { NextResponse, NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
  console.log("Headers in request:", req.headers); // Debugging

  // const token = await getToken({ req, secret: process.env.AUTH_SECRET, raw: true  });
  // const token = await getToken({ req, secret: process.env.AUTH_SECRET, cookieName: "_vercel_jwt" });
  const token = req.cookies.get("next-auth.session-token")?.value;

  console.log("Token in middleware:", token); // Check if it's retrieved

  const protectedRoutes = ["/contact", "/profile"];
  const openRoutes = ["/home", "/blog"];

  if (openRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }


  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}