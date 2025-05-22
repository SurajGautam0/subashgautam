import { NextResponse } from "next/server"
import { verifyUser, createSession } from "@/lib/redis"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Username and password are required",
        },
        { status: 400 },
      )
    }

    const isValid = await verifyUser(username, password)

    if (isValid) {
      // Create a session
      const sessionId = await createSession(username)

      // Set session cookie
      cookies().set({
        name: "portfolio-auth-token",
        value: sessionId,
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: "lax",
      })

      return NextResponse.json({
        success: true,
        message: "Login successful",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username or password",
        },
        { status: 401 },
      )
    }
  } catch (error) {
    console.error("Error in login API:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during login",
      },
      { status: 500 },
    )
  }
}
