import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getRedis, REDIS_KEYS } from "@/lib/redis"

export async function GET() {
  try {
    // Get the session token from cookies
    const sessionToken = (await cookies()).get("session")?.value

    if (!sessionToken) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    // Get the session from Redis
    const redis = getRedis()
    const session = await redis.get(`${REDIS_KEYS.SESSIONS}:${sessionToken}`)

    if (!session) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    // Return the user
    return NextResponse.json({ user: session })
  } catch (error) {
    console.error("Error checking auth:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
