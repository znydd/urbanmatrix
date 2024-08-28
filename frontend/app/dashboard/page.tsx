'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Dashboard() {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            fetchData(token);
        }
    }, []);

    const fetchData = async (token: string) => {
        try {
            const response = await axios.get(`${API_URL}/user`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData(response.data);
        } catch (err) {
            setError('Failed to fetch data. Please log in again.');
            localStorage.removeItem('token');
            router.push('/login');
        }
    };
    console.log(data)

    const logout = () => {
        localStorage.removeItem('token');
        router.push('/');
        
    }

    return (
        <>
        <Card className="w-full min-h-screen mx-auto">
            <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                    <Button variant="outline">NID XXXXXXXXXX</Button>
                    <Button variant="outline">Birth Certificate XXXXXXXXXX</Button>
                </div>
                <Button variant="outline">Name @user_name</Button>
            </CardHeader>
            <CardContent>
                <Card className=' min-h-[650px] bg-slate-50'>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-6">
                        <Button>Raise Issues</Button>
                        <Button>Apply for Documents</Button>
                        <Button>Get Documents</Button>
                        <Button>Pay Bills</Button>
                        <Button>Tourist Places</Button>
                        <Button>Public Transport Route</Button>
                        <Button>Find Funeral Places</Button>
                        <Button>E-tender</Button>
                    </CardContent>
                </Card>
            </CardContent>
            <CardFooter>
            <Button className=' bg-red-500' onClick={logout}>
                Logout
            </Button>
            </CardFooter>
        </Card>

        </>
    )
}