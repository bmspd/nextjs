'use client'

import React from 'react'
import { useTypedSelector } from '@/hooks/typedStoreHooks'
import { selectProfile } from '@/store/reducers/ProfileSlice/selectors'
import MainBlock from '@/components/Blocks/MainBlock'

export default function Home() {
  const profile = useTypedSelector(selectProfile)
  return (
    <div>
      <MainBlock>{JSON.stringify(profile)}</MainBlock>
    </div>
  )
}
