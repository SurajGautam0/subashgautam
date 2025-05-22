"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { updateProfile } from "@/lib/actions"

export function ForceProfileImageUpdate() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleUpdateImage = async () => {
    setIsLoading(true)

    try {
      // Update the profile image directly using the server action
      await updateProfile({
        image: "/images/profile-sunset.jpg",
      })

      toast({
        title: "Success",
        description: "Profile image updated. Refreshing page...",
      })

      // Force a refresh to apply changes
      setTimeout(() => {
        router.refresh()
      }, 1000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile image",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleUpdateImage}
      disabled={isLoading}
      className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
    >
      {isLoading ? "Updating..." : "Force Update Profile Image"}
    </Button>
  )
}
