'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from '@/context/userContext'
import { ProtectedRoute } from '@/components/protectedRoute';
import Link from 'next/link'
import { Bell } from 'lucide-react';
import { getNotification } from '@/utils/notificationApi';


export default function RegisterDocs() {
    const [error, setError] = useState('');
    const router = useRouter();
    const userInfo = useUser()
    const [notification, setNotification] = useState([])


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
        }
    }, []);
    useEffect(() => {
        fetchNotification()
    },[])

    const fetchNotification = async () =>{
        try {
            const notifications = await getNotification()
            setNotification(notifications) 
        } catch (error) {
            
        }
    }
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
                        <div className="flex flex-col justify-start border-2 p-2 border-gray-300 rounded">
          <div className=' text-sm font-medium'>{userInfo ? `${userInfo.name}` : 'Loading...'}</div>
          <div className=' text-sm font-medium'>{userInfo ? `${userInfo.email}` : 'Loading...'}</div>
        </div>
                    </CardHeader>
                    <CardContent>
                        <Card className=' min-h-[650px] bg-slate-50 flex flex-row'>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-8 w-2/3">
                                <Button onClick={() => router.push('/registerdocs/birthapply')}>Apply for Birth Certificate</Button>
                                <Button onClick={() => router.push('/registerdocs/nidapply')}>Apply for NID</Button>
                                <Button onClick={() => router.push('/registerdocs/deathapply')}>Apply for Death Certificate</Button>
                            </CardContent>
                            <CardContent className=' w-1/3 p-8'>
                            {notification.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={"flex justify-between items-center p-2 rounded-md mb-2 bg-green-100"
                                                }
                                        >
                                            <div>
                                            <Bell className=' mb-2' />
                                                <p className="font-medium">{msg}</p>
                                            </div>

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