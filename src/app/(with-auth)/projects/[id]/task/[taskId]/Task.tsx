'use client'
import MainBlock from '@/components/Blocks/MainBlock'
import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
import { ITask } from '@/http/services/TaskService'
import { setTaskByProjectById } from '@/store/reducers/ProjectsSlice/ProjectSlice'
import { getProjectById } from '@/store/reducers/ProjectsSlice/asyncThunks'
import {
  selectPreloaded,
  selectProjectById,
  selectTaskByProjectById,
} from '@/store/reducers/ProjectsSlice/selectors'
import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import UserProfile from '@/components/Avatars/UserProfile/UserProfile'
import moment from 'moment'
import ExecutorField from './components/ExecutorField'
import StatusField from './components/StatusField'
import PriorityField from './components/PriorityField'
type TaskProps = {
  projectId: string
  taskId: string
  serverTask: ITask
}

const Task: React.FC<TaskProps> = ({ projectId, taskId, serverTask }) => {
  const project = useTypedSelector(selectProjectById(+projectId))
  const task = useTypedSelector(selectTaskByProjectById(+projectId, +taskId))
  const preloadedTask = useTypedSelector(selectPreloaded(`project-${projectId}.task-${taskId}`))
  const dispatch = useTypedDispatch()
  useEffect(() => {
    // preload project data if it's not still there, probably need to load logo too...
    if (!preloadedTask) dispatch(setTaskByProjectById({ projectId, task: serverTask }))
    if (!project) dispatch(getProjectById({ id: +projectId }))
  }, [])
  return (
    <div className={styles.taskPage}>
      <MainBlock className={styles.taskMainInfo}>
        <Typography variant="h5">{task?.title}</Typography>
        <Typography>{task?.description}</Typography>
      </MainBlock>
      <MainBlock className={styles.taskExtraInfo}>
        <StatusField projectId={projectId} taskId={taskId} status={task?.status} />
        <PriorityField projectId={projectId} taskId={taskId} priority={task?.priority} />
        <Typography>
          Creator: <UserProfile username={task?.creator.username} />
        </Typography>
        <ExecutorField projectId={projectId} taskId={taskId} executor={task?.executor} />
        <Typography>Created at: {moment(task?.createdAt).format('DD-MM-YYYY HH:mm')}</Typography>
        <Typography>Updated at: {moment(task?.updatedAt).format('DD-MM-YYYY HH:mm')}</Typography>
      </MainBlock>
    </div>
  )
}

export default Task
