import { Redis } from "@upstash/redis"
import type { Profile } from "./types"

// Redis keys
export const REDIS_KEYS = {
  PROFILE: "profile",
  PROJECTS: "projects",
  EXPERIENCES: "experiences",
  EDUCATION: "education",
  TESTIMONIALS: "testimonials",
  MESSAGES: "messages",
  USERS: "users",
  SESSIONS: "sessions",
}

// Default profile data
export const defaultProfile: Profile = {
  name: "Subash Gautam",
  title: "Creative Developer",
  summary: "Passionate about creating innovative digital experiences with cutting-edge technologies.",
  image: "/images/profile-sunset.jpg",
  projects: [
    {
      id: "default-1",
      title: "Portfolio Website",
      description: "A personal portfolio website built with Next.js and Tailwind CSS.",
      technologies: ["Next.js", "React", "Tailwind CSS"],
      link: "#",
      pdfFile: "https://pdfs.example.com/portfolio-case-study.pdf",
    },
    {
      id: "default-2",
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with product management and checkout.",
      technologies: ["React", "Node.js", "Redis"],
      link: "#",
      pdfFile: "https://pdfs.example.com/ecommerce-case-study.pdf",
    },
    {
      id: "default-3",
      title: "Task Management App",
      description: "A productivity app for managing tasks and projects.",
      technologies: ["React", "Firebase", "Material UI"],
      link: "#",
    },
  ],
  experience: [
    {
      id: "default-1",
      title: "Senior Frontend Developer",
      company: "Tech Innovators",
      period: "2021 - Present",
      description: "Leading the frontend development team, implementing new features, and optimizing performance.",
    },
    {
      id: "default-2",
      title: "Web Developer",
      company: "Digital Solutions",
      period: "2018 - 2021",
      description:
        "Developed responsive websites and web applications for various clients across different industries.",
    },
    {
      id: "default-3",
      title: "Junior Developer",
      company: "StartUp Hub",
      period: "2016 - 2018",
      description: "Assisted in the development of web applications and gained experience in modern web technologies.",
    },
  ],
  education: [
    {
      id: "default-1",
      degree: "Master's in Computer Science",
      institution: "Tech University",
      period: "2014 - 2016",
      description:
        "Specialized in web technologies and software engineering with a focus on modern application development.",
    },
    {
      id: "default-2",
      degree: "Bachelor's in Computer Science",
      institution: "National College",
      period: "2010 - 2014",
      description: "Studied fundamental computer science concepts, algorithms, and programming languages.",
    },
  ],
  testimonials: [
    {
      id: "default-1",
      name: "Sarah Johnson",
      position: "CEO, TechStart",
      content:
        "Working with Subash was an absolute pleasure. He delivered our project on time and exceeded our expectations with the quality of his work.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "default-2",
      name: "Michael Chen",
      position: "Product Manager, InnovateCorp",
      content:
        "Subash's attention to detail and problem-solving skills are exceptional. He quickly understood our requirements and delivered a solution that perfectly matched our vision.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ],
  socialLinks: {
    twitter: "https://twitter.com/username",
    linkedin: "https://linkedin.com/in/username",
    github: "https://github.com/username",
    instagram: "https://instagram.com/username",
  },
  stats: {
    projects: "50+",
    experience: "5+",
    clients: "30+",
    awards: "10+",
  },
}

// Track if we're using dummy implementation
let _isUsingDummyImplementation = true // Start with dummy implementation by default

export function isUsingDummyImplementation(): boolean {
  return _isUsingDummyImplementation
}

export function forceDummyImplementation(): void {
  console.log("Forcing dummy implementation for Redis")
  _isUsingDummyImplementation = true
}

// Dummy implementations for when Redis is not available
const dummyData: Record<string, any> = {
  profile: defaultProfile,
  projects: defaultProfile.projects,
  experiences: defaultProfile.experience,
  education: defaultProfile.education,
  testimonials: defaultProfile.testimonials,
  sessions: {},
  users: {
    admin: { username: "admin", password: "password" },
  },
}

// Create a dummy Redis client that mimics Redis functionality
const dummyRedisClient = {
  get: async (key: string) => {
    console.log(`[Dummy Redis] Getting key: ${key}`)
    if (key.startsWith("session:")) {
      const sessionId = key.replace("session:", "")
      return dummyData.sessions[sessionId] || null
    } else if (key.startsWith("user:")) {
      const username = key.replace("user:", "")
      return dummyData.users[username] || null
    } else {
      return dummyData[key] || null
    }
  },
  set: async (key: string, value: any) => {
    console.log(`[Dummy Redis] Setting key: ${key}`)
    if (key.startsWith("session:")) {
      const sessionId = key.replace("session:", "")
      dummyData.sessions[sessionId] = value
    } else if (key.startsWith("user:")) {
      const username = key.replace("user:", "")
      dummyData.users[username] = value
    } else {
      dummyData[key] = value
    }
    return "OK"
  },
  del: async (key: string) => {
    console.log(`[Dummy Redis] Deleting key: ${key}`)
    if (key.startsWith("session:")) {
      const sessionId = key.replace("session:", "")
      delete dummyData.sessions[sessionId]
    } else if (key.startsWith("user:")) {
      const username = key.replace("user:", "")
      delete dummyData.users[username]
    } else {
      delete dummyData[key]
    }
    return 1
  },
  ping: async () => {
    console.log(`[Dummy Redis] Ping`)
    return "PONG"
  },
} as unknown as Redis

// Redis client singleton
let redisClient: Redis | null = null

// Get Redis client
export function getRedis(): Redis {
  // If we're using dummy implementation, return the dummy client
  if (_isUsingDummyImplementation) {
    return dummyRedisClient
  }

  // If we already have a Redis client, return it
  if (redisClient) {
    return redisClient
  }

  // Try to create a real Redis client
  try {
    // Check if we have the required environment variables
    const redisUrl = process.env.REDIS_URL || process.env.KV_REST_API_URL
    const redisToken = process.env.REDIS_TOKEN || process.env.KV_REST_API_TOKEN

    // If we don't have valid Redis credentials, use dummy implementation
    if (!redisUrl || !redisToken) {
      console.log("Redis credentials not found, using dummy implementation")
      return dummyRedisClient
    }

    // Check if the URL is valid (starts with https://)
    if (!redisUrl.startsWith("https://")) {
      console.log("Invalid Redis URL (must start with https://), using dummy implementation")
      return dummyRedisClient
    }

    // Create Redis client
    redisClient = new Redis({
      url: redisUrl,
      token: redisToken,
    })

    // If we successfully created a Redis client, we're not using dummy implementation
    _isUsingDummyImplementation = false

    return redisClient
  } catch (error) {
    console.error("Error creating Redis client:", error)
    return dummyRedisClient
  }
}

// Initialize Redis with default data
export async function initializeRedis(): Promise<boolean> {
  try {
    const redis = getRedis()

    // Check if profile already exists
    const existingProfile = await redis.get(REDIS_KEYS.PROFILE)
    if (!existingProfile) {
      // Initialize with default profile
      await redis.set(REDIS_KEYS.PROFILE, defaultProfile)
      console.log("Initialized Redis with default profile")
    }

    // Check if projects already exist
    const existingProjects = await redis.get(REDIS_KEYS.PROJECTS)
    if (!existingProjects) {
      // Initialize with default projects
      await redis.set(REDIS_KEYS.PROJECTS, defaultProfile.projects)
      console.log("Initialized Redis with default projects")
    }

    // Check if experiences already exist
    const existingExperiences = await redis.get(REDIS_KEYS.EXPERIENCES)
    if (!existingExperiences) {
      // Initialize with default experiences
      await redis.set(REDIS_KEYS.EXPERIENCES, defaultProfile.experience)
      console.log("Initialized Redis with default experiences")
    }

    // Check if education already exist
    const existingEducation = await redis.get(REDIS_KEYS.EDUCATION)
    if (!existingEducation) {
      // Initialize with default education
      await redis.set(REDIS_KEYS.EDUCATION, defaultProfile.education)
      console.log("Initialized Redis with default education")
    }

    // Check if testimonials already exist
    const existingTestimonials = await redis.get(REDIS_KEYS.TESTIMONIALS)
    if (!existingTestimonials) {
      // Initialize with default testimonials
      await redis.set(REDIS_KEYS.TESTIMONIALS, defaultProfile.testimonials)
      console.log("Initialized Redis with default testimonials")
    }

    return true
  } catch (error) {
    console.error("Error initializing Redis:", error)
    return false
  }
}

// Test Redis connection
export async function testRedisConnection(): Promise<boolean> {
  try {
    // If we're using dummy implementation, return false
    if (_isUsingDummyImplementation) {
      return false
    }

    const redis = getRedis()
    await redis.ping()
    return true
  } catch (error) {
    console.error("Redis connection test failed:", error)
    return false
  }
}

export async function getSession(sessionId: string): Promise<any | null> {
  try {
    const redis = getRedis()
    const session = await redis.get(`session:${sessionId}`)
    return session
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

export async function verifyUser(username: string, password: string): Promise<boolean> {
  try {
    const redis = getRedis()
    const user = await redis.get(`user:${username}`)
    if (!user) {
      return false
    }
    // In a real application, you would hash the password and compare it to the stored hash
    return user.password === password
  } catch (error) {
    console.error("Error verifying user:", error)
    return false
  }
}

export async function createSession(username: string): Promise<string> {
  try {
    const redis = getRedis()
    const sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    await redis.set(`session:${sessionId}`, { username })
    return sessionId
  } catch (error) {
    console.error("Error creating session:", error)
    throw error
  }
}

export async function deleteSession(sessionId: string): Promise<void> {
  try {
    const redis = getRedis()
    await redis.del(`session:${sessionId}`)
  } catch (error) {
    console.error("Error deleting session:", error)
  }
}

export async function createUser(username: string, password: string): Promise<boolean> {
  try {
    const redis = getRedis()
    const existingUser = await redis.get(`user:${username}`)
    if (existingUser) {
      return false
    }
    await redis.set(`user:${username}`, { username, password })
    return true
  } catch (error) {
    console.error("Error creating user:", error)
    return false
  }
}
