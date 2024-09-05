"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from '@/context/userContext'
import { ProtectedRoute } from '@/components/protectedRoute';
import Link from 'next/link'
import { searchDeathCert } from "@/utils/searchApi";
import { downloadDeathCert } from "@/utils/downloadApi";
import { addDeathCert } from "@/utils/addApi";

export default function BirthSearch() {
  const userInfo = useUser();
  const router = useRouter();
  const [deathNo, setDeathNo] = useState('')
  const [found, setFound] = useState(false)
  const [name, setName] = useState('')
  const [death_cert_no, setDeath_cert_no] = useState('')
  const [filePath, setFilePath] = useState('')


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const death_cert = await searchDeathCert(deathNo)
      setFound(true)
      setName(death_cert.name)
      setDeath_cert_no(death_cert.death_cert_no)
      setFilePath(death_cert.file)
    } catch (error) {
      
    }
  }

  const handleDownload = async () => {
    try {
      const url = await downloadDeathCert(filePath)

      if (typeof url !== 'string') {
        console.error('Download URL is undefined or not a string');
        return;
      }
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${name}_${filePath}`);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      link.remove();
      
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }

  const handleAdd = async () => {
    try {
      const user_id = await addDeathCert(deathNo) 
      console.log(user_id)
    } catch (error) {
      console.error("couldn't add death cert")
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/');
  }

  return (<>
    <ProtectedRoute>
      <Card className="w-full min-h-screen mx-auto px-10">
        <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 sm:items-center sm:space-y-0">
          <CardTitle className="text-2xl font-bold"><Link href={"/dashboard"} className=' text-teal-500'>Dashboard</Link> / <Link href={"/getdocs"}>Get Documents / Death Certificate</Link></CardTitle>
          <div className='flex space-x-2'>
            <Button variant="outline">{userInfo ? `${userInfo.name}` : 'Loading...'}</Button>
            <Button variant="outline">{userInfo ? `${userInfo.email}` : 'Loading...'}</Button>
          </div>
        </CardHeader>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="XXX-XXXX" onChange={(e) => setDeathNo(e.target.value)} className="pl-8" />
              </div>
              <Button onClick={handleSearch} >Search</Button>
            </div>

          {found &&
            <Card className="bg-yellow-100">
              <CardContent className="p-2 flex items-center justify-between">
                <div>
                  <p className="font-medium">{death_cert_no ? `Death Certificate - ${death_cert_no}` : "Death Certificate"}</p>
                  <p className="text-sm text-gray-600">{name ? name : "loading.."}</p>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleAdd} variant="outline" size="sm">
                    Add
                  </Button>
                  <Button onClick={handleDownload} variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          }
          </CardContent>
        </Card>
        <Button className=' bg-red-500 mt-4' onClick={logout}>
          Logout
        </Button>
      </Card>
    </ProtectedRoute>
  </>)
}