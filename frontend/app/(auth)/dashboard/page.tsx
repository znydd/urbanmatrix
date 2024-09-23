'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from '@/context/userContext'
import { ProtectedRoute } from '@/components/protectedRoute'; 
import { Building2, AlertCircle, Bus, FileText, LogOut, MessageSquare, Receipt } from "lucide-react"


export default function Dashboard() {
    const [error, setError] = useState('');
    const router = useRouter();
    const userInfo = useUser() 

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
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
        }
    }, []);
    return (
        <>
        <ProtectedRoute>
        <Card className="w-full min-h-screen mx-auto px-10">
        <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 sm:items-center sm:space-y-0">
      <CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
      <div className="flex items-center gap-4">
        <div className="flex flex-col justify-start border-2 p-2 border-gray-300 rounded">
          <div className=' text-sm font-medium'>{userInfo ? `${userInfo.name}` : 'Loading...'}</div>
          <div className=' text-sm font-medium'>{userInfo ? `${userInfo.email}` : 'Loading...'}</div>
        </div>
        <Button className=' bg-red-500' onClick={logout}>
        <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
      </div>
    </CardHeader>
    <main className="p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Raise Issues</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">Report problems or submit inquiries</p>
              <Button className=' h-8' onClick={() => router.push('/raiseissue')}>Click Here to Raise Issues</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Get Documents</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">Access and download official documents</p>
                <Button className=' h-8' onClick={() => router.push('/getdocs')}>Click Here to Get Documents</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Apply for Documents</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">Submit applications for new documents</p>
                <Button className=' h-8' onClick={() => router.push('/registerdocs')}>Click Here Apply for Documents</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pay Bills</CardTitle>
                <Receipt className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">Manage and pay your outstanding bills</p>
                <Button className=' h-8' onClick={() => router.push('/paybill')}>Click Here Pay Bills</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Public Transport Route</CardTitle>
                <Bus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">View and plan public transportation routes</p>
                <Button className=' h-8' onClick={() => router.push('/transportroute')}>Click Here for Transport Route</Button>
              </CardContent>
            </Card>
          </div>
        </main>
        </Card>
        </ProtectedRoute>
        </>
    )
}