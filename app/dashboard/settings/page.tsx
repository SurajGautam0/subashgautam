import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Settings | Dashboard",
  description: "Portfolio dashboard settings",
}

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
            <CardDescription>Required environment variables for the application</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Environment Variables</AlertTitle>
              <AlertDescription>
                <p className="mb-2">The following environment variables are required:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>NEXT_PUBLIC_APP_URL</li>
                  <li>NEXT_PUBLIC_APP_NAME</li>
                  <li>NEXT_PUBLIC_APP_DESCRIPTION</li>
                  <li>NEXT_PUBLIC_APP_KEYWORDS</li>
                  <li>NEXT_PUBLIC_APP_AUTHOR</li>
                  <li>NEXT_PUBLIC_APP_TWITTER</li>
                  <li>NEXT_PUBLIC_APP_GITHUB</li>
                  <li>NEXT_PUBLIC_APP_LINKEDIN</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
