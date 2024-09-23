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
                        <div className="flex flex-col justify-start border-2 p-2 border-gray-300 rounded">
          <div className=' text-sm font-medium'>{userInfo ? `${userInfo.name}` : 'Loading...'}</div>
          <div className=' text-sm font-medium'>{userInfo ? `${userInfo.email}` : 'Loading...'}</div>
        </div>
                    </CardHeader>
                    <Card className=' min-h-[650px] bg-slate-50'>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-6">
                        <Button className=' h-12' onClick={() => router.push('paybill/electricity')}>Electricity</Button>
                        <Button className=' h-12' onClick={() => router.push('paybill/gas')}>Gas</Button>
                        <Button className=' h-12' onClick={() => router.push('paybill/water')}>Water</Button>
                    </CardContent>
                </Card>
                    <Button className=' bg-red-500 mt-4' onClick={logout}>
                        Logout
                    </Button>
                </Card>
            </ProtectedRoute>
        </>
    )
}