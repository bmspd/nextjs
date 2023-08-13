'use client'
import { ERRORS } from '@/constants/global.constants'
import React from 'react'

export default function CustomError({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  if (error.message === ERRORS.NOT_FOUND) return <h1>No project found</h1>
  throw new Error(error.message)
}
