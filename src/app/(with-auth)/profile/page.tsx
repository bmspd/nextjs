'use client'

import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTypedSelector } from '@/hooks/typedStoreHooks'
import { selectProfile } from '@/store/reducers/ProfileSlice/selectors'
import EditProfileData from './components/EditProfileData'
import VerifyEmail from './components/VerifyEmail'
import styles from './styles.module.scss'
export interface IProfileInfo {
  first_name?: string | null
  second_name?: string | null
}

export default function Profile() {
  const profile = useTypedSelector(selectProfile)
  const methods = useForm({
    defaultValues: {
      first_name: profile.firstName ?? '',
      second_name: profile.secondName ?? '',
    },
    values: {
      first_name: profile.firstName ?? '',
      second_name: profile.secondName ?? '',
    },
  })
  return (
    <div className={styles.profilePage}>
      <FormProvider {...methods}>
        <EditProfileData />
      </FormProvider>
      <VerifyEmail />
    </div>
  )
}
