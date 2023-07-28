import MainBlock from '@/components/Blocks/MainBlock'
import DefaultTextField from '@/components/Inputs/DefaultTextField/DefaultTextField'
import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
import { enqueueSnackbar } from '@/store/reducers/NotificationsSlice/NotificationsSlice'
import { updateProfile } from '@/store/reducers/ProfileSlice/asyncThunks'
import { SNACKBAR_TYPES } from '@/types/notistack'
import { Button, IconButton, Typography } from '@mui/material'
import { uniqueId } from 'lodash'
import React, { useState } from 'react'
import { Controller, SubmitHandler, useFormContext } from 'react-hook-form'
import { IProfileInfo } from '../page'
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded'
import styles from '../styles.module.scss'
import { selectLoading } from '@/store/reducers/LoadingSlice/selectors'
const disabledCustomStyles = {
  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: 'rgba(0,0,0,0.87)',
  },
}
const EditProfileData = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useFormContext()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const dispatch = useTypedDispatch()
  const isLoading = useTypedSelector(selectLoading)
  const onSubmit: SubmitHandler<IProfileInfo> = async (data) => {
    const res = await dispatch(updateProfile(data)).unwrap().catch()
    if (res) {
      dispatch(
        enqueueSnackbar({
          message: 'Profile updated',
          options: {
            key: uniqueId(),
            variant: SNACKBAR_TYPES.SUCCESS,
          },
        })
      )
    }
  }
  return (
    <MainBlock className={styles.profilePageBlock}>
      <div className={styles.editProfileHeader}>
        <Typography variant="h5">Edit profile</Typography>
        <IconButton
          onClick={() =>
            setIsEdit((prev) => {
              reset()
              return !prev
            })
          }
          size="small"
        >
          <EditNoteRoundedIcon fontSize="large" />
        </IconButton>
      </div>
      <form className={styles.editProfileForm} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="first_name"
          control={control}
          render={({ field }) => (
            <DefaultTextField
              sx={disabledCustomStyles}
              {...field}
              disabled={!isEdit}
              autoComplete="off"
              label="First name"
              error={!!errors.first_name?.message}
            />
          )}
        />
        <Controller
          name="second_name"
          control={control}
          render={({ field }) => (
            <DefaultTextField
              sx={disabledCustomStyles}
              {...field}
              disabled={!isEdit}
              label="Second name"
              autoComplete="off"
              error={!!errors.second_name?.message}
            />
          )}
        />
        {isEdit && (
          <Button disabled={isLoading} type="submit" variant="contained">
            Update profile
          </Button>
        )}
      </form>
    </MainBlock>
  )
}

export default EditProfileData
