"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { migrateDataToFirestore } from "@/lib/firestore"
import { getProfile } from "@/lib/profile"

export default function MigratePage() {
  const router = useRouter()
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  const handleMigrate = async () => {
    setStatus("loading")
    setError(null)

    try {
      // Get profile data
      const profile = await getProfile()

      // Migrate data to Firestore
      await migrateDataToFirestore(profile)

      setStatus("success")

      // Refresh the page after 2 seconds
      setTimeout(() => {
        router.push("/dashboard")
        router.refresh()
      }, 2000)
    } catch (err) {
      console.error("Migration error:", err)
      setStatus("error")
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Data Migration</h1>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Migrate to Firebase Firestore</CardTitle>
          <CardDescription>
            This will migrate your portfolio data to Firebase Firestore database. This is a one-time operation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === "idle" && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Ready to migrate</AlertTitle>
              <AlertDescription>
                Click the button below to migrate your data to Firebase Firestore. This will make your portfolio data
                more reliable and enable real-time updates.
              </AlertDescription>
            </Alert>
          )}

          {status === "loading" && (
            <Alert>
              <Loader2 className="h-4 w-4 animate-spin" />
              <AlertTitle>Migrating data...</AlertTitle>
              <AlertDescription>
                Please wait while your data is being migrated to Firebase Firestore. This may take a few moments.
              </AlertDescription>
            </Alert>
          )}

          {status === "success" && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle className="text-green-700">Migration successful</AlertTitle>
              <AlertDescription className="text-green-600">
                Your data has been successfully migrated to Firebase Firestore. You will be redirected to the dashboard
                in a moment.
              </AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Migration failed</AlertTitle>
              <AlertDescription>{error || "An error occurred during migration. Please try again."}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/dashboard")} disabled={status === "loading"}>
            Cancel
          </Button>
          <Button
            onClick={handleMigrate}
            disabled={status === "loading" || status === "success"}
            className={status === "loading" ? "opacity-50 cursor-not-allowed" : ""}
          >
            {status === "loading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Migrating...
              </>
            ) : (
              "Migrate Data"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
