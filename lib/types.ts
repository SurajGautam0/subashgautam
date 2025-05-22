import type { Timestamp } from "firebase/firestore"

export interface Profile {
  name?: string
  title?: string
  summary?: string
  about?: string
  aboutExtended?: string
  image?: string
  email?: string
  phone?: string
  location?: string
  skillsDescription?: string
  technologies?: string[]
  cvFile?: string
  stats?: {
    projects?: string
    experience?: string
    clients?: string
    awards?: string
  }
  socialLinks?: {
    twitter?: string
    linkedin?: string
    github?: string
    instagram?: string
  }
  projects?: Project[]
  experience?: Experience[]
  education?: Education[]
  testimonials?: Testimonial[]
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface Project {
  id?: string
  title: string
  description?: string
  image?: string
  link?: string
  pdfFile?: string
  technologies?: string[]
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface Experience {
  id?: string
  title: string
  company: string
  period: string
  description: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface Education {
  id?: string
  degree: string
  institution: string
  period: string
  description: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface Testimonial {
  id?: string
  name: string
  position: string
  content: string
  avatar?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface ContactMessage {
  id?: string
  name: string
  email: string
  subject: string
  message: string
  read?: boolean
  createdAt?: Timestamp
}
