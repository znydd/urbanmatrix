"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {

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
