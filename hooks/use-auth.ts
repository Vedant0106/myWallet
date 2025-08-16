"use client"

import { useState, useEffect } from "react"
import type { User } from "@/types/wallet"
import { storage } from "@/lib/storage"

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const storedUser = storage.getUser()
    setUser(storedUser)
    setIsLoading(false)
  }, [])

  if (!isMounted) {
    return {
      user: null,
      isLoading: true,
      login: () => Promise.resolve(false),
      logout: () => {},
      isAuthenticated: false,
    }
  }

  const login = (mobile: string, otp: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // Dummy verification - accept OTP 1234
      if (otp === "1234") {
        const newUser: User = {
          id: Date.now().toString(),
          mobile,
          isVerified: true,
          createdAt: new Date().toISOString(),
        }
        storage.setUser(newUser)
        setUser(newUser)
        resolve(true)
      } else {
        resolve(false)
      }
    })
  }

  const logout = () => {
    storage.clearUser()
    setUser(null)
  }

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user?.isVerified,
  }
}
