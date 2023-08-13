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
  else if (error.message === ERRORS.NOT_FOUND) return <h1>I AM 404</h1>
  else if (error.message === ERRORS.DEFAULT) return <h1>I AM DEFAULT ERROR</h1>
  return <h1>THIS IS NOT QUALIFIED ERROR</h1>
}
