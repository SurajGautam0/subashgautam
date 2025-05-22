import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getRedis, REDIS_KEYS } from "./lib/redis"

// Define which routes require authentication
const protectedRoutes = ["/dashboard"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute) {
    // Get the session token from the cookies
    const sessionToken = request.cookies.get("session")?.value

    if (!sessionToken) {
      // Redirect to signin page if no session token
      return NextResponse.redirect(new URL("/signin", request.url))
    }

    try {
      // Verify the session token
      const redis = getRedis()
      const session = await redis.get(`${REDIS_KEYS.SESSIONS}:${sessionToken}`)

      if (!session) {
        // Redirect to signin page if session is invalid
        return NextResponse.redirect(new URL("/signin", request.url))
      }

      // Continue to the protected route
      return NextResponse.next()
    } catch (error) {
      console.error("Error verifying session:", error)
      // Redirect to signin page if there's an error
      return NextResponse.redirect(new URL("/signin", request.url))
    }
  }

  // Continue for non-protected routes
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
