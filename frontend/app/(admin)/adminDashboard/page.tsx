"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { ProtectedRoute } from "@/components/protectedRoute"

export default function AdminDashboard(){


    const router = useRouter()

   
      const logout = () => {
        localStorage.removeItem('token');
        router.push('/');
    }

  
    return(
        <>
        <ProtectedRoute>
      <div className=" p-4 flex flex-row items-center justify-center">  
      <Card className=" p-8 w-full mt-4">
      <Button className=" mr-4" onClick={() => router.push("/adminDashboard/verifyregistration")} >Verify Registration Docs</Button>
      <Button className=" mr-4" onClick={() => router.push("/adminDashboard/generatedocs")} >Generate Docs</Button>
      <Button onClick={() => router.push("/adminDashboard/verifyissues")} >Verify Raised Issues</Button>
      </Card>
      <Button className=' bg-red-500 ml-4' onClick={logout}>
                Logout
      </Button>
      </div>
          </ProtectedRoute>
        </>
    )
};