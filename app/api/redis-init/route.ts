import { NextResponse } from "next/server"
import { initializeRedis } from "@/lib/redis"

export async function POST() {
  try {
    const success = await initializeRedis()

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Redis initialized successfully",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to initialize Redis",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error in Redis initialization API:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
