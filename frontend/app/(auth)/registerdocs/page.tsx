'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from '@/context/userContext'
import { ProtectedRoute } from '@/components/protectedRoute';
import Link from 'next/link'


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
    const docs = [{name:"birth certificate", status:"accepted"},{name:"NID", status:"declined"}]

    return (
        <>
            <ProtectedRoute>
                <Card className="w-full min-h-screen mx-auto">
                <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 sm:items-center sm:space-y-0">
                        <CardTitle className="text-2xl font-bold"><Link href={"/dashboard"} className=' text-teal-500'>Dashboard</Link> / <Link href={"/registerdocs"}>Apply for Documents</Link></CardTitle>
                        <div className='flex space-x-2'>
                            <Button variant="outline">{userInfo ? `${userInfo.name}` : 'Loading...'}</Button>
                            <Button variant="outline">{userInfo ? `${userInfo.email}` : 'Loading...'}</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Card className=' min-h-[650px] bg-slate-50 flex flex-row'>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-8 w-1/2">
                                <Button onClick={() => router.push('/registerdocs/birthapply')}>Apply for Birth Certificate</Button>
                                <Button onClick={() => router.push('/registerdocs/nidapply')}>Apply for NID</Button>
                                <Button onClick={() => router.push('/registerdocs/deathapply')}>Apply for Death Certificate</Button>
                            </CardContent>
                            <CardContent className=' w-1/2 p-8'>
                            {docs.map((doc, index) => (
                                        <div
                                            key={index}
                                            className={`flex justify-between items-center p-2 rounded-md mb-2 ${doc.status === "declined" ? "bg-yellow-100" : "bg-green-100"
                                                }`}
                                        >
                                            <div>
                                                <p className="font-medium">{doc.status}</p>
                                                <p className="text-sm text-gray-600">{doc.name}</p>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                Download
                                            </Button>
                                        </div>
                                    ))}
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