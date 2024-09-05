"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { createBithCertificate, createNid, createDeathCertificate } from "@/utils/adminApi"
import { useRouter } from "next/navigation"
import { ProtectedRoute } from "@/components/protectedRoute"
import { useEffect } from "react"

export default function AdminDashboard(){
    // birth certificate
    const [name, setName] = useState('');
    const [father, setFather] = useState('');
    const [mother, setMother] = useState('');
    const [date, setDate] = useState('')
    const [address, setAddress] = useState('');

    // nid
    const [nidName, setNidName] = useState('');
    const [nidFather, setNidFather] = useState('');
    const [nidMother, setNidMother] = useState('');
    const [nidEmail, setNidEmail] = useState('')
    const [nidBC, setNidBC] = useState('')
    const [nidDob, setNidDob] = useState('')
    const [nidAddress, setNidAddress] = useState('');

    // death certificate
    const [deathName, setDeathName] = useState('');
    const [deathFather, setDeathFather] = useState('');
    const [deathMother, setDeathMother] = useState('');
    const [deathDate, setDeathDate] = useState('')
    const [deathBC, setDeathBC] = useState('')
    const [deathAddress, setDeathAddress] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [nidError, setNidError] = useState('');
    const [nidSuccess, setNidSuccess] = useState('');

    const [deathError, setDeathError] = useState('');
    const [deathSuccess, setDeathSuccess] = useState('');
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const resp = await createBithCertificate(name, father, mother, date, address)
        console.log(resp)
        resp === 'OK' ? setSuccess("Birth Certificate Created") : setSuccess('Failed') 
        if(resp){
          setName('')
          setMother('')
          setFather('')
          setDate('')
          setAddress('')
          setTimeout(() => {
            setSuccess('')
        }, 2000)
        }
        } catch (err) {
          setError('Login failed. Please check your credentials.');
          setTimeout(() => {
            setError('')
          }, 2000)
          
        }
      };

      const handleNidSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const resp = await createNid(nidName, nidFather, nidMother, nidEmail, nidDob, nidBC, nidAddress)
        resp === "OK" ? setNidSuccess("Nid Created") : setNidError('Failed') 
        if(resp){
          setNidName('')
          setNidFather('')
          setNidMother('')
          setNidBC('')
          setNidAddress('')
          setNidDob('')
          setNidEmail('')
          setTimeout(() => {
            setNidSuccess('')
        }, 2000)
        }
        } catch (err) {
          setTimeout(() => {
            setNidError('Login failed. Please check your credentials.');
        }, 2000)
        }
      };

      const handleDeathCertSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const resp = await createDeathCertificate(deathName, deathFather, deathMother, deathDate, deathBC, deathAddress)
        resp === "OK" ? setDeathSuccess("Death Certificate Created") : setDeathError('Failed') 
        if(resp){
          setDeathName("")
          setDeathFather("")
          setDeathMother("")
          setDeathDate("")
          setDeathBC("")
          setDeathAddress("")
          setTimeout(() => {
            setDeathSuccess('')
        }, 2000)
        }
        } catch (err) {
          setTimeout(() => {
            setDeathError('Login failed. Please check your credentials.');
        }, 2000)
        }
      };

      const logout = () => {
        localStorage.removeItem('token');
        router.push('/');
    }



    
    return(
        <>
        <ProtectedRoute>
      <div className=" p-4">  
      <Card className=" flex flex-row p-2">
        <Card className="mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Birth Certificate Generator</CardTitle>
          <CardDescription>Enter users credentials to create Birth certificate</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
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
              <Button type="submit" className="w-full">
                Create Birth Certificate
              </Button>
              {success && <p>{success}</p>}
              {error && <p>{error}</p>}
            </div>
          </form>
        </CardContent>
      </Card>
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">NID Generator</CardTitle>
          <CardDescription>Enter users credentials to create NID</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleNidSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
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
              <Button type="submit" className="w-full">
                Create NID
              </Button>
              {nidSuccess && <p>{nidSuccess}</p>}
              {nidError && <p>{nidError}</p>}
            </div>
          </form>
        </CardContent>
      </Card>
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Death Certificate Generator</CardTitle>
          <CardDescription>Enter users credentials to create Death certificate</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleDeathCertSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
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
              <Button type="submit" className="w-full">
                Create Death Certificate
              </Button>
              {deathSuccess && <p>{deathSuccess}</p>}
              {deathError && <p>{deathError}</p>}
            </div>
          </form>
        </CardContent>
      </Card>
      <Button className=' bg-red-500' onClick={logout}>
                Logout
      </Button>
      </Card>
      <Card className=" p-8 w-full mt-4">
      <Card className=' w-full'>
                      <CardHeader>
                          <CardTitle className="text-lg">Request</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                          {[
                              { name: "Rohan Saha", type: "Birth Certificate" },
                              { name: "Harun Ilham", type: "Birth Certificate" },
                              { name: "Abu Mia", type: "Death Certificate" },
                              { name: "Sohel Rana", type: "Birth Certificate" },
                          ].map((doc, index) => (
                              <div
                                  key={index}
                                  className={`flex justify-between items-center p-2 rounded-md ${doc.type === "Death Certificate" ? "bg-yellow-100" : "bg-green-100"
                                      }`}
                              >
                                  <div>
                                      <p className="font-medium">{doc.type}</p>
                                      <p className="text-sm text-gray-600">{doc.name}</p>
                                  </div>
                                  <div>
                                  <Button className=" mr-2 bg-green-500" variant="outline" size="sm">
                                    Approve
                                  </Button>
                                  <Button className=" bg-red-500"variant="outline" size="sm">
                                      Decline
                                  </Button>
                                  </div>
                              </div>
                          ))}
                      </CardContent>
      </Card>
      </Card>
      </div>
          </ProtectedRoute>
        </>
    )
};