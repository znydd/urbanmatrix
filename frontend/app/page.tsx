"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    history.pushState(null, '', "/");
    // window.addEventListener('popstate', function (event) {
    //     history.pushState(null, '', "/");
    // });
}, []);  
  return (
    <>
    <div className="flex flex-row min-h-screen justify-center items-center gap-x-4">
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild>
        <Link href="/signup">SignUp</Link>
      </Button>
      </div>
    </>
  );
}
