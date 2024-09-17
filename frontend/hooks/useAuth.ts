// hooks/useAuth.ts
import { useState, useEffect } from 'react'
import { isTokenValid } from '@/utils/removeJwt'
const SELF_URL = process.env.NEXT_PUBLIC_SELF_URL;

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const tokenValidation = async () =>{
    try {
      const respTokenValid = await isTokenValid()
      console.log(respTokenValid)
      if(respTokenValid === 401){
        localStorage.removeItem('token');
        window.location.href = `${SELF_URL}/login`
      }
    } catch (error) {
      console.error
    }
  }
  tokenValidation()

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