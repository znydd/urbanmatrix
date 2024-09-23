'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from "@/components/ui/card"
import { ProtectedRoute } from '@/components/protectedRoute';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel
} from "@/components/ui/select"
import { ChevronDown, ChevronUp } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {  fetchAllIssues, fetchFilterIssues } from '@/utils/raiseIssueApi';
import { approveIssue } from '@/utils/adminApi';

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
    const [filterIssueType, setFilterIssueType] = useState('')
    const [allIssues, setAllIssues] = useState<Issue[]>([])
    const [success, setSuccess] = useState("")
    const [error, setError] = useState('');


   

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
                <Card className="w-full min-h-screen mx-auto px-10 p-6">
                <div className="space-y-2 w-2/3">
                        <label htmlFor="issue-type" className="text-sm font-bold ml-2">
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
    const handleApprove = async (issue_id: number) => {
        console.log(issue_id)
        try {
            const respIssueApprove = await approveIssue(issue_id)
            if(respIssueApprove){
                console.log("approved")
            }
        } catch (error) {
            console.log("failed")
        }
        // Here you would typically send this data to your backend
       
    }

    return (
        <div className="bg-card text-card-foreground shadow-sm rounded-lg mb-4">
            <div className="p-4 flex justify-between items-center">
                <div className="flex-grow">
                    <h3 className="font-semibold">{issue.title}</h3>
                    <p className="text-sm text-muted-foreground">Type: {issue.type}</p>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                    <Button onClick={() => handleApprove(issue.id)} className=' bg-green-400 text-black'>Approve</Button>
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