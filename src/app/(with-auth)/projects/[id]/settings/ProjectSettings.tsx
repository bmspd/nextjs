'use client'
import MainBlock from '@/components/Blocks/MainBlock'
import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
import { IProject, UpdateProjectBody } from '@/http/services/ProjectsService'
import { setProjectById } from '@/store/reducers/ProjectsSlice/ProjectSlice'
import { selectProjectById, selectProjectLogo } from '@/store/reducers/ProjectsSlice/selectors'
import { updateProjectSchema } from '@/validation/project.validations'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState, useMemo, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import styles from './style.module.scss'
import DefaultTextField from '@/components/Inputs/DefaultTextField/DefaultTextField'
import { Button } from '@mui/material'
import { getProjectLogo, updateProject } from '@/store/reducers/ProjectsSlice/asyncThunks'
import Select from '@/components/Select/Select'
import ImageUpload from '@/components/Image/ImageUpload/ImageUpload'
import {
  PROJECT_PATTERNS_COLORS_OPTIONS,
  PROJECT_PATTERNS_TYPES_OPTIONS,
} from '@/constants/projects.constants'
import { useDidMount } from '@/hooks/useDidMount'
import { enqueueSnackbar } from '@/store/reducers/NotificationsSlice/NotificationsSlice'
import { uniqueId } from 'lodash'
import { SNACKBAR_TYPES } from '@/types/notistack'
const ProjectSettings = ({ id, serverProject }: { id: string; serverProject: IProject }) => {
  const project = useTypedSelector(selectProjectById(+id))
  const projectLogo = useTypedSelector(selectProjectLogo(+id))
  const dispatch = useTypedDispatch()
  const initialized = useRef(false)
  if (!initialized.current) {
    initialized.current = true
    if (!project) dispatch(setProjectById(serverProject))
    if (serverProject.logo?.id && !projectLogo) dispatch(getProjectLogo({ id: serverProject.id }))
  }
  const didMount = useDidMount()
  const filesState = useState<File[]>([])
  const logoIdentifier = useMemo(() => uuidv4(), [])
  const [files, setFiles] = filesState

  useEffect(() => {
    if (didMount && !projectLogo) return
    if (projectLogo) {
      fetch(projectLogo.imgSource)
        .then((r) => r.blob())
        .then((blobFile) => new File([blobFile], logoIdentifier))
        .then((fileFromblob) => setFiles([fileFromblob]))
    } else {
      setFiles([])
    }
  }, [projectLogo])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: project?.name ?? serverProject?.name,
      // при ассинхронной смене значения - в Select value не подставляется
      // чтобы не ставить useEffect с setValue решил так
      pattern_color:
        project?.pattern_color === undefined
          ? serverProject?.pattern_color
          : project?.pattern_color,
      pattern_type:
        project?.pattern_type === undefined ? serverProject?.pattern_type : project?.pattern_type,
    },
    resolver: yupResolver(updateProjectSchema),
  })
  const onSubmit: SubmitHandler<UpdateProjectBody> = async (data) => {
    if (!files.length) data['image'] = null
    else if (files[0]?.name !== logoIdentifier) data['image'] = files[0]
    else data['same_logo'] = true
    dispatch(updateProject({ projectId: +id, data }))
      .unwrap()
      .then(() => {
        dispatch(
          enqueueSnackbar({
            message: 'Project updated',
            options: {
              key: uniqueId(),
              variant: SNACKBAR_TYPES.SUCCESS,
            },
          })
        )
        if (!data.same_logo) dispatch(getProjectLogo({ id: +id }))
      })
  }

  return (
    <>
      <MainBlock sx={{ marginTop: 4 }}>
        <form className={styles.updateProjectForm} onSubmit={handleSubmit(onSubmit)}>
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
                isClearable
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
                isClearable
              />
            )}
          />
          <ImageUpload filesState={filesState} />
          <Button type="submit">Update project</Button>
        </form>
      </MainBlock>
    </>
  )
}

export default ProjectSettings
