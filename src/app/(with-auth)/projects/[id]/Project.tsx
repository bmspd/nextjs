'use client'
import React, { useCallback, useRef } from 'react'
import MainBlock from '@/components/Blocks/MainBlock'
import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
import { ITask, ITaskWithPagination } from '@/http/services/TaskService'
import { setProjectById, setTasks } from '@/store/reducers/ProjectsSlice/ProjectSlice'
import noImage from '/public/assets/images/no-image.jpg'
import {
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
import { selectProfile } from '@/store/reducers/ProfileSlice/selectors'
const Project: React.FC<{
  id: string
  serverTasks: ITaskWithPagination
  serverProject: IProject
}> = ({ id, serverTasks, serverProject }) => {
  const dispatch = useTypedDispatch()
  const projectLogo = useTypedSelector(selectProjectLogo(+id))
  const initialized = useRef(false)
  if (!initialized.current) {
    initialized.current = true
    dispatch(setProjectById(serverProject))
    dispatch(setTasks({ project_id: +id, tasks: serverTasks }))
    if (serverProject.logo?.id && !projectLogo) dispatch(getProjectLogo({ id: serverProject.id }))
  }
  const tasks = useTypedSelector(selectTasksByProject(+id))
  const project = useTypedSelector(selectProjectById(+id))
  const profile = useTypedSelector(selectProfile)
  const tasksData = tasks?.data ?? []
  const tasksPagination = tasks?.meta?.pagination
  const onPaginationChange = useCallback(
    (pageNumber: number, rowsPerPage: number) => {
      dispatch(
        getTasksByProject({ projectId: id, params: { page: pageNumber, per_page: rowsPerPage } })
      )
    },
    [id]
  )
  const columns = Columns(id)
  return (
    <>
      <MainBlock sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ height: 50, width: 50, position: 'relative' }}>
          <Image
            src={projectLogo?.imgSource ?? noImage}
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
      <div style={{ marginTop: '32px' }}>
        {project?.creator?.id === profile.id ? 'YOU ARE THE OWNER' : 'YOU ARE JUST A MEMBER'}
      </div>
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
