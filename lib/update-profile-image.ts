"use server"

import { updateProfile } from "./actions"
import { revalidatePath } from "next/cache"

export async function setProfileImage() {
  try {
    // Update the profile with the new image
    await updateProfile({
      image: "/images/profile-sunset.jpg",
    })

    // Revalidate the pages to show the updated image
    revalidatePath("/")
    revalidatePath("/dashboard")

    return { success: true, message: "Profile image updated successfully" }
  } catch (error) {
    console.error("Error updating profile image:", error)
    return { success: false, message: "Failed to update profile image" }
  }
}
