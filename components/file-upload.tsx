"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Upload, Loader2, X, FileIcon } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface FileUploadProps {
  value?: string
  onChange: (url: string) => void
  disabled?: boolean
  className?: string
  acceptedFileTypes?: Record<string, string[]>
  maxSizeMB?: number
}

export function FileUpload({
  value,
  onChange,
  disabled,
  className,
  acceptedFileTypes = { "application/pdf": [".pdf"] },
  maxSizeMB = 10,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit`)
      return
    }

    // Check file type
    const fileTypeAccepted = Object.entries(acceptedFileTypes).some(([mimeType, extensions]) => {
      return file.type === mimeType || extensions.some((ext) => file.name.toLowerCase().endsWith(ext))
    })

    if (!fileTypeAccepted) {
      setError(`Only ${Object.values(acceptedFileTypes).flat().join(", ")} files are allowed`)
      return
    }

    setIsUploading(true)
    setError(null)
    setFileName(file.name)

    try {
      // Create a FormData object
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "documents")

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
        title: "File uploaded",
        description: "Your file has been uploaded successfully.",
      })
    } catch (err) {
      console.error("Upload error:", err)
      setError(err.message || "Upload failed")
      setFileName(null)

      toast({
        title: "Upload failed",
        description: err.message || "There was an error uploading your file.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    onChange("")
    setError(null)
    setFileName(null)
  }

  return (
    <div className={cn("space-y-4", className)}>
      {value ? (
        <div className="flex items-center justify-between p-4 border rounded-md bg-muted/20">
          <div className="flex items-center space-x-3">
            <FileIcon className="h-8 w-8 text-primary" />
            <div className="space-y-1">
              <p className="text-sm font-medium">{fileName || "File uploaded"}</p>
              <p className="text-xs text-muted-foreground">Ready to use</p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            disabled={disabled || isUploading}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <Label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer bg-muted/50 hover:bg-muted/80 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {isUploading ? (
                <>
                  <Loader2 className="w-8 h-8 mb-2 text-primary animate-spin" />
                  <p className="mb-1 text-sm text-muted-foreground">Uploading...</p>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-1 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {Object.values(acceptedFileTypes).flat().join(", ")} (MAX. {maxSizeMB}MB)
                  </p>
                </>
              )}
            </div>
            <Input
              id="file-upload"
              type="file"
              accept={Object.values(acceptedFileTypes).flat().join(",")}
              className="hidden"
              onChange={handleUpload}
              disabled={disabled || isUploading}
            />
          </Label>

          {error && <p className="text-sm text-destructive text-center">{error}</p>}
        </div>
      )}
    </div>
  )
}
