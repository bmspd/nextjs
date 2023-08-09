'use client'

import LoginView from '@/components/LoginView/LoginView'
import { ERRORS } from '@/constants/global.constants'
import React from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  if (error.message === ERRORS.ANAUTHORIZED) return <LoginView reset={reset} />
  return <h1>THIS IS AN ERROR</h1>
}
