"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { setProfileImage } from "@/lib/update-profile-image"

export function UpdateProfileImageButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateImage = async () => {
    setIsLoading(true)

    try {
      const result = await setProfileImage()

      if (result.success) {
        toast({
          title: "Success",
          description: "Profile image updated successfully. Refresh the page to see changes.",
        })
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
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
      {isLoading ? "Updating..." : "Update Profile Image"}
    </Button>
  )
}
