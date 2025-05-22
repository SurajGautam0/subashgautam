import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, Database } from "lucide-react"
import { FirebaseDebug } from "@/components/firebase-debug"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Settings | Dashboard",
  description: "Portfolio dashboard settings",
}

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="grid gap-6">
        <FirebaseDebug />

        <Card>
          <CardHeader>
            <CardTitle>Firebase Configuration</CardTitle>
            <CardDescription>Firebase is used for image storage and database in this application</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Environment Variables</AlertTitle>
              <AlertDescription>
                <p className="mb-2">The following environment variables are required for Firebase:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>NEXT_PUBLIC_FIREBASE_API_KEY</li>
                  <li>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN</li>
                  <li>NEXT_PUBLIC_FIREBASE_PROJECT_ID</li>
                  <li>NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET</li>
                  <li>NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID</li>
                  <li>NEXT_PUBLIC_FIREBASE_APP_ID</li>
                  <li>NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database Migration</CardTitle>
            <CardDescription>Migrate your data from JSON files to Firebase Firestore</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Your portfolio data is now stored in Firebase Firestore, which provides better reliability and real-time
              updates. If you've been using the previous JSON-based storage, you can migrate your data to Firestore.
            </p>
            <Button asChild>
              <Link href="/dashboard/migrate">
                <Database className="mr-2 h-4 w-4" />
                Migrate Data to Firestore
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
