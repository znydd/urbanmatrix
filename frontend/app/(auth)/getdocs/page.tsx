'use client'

import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from "@/components/protectedRoute";
import { useUser } from '@/context/userContext'

export default function GetDocs(){
    const userInfo = useUser() 
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
        }
    }, []);

    return(
        <>
        <ProtectedRoute>
        getdocs{userInfo?.name}
        </ProtectedRoute>
        </>
    )
}