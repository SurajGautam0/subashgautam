"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Database, CheckCircle2, XCircle } from "lucide-react"

interface RedisConnectionStatusProps {
  showLabel?: boolean
}

export function RedisConnectionStatus({ showLabel = false }: RedisConnectionStatusProps) {
  const [status, setStatus] = useState<"loading" | "connected" | "disconnected">("loading")

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch("/api/redis-status")
        const data = await response.json()
        setStatus(data.connected ? "connected" : "disconnected")
      } catch (error) {
        console.error("Error checking Redis status:", error)
        setStatus("disconnected")
      }
    }

    checkStatus()
    const interval = setInterval(checkStatus, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2">
      {status === "connected" ? (
        <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-600">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          {showLabel && "Redis Connected"}
          {!showLabel && "Redis"}
        </Badge>
      ) : status === "disconnected" ? (
        <Badge variant="outline" className="bg-destructive/10 text-destructive hover:bg-destructive/20">
          <XCircle className="mr-1 h-3 w-3" />
          {showLabel && "Redis Disconnected"}
          {!showLabel && "Redis"}
        </Badge>
      ) : (
        <Badge variant="outline" className="bg-muted text-muted-foreground">
          <Database className="mr-1 h-3 w-3 animate-pulse" />
          {showLabel && "Checking Redis..."}
          {!showLabel && "Redis"}
        </Badge>
      )}
    </div>
  )
}
