"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, ChangeEvent, FormEvent } from "react"
import { useUser } from '@/context/userContext'
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/protectedRoute';
import Link from 'next/link'
import { registerBithCert } from "@/utils/registerdocsApi"



export default function BirthApply(){
  const router = useRouter();
  const userInfo = useUser()


  // birth certificate
    const [name, setName] = useState('');
    const [father, setFather] = useState('');
    const [mother, setMother] = useState('');
    const [date, setDate] = useState('')
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [file, setFile] = useState<File | null>(null)



    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      if (!file) {
        alert('Please select a file');
        return;
      }
      const submitData = new FormData();
      submitData.append('name', name);
      submitData.append('father', father);
      submitData.append('mother', mother);
      submitData.append('dob', date);
      submitData.append('address', address);
      submitData.append('file', file);

      try {
        const resp = await registerBithCert(submitData)
        resp === "OK" ? setSuccess("From Submitted successfully") : setError("failed") 
        if(resp){
          setName('')
          setMother('')
          setFather('')
          setDate('')
          setAddress('')
          setFile(null)
          setTimeout(() => {
            setSuccess('')
        }, 2000)
        }
      } catch (error) {
        setTimeout(() => {
          setError(`${error}`)
      }, 2000)
      }

    }
    
      const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        setFile(files[0]);
      }
    };



    return(<>
    <Card className=" p-8">
    
    <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 sm:items-center sm:space-y-0">
                        <CardTitle className="text-2xl font-bold"><Link href={"/dashboard"} className=' text-teal-500'>Dashboard</Link> / <Link href={"/registerdocs"}>Apply for Documents</Link> / Apply for Birth Certificate</CardTitle>
                        <div className='flex space-x-2'>
                            <Button variant="outline">{userInfo ? `${userInfo.name}` : 'Loading...'}</Button>
                            <Button variant="outline">{userInfo ? `${userInfo.email}` : 'Loading...'}</Button>
                        </div>
                    </CardHeader>
    
        <Card className="mx-auto w-1/2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Application From for Birth Certificate</CardTitle>
          <CardDescription>Enter credentials to apply for Birth certificate</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2 mt-4">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Ilham Harun"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="father">Fahters Name</Label>
                <Input
                  id="father"
                  type="text"
                  value={father}
                  onChange={(e) => setFather(e.target.value)}
                  placeholder="Rohon Saha"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mother">Mothers Name</Label>
                <Input
                  id="mother"
                  type="text"
                  value={mother}
                  onChange={(e) => setMother(e.target.value)}
                  placeholder="Debu Saha"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Debu Saha"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Badda, Dhaka-1212"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="attatchment">Attachment</Label>
                <Input
                  id="attatchment"
                  type="file"
                  onChange={handleFileChange}
                  required
                />
              </div>
            </div>
              <Button type="submit" className="w-full">
                Submit Form
              </Button>
              {success && <p>{success}</p>}
              {error && <p>{error}</p>}
          </form>
        </CardContent>
      </Card>
      </Card>
    </>)
}