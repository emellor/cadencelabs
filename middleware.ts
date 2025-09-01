import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // Only protect /app routes
  if (!req.nextUrl.pathname.startsWith("/app")) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (!token?.email) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // For now, let authenticated users access /app
  // Subscription check will be done on the client side
  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
