'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useUser } from '@/context/userContext'
import { ProtectedRoute } from '@/components/protectedRoute';
import Link from 'next/link'
import { downloadNid } from '@/utils/downloadApi';
import { savedDocs } from '@/utils/savedDocsApi';
import { downloadBirthCert, downloadDeathCert } from "@/utils/downloadApi";


interface Doc {
    name: string;
    type: string;
    no: number;
    file_name: string;
  }


export default function GetDocs() {
    const [error, setError] = useState('');
    const router = useRouter();
    const userInfo = useUser()
    const [docs, setDocs] = useState<Doc[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
        }
        fethchDocs();
    }, []);

    const fethchDocs = async () => {
        try {
            const docsResp = await savedDocs()
            setDocs(docsResp)
        } catch (error) {
            
        }
    }

    const handleDownload = async () => {
        try {
          const url = await downloadNid()
          if (typeof url !== 'string') {
            console.error('Download URL is undefined or not a string');
            return;
          }
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', "nid.png");
          document.body.appendChild(link);
          link.click();
          
          // Clean up
          window.URL.revokeObjectURL(url);
          link.remove();
          
        } catch (error) {
          console.error('Error downloading file:', error);
        }
      }

      const handleDeathBirthDownload = async (type: string, file: string, name: string) => {
        if(type === "Birth Certificate"){
        try {
          const url = await downloadBirthCert(file)
    
          if (typeof url !== 'string') {
            console.error('Download URL is undefined or not a string');
            return;
          }
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${name}_${file}`);
          document.body.appendChild(link);
          link.click();
          
          // Clean up
          window.URL.revokeObjectURL(url);
          link.remove();
          
        } catch (error) {
          console.error('Error downloading file:', error);
        }
      }else{
        try {
            const url = await downloadDeathCert(file)
      
            if (typeof url !== 'string') {
              console.error('Download URL is undefined or not a string');
              return;
            }
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${name}_${file}`);
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            window.URL.revokeObjectURL(url);
            link.remove();
            
          } catch (error) {
            console.error('Error downloading file:', error);
          }
      }
    }
    console.log(userInfo)
    const logout = () => {
        localStorage.removeItem('token');
        router.push('/');
    }
    console.log(docs)

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
                                        <Button onClick={handleDownload} className=' my-4'>Download NID</Button>
                                        <p className="text-sm text-red-500 mt-4">*You can only get your NID not others</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className=' w-1/2 h-[650px] flex flex-col'>
                            <CardHeader>
                                <CardTitle className="text-lg">Saved Docs</CardTitle>
                            </CardHeader>
                            <ScrollArea className=' flex-grow'>
                            <CardContent className="space-y-2">
                                {docs.map((doc, index) => (
                                    <div
                                        key={index}
                                        className={`flex justify-between items-center p-2 rounded-md ${doc.type === "Death Certificate" ? "bg-yellow-100" : "bg-green-100"
                                            }`}
                                    >
                                        <div>
                                            <p className="font-medium">{doc.type}</p>
                                            <p className="text-sm text-gray-600">{doc.name}</p>
                                        </div>
                                        <Button onClick={() => handleDeathBirthDownload(doc.type, doc.file_name, doc.name)} variant="outline" size="sm">
                                            Download
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                            </ScrollArea>
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