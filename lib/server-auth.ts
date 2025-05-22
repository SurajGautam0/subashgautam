import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export function getServerAuthSession() {
  const cookieStore = cookies()
  const authCookie = cookieStore.get("portfolio-auth-token")

  if (!authCookie) {
    return null
  }

  return {
    user: {
      name: "Admin",
      role: "admin",
    },
  }
}

export function requireAuth() {
  const session = getServerAuthSession()

  if (!session) {
    redirect("/signin")
  }

  return session
}
