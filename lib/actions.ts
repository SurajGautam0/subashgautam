"use server"

import { revalidatePath } from "next/cache"
import { getRedis, REDIS_KEYS } from "./redis"
import type { Profile, Project, Experience, Education, Testimonial, ContactMessage } from "./types"

// Update profile information
export async function updateProfile(data: Partial<Profile>): Promise<void> {
  try {
    const redis = getRedis()

    // Get existing profile
    const existingProfile = (await redis.get<Profile>(REDIS_KEYS.PROFILE)) || {}

    // Update profile with new data
    const updatedProfile = {
      ...existingProfile,
      ...data,
    }

    // Save updated profile
    await redis.set(REDIS_KEYS.PROFILE, updatedProfile)

    revalidatePath("/")
    revalidatePath("/dashboard")
  } catch (error) {
    console.error("Error updating profile:", error)
    throw error
  }
}

// Update projects
export async function updateProjects(projects: Project[]): Promise<void> {
  try {
    const redis = getRedis()
    await redis.set(REDIS_KEYS.PROJECTS, projects)

    revalidatePath("/")
    revalidatePath("/dashboard")
  } catch (error) {
    console.error("Error updating projects:", error)
    throw error
  }
}

// Delete a project
export async function deleteProject(projectId: string): Promise<void> {
  try {
    const redis = getRedis()

    // Get existing projects
    const projects = (await redis.get<Project[]>(REDIS_KEYS.PROJECTS)) || []

    // Filter out the project to delete
    const updatedProjects = projects.filter((project) => project.id !== projectId)

    // Save updated projects
    await redis.set(REDIS_KEYS.PROJECTS, updatedProjects)

    revalidatePath("/")
    revalidatePath("/dashboard")
  } catch (error) {
    console.error("Error deleting project:", error)
    throw error
  }
}

// Update experiences
export async function updateExperiences(experiences: Experience[]): Promise<void> {
  try {
    const redis = getRedis()
    await redis.set(REDIS_KEYS.EXPERIENCES, experiences)

    revalidatePath("/")
    revalidatePath("/dashboard")
  } catch (error) {
    console.error("Error updating experiences:", error)
    throw error
  }
}

// Delete an experience
export async function deleteExperience(experienceId: string): Promise<void> {
  try {
    const redis = getRedis()

    // Get existing experiences
    const experiences = (await redis.get<Experience[]>(REDIS_KEYS.EXPERIENCES)) || []

    // Filter out the experience to delete
    const updatedExperiences = experiences.filter((experience) => experience.id !== experienceId)

    // Save updated experiences
    await redis.set(REDIS_KEYS.EXPERIENCES, updatedExperiences)

    revalidatePath("/")
    revalidatePath("/dashboard")
  } catch (error) {
    console.error("Error deleting experience:", error)
    throw error
  }
}

// Update education
export async function updateEducation(education: Education[]): Promise<void> {
  try {
    const redis = getRedis()
    await redis.set(REDIS_KEYS.EDUCATION, education)

    revalidatePath("/")
    revalidatePath("/dashboard")
  } catch (error) {
    console.error("Error updating education:", error)
    throw error
  }
}

// Delete an education entry
export async function deleteEducation(educationId: string): Promise<void> {
  try {
    const redis = getRedis()

    // Get existing education entries
    const education = (await redis.get<Education[]>(REDIS_KEYS.EDUCATION)) || []

    // Filter out the education entry to delete
    const updatedEducation = education.filter((edu) => edu.id !== educationId)

    // Save updated education entries
    await redis.set(REDIS_KEYS.EDUCATION, updatedEducation)

    revalidatePath("/")
    revalidatePath("/dashboard")
  } catch (error) {
    console.error("Error deleting education:", error)
    throw error
  }
}

// Update testimonials
export async function updateTestimonials(testimonials: Testimonial[]): Promise<void> {
  try {
    const redis = getRedis()
    await redis.set(REDIS_KEYS.TESTIMONIALS, testimonials)

    revalidatePath("/")
    revalidatePath("/dashboard")
  } catch (error) {
    console.error("Error updating testimonials:", error)
    throw error
  }
}

// Delete a testimonial
export async function deleteTestimonial(testimonialId: string): Promise<void> {
  try {
    const redis = getRedis()

    // Get existing testimonials
    const testimonials = (await redis.get<Testimonial[]>(REDIS_KEYS.TESTIMONIALS)) || []

    // Filter out the testimonial to delete
    const updatedTestimonials = testimonials.filter((testimonial) => testimonial.id !== testimonialId)

    // Save updated testimonials
    await redis.set(REDIS_KEYS.TESTIMONIALS, updatedTestimonials)

    revalidatePath("/")
    revalidatePath("/dashboard")
  } catch (error) {
    console.error("Error deleting testimonial:", error)
    throw error
  }
}

// Send contact message
export async function sendContactMessage(message: ContactMessage): Promise<void> {
  try {
    const redis = getRedis()

    // Get existing messages
    const messages = (await redis.get<ContactMessage[]>(REDIS_KEYS.MESSAGES)) || []

    // Add new message with timestamp and ID
    const newMessage = {
      ...message,
      id: `msg_${Date.now()}`,
      read: false,
      createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 },
    }

    // Save updated messages
    await redis.set(REDIS_KEYS.MESSAGES, [newMessage, ...messages])

    // Revalidate the dashboard page to show the new message
    revalidatePath("/dashboard/messages")
  } catch (error) {
    console.error("Error sending contact message:", error)
    // Don't throw the error to the client to avoid breaking the form submission
    // Instead, we'll handle it gracefully
  }
}

// Get all contact messages
export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    const redis = getRedis()
    const messages = (await redis.get<ContactMessage[]>(REDIS_KEYS.MESSAGES)) || []
    return messages
  } catch (error) {
    console.error("Error getting contact messages:", error)
    return []
  }
}

// Mark message as read
export async function markMessageAsRead(messageId: string): Promise<void> {
  try {
    const redis = getRedis()

    // Get existing messages
    const messages = (await redis.get<ContactMessage[]>(REDIS_KEYS.MESSAGES)) || []

    // Update the message with the matching ID
    const updatedMessages = messages.map((message) => {
      if (message.id === messageId) {
        return { ...message, read: true }
      }
      return message
    })

    // Save updated messages
    await redis.set(REDIS_KEYS.MESSAGES, updatedMessages)

    revalidatePath("/dashboard/messages")
  } catch (error) {
    console.error("Error marking message as read:", error)
  }
}

export async function uploadImage(file: File): Promise<string> {
  try {
    // Directly use uploadToBlob from "./blob"
    if (!file) {
      throw new Error("No file provided")
    }

    const formData = new FormData()
    formData.append("file", file)

    // Send the file to the upload API
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Upload failed")
    }

    const data = await response.json()
    return data.url
  } catch (error) {
    console.error("Upload error:", error)
    throw error
  }
}
