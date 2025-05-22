"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface AuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = document.cookie.includes("next-auth.session-token")
      setIsAuthenticated(token)
    }

    checkAuth()
  }, [])

  const login = async (username: string, password: string) => {
    // Simple authentication for demo purposes
    if (username === "admin" && password === "password") {
      // Set a cookie to simulate authentication
      document.cookie = "next-auth.session-token=demo-token; path=/; max-age=86400"
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    // Remove the auth cookie
    document.cookie = "next-auth.session-token=; path=/; max-age=0"
    setIsAuthenticated(false)
    router.push("/signin")
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
