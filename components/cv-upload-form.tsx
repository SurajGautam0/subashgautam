"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { FileText, Upload, X } from "lucide-react"
import { updateProfile } from "@/lib/actions"
import type { Profile } from "@/lib/types"

export function CVUploadForm({ profile }: { profile: Profile }) {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit")
      return
    }

    // Check file type
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed")
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      // Create a FormData object
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "cv")

      // Send the file to the upload API
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }

      const data = await response.json()

      // Update the profile with the CV URL
      await updateProfile({ cvFile: data.url })

      toast({
        title: "CV uploaded",
        description: "Your CV has been uploaded successfully.",
      })

      router.refresh()
    } catch (err) {
      console.error("Upload error:", err)
      setError(err.message || "Upload failed")
      toast({
        title: "Upload failed",
        description: err.message || "There was an error uploading your CV.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = async () => {
    if (!profile.cvFile) return

    try {
      // Delete the file from Blob
      const response = await fetch("/api/delete-file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: profile.cvFile }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Delete failed")
      }

      // Update the profile to remove the CV URL
      await updateProfile({ cvFile: "" })

      toast({
        title: "CV removed",
        description: "Your CV has been removed successfully.",
      })

      router.refresh()
    } catch (err) {
      console.error("Delete error:", err)
      toast({
        title: "Delete failed",
        description: err.message || "There was an error removing your CV.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>CV / Resume</CardTitle>
        <CardDescription>
          Upload your CV or resume. This will be available for download on your portfolio website.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {profile.cvFile ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="border rounded-lg p-6 w-full flex flex-col items-center justify-center gap-4">
                <FileText className="h-16 w-16 text-primary" />
                <div className="text-center">
                  <h3 className="font-medium">CV Uploaded</h3>
                  <p className="text-sm text-muted-foreground">Your CV is available for download</p>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <a href={profile.cvFile} target="_blank" rel="noopener noreferrer">
                      View CV
                    </a>
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleRemove}>
                    <X className="mr-2 h-4 w-4" />
                    Remove CV
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4">
              <Label
                htmlFor="cv-upload"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-md cursor-pointer bg-muted/50 hover:bg-muted/80 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PDF only (MAX. 10MB)</p>
                </div>
                <Input
                  id="cv-upload"
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleUpload}
                  disabled={isUploading}
                />
              </Label>

              {isUploading && <p className="text-sm text-center">Uploading...</p>}
              {error && <p className="text-sm text-destructive text-center">{error}</p>}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
