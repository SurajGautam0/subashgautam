import { NextResponse } from "next/server"
import { createUser } from "@/lib/redis"

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

    const success = await createUser(username, password)

    if (success) {
      return NextResponse.json({
        success: true,
        message: "User created successfully",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Username already exists",
        },
        { status: 409 },
      )
    }
  } catch (error) {
    console.error("Error in signup API:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during signup",
      },
      { status: 500 },
    )
  }
}
