import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const password = process.env.HOLIDAY_SITE_PASSWORD;

  if (!password) {
    return NextResponse.next();
  }

  const header = request.headers.get("authorization");

  if (header?.startsWith("Basic ")) {
    const [, encoded] = header.split(" ");
    const [, suppliedPassword] = atob(encoded).split(":");

    if (suppliedPassword === password) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Private trip site", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Mexico 2026"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt).*)"],
};
