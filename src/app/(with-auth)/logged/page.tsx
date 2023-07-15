'use client'

import { Typography } from '@mui/material'

export default function LoggedPage() {
  console.log('logged page rendered')
  return <Typography variant="h4">Only page with Auth</Typography>
}
