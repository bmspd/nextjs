'use client'

import React from 'react'
import { useTypedSelector } from '@/hooks/typedStoreHooks'
import { selectProfile } from '@/store/reducers/ProfileSlice/selectors'

export default function Home() {
  const profile = useTypedSelector(selectProfile)
  return (
    <div>
      {JSON.stringify(profile)}
      <br />
    </div>
  )
}
