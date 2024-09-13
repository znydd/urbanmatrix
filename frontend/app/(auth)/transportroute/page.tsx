'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from '@/context/userContext'
import { ProtectedRoute } from '@/components/protectedRoute';
import Link from 'next/link'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin } from 'lucide-react';

// Mock data for locations and routes
const locations = ["City Center", "Airport", "University", "Shopping Mall", "Beach"]
const mockRoutes = [
    { type: "Bus", number: "101", duration: "30 min" },
    { type: "Metro", number: "M1", duration: "15 min" },
    { type: "Bus", number: "202", duration: "45 min" },
    { type: "Metro", number: "M2", duration: "20 min" },
    { type: "Metro", number: "M1", duration: "15 min" },
    { type: "Bus", number: "202", duration: "45 min" },
    { type: "Metro", number: "M2", duration: "20 min" },
]
interface Route {
    type: string;
    number: string;
    duration: string;
}


export default function TransportRoute() {
    const [error, setError] = useState('');
    const router = useRouter();
    const userInfo = useUser()
    const [start, setStart] = useState("")
    const [destination, setDestination] = useState("")
    const [routes, setRoutes] = useState<Route[]>([])

    const logout = () => {
        localStorage.removeItem('token');
        router.push('/');
    }


    const handleSearch = () => {
        // In a real application, this would call an API to get actual routes
        setRoutes(mockRoutes)
    }


    return (
        <>
            <ProtectedRoute>
                <Card className="w-full min-h-[700px] mx-auto px-10">
                    <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 sm:items-center sm:space-y-0">
                        <CardTitle className="text-2xl font-bold">
                            <Link href={"/dashboard"} className=' text-teal-500'>Dashboard</Link> / <Link href={"/getdocs"}>Transport Route</Link>
                        </CardTitle>
                        <div className='flex space-x-2'>
                            <Button variant="outline">{userInfo ? `${userInfo.name}` : 'Loading...'}</Button>
                            <Button variant="outline">{userInfo ? `${userInfo.email}` : 'Loading...'}</Button>
                        </div>
                    </CardHeader>
                    <div className="mx-auto p-4">
                        <Card className="w-full max-w-2xl mx-auto">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-center flex flex-row gap-2">Find Your Route<MapPin /></CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
                                    <Select value={start} onValueChange={setStart}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose starting point" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {locations.map((location) => (
                                                <SelectItem key={location} value={location}>
                                                    {location}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Select value={destination} onValueChange={setDestination}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose destination" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {locations.map((location) => (
                                                <SelectItem key={location} value={location}>
                                                    {location}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Button onClick={handleSearch} className="w-full md:w-auto">Search</Button>
                                </div>

                                {routes.length > 0 && (
                                    <Card className="mt-6">
                                        <CardHeader>
                                            <CardTitle className="text-xl">Available Routes</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ScrollArea className="h-[200px]">
                                                <ul className="space-y-2">
                                                    {routes.map((route, index) => (
                                                        <li key={index} className="flex justify-between items-center p-2 bg-muted rounded-lg">
                                                            <span className="font-medium">{route.type} {route.number}</span>
                                                            <span className="text-muted-foreground">{route.duration}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </ScrollArea>
                                        </CardContent>
                                    </Card>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                </Card>
                    <Button className=' bg-red-500 mt-4' onClick={logout}>
                        Logout
                    </Button>
            </ProtectedRoute>
        </>
    )
}