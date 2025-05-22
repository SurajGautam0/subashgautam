import { NextResponse } from "next/server"
import { testRedisConnection, isUsingDummyImplementation } from "@/lib/redis"

export async function GET() {
  try {
    // If we're already using dummy implementation, return false
    if (isUsingDummyImplementation()) {
      return NextResponse.json({ connected: false })
    }

    // Test Redis connection
    const connected = await testRedisConnection()
    return NextResponse.json({ connected })
  } catch (error) {
    console.error("Error checking Redis status:", error)
    return NextResponse.json({ connected: false })
  }
}
