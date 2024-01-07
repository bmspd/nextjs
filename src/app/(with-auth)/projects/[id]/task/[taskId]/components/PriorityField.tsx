import { TASK_PRIORITIES, TASK_PRIORITIES_OPTIONS } from '@/constants/tasks.constants'
import { Typography } from '@mui/material'
import React from 'react'
import EditableSelect from './EditableSelect'
import Select from '@/components/Select/Select'
import { updateTask } from '@/store/reducers/ProjectsSlice/asyncThunks'
import { IdType } from '@/types/common'
import { useTypedDispatch } from '@/hooks/typedStoreHooks'
type PriorityField = {
  priority: TASK_PRIORITIES | undefined
  projectId: IdType
  taskId: IdType
}
const PriorityField: React.FC<PriorityField> = ({ projectId, taskId, priority }) => {
  const dispatch = useTypedDispatch()
  return (
    <Typography>
      Priority: {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <EditableSelect<any>
        onSave={(value) => {
          dispatch(updateTask({ projectId, taskId, data: { priority: value } }))
        }}
      >
        {({ isEdit, setValue, value }) =>
          isEdit ? (
            <Select
              value={value === undefined ? priority : value}
              size="small"
              onChange={(val) => setValue(val.target.value)}
              options={TASK_PRIORITIES_OPTIONS}
            ></Select>
          ) : (
            <>{priority}</>
          )
        }
      </EditableSelect>
    </Typography>
  )
}

export default PriorityField
