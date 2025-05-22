import { connectToMongoDB, COLLECTIONS } from "@/lib/mongodb"

/**
 * Initialize MongoDB database with required collections
 */
export async function initializeDatabase() {
  try {
    console.log("Initializing MongoDB database...")
    const client = await connectToMongoDB()

    if (!client) {
      console.error("Failed to connect to MongoDB")
      return false
    }

    const db = client.db(process.env.MONGODB_DB || "surajgautam")

    // Get existing collections
    const existingCollections = await db.listCollections().toArray()
    const existingCollectionNames = existingCollections.map((c) => c.name)

    // Create collections if they don't exist
    for (const [key, collectionName] of Object.entries(COLLECTIONS)) {
      if (!existingCollectionNames.includes(collectionName)) {
        console.log(`Creating collection: ${collectionName}`)
        await db.createCollection(collectionName)
      }
    }

    console.log("MongoDB database initialization complete")
    return true
  } catch (error) {
    console.error("Error initializing MongoDB database:", error)
    return false
  }
}
