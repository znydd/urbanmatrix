'use client'

import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from "@/components/protectedRoute";


export default function RegisterDocs(){
    
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
        registerDocs
        </ProtectedRoute>
        </>
    )
}