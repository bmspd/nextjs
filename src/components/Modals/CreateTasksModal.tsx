'use client'
import { ICreateTaskForm } from '@/http/services/TaskService'
import { createTaskSchema } from '@/validation/task.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import DefaultTextField from '../Inputs/DefaultTextField/DefaultTextField'
import { Button } from '@mui/material'
import { DialogModalProps } from '@/store/reducers/ModalSlice/ModalSlice'
import styles from './style.module.scss'
import Select from '../Select/Select'
import { useParams } from 'next/navigation'
import {
  TASK_DEFAULT_PRIORITY,
  TASK_DEFAULT_STATUS,
  TASK_PRIORITIES_OPTIONS,
  TASK_STATUSES_OPTIONS,
} from '@/constants/tasks.constants'
import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
import {
  createTask,
  getTasksByProject,
  getUsersByProject,
} from '@/store/reducers/ProjectsSlice/asyncThunks'
import { enqueueSnackbar } from '@/store/reducers/NotificationsSlice/NotificationsSlice'
import { uniqueId } from 'lodash'
import { selectSpecificLoading } from '@/store/reducers/LoadingSlice/selectors'
import { SNACKBAR_TYPES } from '@/types/notistack'
import {
  selectTasksByProject,
  selectUsersByProject,
} from '@/store/reducers/ProjectsSlice/selectors'
import AsyncSelect from '../Select/AsyncSelect'
import { useRouter } from 'next/navigation'
import { IUserInProjectWithPagination } from '@/http/services/ProjectsService'
const Content: React.FC<{ formId: string | undefined; handlelose: () => void }> = ({
  formId,
  handlelose,
}) => {
  const dispatch = useTypedDispatch()
  const params = useParams()
  const router = useRouter()
  const tasks = useTypedSelector(selectTasksByProject(+params.id))
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: TASK_DEFAULT_STATUS,
      priority: TASK_DEFAULT_PRIORITY,
      title: '',
      description: '',
    },
    resolver: yupResolver(createTaskSchema),
  })
  const onSubmit: SubmitHandler<ICreateTaskForm> = async (data) => {
    const { executor, ...rest } = data
    await dispatch(
      createTask({ projectId: params.id as string, body: { ...rest, executor_id: executor.id } })
    )
      .unwrap()
      .then(() => {
        dispatch(
          enqueueSnackbar({
            message: 'Task was created successfully',
            options: {
              key: uniqueId(),
              variant: SNACKBAR_TYPES.SUCCESS,
            },
          })
        )
        dispatch(
          getTasksByProject({
            projectId: params.id as string,
            params: { page: 1, per_page: tasks.meta.pagination.per_page },
          })
          // need to invalidate cache from tasks
        ).then(() => router.refresh())
      })

    handlelose()
  }

  return (
    <form className={styles.createTaskModal} id={formId} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <DefaultTextField
            {...field}
            label="Title"
            isRequired
            autoComplete="off"
            type="text"
            error={!!errors.title?.message}
            alertMessage={errors.title?.message}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <DefaultTextField
            {...field}
            label="Description"
            autoComplete="off"
            type="text"
            error={!!errors.description?.message}
            alertMessage={errors.description?.message}
          />
        )}
      />
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Select {...field} placeholder="Status" options={TASK_STATUSES_OPTIONS} />
        )}
      ></Controller>
      <Controller
        name="priority"
        control={control}
        render={({ field }) => (
          <Select {...field} placeholder="Priority" options={TASK_PRIORITIES_OPTIONS} />
        )}
      ></Controller>
      <Controller
        name="executor"
        control={control}
        render={({ field }) => {
          return (
            <AsyncSelect<IUserInProjectWithPagination>
              label="Executor"
              controlProps={{ ...field }}
              valueField="id"
              labelField="username"
              selector={selectUsersByProject(+params.id)}
              fetchCallback={(page, per_page, timestamp?) =>
                dispatch(
                  getUsersByProject({
                    projectId: +params.id,
                    params: { page, per_page },
                    timestamp,
                  })
                )
              }
              loadingFunc="projects/getUsersByProject"
              error={!!errors.executor?.message}
              alertMessage={errors.executor?.message}
            />
          )
        }}
      ></Controller>
    </form>
  )
}
const CancelBtn: React.FC<{ handleClose: () => void }> = ({ handleClose }) => (
  <Button onClick={handleClose} variant="outlined">
    Cancel
  </Button>
)
const ApplyBtn: React.FC<{ formId: string | undefined }> = ({ formId }) => {
  const isCreating = useTypedSelector(selectSpecificLoading('projects/createTask'))
  const isFetching = useTypedSelector(selectSpecificLoading('projects/getTasksByProject'))
  const isLoading = isCreating || isFetching
  return (
    <Button disabled={isLoading} form={formId} type="submit" variant="contained">
      Create
    </Button>
  )
}
const CreateTasksModal = (formId: string | undefined): DialogModalProps => {
  return {
    content: ({ handleClose }) => <Content handlelose={handleClose} formId={formId} />,
    actions: ({ handleClose }) => [
      <CancelBtn key="cancel-btn" handleClose={handleClose} />,
      <ApplyBtn formId={formId} key="apply-btn" />,
    ],
    title: 'Create new task',
  }
}

export default CreateTasksModal
