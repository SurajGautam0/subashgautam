"use server"

import { getRedis, REDIS_KEYS } from "./redis"
import { nanoid } from "nanoid"
import type { Project } from "./types"
import { getProfile } from "@/lib/profile"

// Get all projects
export async function getAllProjects(): Promise<Project[]> {
  try {
    const redis = getRedis()
    const projects = (await redis.get<Project[]>(REDIS_KEYS.PROJECTS)) || []
    return projects
  } catch (error) {
    console.error("Error getting projects:", error)
    return []
  }
}

// Get a single project by ID
export async function getProject(id: string): Promise<Project | null> {
  try {
    const redis = getRedis()
    const projects = (await redis.get<Project[]>(REDIS_KEYS.PROJECTS)) || []
    return projects.find((p) => p.id === id) || null
  } catch (error) {
    console.error("Error getting project:", error)
    return null
  }
}

export async function getProjectById(id: string) {
  try {
    const profile = await getProfile()

    if (!profile || !profile.projects) {
      throw new Error("Profile or projects not found")
    }

    const project = profile.projects.find((p) => p.id === id)

    if (!project) {
      throw new Error("Project not found")
    }

    return project
  } catch (error) {
    console.error("Error fetching project by ID:", error)
    throw error
  }
}

// Add a new project
export async function addProject(project: Omit<Project, "id">): Promise<Project> {
  try {
    const redis = getRedis()
    const projects = (await redis.get<Project[]>(REDIS_KEYS.PROJECTS)) || []

    const newProject = {
      ...project,
      id: nanoid(),
      createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 },
      updatedAt: { seconds: Date.now() / 1000, nanoseconds: 0 },
    }

    await redis.set(REDIS_KEYS.PROJECTS, [...projects, newProject])

    return newProject
  } catch (error) {
    console.error("Error adding project:", error)
    throw error
  }
}

// Update an existing project
export async function updateProject(id: string, projectUpdate: Partial<Project>): Promise<Project> {
  try {
    const redis = getRedis()
    const projects = (await redis.get<Project[]>(REDIS_KEYS.PROJECTS)) || []

    const index = projects.findIndex((p) => p.id === id)
    if (index === -1) {
      throw new Error(`Project with ID ${id} not found`)
    }

    const updatedProject = {
      ...projects[index],
      ...projectUpdate,
      updatedAt: { seconds: Date.now() / 1000, nanoseconds: 0 },
    }

    projects[index] = updatedProject
    await redis.set(REDIS_KEYS.PROJECTS, projects)

    return updatedProject
  } catch (error) {
    console.error("Error updating project:", error)
    throw error
  }
}

// Delete a project
export async function deleteProject(id: string): Promise<boolean> {
  try {
    const redis = getRedis()
    const projects = (await redis.get<Project[]>(REDIS_KEYS.PROJECTS)) || []

    const updatedProjects = projects.filter((p) => p.id !== id)
    await redis.set(REDIS_KEYS.PROJECTS, updatedProjects)

    return true
  } catch (error) {
    console.error("Error deleting project:", error)
    throw error
  }
}
