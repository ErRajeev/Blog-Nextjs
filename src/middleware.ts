
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';


const protectedRoutes = ["/contact", "/profile"];
const openRoutes = ["/home", "/blog"];


export default async function middleware(req: NextRequest) {

  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) console.log("NEXTAUTH_SECRET is Missing");
    
  const token = await getToken({ req, secret: secret , cookieName : "next-auth.session-token"});

  const isAuthenticated = !!token;  

  // Handle open routes
  if (openRoutes.includes(req.nextUrl.pathname)) return NextResponse.next();
  

  // Redirect unauthenticated users from protected routes
  if (protectedRoutes.includes(req.nextUrl.pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}



// import { NextResponse, NextRequest } from "next/server";

// export default async function middleware(req: NextRequest) {
//   const token = req.cookies.get("next-auth.session-token")?.value;

//   console.log("Token in middleware:", token);

//   const protectedRoutes = ["/contact", "/profile"];
//   const openRoutes = ["/home", "/blog"];

//   if (openRoutes.includes(req.nextUrl.pathname)) {
//     return NextResponse.next();
//   }


//   if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
//     return NextResponse.redirect(new URL("/auth", req.url));
//   }

//   return NextResponse.next();
// }