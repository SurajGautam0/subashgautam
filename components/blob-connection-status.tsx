"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Database, CheckCircle2, XCircle } from "lucide-react"

interface BlobConnectionStatusProps {
  showLabel?: boolean
}

export function BlobConnectionStatus({ showLabel = false }: BlobConnectionStatusProps) {
  const [status, setStatus] = useState<"loading" | "connected" | "disconnected">("loading")

  useEffect(() => {
    const checkBlobConnection = async () => {
      try {
        // Try to fetch the Blob status
        const response = await fetch("/api/blob-status")

        if (response.ok) {
          setStatus("connected")
        } else {
          setStatus("disconnected")
        }
      } catch (error) {
        console.error("Blob connection error:", error)
        setStatus("disconnected")
      }
    }

    checkBlobConnection()
    const interval = setInterval(checkBlobConnection, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2">
      {status === "connected" ? (
        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 hover:text-blue-600">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          {showLabel && "Blob Connected"}
          {!showLabel && "Blob"}
        </Badge>
      ) : status === "disconnected" ? (
        <Badge variant="outline" className="bg-destructive/10 text-destructive hover:bg-destructive/20">
          <XCircle className="mr-1 h-3 w-3" />
          {showLabel && "Blob Disconnected"}
          {!showLabel && "Blob"}
        </Badge>
      ) : (
        <Badge variant="outline" className="bg-muted text-muted-foreground">
          <Database className="mr-1 h-3 w-3 animate-pulse" />
          {showLabel && "Checking Blob..."}
          {!showLabel && "Blob"}
        </Badge>
      )}
    </div>
  )
}
