import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAuthPage =
    request.nextUrl.pathname === "/admin/login" ||
    request.nextUrl.pathname === "/admin/signup" ||
    request.nextUrl.pathname === "/admin/forgot-password" ||
    request.nextUrl.pathname === "/admin/reset-password"

  // Protect admin routes (except login, signup, and password recovery pages)
  if (request.nextUrl.pathname.startsWith("/admin") && !user && !isAuthPage) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    return NextResponse.redirect(url)
  }

  // If logged in and trying to access login/signup, redirect to dashboard
  if (user && (request.nextUrl.pathname === "/admin/login" || request.nextUrl.pathname === "/admin/signup")) {
    const isAdmin = user.user_metadata?.is_admin === true
    if (isAdmin) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin/dashboard"
      return NextResponse.redirect(url)
    }
  }

  // If logged in, check if admin for protected routes
  if (request.nextUrl.pathname.startsWith("/admin") && user && !isAuthPage) {
    const isAdmin = user.user_metadata?.is_admin === true
    if (!isAdmin) {
      const url = request.nextUrl.clone()
      url.pathname = "/"
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}