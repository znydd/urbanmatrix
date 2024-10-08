'use client'

// components/ProtectedRoute.tsx
import { useRouter } from 'next/navigation'
import { useAuth } from "../hooks/useAuth"
import { useEffect } from 'react'
import { Progress } from "@/components/ui/progress"



export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading &&!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return <div className=' flex flex-row min-h-screen justify-center items-center '><Progress value={33} /></div>
  }
  
  if (!isAuthenticated) {
    return null // or a loading spinner
  }


  return <>{children}</>
}