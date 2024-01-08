import React, { useEffect, useState } from 'react'
import styles from '../styles.module.scss'
import MainBlock from '@/components/Blocks/MainBlock'
import { IconButton, Typography } from '@mui/material'
import { ITask } from '@/http/services/TaskService'
import { IdType } from '@/types/common'
import { useTypedDispatch } from '@/hooks/typedStoreHooks'
import { CancelRounded, EditRounded, SaveRounded } from '@mui/icons-material'
import DefaultTextField from '@/components/Inputs/DefaultTextField/DefaultTextField'
import { updateTask } from '@/store/reducers/ProjectsSlice/asyncThunks'
type TaskMainInfoProps = {
  title?: ITask['title']
  description?: ITask['description']
  projectId: IdType
  taskId: IdType
}
const TaskMainInfo: React.FC<TaskMainInfoProps> = ({ projectId, taskId, title, description }) => {
  const dispatch = useTypedDispatch()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [values, setValues] = useState<{
    title?: ITask['title']
    description?: ITask['description']
  }>({ title, description })
  useEffect(() => {
    if (title || description) setValues({ title, description })
  }, [title, description])
  return (
    <MainBlock sx={{ pt: '45px' }} className={styles.taskMainInfo}>
      <div className={styles.mainInfoHeader}>
        {isEdit && (
          <IconButton
            onClick={() => {
              dispatch(
                updateTask({
                  projectId,
                  taskId,
                  data: { title: values.title, description: values.description },
                })
              )
                .unwrap()
                .then(() => setIsEdit(false))
            }}
          >
            <SaveRounded />
          </IconButton>
        )}
        {isEdit && (
          <IconButton
            onClick={() => {
              setIsEdit(false)
              setValues({ title, description })
            }}
          >
            <CancelRounded />
          </IconButton>
        )}
        <IconButton onClick={() => setIsEdit((prev) => !prev)}>
          <EditRounded />
        </IconButton>
      </div>
      {!isEdit ? (
        <Typography variant="h5">{title}</Typography>
      ) : (
        <DefaultTextField
          value={values.title}
          onChange={(event) => setValues((prev) => ({ ...prev, title: event.target.value }))}
          size="small"
        />
      )}
      {!isEdit ? (
        <Typography>{description}</Typography>
      ) : (
        <DefaultTextField
          sx={{ width: '100%' }}
          value={values.description}
          multiline
          size="small"
          onChange={(event) => setValues((prev) => ({ ...prev, description: event.target.value }))}
        />
      )}
    </MainBlock>
  )
}

export default TaskMainInfo
