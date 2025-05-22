import { NextResponse } from "next/server"
import { list } from "@vercel/blob"

export async function GET() {
  try {
    // Try to list blobs to check if Blob is connected
    await list()

    return NextResponse.json({ status: "connected" })
  } catch (error) {
    console.error("Blob connection error:", error)
    return NextResponse.json({ status: "disconnected", error: error.message }, { status: 500 })
  }
}
