import { UserProvider } from '@/context/userContext'
import { Inter } from "next/font/google";
import { ProtectedRoute } from '@/components/protectedRoute';

const inter = Inter({ subsets: ["latin"] });

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ProtectedRoute>
    <UserProvider>
            <main className={inter.className}>
               {children} 
            </main>
        </UserProvider>
        </ProtectedRoute>
  )
}