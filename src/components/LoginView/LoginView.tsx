import React from 'react'
import { useServerErrors } from '../../hooks/useServerErrors'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { login } from '../../store/reducers/AuthSlice/asyncThunks'
import { useTypedDispatch } from '../../hooks/typedStoreHooks'
import styles from './styles.module.scss'
import DefaultTextField from '../Inputs/DefaultTextField/DefaultTextField'
import PasswordTextField from '../Inputs/PasswordTextField/PasswordTextField'
import { Button } from '@mui/material'
import DefaultAlert from '../Alerts/DefaultAlert'
import Link from 'next/link'
import { yupResolver } from '@hookform/resolvers/yup'
import { logInSchema } from '../../validation/login.validation'

interface ILogInForm {
  username: string
  password: string
}

const LoginView = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { username: '', password: '' },
    resolver: yupResolver(logInSchema),
  })
  const setServerErrors = useServerErrors<ILogInForm>(setError)
  const onSubmit: SubmitHandler<ILogInForm> = async (data) => {
    await dispatch(login(data)).then(setServerErrors)
  }
  const dispatch = useTypedDispatch()
  return (
    <div className={styles.logInContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
