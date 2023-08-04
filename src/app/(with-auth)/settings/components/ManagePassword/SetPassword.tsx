import PasswordTextField from '@/components/Inputs/PasswordTextField/PasswordTextField'
import {
  DEFAULT_MAXIMUM_CHAR_LENGTH,
  MINIMUM_PASSWORD_LENGTH,
} from '@/constants/validation.constants'
import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
import { selectSpecificLoading } from '@/store/reducers/LoadingSlice/selectors'
import { enqueueSnackbar } from '@/store/reducers/NotificationsSlice/NotificationsSlice'
import { createPassword } from '@/store/reducers/UserSlice/asyncThunks'
import { SNACKBAR_TYPES } from '@/types/notistack'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Collapse } from '@mui/material'
import { uniqueId } from 'lodash'
import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import styles from '../../styles.module.scss'
interface ISetPassword {
  password: string
  confirm_password?: string
}
const setPassSchema = yup.object().shape({
  password: yup.string().required().min(MINIMUM_PASSWORD_LENGTH).max(DEFAULT_MAXIMUM_CHAR_LENGTH),
  confirm_password: yup.string().when('password', (password, schema) => {
    return schema.oneOf(password, 'Passwords do not match')
  }),
})
const SetPassword = () => {
  const dispatch = useTypedDispatch()
  const [showForm, setShowForm] = useState<boolean>(false)
  const isCreating = useTypedSelector(selectSpecificLoading('user/createPassword'))
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { password: '', confirm_password: '' },
    resolver: yupResolver(setPassSchema),
  })
  const onSubmit: SubmitHandler<ISetPassword> = async (data) => {
    dispatch(createPassword(data))
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
      })
  }
  return (
    <>
      <Alert
        variant="outlined"
        severity="warning"
        action={
          <Button onClick={() => setShowForm((prev) => !prev)} size="small" variant="text">
            {showForm ? 'Hide' : 'Create'}
          </Button>
        }
      >
        Registered through outter service, need to set personal password
      </Alert>
      <Collapse in={showForm}>
        <form className={styles.passwordForm} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordTextField
                {...field}
                label="New password"
                error={!!errors.password?.message}
                alertMessage={errors.password?.message}
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
          <Button disabled={isCreating} type="submit" variant="contained">
            Set password
          </Button>
        </form>
      </Collapse>
    </>
  )
}

export default SetPassword
