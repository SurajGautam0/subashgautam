import { type NextRequest, NextResponse } from "next/server"
import { deleteFromBlob } from "@/lib/blob"

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 })
    }

    // Delete from Vercel Blob
    await deleteFromBlob(url)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: error.message || "Delete failed" }, { status: 500 })
  }
}
