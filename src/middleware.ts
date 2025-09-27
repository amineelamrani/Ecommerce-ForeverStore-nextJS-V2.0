import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/purchased")) {
    const cookie = request.cookies.get("foreverEcommNext_2.0");
    const token = cookie?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      const secret = new TextEncoder().encode(process.env.SECRET_JWT_KEY);
      const { payload } = await jwtVerify(token, secret);

      if (typeof payload === "string") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      if (payload.id) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/login", request.url));
    } catch (err) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}
