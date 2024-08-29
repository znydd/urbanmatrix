import { UserProvider } from '@/context/userContext'
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <UserProvider>
        <div>
          <div className=' text-red-50'>pokie</div>
            <main className={inter.className}>
               {children} 
            </main>
        </div>
        </UserProvider>

  )
}