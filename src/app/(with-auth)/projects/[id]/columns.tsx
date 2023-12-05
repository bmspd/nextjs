import CustomCell, { DefaultCell } from '@/components/Table/CustomCell'
import { ITask } from '@/http/services/TaskService'
import { CellContext, ColumnDef } from '@tanstack/react-table'
import NextLink from 'next/link'
import { IconButton, Tooltip, Typography } from '@mui/material'
import { useCallback, useMemo } from 'react'
import { useTypedDispatch } from '@/hooks/typedStoreHooks'
import { openModal } from '@/store/reducers/ModalSlice/ModalSlice'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import { ConfirmationModal } from '@/components/Modals/ConfirmationModal'
import { deleteTask, getTasksByProject } from '@/store/reducers/ProjectsSlice/asyncThunks'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import { uniqueId } from 'lodash'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from '@/store/reducers/NotificationsSlice/NotificationsSlice'
import { SNACKBAR_TYPES } from '@/types/notistack'
export const Columns = (id: string): ColumnDef<ITask>[] => {
  const router = useRouter()
  const dispatch = useTypedDispatch()
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
  return useMemo(
    () => [
      { header: 'ID', accessorKey: 'id', cell: DefaultCell },
      {
        header: 'Title',
        accessorKey: 'title',
        cell(props) {
          const taskId = props.row.original.id
          const value = props.getValue<string>()
          // relative path works without projectId D:
          return (
            <CustomCell isDefault>
              <NextLink className="default-link" href={`/projects/${id}/task/${taskId}`}>
                {value}
              </NextLink>
            </CustomCell>
          )
        },
      },
      {
        header: 'Description',
        accessorKey: 'description',

        cell: (props) => <CustomCell lines={3}>{props.getValue<string>()}</CustomCell>,
      },
      { header: 'Status', accessorKey: 'status', cell: DefaultCell },
      { header: 'Priority', accessorKey: 'priority', cell: DefaultCell },
      {
        header: 'Creator',
        accessorKey: 'creator',
        cell: (props) => {
          type TCreator = ITask['creator']
          const value = props.getValue<TCreator>()
          return value ? (
            <CustomCell>
              <Tooltip title={<Typography>{value.username}</Typography>} placement="top" arrow>
                <div>
                  <IconButton size="small">
                    <AccountCircleRoundedIcon fontSize="large" />
                  </IconButton>
                  {value.username}
                </div>
              </Tooltip>
            </CustomCell>
          ) : null
        },
      },
      {
        header: 'Executor',
        accessorKey: 'executor',
        cell: (props) => {
          type TExecutor = ITask['executor']
          const value = props.getValue<TExecutor>()
          return value ? (
            <CustomCell>
              <Tooltip title={<Typography>{value.username}</Typography>} placement="top" arrow>
                <div>
                  <IconButton size="small">
                    <AccountCircleRoundedIcon fontSize="large" />
                  </IconButton>
                  {value.username}
                </div>
              </Tooltip>
            </CustomCell>
          ) : null
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: (props) => (
          <CustomCell isDefault>
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
          </CustomCell>
        ),
      },
    ],
    []
  )
}
