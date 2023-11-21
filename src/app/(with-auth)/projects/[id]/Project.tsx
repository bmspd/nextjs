'use client'
import React, { useEffect, useCallback } from 'react'
import MainBlock from '@/components/Blocks/MainBlock'
import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
import { ITask, ITaskWithPagination } from '@/http/services/TaskService'
import { setProjectById, setTasks } from '@/store/reducers/ProjectsSlice/ProjectSlice'
import {
  selectPreloaded,
  selectProjectById,
  selectProjectLogo,
  selectTasksByProject,
} from '@/store/reducers/ProjectsSlice/selectors'
import Table from '@/components/Table/Table'
import { getProjectLogo, getTasksByProject } from '@/store/reducers/ProjectsSlice/asyncThunks'
import Image from 'next/image'
import { IProject } from '@/http/services/ProjectsService'
import HeaderIconsControls from './components/HeaderIconsControls'
import { Columns } from './columns'
const Project: React.FC<{
  id: string
  serverTasks: ITaskWithPagination
  serverProject: IProject
}> = ({ id, serverTasks, serverProject }) => {
  const tasks = useTypedSelector(selectTasksByProject(+id)) ?? []
  const project = useTypedSelector(selectProjectById(+id))
  const projectLogo = useTypedSelector(selectProjectLogo(+id))
  const preloadedProject = useTypedSelector(selectPreloaded(`project.${id}`))
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
    if (!preloadedProject) {
      dispatch(setProjectById(serverProject))
      if (serverProject.logo?.id) dispatch(getProjectLogo({ id: serverProject.id }))
    }
  }, [])

  const columns = Columns(id)
  return (
    <>
      <MainBlock sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ height: 50, width: 50, position: 'relative' }}>
          <Image
            src={projectLogo?.imgSource}
            fill={true}
            style={{ objectFit: 'cover', borderRadius: '16px' }}
            alt=""
          />
        </div>
        <div>
          {project?.name} #{project?.id}
        </div>
        <HeaderIconsControls id={id} />
      </MainBlock>
      <MainBlock sx={{ marginTop: 4, padding: 0 }}>
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
