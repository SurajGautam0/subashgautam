"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Upload, X } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface BlobImageUploadProps {
  value?: string
  onChange: (url: string) => void
  disabled?: boolean
  className?: string
}

export function BlobImageUpload({ value, onChange, disabled, className }: BlobImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit")
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed")
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      // Create a FormData object
      const formData = new FormData()
      formData.append("file", file)

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
      onChange(data.url)
      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully.",
      })
    } catch (err) {
      console.error("Upload error:", err)
      setError(err.message || "Upload failed")
      toast({
        title: "Upload failed",
        description: err.message || "There was an error uploading your image.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    onChange("")
    setError(null)
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col items-center justify-center gap-4">
        {value ? (
          <div className="relative w-full max-w-xs mx-auto">
            <Image
              src={value || "/placeholder.svg"}
              alt="Uploaded image"
              width={300}
              height={300}
              className="rounded-md object-cover w-full h-auto max-h-[300px]"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleRemove}
              disabled={disabled || isUploading}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove image</span>
            </Button>
          </div>
        ) : (
          <div className="w-full">
            <Label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer bg-muted/50 hover:bg-muted/80 transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                <p className="mb-1 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (MAX. 5MB)</p>
              </div>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
                disabled={disabled || isUploading}
              />
            </Label>
          </div>
        )}
      </div>

      {isUploading && <p className="text-sm text-center">Uploading...</p>}
      {error && <p className="text-sm text-destructive text-center">{error}</p>}
    </div>
  )
}
