'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'
const NextAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
}

export default NextAuthProvider
