import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Use your actual secret from env if needed
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret });
  const { pathname } = request.nextUrl;


  const publicPaths = ["/"];
  const authPages = ["/signin", "/signup", "/verify"];

  // If logged in & visiting sign-in/signup → go to dashboard
  if (token && authPages.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow public pages without redirect
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Default allow
  return NextResponse.next();
}

// Only run middleware on paths we care about
export const config = {
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/dashboard/:path*",
    "/verify/:path*",
  ],
};
