"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { createBithCertificate } from "@/utils/adminApi"
import { useRouter } from "next/navigation"
import { ProtectedRoute } from "@/components/protectedRoute"
import { useEffect } from "react"

export default function AdminDashboard(){
    const [name, setName] = useState('');
    const [father, setFather] = useState('');
    const [mother, setMother] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter()

    useEffect
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const resp = await createBithCertificate(name, father, mother, address)
        resp ? setSuccess("Birth Certificate Created") : setSuccess('Failed') 
        } catch (err) {
          setError('Login failed. Please check your credentials.');
        }
      };
      const logout = () => {
        localStorage.removeItem('token');
        router.push('/');
    }

    return(
        <>
        <ProtectedRoute>
        <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Birth Certificate Generator</CardTitle>
          <CardDescription>Enter users credentials to create Birth certificate</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Ilham Harun"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="father">Fahters Name</Label>
                <Input
                  id="father"
                  type="text"
                  value={father}
                  onChange={(e) => setFather(e.target.value)}
                  placeholder="Rohon Saha"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mother">Mothers Name</Label>
                <Input
                  id="mother"
                  type="text"
                  value={mother}
                  onChange={(e) => setMother(e.target.value)}
                  placeholder="Debu Saha"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Badda, Dhaka-1212"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Create Birth Certificate
              </Button>
              {success && <p>{success}</p>}
              {error && <p>{error}</p>}
            </div>
          </form>
        </CardContent>
      </Card>
      <Button className=' bg-red-500' onClick={logout}>
                Logout
            </Button>
            </ProtectedRoute>
        </>
    )
}