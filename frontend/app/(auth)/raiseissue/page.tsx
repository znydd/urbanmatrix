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
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, ChevronUp } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { postIssue, fetchAllIssues, fetchFilterIssues } from '@/utils/raiseIssueApi';
import { Input } from "@/components/ui/input"

interface Issue {
    id: number
    type: string
    title: string
    description: string
    status: string
}

const issueTypeList = ["My Isssue posts", "Unsafe Area", "Risky Infrastacture", "Infrastructure Repair", "Extortion", "Grabage Management", "Gas Supply Issue",
    "Water Supply Issue", "Electricity Issue", "Law and Order Corruption", "Govt. office Corruption", "Request Feature"]

export default function RaiseIssue() {
    const router = useRouter();
    const userInfo = useUser()
    const [issueType, setIssueType] = useState("")
    const [issueTitle, setIssueTitle] = useState("")
    const [issueDescription, setIssueDescription] = useState("")
    const [filterIssueType, setFilterIssueType] = useState('')
    const [allIssues, setAllIssues] = useState<Issue[]>([])
    const [success, setSuccess] = useState("")
    const [error, setError] = useState('');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Issue Type:", issueType)
        console.log("Issue Title:", issueTitle)
        console.log("Issue Description:", issueDescription)
        // Here you would typically send this data to your backend
        try {
            const respPostIssue = await postIssue(issueType, issueTitle, issueDescription)
            respPostIssue ? setSuccess("From Submitted successfully") : setError("failed") 
            if(respPostIssue){
                setTimeout(() => {
                  setSuccess('')
                  setIssueType('')
                  setIssueTitle('')
                  setIssueDescription('')
              }, 2000)
            }
        } catch (error) {
            setTimeout(() => {
                setError('')
            }, 2000)
            console.error
        }
    }

    useEffect(() => {
        getAllIssues()
    }, [])
    const getAllIssues = async () =>{

        try {
            const respAllIssues = await fetchAllIssues()
            if(respAllIssues){
                setAllIssues(respAllIssues)
            }
        } catch (error) {
            console.error
        }
    }

    const handleFilter = async () => {
        try {
            const respFilterIssue = await fetchFilterIssues(filterIssueType)
            console.log(respFilterIssue)
            if(respFilterIssue){
            setAllIssues(respFilterIssue)
        }
        } catch (error) {
            console.error
        }

    }


    const logout = () => {
        localStorage.removeItem('token');
        router.push('/');
    }

    return (
        <>
            <ProtectedRoute>
                <Card className="w-full min-h-screen mx-auto px-10">
                    <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 sm:items-center sm:space-y-0">
                        <CardTitle className="text-2xl font-bold">
                            <Link href={"/dashboard"} className=' text-teal-500'>Dashboard</Link> / <Link href={"/getdocs"}>Raise Issue</Link>
                        </CardTitle>
                        <div className='flex space-x-2'>
                            <Button variant="outline">{userInfo ? `${userInfo.name}` : 'Loading...'}</Button>
                            <Button variant="outline">{userInfo ? `${userInfo.email}` : 'Loading...'}</Button>
                        </div>
                    </CardHeader>
                    <CardContent className='flex flex-row gap-2 h-[700px]'>
                        <Card className='w-1/2 p-4'>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2 w-2/3">
                                    <label htmlFor="issue-type" className="text-sm font-medium">
                                        Select Issue Type
                                    </label>
                                    <Select onValueChange={setIssueType} value={issueType}>
                                        <SelectTrigger id="issue-type">
                                            <SelectValue placeholder="Select issue type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        {issueTypeList.slice(1).map((type, index) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
          <label htmlFor="issue-title" className="text-sm font-medium">
            Issue Title
          </label>
          <Input
            id="issue-title"
            placeholder="Enter issue title"
            value={issueTitle}
            onChange={(e) => setIssueTitle(e.target.value)}
          />
        </div>
                            <div className="space-y-2">
                                <label htmlFor="issue-description" className="text-sm font-medium">
                                    Issue Description
                                </label>
                                <Textarea
                                    id="issue-description"
                                    placeholder="Describe your issue here..."
                                    value={issueDescription}
                                    onChange={(e) => setIssueDescription(e.target.value)}
                                    className="min-h-[200px]"
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Submit Issue
                            </Button>
                            {success && <p>{success}</p>}
                            {error && <p>{error}</p>}
                        </form>
                </Card >
                <Card className='w-1/2 p-4'>
                    <div className="space-y-2 w-2/3">
                        <label htmlFor="issue-type" className="text-sm font-medium">
                            Search with issue type
                        </label>
                        <div className=' flex flex-row gap-2'>
                        <Select onValueChange={setFilterIssueType} value={filterIssueType} >
                            <SelectTrigger id="issue-type">
                                <SelectValue placeholder="Select issue type" />
                            </SelectTrigger>
                            <SelectContent>
                            {issueTypeList.map((type) => (
                                            <SelectItem key={type} value={type} className={`${type === "My Isssue posts" ? "bg-green-300" : ""} `}>
                                                {type}
                                            </SelectItem>
                                        ))}
                            </SelectContent>
                        </Select>
                        <Button onClick={handleFilter}>Filter</Button>
                        </div>
                    </div>

                    <div className="w-full mx-auto">
                        <h2 className="text-2xl font-bold mb-4 mt-6">Raised Issues</h2>
                        <div className="border rounded-md" style={{ height: '500px' }}>
                            <ScrollArea className="h-full p-2">
                                {allIssues.map((issue) => (
                                    <IssueCard key={issue.id} issue={issue} />
                                ))}
                            </ScrollArea>
                        </div>
                    </div>
                </Card>
            </CardContent>
            <Button className=' bg-red-500 mt-4' onClick={logout}>
                Logout
            </Button>

        </Card >
            </ProtectedRoute >
        </>
    )
}




function IssueCard({ issue }: { issue: Issue }) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="bg-card text-card-foreground shadow-sm rounded-lg mb-4">
            <div className="p-4 flex justify-between items-center">
                <div className="flex-grow">
                    <h3 className="font-semibold">{issue.title}</h3>
                    <p className="text-sm text-muted-foreground">Type: {issue.type}</p>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                    <span className={`px-2 py-1 text-xs rounded-full ${issue.status === 'Un-verified' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'
                        }`}>
                        {issue.status}
                    </span>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsExpanded(!isExpanded)}
                        aria-expanded={isExpanded}
                        aria-controls={`issue-description-${issue.id}`}
                    >
                        <span className="sr-only">{isExpanded ? "Collapse" : "Expand"} issue details</span>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Button>
                </div>
            </div>
            {isExpanded && (
                <div id={`issue-description-${issue.id}`} className="px-4 pb-4">
                    <p className="text-sm">{issue.description}</p>
                </div>
            )}
        </div>
    )
}