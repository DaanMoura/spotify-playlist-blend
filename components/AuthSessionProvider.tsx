"use client";

import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import React from "react"

type Props = {
  children: React.ReactNode,
  session?: Session | null
}
function AuthSessionProvider({ session, children }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default AuthSessionProvider