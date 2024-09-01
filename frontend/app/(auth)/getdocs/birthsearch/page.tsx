"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from '@/context/userContext'
import { ProtectedRoute } from '@/components/protectedRoute';
import Link from 'next/link'


export default function BirthSearch() {
  const userInfo = useUser()
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    }
  }, []);

  console.log(userInfo)
  const logout = () => {
    localStorage.removeItem('token');
    router.push('/');
  }

  return (<>
    <ProtectedRoute>
      <Card className="w-full min-h-screen mx-auto px-10">
        <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 sm:items-center sm:space-y-0">
          <CardTitle className="text-2xl font-bold"><Link href={"/dashboard"} className=' text-teal-500'>Dashboard</Link> / <Link href={"/getdocs"}>Get Documents/ Death Certificate</Link></CardTitle>
          <div className='flex space-x-2'>
            <Button variant="outline">{userInfo ? `${userInfo.name}` : 'Loading...'}</Button>
            <Button variant="outline">{userInfo ? `${userInfo.email}` : 'Loading...'}</Button>
          </div>
        </CardHeader>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="XXXX-XXXX-XXXX" className="pl-8" />
              </div>
              <Button>Search</Button>
            </div>
            <Card className="bg-green-100">
              <CardContent className="p-2 flex items-center justify-between">
                <div>
                  <p className="font-medium">Birth Certificate</p>
                  <p className="text-sm text-gray-600">Rohon Saha</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Add
                  </Button>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
        <Button className=' bg-red-500 mt-4' onClick={logout}>
          Logout
        </Button>
      </Card>
    </ProtectedRoute>
  </>)
}