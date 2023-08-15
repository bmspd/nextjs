'use client'
import React, { useEffect, useCallback } from 'react'
import MainBlock from '@/components/Blocks/MainBlock'
import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
import { ITask, ITaskWithPagination } from '@/http/services/TaskService'
import { setTasks } from '@/store/reducers/ProjectsSlice/ProjectSlice'
import { selectTasksByProject } from '@/store/reducers/ProjectsSlice/selectors'
import { ColumnDef } from '@tanstack/react-table'
import Table from '@/components/Table/Table'
import { Button } from '@mui/material'
import NextLink from 'next/link'
import { getTasksByProject } from '@/store/reducers/ProjectsSlice/asyncThunks'
import useId from '@mui/material/utils/useId'
import { openModal } from '@/store/reducers/ModalSlice/ModalSlice'
import CreateTasksModal from '@/components/Modals/CreateTasksModal'
const Project: React.FC<{ id: string; serverTasks: ITaskWithPagination }> = ({
  id,
  serverTasks,
}) => {
  const tasks = useTypedSelector(selectTasksByProject(+id)) ?? []
  const formId = useId()
  const tasksData = tasks?.data ?? []
  const tasksPagination = tasks?.meta?.pagination
  const dispatch = useTypedDispatch()
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
          return <NextLink href={`/projects/${id}/task/${taskId}`}>{value}</NextLink>
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
        cell: (/* props */) => (
          <div>
            <Button variant="contained">ACTION</Button>
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
        <Button
          onClick={() => {
            dispatch(openModal(CreateTasksModal(formId)))
          }}
        >
          Create Task
        </Button>
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
