import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export function middleware(request: NextRequest) {
  console.log("Hi middleware");
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/purchased")) {
    const cookie = request.cookies.get("foreverEcommNext_2.0");
    const token = cookie?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    console.log("token : ", token);
    try {
      const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!);
      console.log("decoded : ", decoded);
      if (typeof decoded === "string") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      const id = (decoded as JwtPayload).id;
      console.log(id);
      if (id && id !== "" && id.length > 1) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/login", request.url));
    } catch (err) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}
