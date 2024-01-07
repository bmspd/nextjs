import { TASK_STATUSES, TASK_STATUSES_OPTIONS } from '@/constants/tasks.constants'
import { Typography } from '@mui/material'
import React from 'react'
import EditableSelect from './EditableSelect'
import Select from '@/components/Select/Select'
import { updateTask } from '@/store/reducers/ProjectsSlice/asyncThunks'
import { IdType } from '@/types/common'
import { useTypedDispatch } from '@/hooks/typedStoreHooks'
type StatusFieldProps = {
  status: TASK_STATUSES | undefined
  projectId: IdType
  taskId: IdType
}
const StatusField: React.FC<StatusFieldProps> = ({ projectId, taskId, status }) => {
  const dispatch = useTypedDispatch()
  return (
    <Typography>
      Status: {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <EditableSelect<any>
        onSave={(value) => {
          dispatch(updateTask({ projectId, taskId, data: { status: value } }))
        }}
      >
        {({ isEdit, setValue, value }) =>
          isEdit ? (
            <Select
              value={value === undefined ? status : value}
              size="small"
              onChange={(val) => setValue(val.target.value)}
              options={TASK_STATUSES_OPTIONS}
            ></Select>
          ) : (
            <>{status}</>
          )
        }
      </EditableSelect>
    </Typography>
  )
}

export default StatusField
