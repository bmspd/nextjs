import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthService, {
  LoginRequestBody,
  SignUpRequestBody,
} from '../../../http/services/AuthService'
import { tryCatch } from '../../../decorators'
import { setProfile } from '../ProfileSlice/ProfileSlice'
import {
  SignInAuthorizationParams,
  SignInOptions,
  SignInResponse,
  SignOutParams,
} from 'next-auth/react'
import { signOut as nextAuthSignOut, signIn as nextAuthSignIn } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'

export const login = createAsyncThunk(
  'auth/login',
  tryCatch(async (data: LoginRequestBody) => {
    const response = await AuthService.login(data)
    return response.data
  })
)

export const loginByToken = createAsyncThunk('auth/loginByToken', async (arg, { dispatch }) => {
  const response = await AuthService.loginByToken()
  const { profile, ...rest } = response.data
  const formattedProfile = {
    ...rest,
    firstName: profile.first_name,
    secondName: profile.second_name,
    emailVerified: profile.email_verified,
  }
  await dispatch(setProfile(formattedProfile))
  return response.data
})

export const signUp = createAsyncThunk(
  'auth/signup',
  tryCatch(async (data: SignUpRequestBody) => {
    const response = await AuthService.signUp(data)
    return response.data
  })
)

export const signOut = createAsyncThunk(
  'auth/signout',
  async (options?: SignOutParams<false> | undefined) => {
    const response = await nextAuthSignOut(options)
    return response
  }
)

export const signIn = createAsyncThunk<
  SignInResponse | undefined,
  {
    // todo provider должен иметь немного другой тип
    provider?: BuiltInProviderType
    options?: SignInOptions
    authorizationParams?: SignInAuthorizationParams
  }
>('auth/signin', async ({ provider, options, authorizationParams }) => {
  const res = await nextAuthSignIn(provider, options, authorizationParams)
  return res
})
