"use server"

import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore"
import { db, isUsingDummyImplementation } from "./firebase"
import type { Profile, Project, Experience, Education, Testimonial } from "./types"

const COLLECTIONS = {
  PROFILES: "profiles",
  PROJECTS: "projects",
  EXPERIENCES: "experiences",
  EDUCATION: "education",
  TESTIMONIALS: "testimonials",
}

const DEFAULT_PROFILE_ID = "default"

// Save project data to Firestore
export async function saveProjectToFirestore(project: Project): Promise<void> {
  try {
    if (isUsingDummyImplementation()) {
      console.log("Using dummy implementation for saveProjectToFirestore", project)
      return
    }

    const projectRef = doc(db, COLLECTIONS.PROJECTS, project.id || "new")

    if (project.id) {
      await updateDoc(projectRef, {
        ...project,
        updatedAt: serverTimestamp(),
      })
    } else {
      await setDoc(projectRef, {
        ...project,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    }
  } catch (error) {
    console.error("Error saving project to Firestore:", error)
    throw error
  }
}

// Delete project data from Firestore
export async function deleteProjectFromFirestore(projectId: string): Promise<void> {
  try {
    if (isUsingDummyImplementation()) {
      console.log("Using dummy implementation for deleteProjectFromFirestore", projectId)
      return
    }

    const projectRef = doc(db, COLLECTIONS.PROJECTS, projectId)
    await deleteDoc(projectRef)
  } catch (error) {
    console.error("Error deleting project from Firestore:", error)
    throw error
  }
}

// Save experience data to Firestore
export async function saveExperienceToFirestore(experience: Experience): Promise<void> {
  try {
    if (isUsingDummyImplementation()) {
      console.log("Using dummy implementation for saveExperienceToFirestore", experience)
      return
    }

    const experienceRef = doc(db, COLLECTIONS.EXPERIENCES, experience.id || "new")

    if (experience.id) {
      await updateDoc(experienceRef, {
        ...experience,
        updatedAt: serverTimestamp(),
      })
    } else {
      await setDoc(experienceRef, {
        ...experience,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    }
  } catch (error) {
    console.error("Error saving experience to Firestore:", error)
    throw error
  }
}

// Delete experience data from Firestore
export async function deleteExperienceFromFirestore(experienceId: string): Promise<void> {
  try {
    if (isUsingDummyImplementation()) {
      console.log("Using dummy implementation for deleteExperienceFromFirestore", experienceId)
      return
    }

    const experienceRef = doc(db, COLLECTIONS.EXPERIENCES, experienceId)
    await deleteDoc(experienceRef)
  } catch (error) {
    console.error("Error deleting experience from Firestore:", error)
    throw error
  }
}

// Save education data to Firestore
export async function saveEducationToFirestore(education: Education): Promise<void> {
  try {
    if (isUsingDummyImplementation()) {
      console.log("Using dummy implementation for saveEducationToFirestore", education)
      return
    }

    const educationRef = doc(db, COLLECTIONS.EDUCATION, education.id || "new")

    if (education.id) {
      await updateDoc(educationRef, {
        ...education,
        updatedAt: serverTimestamp(),
      })
    } else {
      await setDoc(educationRef, {
        ...education,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    }
  } catch (error) {
    console.error("Error saving education to Firestore:", error)
    throw error
  }
}

// Delete education data from Firestore
export async function deleteEducationFromFirestore(educationId: string): Promise<void> {
  try {
    if (isUsingDummyImplementation()) {
      console.log("Using dummy implementation for deleteEducationFromFirestore", educationId)
      return
    }

    const educationRef = doc(db, COLLECTIONS.EDUCATION, educationId)
    await deleteDoc(educationRef)
  } catch (error) {
    console.error("Error deleting education from Firestore:", error)
    throw error
  }
}

// Save testimonial data to Firestore
export async function saveTestimonialToFirestore(testimonial: Testimonial): Promise<void> {
  try {
    if (isUsingDummyImplementation()) {
      console.log("Using dummy implementation for saveTestimonialToFirestore", testimonial)
      return
    }

    const testimonialRef = doc(db, COLLECTIONS.TESTIMONIALS, testimonial.id || "new")

    if (testimonial.id) {
      await updateDoc(testimonialRef, {
        ...testimonial,
        updatedAt: serverTimestamp(),
      })
    } else {
      await setDoc(testimonialRef, {
        ...testimonial,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    }
  } catch (error) {
    console.error("Error saving testimonial to Firestore:", error)
    throw error
  }
}

// Delete testimonial data from Firestore
export async function deleteTestimonialFromFirestore(testimonialId: string): Promise<void> {
  try {
    if (isUsingDummyImplementation()) {
      console.log("Using dummy implementation for deleteTestimonialFromFirestore", testimonialId)
      return
    }

    const testimonialRef = doc(db, COLLECTIONS.TESTIMONIALS, testimonialId)
    await deleteDoc(testimonialRef)
  } catch (error) {
    console.error("Error deleting testimonial from Firestore:", error)
    throw error
  }
}

export async function migrateDataToFirestore(profile: any): Promise<void> {
  try {
    if (isUsingDummyImplementation()) {
      console.log("Using dummy implementation for migrateDataToFirestore", profile)
      return
    }

    const profileRef = doc(db, COLLECTIONS.PROFILES, DEFAULT_PROFILE_ID)
    await setDoc(profileRef, {
      ...profile,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error migrating data to Firestore:", error)
    throw error
  }
}

// Get profile data from Firestore
export async function getProfileFromFirestore(): Promise<Profile> {
  try {
    // If we're using the dummy implementation, return a default profile immediately
    if (isUsingDummyImplementation()) {
      console.log("Using dummy implementation for getProfileFromFirestore")
      return {
        name: "Veshraj Gautam",
        title: "Creative Developer",
        summary: "Passionate about creating innovative digital experiences with cutting-edge technologies.",
        image: "/placeholder.svg?height=600&width=600",
        projects: [],
        experience: [],
        education: [],
        testimonials: [],
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
      } as Profile
    }

    const profileRef = doc(db, COLLECTIONS.PROFILES, DEFAULT_PROFILE_ID)

    // Wrap this in a try-catch to handle offline errors
    let profileSnap
    try {
      profileSnap = await getDoc(profileRef)
    } catch (error) {
      console.error("Error fetching document from Firestore:", error)
      // Return a minimal profile that will trigger fallback to default
      throw new Error(`Failed to get document because the client is offline`)
    }

    if (profileSnap && profileSnap.exists()) {
      return profileSnap.data() as Profile
    } else {
      // Create default profile if it doesn't exist
      const defaultProfile: Profile = {
        name: "Veshraj Gautam",
        title: "Creative Developer",
        summary: "Passionate about creating innovative digital experiences with cutting-edge technologies.",
        image: "/placeholder.svg?height=600&width=600",
        projects: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      // Try to save default profile to Firestore
      try {
        await setDoc(profileRef, defaultProfile)
      } catch (error) {
        console.error("Error saving default profile to Firestore:", error)
        // Continue and return the default profile anyway
      }

      return defaultProfile
    }
  } catch (error) {
    console.error("Error getting profile from Firestore:", error)
    // Return an empty object to trigger fallback
    throw error
  }
}

// Save profile data to Firestore
export async function saveProfileToFirestore(profile: Partial<Profile>): Promise<void> {
  try {
    // If we're using the dummy implementation, just log and return
    if (isUsingDummyImplementation()) {
      console.log("Using dummy implementation for saveProfileToFirestore", profile)
      return
    }

    const profileRef = doc(db, COLLECTIONS.PROFILES, DEFAULT_PROFILE_ID)

    let profileSnap
    try {
      profileSnap = await getDoc(profileRef)
    } catch (error) {
      console.error("Error fetching document for update:", error)
      throw new Error("Failed to get document for update because the client is offline")
    }

    try {
      if (profileSnap && profileSnap.exists()) {
        // Update existing profile
        await updateDoc(profileRef, {
          ...profile,
          updatedAt: serverTimestamp(),
        })
      } else {
        // Create new profile
        await setDoc(profileRef, {
          ...profile,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
      }
    } catch (error) {
      console.error("Error updating/creating profile:", error)
      throw new Error("Failed to update/create profile because the client is offline")
    }
  } catch (error) {
    console.error("Error saving profile to Firestore:", error)
    throw error
  }
}

// Get all projects from Firestore
export async function getProjectsFromFirestore(): Promise<Project[]> {
  try {
    // If we're using the dummy implementation, return dummy projects
    if (isUsingDummyImplementation()) {
      console.log("Using dummy implementation for getProjectsFromFirestore")
      return [
        {
          id: "dummy-1",
          title: "Portfolio Website",
          description: "A personal portfolio website built with Next.js and Tailwind CSS.",
          technologies: ["Next.js", "React", "Tailwind CSS"],
          link: "#",
        },
        {
          id: "dummy-2",
          title: "E-commerce Platform",
          description: "A full-featured e-commerce platform with product management and checkout.",
          technologies: ["React", "Node.js", "MongoDB"],
          link: "#",
        },
        {
          id: "dummy-3",
          title: "Task Management App",
          description: "A productivity app for managing tasks and projects.",
          technologies: ["React", "Firebase", "Material UI"],
          link: "#",
        },
      ]
    }

    const projectsRef = collection(db, COLLECTIONS.PROJECTS)
    const projectsQuery = query(projectsRef, orderBy("createdAt", "desc"))

    let projectsSnap
    try {
      projectsSnap = await getDocs(projectsQuery)
    } catch (error) {
      console.error("Error fetching projects from Firestore:", error)
      return []
    }

    const projects: Project[] = []
    if (projectsSnap) {
      projectsSnap.forEach((doc) => {
        const project = doc.data() as Project
        project.id = doc.id // Add document ID to project
        projects.push(project)
      })
    }

    return projects
  } catch (error) {
    console.error("Error getting projects from Firestore:", error)
    return []
  }
}

// Get all experiences from Firestore
export async function getExperiencesFromFirestore(): Promise<Experience[]> {
  try {
    // If we're using the dummy implementation, return dummy experiences
    if (isUsingDummyImplementation()) {
      console.log("Using dummy implementation for getExperiencesFromFirestore")
      return [
        {
          id: "dummy-1",
          title: "Senior Frontend Developer",
          company: "Tech Innovators",
          period: "2021 - Present",
          description: "Leading the frontend development team, implementing new features, and optimizing performance.",
        },
        {
          id: "dummy-2",
          title: "Web Developer",
          company: "Digital Solutions",
          period: "2018 - 2021",
          description:
            "Developed responsive websites and web applications for various clients across different industries.",
        },
        {
          id: "dummy-3",
          title: "Junior Developer",
          company: "StartUp Hub",
          period: "2016 - 2018",
          description:
            "Assisted in the development of web applications and gained experience in modern web technologies.",
        },
      ]
    }

    const experiencesRef = collection(db, COLLECTIONS.EXPERIENCES)
    const experiencesQuery = query(experiencesRef, orderBy("createdAt", "desc"))

    let experiencesSnap
    try {
      experiencesSnap = await getDocs(experiencesQuery)
    } catch (error) {
      console.error("Error fetching experiences from Firestore:", error)
      return []
    }

    const experiences: Experience[] = []
    if (experiencesSnap) {
      experiencesSnap.forEach((doc) => {
        const experience = doc.data() as Experience
        experience.id = doc.id
        experiences.push(experience)
      })
    }

    return experiences
  } catch (error) {
    console.error("Error getting experiences from Firestore:", error)
    return []
  }
}

// Get all education entries from Firestore
export async function getEducationFromFirestore(): Promise<Education[]> {
  try {
    // If we're using the dummy implementation, return dummy education
    if (isUsingDummyImplementation()) {
      console.log("Using dummy implementation for getEducationFromFirestore")
      return [
        {
          id: "dummy-1",
          degree: "Master's in Computer Science",
          institution: "Tech University",
          period: "2014 - 2016",
          description:
            "Specialized in web technologies and software engineering with a focus on modern application development.",
        },
        {
          id: "dummy-2",
          degree: "Bachelor's in Computer Science",
          institution: "National College",
          period: "2010 - 2014",
          description: "Studied fundamental computer science concepts, algorithms, and programming languages.",
        },
        {
          id: "dummy-3",
          degree: "High School Diploma",
          institution: "Central High School",
          period: "2008 - 2010",
          description: "Focused on science and mathematics with an introduction to computer programming.",
        },
      ]
    }

    const educationRef = collection(db, COLLECTIONS.EDUCATION)
    const educationQuery = query(educationRef, orderBy("createdAt", "desc"))

    let educationSnap
    try {
      educationSnap = await getDocs(educationQuery)
    } catch (error) {
      console.error("Error fetching education from Firestore:", error)
      return []
    }

    const educationEntries: Education[] = []
    if (educationSnap) {
      educationSnap.forEach((doc) => {
        const education = doc.data() as Education
        education.id = doc.id
        educationEntries.push(education)
      })
    }

    return educationEntries
  } catch (error) {
    console.error("Error getting education from Firestore:", error)
    return []
  }
}

// Get all testimonials from Firestore
export async function getTestimonialsFromFirestore(): Promise<Testimonial[]> {
  try {
    // If we're using the dummy implementation, return dummy testimonials
    if (isUsingDummyImplementation()) {
      console.log("Using dummy implementation for getTestimonialsFromFirestore")
      return [
        {
          id: "dummy-1",
          name: "Sarah Johnson",
          position: "CEO, TechStart",
          content:
            "Working with Veshraj was an absolute pleasure. He delivered our project on time and exceeded our expectations with the quality of his work.",
          avatar: "/placeholder.svg?height=100&width=100",
        },
        {
          id: "dummy-2",
          name: "Michael Chen",
          position: "Product Manager, InnovateCorp",
          content:
            "Veshraj's attention to detail and problem-solving skills are exceptional. He quickly understood our requirements and delivered a solution that perfectly matched our vision.",
          avatar: "/placeholder.svg?height=100&width=100",
        },
        {
          id: "dummy-3",
          name: "Emily Rodriguez",
          position: "Marketing Director, GrowthLabs",
          content:
            "I was impressed by Veshraj's professionalism and technical expertise. He was responsive to feedback and made the development process smooth and stress-free.",
          avatar: "/placeholder.svg?height=100&width=100",
        },
      ]
    }

    const testimonialsRef = collection(db, COLLECTIONS.TESTIMONIALS)
    const testimonialsQuery = query(testimonialsRef, orderBy("createdAt", "desc"))

    let testimonialsSnap
    try {
      testimonialsSnap = await getDocs(testimonialsQuery)
    } catch (error) {
      console.error("Error fetching testimonials from Firestore:", error)
      return []
    }

    const testimonials: Testimonial[] = []
    if (testimonialsSnap) {
      testimonialsSnap.forEach((doc) => {
        const testimonial = doc.data() as Testimonial
        testimonial.id = doc.id
        testimonials.push(testimonial)
      })
    }

    return testimonials
  } catch (error) {
    console.error("Error getting testimonials from Firestore:", error)
    return []
  }
}

export interface ContactMessage {
  id?: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: { seconds: number; nanoseconds: number }
}

// Get all contact messages from Firestore
export async function getContactMessagesFromFirestore(): Promise<ContactMessage[]> {
  try {
    // If we're using the dummy implementation, return dummy messages
    if (isUsingDummyImplementation()) {
      console.log("Using dummy implementation for getContactMessagesFromFirestore")
      return [
        {
          id: "dummy-1",
          name: "John Doe",
          email: "john@example.com",
          subject: "Project Inquiry",
          message: "I'm interested in working with you on a new project. Please contact me when you have a chance.",
          read: false,
          createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 },
        },
        {
          id: "dummy-2",
          name: "Jane Smith",
          email: "jane@example.com",
          subject: "Collaboration Opportunity",
          message:
            "I'd like to discuss a potential collaboration on an upcoming project. Looking forward to hearing from you!",
          read: true,
          createdAt: { seconds: (Date.now() - 86400000) / 1000, nanoseconds: 0 },
        },
      ]
    }

    const messagesRef = collection(db, "messages")
    const messagesQuery = query(messagesRef, orderBy("createdAt", "desc"))
    const messagesSnap = await getDocs(messagesQuery)

    const messages: ContactMessage[] = []
    messagesSnap.forEach((doc) => {
      const message = doc.data() as ContactMessage
      message.id = doc.id
      messages.push(message)
    })

    return messages
  } catch (error) {
    console.error("Error getting contact messages from Firestore:", error)
    throw error
  }
}

export { getContactMessagesFromFirestore as getContactMessages }
