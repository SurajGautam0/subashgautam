"use client"

import { useEffect } from "react"
import { updateProfile } from "@/lib/actions"
import { toast } from "@/components/ui/use-toast"

export default function UpdateProfileImageScript() {
  useEffect(() => {
    const updateImage = async () => {
      try {
        await updateProfile({
          image: "/images/profile-sunset.jpg",
        })
        toast({
          title: "Profile image updated",
          description: "Your profile image has been updated successfully.",
        })
      } catch (error) {
        console.error("Error updating profile image:", error)
        toast({
          title: "Something went wrong",
          description: "Your profile image could not be updated. Please try again.",
          variant: "destructive",
        })
      }
    }

    updateImage()
  }, [])

  return null
}
