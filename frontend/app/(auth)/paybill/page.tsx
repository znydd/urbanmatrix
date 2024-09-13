'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from '@/context/userContext'
import { ProtectedRoute } from '@/components/protectedRoute';
import Link from 'next/link'


export default function PayBill() {
    const [error, setError] = useState('');
    const router = useRouter();
    const userInfo = useUser()
    const logout = () => {
        localStorage.removeItem('token');
        router.push('/');
    }

    return (
        <>
            <ProtectedRoute>
                <Card className="w-full min-h-screen mx-auto px-10">
                    <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 sm:items-center sm:space-y-0">
                        <CardTitle className="text-2xl font-bold">
                            <Link href={"/dashboard"} className=' text-teal-500'>Dashboard</Link> / <Link href={"/getdocs"}>Pay Bill</Link>
                        </CardTitle>
                        <div className='flex space-x-2'>
                            <Button variant="outline">{userInfo ? `${userInfo.name}` : 'Loading...'}</Button>
                            <Button variant="outline">{userInfo ? `${userInfo.email}` : 'Loading...'}</Button>
                        </div>
                    </CardHeader>
                        
                    <Button className=' bg-red-500 mt-4' onClick={logout}>
                        Logout
                    </Button>
                </Card>
            </ProtectedRoute>
        </>
    )
}