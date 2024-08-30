// hooks/useAuth.ts
import { useState, useEffect } from 'react'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      console.log(token)
      setIsAuthenticated(!!token)
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  return { isAuthenticated, isLoading }
}