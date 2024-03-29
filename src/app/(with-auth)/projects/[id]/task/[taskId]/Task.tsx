'use client'
import MainBlock from '@/components/Blocks/MainBlock'
import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
import { ITask } from '@/http/services/TaskService'
import { setTaskByProjectById } from '@/store/reducers/ProjectsSlice/ProjectSlice'
import { getProjectById } from '@/store/reducers/ProjectsSlice/asyncThunks'
import {
  selectProjectById,
  selectTaskByProjectById,
} from '@/store/reducers/ProjectsSlice/selectors'
import { Typography } from '@mui/material'
import React, { useRef } from 'react'
import styles from './styles.module.scss'
import UserProfile from '@/components/Avatars/UserProfile/UserProfile'
import moment from 'moment'
import ExecutorField from './components/ExecutorField'
import StatusField from './components/StatusField'
import PriorityField from './components/PriorityField'
import TaskMainInfo from './components/TaskMainInfo'
type TaskProps = {
  projectId: string
  taskId: string
  serverTask: ITask
}

const Task: React.FC<TaskProps> = ({ projectId, taskId, serverTask }) => {
  const project = useTypedSelector(selectProjectById(+projectId))
  const task = useTypedSelector(selectTaskByProjectById(+projectId, +taskId))
  const dispatch = useTypedDispatch()
  const initialized = useRef(false)
  if (!initialized.current) {
    initialized.current = true
    // preload project data if it's not still there, probably need to load logo too...
    // не очень понятно, как это работает, но лишний раз сюда заходит
    if (!task) dispatch(setTaskByProjectById({ projectId, task: serverTask }))
    if (!project) dispatch(getProjectById({ id: +projectId }))
  }
  return (
    <div className={styles.taskPage}>
      <TaskMainInfo
        title={task?.title}
        description={task?.description}
        taskId={taskId}
        projectId={projectId}
      />
      <MainBlock className={styles.taskExtraInfo}>
        <StatusField projectId={projectId} taskId={taskId} status={task?.status} />
        <PriorityField projectId={projectId} taskId={taskId} priority={task?.priority} />
        <Typography>
          Creator: <UserProfile styles={{ width: '100%' }} username={task?.creator.username} />
        </Typography>
        <ExecutorField projectId={projectId} taskId={taskId} executor={task?.executor} />
        <Typography>Created at: {moment(task?.createdAt).format('DD-MM-YYYY HH:mm')}</Typography>
        <Typography>Updated at: {moment(task?.updatedAt).format('DD-MM-YYYY HH:mm')}</Typography>
      </MainBlock>
    </div>
  )
}

export default Task
