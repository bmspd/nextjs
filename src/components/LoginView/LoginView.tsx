import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import DefaultTextField from '../Inputs/DefaultTextField/DefaultTextField'
import PasswordTextField from '../Inputs/PasswordTextField/PasswordTextField'
import { Button } from '@mui/material'
import DefaultAlert from '../Alerts/DefaultAlert'
import Link from 'next/link'
import { yupResolver } from '@hookform/resolvers/yup'
import { logInSchema } from '@/validation/login.validation'
import { useTypedDispatch } from '@/hooks/typedStoreHooks'
import { signIn } from '@/store/reducers/AuthSlice/asyncThunks'
import { SignInResponse } from 'next-auth/react'

interface ILogInForm {
  username: string
  password: string
}

const LoginView: React.FC<{ reset?: () => void }> = ({ reset }) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { username: '', password: '' },
    resolver: yupResolver(logInSchema),
  })
  const dispatch = useTypedDispatch()
  const onSubmit: SubmitHandler<ILogInForm> = async (data) => {
    const res = await dispatch(
      signIn({ provider: 'credentials', options: { ...data, redirect: false } })
    )
    const payload = res.payload as SignInResponse | undefined

    if (payload?.error) setError('root.serverError', { message: payload?.error })
    else if (reset) reset()
  }
  return (
    <div className={styles.logInContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          variant="contained"
          onClick={() => dispatch(signIn({ provider: 'google', options: { redirect: false } }))}
        >
          GOOGLE BUTTON
        </Button>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <DefaultTextField
              {...field}
              label="Username or email"
              isRequired
              error={!!errors.username?.message}
              alertMessage={errors.username?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordTextField
              {...field}
              label="Password"
              isRequired
              error={!!errors.password?.message}
              alertMessage={errors.password?.message}
            />
          )}
        />
        <Button type="submit" variant="contained">
          Log in
        </Button>
        <DefaultAlert
          severity="error"
          message={errors.root?.serverError?.message}
          isOpen={!!errors.root?.serverError?.message}
        />
      </form>
      <p>
        <Link href="sign-up">Sign up</Link>, if you has not registered yet
      </p>
    </div>
  )
}

export default LoginView
