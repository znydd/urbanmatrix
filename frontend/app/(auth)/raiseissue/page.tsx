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



interface Issue {
    id: number
    type: string
    title: string
    description: string
    status: string
}

const mockIssues: Issue[] = [
    { id: 1, type: "Bug", title: "App crashes on startup", description: "When launching the app, it immediately crashes on the splash screen. This issue has been reported by multiple users across different devices and operating systems. Our team is currently investigating the root cause and working on a hotfix.", status: "Open" },
    { id: 2, type: "Feature", title: "Add dark mode", description: "Implement a dark mode option for better night-time viewing. This feature has been highly requested by our user base. We need to create a new color scheme and add a toggle in the settings menu.", status: "In Progress" },
    { id: 3, type: "Improvement", title: "Optimize image loading", description: "Images are loading slowly. We need to implement lazy loading and image optimization. This will improve the overall performance of the app, especially on slower internet connections.", status: "Open" },
    { id: 4, type: "Documentation", title: "Update API docs", description: "The API documentation is outdated and needs to be updated to reflect recent changes. This includes new endpoints, deprecated methods, and changes in request/response formats.", status: "Closed" },
    { id: 5, type: "Bug", title: "Login button unresponsive", description: "The login button doesn't respond to clicks on certain mobile devices. This issue seems to be affecting Android devices running version 10 and below. We need to investigate and provide a fix as soon as possible.", status: "Open" },
    { id: 4, type: "Documentation", title: "Update API docs", description: "The API documentation is outdated and needs to be updated to reflect recent changes. This includes new endpoints, deprecated methods, and changes in request/response formats.", status: "Closed" },
    { id: 5, type: "Bug", title: "Login button unresponsive", description: "The login button doesn't respond to clicks on certain mobile devices. This issue seems to be affecting Android devices running version 10 and below. We need to investigate and provide a fix as soon as possible.", status: "Open" },

]

export default function RaiseIssue() {
    const [error, setError] = useState('');
    const router = useRouter();
    const userInfo = useUser()
    const [issueType, setIssueType] = useState("")
    const [issueDescription, setIssueDescription] = useState("")
    const [isExpanded, setIsExpanded] = useState(false)


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Issue Type:", issueType)
        console.log("Issue Description:", issueDescription)
        // Here you would typically send this data to your backend
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
                                            <SelectItem value="bug">Bug</SelectItem>
                                            <SelectItem value="feature">Feature Request</SelectItem>
                                            <SelectItem value="improvement">Improvement</SelectItem>
                                            <SelectItem value="documentation">Documentation</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                            </form>
                        </Card >
                        <Card className='w-1/2 p-4'>
                            <div className="space-y-2 w-2/3">
                                <label htmlFor="issue-type" className="text-sm font-medium">
                                    Search with issue type
                                </label>
                                <Select onValueChange={setIssueType} value={issueType}>
                                    <SelectTrigger id="issue-type">
                                        <SelectValue placeholder="Select issue type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bug">Bug</SelectItem>
                                        <SelectItem value="feature">Feature Request</SelectItem>
                                        <SelectItem value="improvement">Improvement</SelectItem>
                                        <SelectItem value="documentation">Documentation</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-full mx-auto">
                                <h2 className="text-2xl font-bold mb-4 mt-6">Raised Issues</h2>
                                <div className="border rounded-md" style={{ height: '500px' }}>
                                    <ScrollArea className="h-full p-2">
                                        {mockIssues.map((issue) => (
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
                </Card>
            </ProtectedRoute>
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
                    <span className={`px-2 py-1 text-xs rounded-full ${issue.status === 'Open' ? 'bg-yellow-200 text-yellow-800' :
                            issue.status === 'In Progress' ? 'bg-blue-200 text-blue-800' :
                                'bg-green-200 text-green-800'
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