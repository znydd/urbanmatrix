"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChangeEvent, useState, FormEvent } from "react"
import { useUser } from '@/context/userContext'
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/protectedRoute';
import Link from 'next/link'
import { registerNid } from "@/utils/registerdocsApi"


export default function DeathApply(){
  const router = useRouter();
  const userInfo = useUser()



  const [nidName, setNidName] = useState('');
  const [nidFather, setNidFather] = useState('');
  const [nidMother, setNidMother] = useState('');
  const [nidEmail, setNidEmail] = useState('')
  const [nidBC, setNidBC] = useState('')
  const [nidDob, setNidDob] = useState('')
  const [nidAddress, setNidAddress] = useState('');
  const [file, setFile] = useState<File | null>(null)

  const [nidError, setNidError] = useState('');
  const [nidSuccess, setNidSuccess] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!file) {
      alert('Please select a file');
      return;
    }
    const submitData = new FormData();
    submitData.append('name', nidName);
    submitData.append('father', nidFather);
    submitData.append('mother', nidMother);
    submitData.append('dob', nidDob);
    submitData.append('email', nidEmail);
    submitData.append('birth_cert_no', nidBC);
    submitData.append('address', nidAddress);
    submitData.append('file', file);

    try {
      const resp = await registerNid(submitData)
      resp === "OK" ? setNidSuccess("From Submitted successfully") : setNidError("failed") 
      if(resp){
        setNidName('')
        setNidFather('')
        setNidMother('')
        setNidDob('')
        setNidEmail('')
        setNidBC('')
        setNidAddress('')
        setFile(null)
        setTimeout(() => {
          setNidSuccess('')
      }, 2000)
      }
    } catch (error) {
      setTimeout(() => {
        setNidError(`${error}`)
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
    <Card className=" p-6">
    <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 sm:items-center sm:space-y-0">
        <CardTitle className="text-2xl font-bold"><Link href={"/dashboard"} className=' text-teal-500'>Dashboard</Link> / <Link href={"/registerdocs"}>Apply for Documents</Link> / Apply for NID</CardTitle>
        <div className="flex flex-col justify-start border-2 p-2 border-gray-300 rounded">
          <div className=' text-sm font-medium'>{userInfo ? `${userInfo.name}` : 'Loading...'}</div>
          <div className=' text-sm font-medium'>{userInfo ? `${userInfo.email}` : 'Loading...'}</div>
        </div>
    </CardHeader>

    <Card className="mx-auto w-1/2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">NID application form </CardTitle>
          <CardDescription>Enter credentials to apply NID</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2 mt-4">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={nidName}
                  onChange={(e) => setNidName(e.target.value)}
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
                  value={nidFather}
                  onChange={(e) => setNidFather(e.target.value)}
                  placeholder="Rohon Saha"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mother">Mothers Name</Label>
                <Input
                  id="mother"
                  type="text"
                  value={nidMother}
                  onChange={(e) => setNidMother(e.target.value)}
                  placeholder="Debu Saha"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={nidEmail}
                  onChange={(e) => setNidEmail(e.target.value)}
                  placeholder="abc@gmail.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="nidDob"
                  type="date"
                  value={nidDob}
                  onChange={(e) => setNidDob(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nidBC">Birth Certificate No.</Label>
                <Input
                  id="nidBC"
                  type="text"
                  value={nidBC}
                  onChange={(e) => setNidBC(e.target.value)}
                  placeholder="100-012"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  value={nidAddress}
                  onChange={(e) => setNidAddress(e.target.value)}
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
                  placeholder="Badda, Dhaka-1212"
                  required
                />
              </div>
            </div>
              <Button type="submit" className="w-full">
                Submit Form
              </Button>
              {nidSuccess && <p>{nidSuccess}</p>}
              {nidError && <p>{nidError}</p>}
          </form>
        </CardContent>
      </Card>
      </Card>
    </>)
}