"use server"

import { getRedis, REDIS_KEYS, defaultProfile } from "./redis"
import type { Profile } from "./types"

// Get profile data
export async function getProfile(): Promise<Profile> {
  try {
    const redis = getRedis()

    // Get profile from Redis
    const profile = await redis.get<Profile>(REDIS_KEYS.PROFILE)

    // If profile exists, return it
    if (profile) {
      return {
        ...profile,
        // Ensure the image is set to the sunset image if it's not already set
        image: profile.image || "/images/profile-sunset.jpg",
      }
    }

    // If profile doesn't exist, initialize with default data
    await redis.set(REDIS_KEYS.PROFILE, defaultProfile)
    return defaultProfile
  } catch (error) {
    console.error("Error getting profile:", error)
    return defaultProfile
  }
}

// Save profile data
export async function saveProfile(profile: Profile): Promise<void> {
  try {
    const redis = getRedis()
    await redis.set(REDIS_KEYS.PROFILE, profile)
  } catch (error) {
    console.error("Error saving profile:", error)
    throw error
  }
}
