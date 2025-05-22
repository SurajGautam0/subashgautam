import { NextResponse } from "next/server"
import { deleteSession } from "@/lib/redis"
import { cookies } from "next/headers"

export async function POST() {
  try {
    const sessionId = cookies().get("portfolio-auth-token")?.value

    if (sessionId) {
      await deleteSession(sessionId)
    }

    // Clear the session cookie
    cookies().set({
      name: "portfolio-auth-token",
      value: "",
      httpOnly: true,
      path: "/",
      maxAge: 0,
      sameSite: "lax",
    })

    return NextResponse.json({
      success: true,
      message: "Logout successful",
    })
  } catch (error) {
    console.error("Error in logout API:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during logout",
      },
      { status: 500 },
    )
  }
}
