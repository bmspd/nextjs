'use client'
import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
import { CreateProjectBody } from '@/http/services/ProjectsService'
import { selectSpecificLoading } from '@/store/reducers/LoadingSlice/selectors'
import { DialogModalProps } from '@/store/reducers/ModalSlice/ModalSlice'
import { enqueueSnackbar } from '@/store/reducers/NotificationsSlice/NotificationsSlice'
import { createProject, getProjectLogo } from '@/store/reducers/ProjectsSlice/asyncThunks'
import { SNACKBAR_TYPES } from '@/types/notistack'
import { createProjectSchema } from '@/validation/project.validations'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import { uniqueId } from 'lodash'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import DefaultTextField from '../Inputs/DefaultTextField/DefaultTextField'
import styles from './style.module.scss'
import ImageUpload from '../Image/ImageUpload/ImageUpload'
import { useState } from 'react'
import Select from '../Select/Select'
import {
  PROJECT_PATTERNS_COLORS_OPTIONS,
  PROJECT_PATTERNS_TYPES_OPTIONS,
} from '@/constants/projects.constants'

const Content: React.FC<{ formId: string | undefined; handleClose: () => void }> = ({
  formId,
  handleClose,
}) => {
  const filesState = useState<File[]>([])
  const [files] = filesState
  const dispatch = useTypedDispatch()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', pattern_type: null, pattern_color: null },
    resolver: yupResolver(createProjectSchema),
  })
  const onSubmit: SubmitHandler<CreateProjectBody> = async (data) => {
    if (files.length) {
      data['image'] = files[0]
    }
    await dispatch(createProject(data))
      .unwrap()
      .then((res) => {
        if (res.logo_id) dispatch(getProjectLogo({ id: res.id }))
        dispatch(
          enqueueSnackbar({
            message: 'New project was created',
            options: {
              key: uniqueId(),
              variant: SNACKBAR_TYPES.SUCCESS,
            },
          })
        )
      })
    handleClose()
  }
  return (
    <form className={styles.createProjectModal} id={formId} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <DefaultTextField
            {...field}
            label="Project name"
            isRequired
            autoComplete="off"
            type="text"
            error={!!errors.name?.message}
            alertMessage={errors.name?.message}
          />
        )}
      />
      <Controller
        name="pattern_type"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            placeholder="Background pattern"
            options={PROJECT_PATTERNS_TYPES_OPTIONS}
          />
        )}
      />
      <Controller
        name="pattern_color"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            placeholder="Background color"
            options={PROJECT_PATTERNS_COLORS_OPTIONS}
          />
        )}
      />
      <ImageUpload filesState={filesState} />
    </form>
  )
}
const CancelBtn: React.FC<{ handleClose: () => void }> = ({ handleClose }) => (
  <Button onClick={handleClose} variant="outlined">
    Cancel
  </Button>
)
const ApplyBtn: React.FC<{ formId: string | undefined }> = ({ formId }) => {
  const isLoading = useTypedSelector(selectSpecificLoading('projects/createProject'))
  return (
    <Button disabled={isLoading} form={formId} type="submit" variant="contained">
      Create
    </Button>
  )
}
export const CreateProjectModal = (formId: string | undefined): DialogModalProps => {
  return {
    content: ({ handleClose }) => <Content handleClose={handleClose} formId={formId} />,
    actions: ({ handleClose }) => [
      <CancelBtn key="cancel-btn" handleClose={handleClose} />,
      <ApplyBtn formId={formId} key="apply-btn" />,
    ],
    title: 'Create new project',
  }
}
