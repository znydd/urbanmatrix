'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from '@/context/userContext'
import { ProtectedRoute } from '@/components/protectedRoute';
import Link from 'next/link'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin } from 'lucide-react';
import { fetchAllStartingPoints, fetchPossibleDestination, fetchAllTransport } from '@/utils/transportApi';




interface Dest {
    route: number;
    type: string;
    dest: string[];
}


export default function TransportRoute() {
    const [error, setError] = useState('');
    const router = useRouter();
    const userInfo = useUser()
    const [start, setStart] = useState("")
    const [destination, setDestination] = useState("")
    const [routes, setRoutes] = useState([])
    const [startValues, setStartValues] = useState<string[]>([])
    const [destValues, setDestValues] = useState<Dest[]>([])
    const [isLoading, setIsLoading] = useState(false)


    const logout = () => {
        localStorage.removeItem('token');
        router.push('/');
    }


    useEffect(() => {
        getAllStartingPoints()
    }, [])

    const getAllStartingPoints = async () => {
        try {
            const respStartValues = await fetchAllStartingPoints()
            if (respStartValues) {
                setStartValues(respStartValues)
            } else {
                setStartValues(["Loading.."])
                console.error('Unexpected response format for starting points')
            }
            console.log(respStartValues)
            if (respStartValues) {
                setStartValues(respStartValues)
            }
        } catch (error) {
            console.error
        }

    }



    useEffect(() => {
        getPossibleDestination()
    }, [start])

    const getPossibleDestination = async () => {
        if(start){
        try {
            const respPossibleDestnation: Dest[] = await fetchPossibleDestination(start)
            if (Array.isArray(respPossibleDestnation)) {
                setDestValues(respPossibleDestnation)
            } else {
                setDestValues([{route:0, type:"Loading..", dest:["Loading.."] }])
                console.error('Unexpected response format for possible destinations')
            }

            console.log(respPossibleDestnation)
        } catch (error) {
            console.error
        }
    }
    }

    const handleSearch = async () => {
        // In a real application, this would call an API to get actual routes
        try {
            const respAllTransport = await fetchAllTransport(destination[0])
            if (respAllTransport) {
                setRoutes(respAllTransport)
            }
        } catch (error) {
            console.error
        }
        console.log(destination[0])

    }
    console.log(destValues)
    console.log(start)
    console.log(destination)


    return (
        <>
            <ProtectedRoute>
                <Card className="w-full min-h-[700px] mx-auto px-10">
                    <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 sm:items-center sm:space-y-0">
                        <CardTitle className="text-2xl font-bold">
                            <Link href={"/dashboard"} className=' text-teal-500'>Dashboard</Link> / <Link href={"/getdocs"}>Transport Route</Link>
                        </CardTitle>
                        <div className="flex flex-col justify-start border-2 p-2 border-gray-300 rounded">
          <div className=' text-sm font-medium'>{userInfo ? `${userInfo.name}` : 'Loading...'}</div>
          <div className=' text-sm font-medium'>{userInfo ? `${userInfo.email}` : 'Loading...'}</div>
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
                                            {startValues.map((location) => (

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
                                            {destValues.length > 0 ? (
                                                destValues.map((routeData) => (
                                                    <SelectGroup key={routeData.route}>
                                                        <SelectLabel>{`Route ${routeData.route} (${routeData.type})`}</SelectLabel>
                                                        {routeData.dest.map((loc) => (
                                                            <SelectItem key={`${routeData.route}-${loc}`} value={`${routeData.route}. ${loc}`}>
                                                                {loc}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                ))
                                            ) : (
                                                <SelectItem value="no-destinations" disabled>
                                                    {isLoading ? "Loading destinations..." : "No destinations available"}
                                                </SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>

                                    <Button onClick={handleSearch} className="w-full md:w-auto" disabled={!start || !destination}>Search</Button>
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
                                                        <li key={index} className="flex justify-center items-center p-2 bg-muted rounded-lg">
                                                            <span className="font-medium">{route}</span>
                                                            {/* <span className="text-muted-foreground">{route.duration}</span> */}
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