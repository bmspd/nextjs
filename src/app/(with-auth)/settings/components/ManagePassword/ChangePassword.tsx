'use client'
import PasswordTextField from '@/components/Inputs/PasswordTextField/PasswordTextField'
import {
  DEFAULT_MAXIMUM_CHAR_LENGTH,
  MINIMUM_PASSWORD_LENGTH,
} from '@/constants/validation.constants'
import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
import { useServerErrors } from '@/hooks/useServerErrors'
import { selectSpecificLoading } from '@/store/reducers/LoadingSlice/selectors'
import { enqueueSnackbar } from '@/store/reducers/NotificationsSlice/NotificationsSlice'
import { changePassword } from '@/store/reducers/UserSlice/asyncThunks'
import { SNACKBAR_TYPES } from '@/types/notistack'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Collapse } from '@mui/material'
import { uniqueId } from 'lodash'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import * as yup from 'yup'
import styles from '../../styles.module.scss'
interface IChangePassword {
  password: string
  confirm_password?: string
  new_password: string
}

const changePassSchema = yup.object().shape({
  password: yup.string().required().min(MINIMUM_PASSWORD_LENGTH).max(DEFAULT_MAXIMUM_CHAR_LENGTH),
  new_password: yup
    .string()
    .required()
    .min(MINIMUM_PASSWORD_LENGTH)
    .max(DEFAULT_MAXIMUM_CHAR_LENGTH),
  confirm_password: yup.string().when('new_password', (new_password, schema) => {
    return schema.oneOf(new_password, 'Passwords do not match')
  }),
})

const ChangePassword = () => {
  const dispatch = useTypedDispatch()
  const [showForm, setShowForm] = useState<boolean>(false)
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: '',
    },
    resolver: yupResolver(changePassSchema),
  })
  const setServerErrors = useServerErrors<IChangePassword>(setError)
  const isChanging = useTypedSelector(selectSpecificLoading('user/changePassword'))
  const onSubmit: SubmitHandler<IChangePassword> = async (data) => {
    dispatch(changePassword(data))
      .unwrap()
      .then((res) => {
        dispatch(
          enqueueSnackbar({
            message: res.message,
            options: {
              key: uniqueId(),
              variant: SNACKBAR_TYPES.SUCCESS,
            },
          })
        )
        reset()
        setShowForm(false)
      })
      .catch(setServerErrors)
  }
  return (
    <>
      <Alert
        variant="outlined"
        severity="warning"
        action={
          <Button onClick={() => setShowForm((prev) => !prev)} size="small" variant="text">
            {showForm ? 'Hide' : 'Change'}
          </Button>
        }
      >
        To change your password, provide old one first
      </Alert>
      <Collapse in={showForm}>
        <form className={styles.passwordForm} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordTextField
                {...field}
                label="Old password"
                error={!!errors.password?.message}
                alertMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            name="new_password"
            control={control}
            render={({ field }) => (
              <PasswordTextField
                {...field}
                label="New password"
                error={!!errors.new_password?.message}
                alertMessage={errors.new_password?.message}
              />
            )}
          />
          <Controller
            name="confirm_password"
            control={control}
            render={({ field }) => (
              <PasswordTextField
                {...field}
                label="Confirm password"
                error={!!errors.confirm_password?.message}
                alertMessage={errors.confirm_password?.message}
              />
            )}
          />
          <Button disabled={isChanging} type="submit" variant="contained">
            Change password
          </Button>
        </form>
      </Collapse>
    </>
  )
}

export default ChangePassword
