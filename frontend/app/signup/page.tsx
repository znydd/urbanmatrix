"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "../../utils/authApi";

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const { access_token } = await signup(name, email, password);
          localStorage.setItem('token', access_token);
          router.push('/dashboard');
        } catch (err) {
          setError('Signup failed. Please try again.');
        }
      }; 

      return (
        <div className=" flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Create Account</CardTitle>
                    <CardDescription>Enter your details to create a new account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input 
                                  id="name"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  placeholder="John Doe"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                  id="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  placeholder="johndoe@example.com"
                                  type="email"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                  id="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  type="password" 
                                />
                            </div>
                        </div>
                    <Button type="submit" className=" mt-6 w-full">Create Account</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}