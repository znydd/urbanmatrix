'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from '@/context/userContext'
import { ProtectedRoute } from '@/components/protectedRoute';
import Link from 'next/link'

export default function GetDocs() {
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
                        <CardTitle className="text-2xl font-bold"><Link href={"/dashboard"} className=' text-teal-500'>Dashboard</Link> / <Link href={"/getdocs"}>Get Documents</Link></CardTitle>
                        <div className='flex space-x-2'>
                            <Button variant="outline">{userInfo ? `${userInfo.name}` : 'Loading...'}</Button>
                            <Button variant="outline">{userInfo ? `${userInfo.email}` : 'Loading...'}</Button>
                        </div>
                    </CardHeader>
                     <Card className='min-h-[650px] w-full flex flex-row p-4 gap-2'>
                        <Card className=' bg-slate-50 w-1/2 p-10'>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-2">
                                        <div className="flex space-x-4 mb-8">
                                            <Button onClick={() => router.push("/getdocs/birthsearch")}>Birth Certificate</Button>
                                            <Button onClick={() => router.push("/getdocs/deathsearch")}>Death Certificate</Button>
                                        </div>
                                        <Button className=' my-4'>Download NID</Button>
                                        <p className="text-sm text-red-500 mt-4">*You can only get your NID not others</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className=' w-1/2'>
                            <CardHeader>
                                <CardTitle className="text-lg">Saved Docs</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {[
                                    { name: "Rohan Saha", type: "Birth Certificate" },
                                    { name: "Harun Ilham", type: "Birth Certificate" },
                                    { name: "Abu Mia", type: "Death Certificate" },
                                    { name: "Sohel Rana", type: "Birth Certificate" },
                                ].map((doc, index) => (
                                    <div
                                        key={index}
                                        className={`flex justify-between items-center p-2 rounded-md ${doc.type === "Death Certificate" ? "bg-yellow-100" : "bg-green-100"
                                            }`}
                                    >
                                        <div>
                                            <p className="font-medium">{doc.type}</p>
                                            <p className="text-sm text-gray-600">{doc.name}</p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Download
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </Card>
                    
                    <Button className=' bg-red-500 mt-4' onClick={logout}>
                        Logout
                    </Button>
                </Card>
            </ProtectedRoute>
        </>
    )
}