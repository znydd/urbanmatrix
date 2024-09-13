"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Building2, Users, FileText, Bell } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-10 h-14 flex items-center mt-4">
        <Link className="flex items-center justify-center" href="#">
          <Building2 className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">Urbanmatrix</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 justify-center items-center">
          <Link className=" text-lg font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-lg font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-lg font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
          <Button onClick={() => router.push("/login")} variant="outline" size="lg">
            Log in
          </Button>
          <Button onClick={() => router.push("/signup")} size="lg">Sign up</Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Urbanmatrix
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Your one-stop portal for all urban citizen services. Simplifying city life, one click at a time.
                </p>
              </div>
              <div className="space-x-4">
                <Button onClick={() => router.push("/signup")} size="lg">Get Started</Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Our Services
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 mb-2" />
                  <CardTitle>Community Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Connect with your neighbors and local events.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 mb-2" />
                  <CardTitle>Document Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Easy access to important civic documents and forms.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Bell className="h-8 w-8 mb-2" />
                  <CardTitle>City Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Stay updated with the latest news and announcements from your city.</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Join Urbanmatrix Today
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Sign up now to access all our services and stay connected with your city.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input placeholder="Enter your email" type="email" />
                  <Button type="submit">Subscribe</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 Urbanmatrix. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}





















// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// export default function Home() {

//   return (
//     <>
//     <div className="flex flex-row min-h-screen justify-center items-center gap-x-4">
//       <Button asChild>
//         <Link href="/login">Login</Link>
//       </Button>
//       <Button asChild>
//         <Link href="/signup">SignUp</Link>
//       </Button>
//       </div>
//     </>
//   );
// }
