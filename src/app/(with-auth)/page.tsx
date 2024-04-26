'use client'

import React from 'react'
import { useTypedSelector } from '@/hooks/typedStoreHooks'
import { selectProfile } from '@/store/reducers/ProfileSlice/selectors'
import MainBlock from '@/components/Blocks/MainBlock'
import { Button } from '@mui/material'
import $api from '@/http'

export default function Home() {
  const profile = useTypedSelector(selectProfile)
  return (
    <div>
      <MainBlock>
        <div>{JSON.stringify(profile)}</div>
        <div>
          <Button variant="contained" onClick={() => $api.get('/1')}>
            AUTH BUTTON
          </Button>
        </div>
      </MainBlock>
    </div>
  )
}
