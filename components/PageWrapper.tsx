"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { ReactNode } from "react"
import SignInScreen from "./SignInScreen"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query/reactQueryClient"
import PageColumn from "./ui/PageColumn"
import { useRouter } from "next/navigation"
import Link from "next/link"

type Props = {
  children: ReactNode
}
const PageWrapper = ({ children }: Props) => {
  const session = useSession()
  const router = useRouter()

  if (!session || session.status === 'unauthenticated') {
    return (
      <SignInScreen onSignInClick={() => signIn('spotify')} />
    )
  }

  const signOutClick = () => {
    signOut()
    router.push('/')
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PageColumn>
        <h1 className="text-2xl">Hello, {session.data?.user?.name}! 👋</h1>
        <div className="flex gap-2 text-slate-300 text-sm">
          <Link href="/">Home</Link>
			    <button onClick={signOutClick} className=" w-fit">Sign out</button>
        </div>
        {children}
      </PageColumn>
    </QueryClientProvider>
  )
}

export default PageWrapper