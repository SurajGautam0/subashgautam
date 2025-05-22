import { put, del, list } from "@vercel/blob"
import { nanoid } from "nanoid"

// Helper function to generate a unique filename
export function generateUniqueFilename(originalFilename: string): string {
  const extension = originalFilename.split(".").pop() || ""
  const timestamp = Date.now()
  const uniqueId = nanoid(8)
  return `${timestamp}-${uniqueId}.${extension}`
}

// Upload a file to Blob
export async function uploadToBlob(file: File, folder = "images"): Promise<string> {
  try {
    const uniqueFilename = generateUniqueFilename(file.name)
    const pathname = `${folder}/${uniqueFilename}`

    // Convert File to ArrayBuffer for server component compatibility
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Vercel Blob
    const { url } = await put(pathname, buffer, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: false,
    })

    return url
  } catch (error) {
    console.error("Error uploading to Blob:", error)
    throw new Error(`Failed to upload file: ${error.message}`)
  }
}

// Delete a file from Blob
export async function deleteFromBlob(url: string): Promise<void> {
  try {
    await del(url)
  } catch (error) {
    console.error("Error deleting from Blob:", error)
    throw new Error(`Failed to delete file: ${error.message}`)
  }
}

// List files in a folder
export async function listBlobFiles(prefix = "images"): Promise<{ url: string; pathname: string; size: number }[]> {
  try {
    const { blobs } = await list({ prefix })
    return blobs
  } catch (error) {
    console.error("Error listing Blob files:", error)
    throw new Error(`Failed to list files: ${error.message}`)
  }
}
