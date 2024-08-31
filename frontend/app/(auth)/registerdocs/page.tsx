'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useUser } from '@/context/userContext'
import { ProtectedRoute } from '@/components/protectedRoute'; 

export default function RegisterDocs() {
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
        <Card className="w-full min-h-screen mx-auto">
            <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                    <Button variant="outline">{userInfo ? `${!userInfo.nid ? 'XXXX-XXXX' : userInfo.nid}` : 'Loading...'}</Button>
                    <Button variant="outline">{userInfo ? `${!userInfo.birth_cert ? 'XXXX-XXXX' : userInfo.birth_cert}` : 'Loading...'}</Button>
                </div>
                <Button variant="outline">{userInfo ? `${userInfo.name}` : 'Loading...'}</Button>
            </CardHeader>
            <CardContent>
                <Card className=' min-h-[650px] bg-slate-50'>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-6">
                        <Button>Birth Certificate</Button>
                        <Button>NID</Button>
                        <Button >Death Certificate</Button>
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