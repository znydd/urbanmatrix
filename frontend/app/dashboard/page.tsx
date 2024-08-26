'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';

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
        router.push('/login');
    }

    return (
        <>
            dashboard
            <Button onClick={logout}>
                Logout
            </Button>

        </>
    )
}