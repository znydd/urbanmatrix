"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, ChangeEvent,FormEvent } from "react"
import { useUser } from '@/context/userContext'
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/protectedRoute';
import Link from 'next/link'
import { registerDeathCert } from "@/utils/registerdocsApi"


export default function DeathApply(){
  const router = useRouter();
  const userInfo = useUser()


  // birth certificate
  const [deathName, setDeathName] = useState('');
  const [deathFather, setDeathFather] = useState('');
  const [deathMother, setDeathMother] = useState('');
  const [deathDate, setDeathDate] = useState('')
  const [deathBC, setDeathBC] = useState('')
  const [deathAddress, setDeathAddress] = useState('');
  const [deathError, setDeathError] = useState('');
  const [deathSuccess, setDeathSuccess] = useState('');
  const [file, setFile] = useState<File | null>(null)


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!file) {
      alert('Please select a file');
      return;
    }
    const submitData = new FormData();
    submitData.append('name', deathName);
    submitData.append('father', deathFather);
    submitData.append('mother', deathMother);
    submitData.append('dod', deathDate);
    submitData.append('birth_cert_no', deathBC);
    submitData.append('address', deathAddress);
    submitData.append('file', file);

    try {
      const resp = await registerDeathCert(submitData)
      resp === "OK" ? setDeathSuccess("From Submitted successfully") : setDeathError("failed") 
      if(resp){
        setDeathName('')
        setDeathFather('')
        setDeathMother('')
        setDeathDate('')
        setDeathBC('')
        setDeathAddress('')
        setFile(null)
        setTimeout(() => {
          setDeathSuccess('')
      }, 2000)
      }
    } catch (error) {
      setTimeout(() => {
        setDeathError(`${error}`)
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
        <CardTitle className="text-2xl font-bold"><Link href={"/dashboard"} className=' text-teal-500'>Dashboard</Link> / <Link href={"/registerdocs"}>Apply for Documents</Link> / Apply for Death Certificate</CardTitle>
        <div className="flex flex-col justify-start border-2 p-2 border-gray-300 rounded">
          <div className=' text-sm font-medium'>{userInfo ? `${userInfo.name}` : 'Loading...'}</div>
          <div className=' text-sm font-medium'>{userInfo ? `${userInfo.email}` : 'Loading...'}</div>
        </div>
    </CardHeader>

    <Card className="mx-auto w-1/2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Application form for Death Certificate</CardTitle>
          <CardDescription>Enter credentials to apply for Death certificate</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2 mt-4">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={deathName}
                  onChange={(e) => setDeathName(e.target.value)}
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
                  value={deathFather}
                  onChange={(e) => setDeathFather(e.target.value)}
                  placeholder="Rohon Saha"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mother">Mothers Name</Label>
                <Input
                  id="mother"
                  type="text"
                  value={deathMother}
                  onChange={(e) => setDeathMother(e.target.value)}
                  placeholder="Debu Saha"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Death</Label>
                <Input
                  id="dob"
                  type="date"
                  value={deathDate}
                  onChange={(e) => setDeathDate(e.target.value)}
                  placeholder="Debu Saha"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deathBC">Birth Certificate No.</Label>
                <Input
                  id="deathBC"
                  type="text"
                  value={deathBC}
                  onChange={(e) => setDeathBC(e.target.value)}
                  placeholder="100-012"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  value={deathAddress}
                  onChange={(e) => setDeathAddress(e.target.value)}
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
              {deathSuccess && <p>{deathSuccess}</p>}
              {deathError && <p>{deathError}</p>}
          </form>
        </CardContent>
      </Card>
      </Card>
    </>)
}