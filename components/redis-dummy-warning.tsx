"use client"

import { useEffect, useState } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function RedisDummyWarning() {
  const [isDummy, setIsDummy] = useState(true) // Default to true until we confirm otherwise
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if we're using dummy implementation
    fetch("/api/redis-status")
      .then((res) => res.json())
      .then((data) => {
        setIsDummy(!data.connected)
        setIsLoading(false)
      })
      .catch(() => {
        setIsDummy(true)
        setIsLoading(false)
      })
  }, [])

  if (isLoading || !isDummy) return null

  return (
    <Alert variant="destructive" className="mb-4 mx-auto max-w-4xl">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Redis Connection Error</AlertTitle>
      <AlertDescription>
        Unable to connect to Redis. Using local data instead. Your changes will not be saved.
      </AlertDescription>
    </Alert>
  )
}
