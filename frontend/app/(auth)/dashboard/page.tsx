'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from '@/context/userContext'
import { ProtectedRoute } from '@/components/protectedRoute'; 


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

    return (
        <>
        <ProtectedRoute>
        <Card className="w-full min-h-screen mx-auto px-10">
            <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 sm:items-center sm:space-y-0">
            <CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
            <div className='flex space-x-2'>
                <Button variant="outline">{userInfo ? `${userInfo.name}` : 'Loading...'}</Button>
                <Button variant="outline">{userInfo ? `${userInfo.email}` : 'Loading...'}</Button>
            </div>
            </CardHeader>
            <CardContent>
                <Card className=' min-h-[650px] bg-slate-50'>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-6">
                        <Button className=' h-12' onClick={() => router.push('/raiseissue')}>Raise Issues</Button>
                        <Button className=' h-12' onClick={() => router.push('/getdocs')}>Get Documents</Button>
                        <Button className=' h-12' onClick={() => router.push('/registerdocs')}>Apply for Documents</Button>
                        <Button className=' h-12' onClick={() => router.push('/paybill')}>Pay Bills</Button>
                        <Button className=' h-12' onClick={() => router.push('/transportroute')}>Public Transport Route</Button>
                    </CardContent>
                </Card>
            </CardContent>
            <CardFooter>
            <Button className=' bg-red-500' onClick={logout}>
                Logout
            </Button>
            </CardFooter>
        </Card>
        </ProtectedRoute>
        </>
    )
}