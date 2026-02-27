import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session if expired
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Protected routes: require authentication
  if (pathname.startsWith("/app")) {
    if (!user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/auth/login";
      redirectUrl.searchParams.set("redirectedFrom", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Auth routes: redirect to app if already signed in
  if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup")) {
    if (user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/app/dashboard";
      return NextResponse.redirect(redirectUrl);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/app/:path*",
    "/auth/login",
    "/auth/signup",
    "/((?!_next/static|_next/image|favicon.ico|public|api/webhooks).*)",
  ],
};
