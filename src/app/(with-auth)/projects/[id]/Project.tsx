'use client'
import React, { useEffect, useCallback, useId } from 'react'
import MainBlock from '@/components/Blocks/MainBlock'
import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
import { ITask, ITaskWithPagination } from '@/http/services/TaskService'
import { deleteProjectById, setTasks } from '@/store/reducers/ProjectsSlice/ProjectSlice'
import { selectTasksByProject } from '@/store/reducers/ProjectsSlice/selectors'
import { CellContext, ColumnDef } from '@tanstack/react-table'
import Table from '@/components/Table/Table'
import { Button, IconButton } from '@mui/material'
import NextLink from 'next/link'
import {
  deleteProject,
  deleteTask,
  getTasksByProject,
} from '@/store/reducers/ProjectsSlice/asyncThunks'
import { openModal } from '@/store/reducers/ModalSlice/ModalSlice'
import CreateTasksModal from '@/components/Modals/CreateTasksModal'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import { ConfirmationModal } from '@/components/Modals/ConfirmationModal'
import { enqueueSnackbar } from '@/store/reducers/NotificationsSlice/NotificationsSlice'
import { uniqueId } from 'lodash'
import { SNACKBAR_TYPES } from '@/types/notistack'
import { useRouter } from 'next/navigation'
const Project: React.FC<{ id: string; serverTasks: ITaskWithPagination }> = ({
  id,
  serverTasks,
}) => {
  const tasks = useTypedSelector(selectTasksByProject(+id)) ?? []
  const formId = useId()
  const tasksData = tasks?.data ?? []
  const tasksPagination = tasks?.meta?.pagination
  const dispatch = useTypedDispatch()
  const router = useRouter()
  const onPaginationChange = useCallback(
    (pageNumber: number, rowsPerPage: number) => {
      dispatch(
        getTasksByProject({ projectId: id, params: { page: pageNumber, per_page: rowsPerPage } })
      )
    },
    [id]
  )
  useEffect(() => {
    dispatch(setTasks({ project_id: +id, tasks: serverTasks }))
  }, [])
  const deleteProjectCb = useCallback(() => {
    dispatch(deleteProject({ id: +id }))
      .unwrap()
      .then((res) => {
        dispatch(deleteProjectById(+id))
        router.push('/projects')
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
  }, [])
  const applyCb = useCallback(
    (props: CellContext<ITask, unknown>) => () => {
      dispatch(deleteTask({ projectId: id, taskId: props.row.getValue('id') }))
        .unwrap()
        .then((res) => {
          router.refresh()
          dispatch(
            getTasksByProject({
              projectId: id,
              params: { page: 1, per_page: 10 },
            })
          )
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
    },
    []
  )
  const columns = React.useMemo<ColumnDef<ITask>[]>(
    () => [
      { header: 'ID', accessorKey: 'id' },
      {
        header: 'Title',
        accessorKey: 'title',
        cell(props) {
          const taskId = props.row.original.id
          const value = props.getValue<string>()
          // relative path works without projectId D:
          return (
            <NextLink className="default-link" href={`/projects/${id}/task/${taskId}`}>
              {value}
            </NextLink>
          )
        },
      },
      { header: 'Description', accessorKey: 'description' },
      { header: 'Status', accessorKey: 'status' },
      { header: 'Priority', accessorKey: 'priority' },
      { header: 'Creator', accessorKey: 'creator.id' },
      { header: 'Executor', accessorKey: 'executor.id' },
      {
        header: 'Actions',
        id: 'actions',
        cell: (props) => (
          <div>
            <IconButton
              onClick={() =>
                dispatch(
                  openModal(
                    ConfirmationModal({
                      applyCb: applyCb(props),
                      text: 'Are you sure you want to delete this task?',
                      title: 'Delete task',
                      deleteFunc: 'projects/deleteTask',
                    })
                  )
                )
              }
              aria-label="delete"
              size="large"
            >
              <DeleteRoundedIcon fontSize="inherit" />
            </IconButton>
          </div>
        ),
      },
    ],
    []
  )
  return (
    <>
      <MainBlock sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>PROJECT {id}</div>
        <div>
          <Button
            color="error"
            onClick={() => {
              dispatch(
                openModal(
                  ConfirmationModal({
                    applyCb: deleteProjectCb,
                    title: 'Delete project',
                    text: 'Are you sure you want to delete this project?',
                  })
                )
              )
            }}
          >
            Delete Project
          </Button>
          <Button
            onClick={() => {
              dispatch(openModal(CreateTasksModal(formId)))
            }}
          >
            Create Task
          </Button>
        </div>
      </MainBlock>
      <MainBlock sx={{ marginTop: 4 }}>
        <Table<ITask>
          data={tasksData}
          columns={columns}
          pagination={tasksPagination}
          onPaginationChange={onPaginationChange}
        />
      </MainBlock>
    </>
  )
}

export default Project
