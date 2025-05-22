"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Play } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type RedisStatus = {
  connected: boolean
  error?: string
  timestamp?: string
}

export default function RedisConfigPage() {
  const [status, setStatus] = useState<RedisStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [initializing, setInitializing] = useState(false)
  const { toast } = useToast()

  const fetchStatus = async () => {
    try {
      setRefreshing(true)
      const response = await fetch("/api/redis-status")
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      console.error("Error fetching Redis status:", error)
      setStatus({
        connected: false,
        error: error instanceof Error ? error.message : "Failed to fetch status",
      })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const initializeRedis = async () => {
    try {
      setInitializing(true)
      const response = await fetch("/api/redis-init", {
        method: "POST",
      })
      const data = await response.json()

      if (data.success) {
        toast({
          title: "Redis Initialized",
          description: "Redis has been successfully initialized with default data.",
          variant: "default",
        })
        // Refresh status after initialization
        fetchStatus()
      } else {
        toast({
          title: "Initialization Failed",
          description: data.message || "Failed to initialize Redis.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error initializing Redis:", error)
      toast({
        title: "Initialization Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setInitializing(false)
    }
  }

  useEffect(() => {
    fetchStatus()
  }, [])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Redis Configuration</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Connection Status</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={fetchStatus} disabled={refreshing}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={initializeRedis}
                  disabled={initializing || !status?.connected}
                >
                  <Play className={`h-4 w-4 mr-2 ${initializing ? "animate-pulse" : ""}`} />
                  Initialize Redis
                </Button>
              </div>
            </div>
            <CardDescription>Current status of your Redis connection</CardDescription>
          </CardHeader>

          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : status ? (
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-40 font-medium">Connection:</div>
                  <div className="flex items-center">
                    {status.connected ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-green-500 font-medium">Connected</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-500 mr-2" />
                        <span className="text-red-500 font-medium">Disconnected</span>
                      </>
                    )}
                  </div>
                </div>

                {status.error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Connection Error</AlertTitle>
                    <AlertDescription>{status.error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex items-center">
                  <div className="w-40 font-medium">Last Checked:</div>
                  <div className="text-muted-foreground">
                    {status.timestamp ? new Date(status.timestamp).toLocaleString() : "Unknown"}
                  </div>
                </div>
              </div>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Unable to fetch status</AlertTitle>
                <AlertDescription>Could not retrieve Redis connection status. Please try again.</AlertDescription>
              </Alert>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              {status?.connected
                ? "Your Redis connection is working properly."
                : "Check your environment variables if you're having connection issues."}
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuration Help</CardTitle>
            <CardDescription>How to properly configure your Redis connection</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Environment Variables</h3>
                <p className="text-muted-foreground mb-2">
                  Make sure you have the following environment variables set in your Vercel project:
                </p>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">
                  <div>REDIS_URL=your_redis_url</div>
                  <div>REDIS_TOKEN=your_redis_token</div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Upstash Redis Setup</h3>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Create an Upstash account if you don't have one</li>
                  <li>Create a new Redis database</li>
                  <li>Get your REST URL and REST token from the database details page</li>
                  <li>Add these values to your environment variables</li>
                  <li>Use the "Initialize Redis" button to set up your data</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
