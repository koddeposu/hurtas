import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";
import { LOCALE_HEADER } from "@/lib/i18n-server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];
  const locale = isLocale(maybeLocale) ? maybeLocale : DEFAULT_LOCALE;

  requestHeaders.set(LOCALE_HEADER, locale);

  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const redirectUrl = request.nextUrl.clone();
    const strippedPath = `/${segments.slice(1).join("/")}`;
    redirectUrl.pathname = strippedPath === "/" ? "/" : strippedPath;
    return NextResponse.redirect(redirectUrl);
  }

  if (locale !== DEFAULT_LOCALE) {
    const rewriteUrl = request.nextUrl.clone();
    const strippedPath = `/${segments.slice(1).join("/")}`;
    rewriteUrl.pathname = strippedPath === "/" ? "/" : strippedPath;

    return NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (pathname.startsWith("/admin/login")) {
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|googlef7d632fd1b843bc7.html|.*\\..*).*)",
  ],
};
