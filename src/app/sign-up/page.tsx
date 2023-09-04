'use client'

import { Button, Typography } from '@mui/material'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import PasswordTextField from '../../components/Inputs/PasswordTextField/PasswordTextField'
import DefaultTextField from '../../components/Inputs/DefaultTextField/DefaultTextField'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpSchema } from '@/validation/signup.validation'
import { useTypedDispatch } from '@/hooks/typedStoreHooks'
import { signUp } from '@/store/reducers/AuthSlice/asyncThunks'
import { useServerErrors } from '@/hooks/useServerErrors'
import { enqueueSnackbar } from '@/store/reducers/NotificationsSlice/NotificationsSlice'
import { uniqueId } from 'lodash'
import { SNACKBAR_TYPES } from '@/types/notistack'
import { useRouter } from 'next/navigation'
import DefaultAlert from '@/components/Alerts/DefaultAlert'
import LoginWrapper from '@/components/LoginView/LoginWrapper'
import Link from 'next/link'
interface ISignUpForm {
  email: string
  password: string
  username?: string | null
  first_name?: string | null
  second_name?: string | null
}

export default function SignUp() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      username: '',
      first_name: '',
      second_name: '',
    },
    resolver: yupResolver(signUpSchema),
  })
  const router = useRouter()
  const setServerErrors = useServerErrors<ISignUpForm>(setError)
  const dispatch = useTypedDispatch()
  const onSubmit: SubmitHandler<ISignUpForm> = async (data) => {
    // todo подумать как сделать эту логику лучше и правильнее
    const res = await dispatch(signUp(data))
      .unwrap()
      .catch((e) => setServerErrors(e))
    if (res) {
      router.push('/')
      dispatch(
        enqueueSnackbar({
          message: 'You have successfully registered!',
          options: {
            key: uniqueId(),
            variant: SNACKBAR_TYPES.SUCCESS,
          },
        })
      )
    }
  }
  return (
    <LoginWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <DefaultTextField
              {...field}
              label="Email"
              isRequired
              error={!!errors.email?.message}
              alertMessage={errors.email?.message}
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
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <DefaultTextField
              {...field}
              label="Username"
              error={!!errors?.username?.message}
              alertMessage={errors?.username?.message}
            />
          )}
        />
        <Controller
          name="first_name"
          control={control}
          render={({ field }) => (
            <DefaultTextField
              {...field}
              label="First name"
              error={!!errors?.first_name?.message}
              alertMessage={errors?.first_name?.message}
            />
          )}
        />
        <Controller
          name="second_name"
          control={control}
          render={({ field }) => (
            <DefaultTextField
              {...field}
              label="Second name"
              error={!!errors?.second_name?.message}
              alertMessage={errors?.second_name?.message}
            />
          )}
        />
        <Button type="submit" variant="contained">
          Sign Up
        </Button>
        <DefaultAlert
          severity="error"
          message={errors.root?.serverError?.message}
          isOpen={!!errors.root?.serverError?.message}
        />
      </form>
      <Typography sx={{ color: (theme) => theme.palette.text.primary }}>
        Go back to{' '}
        <Link className="default-link" href="/">
          login
        </Link>
      </Typography>
    </LoginWrapper>
  )
}
