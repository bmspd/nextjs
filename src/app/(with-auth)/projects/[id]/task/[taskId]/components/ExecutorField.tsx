import { Typography, InputAdornment } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import React from 'react'
import EditableSelect from './EditableSelect'
import AsyncSelect from '@/components/Select/AsyncSelect'
import { IUserInProject, IUserInProjectWithPagination } from '@/http/services/ProjectsService'
import { DropDownOption } from '@/components/Select/Select'
import { useTypedDispatch } from '@/hooks/typedStoreHooks'
import { updateTask, getUsersByProject } from '@/store/reducers/ProjectsSlice/asyncThunks'
import { selectUsersByProject } from '@/store/reducers/ProjectsSlice/selectors'
import { IdType } from '@/types/common'
import { IUser } from '@/http/services/TaskService'
import UserProfile from '@/components/Avatars/UserProfile/UserProfile'
type ExecutorFieldProps = {
  projectId: IdType
  taskId: IdType
  executor?: IUser | null
}
const ExecutorField: React.FC<ExecutorFieldProps> = ({ projectId, taskId, executor }) => {
  const dispatch = useTypedDispatch()
  return (
    <Typography>
      Executor:{' '}
      <EditableSelect<IUserInProject & DropDownOption>
        onSave={(value) =>
          dispatch(updateTask({ projectId, taskId, data: { executor_id: value } }))
        }
      >
        {({ isEdit, setValue, value }) =>
          isEdit ? (
            <AsyncSelect<IUserInProjectWithPagination>
              valueField="id"
              labelField="username"
              loadingFunc="projects/getUsersByProject"
              selector={selectUsersByProject(+projectId)}
              value={
                value === undefined
                  ? executor
                    ? {
                        ...executor,
                        value: executor.id,
                        label: executor.username,
                      }
                    : null
                  : value
              }
              customAutoCompleteProps={{ size: 'small' }}
              onChange={(val) => setValue(val)}
              customInputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              fetchCallback={(page, per_page, timestamp) =>
                dispatch(
                  getUsersByProject({
                    projectId,
                    params: { page, per_page },
                    timestamp,
                  })
                )
              }
            />
          ) : (
            <UserProfile TooltipProps={{ title: null }} username={executor?.username} />
          )
        }
      </EditableSelect>
    </Typography>
  )
}

export default ExecutorField
