'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from '@/context/userContext'
import { ProtectedRoute } from '@/components/protectedRoute';
import Link from 'next/link'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
} from "@/components/ui/select"
import { fetchWaterBillInfo, payMonthlyWaterBill } from '@/utils/paybillApi';




interface BillInfo {
    id: number;
    monthString: string;
    bill: number;
}

const monthsName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export default function WaterBill() {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const userInfo = useUser()
    const [billInfo, setBillInfo] = useState<BillInfo>({ monthString: "Loading..", bill: 0, id: 0 })
    const [month, setMonth] = useState("")
    const [bkash, setBkash] = useState('')
    const [OTP, setOTP] = useState("")




    useEffect(() => {
        getBillInfo()
    }, [])
    const getBillInfo = async () => {
        const respBillInfo = await fetchWaterBillInfo()
        if (respBillInfo) {
            setBillInfo(respBillInfo)
        } else {
            setBillInfo({ monthString: "Loading..", bill: 0, id: 0 })
        }
    }

    const handlePayment = async () => {
        const resp = await payMonthlyWaterBill(month)

        if (resp) {
            setSuccess("Payment Successful")
            getBillInfo()
            console.log(resp)
        } else {
            setError("Payment Failed")
        }
        setTimeout(() => {
            setMonth('')
            setBkash('')
            setOTP('')
            setSuccess('')
            setError('')
        }, 2000)

    }

    const makeOTP = () => {
        const digits = 4;
        const min = Math.pow(10, digits - 1);
        const max = Math.pow(10, digits) - 1;
        setOTP(`${Math.floor(Math.random() * (max - min + 1)) + min}`)
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
                            <Link href={"/dashboard"} className=' text-teal-500'>Dashboard</Link> / <Link href={"/paybill"}>Pay Bill</Link> / Water
                        </CardTitle>
                        <div className="flex flex-col justify-start border-2 p-2 border-gray-300 rounded">
          <div className=' text-sm font-medium'>{userInfo ? `${userInfo.name}` : 'Loading...'}</div>
          <div className=' text-sm font-medium'>{userInfo ? `${userInfo.email}` : 'Loading...'}</div>
        </div>
                    </CardHeader>
                    <div className=' w-full flex flex-row justify-center items-center mt-20'>
                        <Card className="w-[900px] h-[430px] p-6 ">
                            <div className=' flex flex-row gap-4'>
                                <Select value={month} onValueChange={setMonth}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose Month" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {monthsName.map((month, index) => (
                                            billInfo.monthString[index] === '1' ?
                                                <SelectItem key={month} value={month} className=' bg-green-100 text-black' disabled>
                                                    {`${month} (Paid)`}
                                                </SelectItem> :
                                                <SelectItem key={month} value={month} className=' text-red-500'>
                                                    {`${month} (Un-paid)`}
                                                </SelectItem>

                                        ))}
                                    </SelectContent>
                                </Select>

                                <div className="space-y-4 w-1/3">
                                    <div className="p-4 border rounded-md">
                                        <p className="font-semibold">Amount: {billInfo.bill} TAKA</p>
                                        <p>Consumer ID: {billInfo.id}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="bkash-number">Bkash Number:</Label>
                                        <Input id="bkash-number" placeholder="Enter Bkash number" onChange={(e) => setBkash(e.target.value)} disabled={!month} />
                                    </div>
                                    <Button onClick={makeOTP} disabled={!bkash}>Get OTP</Button>
                                    <div>
                                        <Label htmlFor="otp">OTP:</Label>
                                        <Input id="otp" placeholder="Enter OTP" value={OTP ? OTP : ""} />
                                    </div>
                                    <Button onClick={handlePayment} className="w-full" disabled={!month || !bkash || !OTP}>Confirm Payment</Button>
                                    {success && <p>{success}</p>}
                                    {error && <p>{error}</p>}
                                </div>
                            </div>
                        </Card>
                    </div>
                    <Button className=' bg-red-500 mt-4' onClick={logout}>
                        Logout
                    </Button>
                </Card>
            </ProtectedRoute>
        </>
    )
}