'use client'

// components/ProtectedRoute.tsx
import { useRouter } from 'next/navigation'
import { useAuth } from "../hooks/useAuth"
import { useEffect } from 'react'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading &&!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return <div>Loading...</div> // or a proper loading spinner component
  }
  
  if (!isAuthenticated) {
    return null // or a loading spinner
  }


  return <>{children}</>
}