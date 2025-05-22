"use server"

import { db as firestoreDb } from "./firebase"
import { collection, getDocs } from "firebase/firestore"
import { connectToMongoDB, COLLECTIONS, addTimestamps } from "./mongodb"
import { getProfile } from "./profile"

export async function migrateFirestoreToMongoDB() {
  try {
    console.log("Starting migration from Firestore to MongoDB...")

    // Connect to MongoDB
    const client = await connectToMongoDB()
    if (!client) {
      throw new Error("Failed to connect to MongoDB")
    }

    const mongoDb = client.db(process.env.MONGODB_DB)

    // Get profile data
    console.log("Migrating profile data...")
    const profile = await getProfile()

    // Save profile to MongoDB
    await mongoDb
      .collection(COLLECTIONS.PROFILES)
      .updateOne({ _id: "default" }, { $set: addTimestamps(profile) }, { upsert: true })

    // Migrate projects
    console.log("Migrating projects...")
    const projectsCollection = collection(firestoreDb, "projects")
    const projectsSnapshot = await getDocs(projectsCollection)

    for (const doc of projectsSnapshot.docs) {
      const project = doc.data()
      await mongoDb
        .collection(COLLECTIONS.PROJECTS)
        .updateOne({ _id: doc.id }, { $set: addTimestamps(project) }, { upsert: true })
    }

    // Migrate experiences
    console.log("Migrating experiences...")
    const experiencesCollection = collection(firestoreDb, "experiences")
    const experiencesSnapshot = await getDocs(experiencesCollection)

    for (const doc of experiencesSnapshot.docs) {
      const experience = doc.data()
      await mongoDb
        .collection(COLLECTIONS.EXPERIENCES)
        .updateOne({ _id: doc.id }, { $set: addTimestamps(experience) }, { upsert: true })
    }

    // Migrate education
    console.log("Migrating education...")
    const educationCollection = collection(firestoreDb, "education")
    const educationSnapshot = await getDocs(educationCollection)

    for (const doc of educationSnapshot.docs) {
      const education = doc.data()
      await mongoDb
        .collection(COLLECTIONS.EDUCATION)
        .updateOne({ _id: doc.id }, { $set: addTimestamps(education) }, { upsert: true })
    }

    // Migrate testimonials
    console.log("Migrating testimonials...")
    const testimonialsCollection = collection(firestoreDb, "testimonials")
    const testimonialsSnapshot = await getDocs(testimonialsCollection)

    for (const doc of testimonialsSnapshot.docs) {
      const testimonial = doc.data()
      await mongoDb
        .collection(COLLECTIONS.TESTIMONIALS)
        .updateOne({ _id: doc.id }, { $set: addTimestamps(testimonial) }, { upsert: true })
    }

    // Migrate messages
    console.log("Migrating messages...")
    const messagesCollection = collection(firestoreDb, "messages")
    const messagesSnapshot = await getDocs(messagesCollection)

    for (const doc of messagesSnapshot.docs) {
      const message = doc.data()
      await mongoDb
        .collection(COLLECTIONS.MESSAGES)
        .updateOne({ _id: doc.id }, { $set: addTimestamps(message) }, { upsert: true })
    }

    console.log("Migration completed successfully!")
    return { success: true, message: "Migration completed successfully!" }
  } catch (error) {
    console.error("Error during migration:", error)
    return {
      success: false,
      message: `Migration failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}
