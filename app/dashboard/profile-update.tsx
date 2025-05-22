"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { updateProfile } from "@/lib/actions"

export default function ProfileImageUpdate() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function updateProfileImage() {
    setIsLoading(true)

    try {
      await updateProfile({
        image: "/images/profile-sunset.jpg",
      })

      toast({
        title: "Profile image updated",
        description: "Your profile image has been updated successfully.",
      })

      router.refresh()
    } catch (error) {
      console.error("Error updating profile image:", error)
      toast({
        title: "Something went wrong",
        description: "Your profile image could not be updated. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Profile Image</CardTitle>
        <CardDescription>Update your profile image to the sunset silhouette photo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="border rounded-lg overflow-hidden w-full max-w-md aspect-square bg-muted relative">
            <img
              src="/images/profile-sunset.jpg"
              alt="Sunset silhouette profile"
              className="object-cover w-full h-full"
            />
          </div>

          <Button
            onClick={updateProfileImage}
            disabled={isLoading}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          >
            {isLoading ? "Updating..." : "Set as Profile Image"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
