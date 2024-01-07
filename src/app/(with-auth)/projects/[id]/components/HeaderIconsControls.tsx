import { useTypedDispatch } from '@/hooks/typedStoreHooks'
import { Tooltip, IconButton } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune'
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded'
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded'
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded'
import React, { memo, useCallback, useId } from 'react'
import { openModal } from '@/store/reducers/ModalSlice/ModalSlice'
import CreateTasksModal from '@/components/Modals/CreateTasksModal'
import InviteUserToProjectModal from '@/components/Modals/InviteUserToProjectModal'
import NextLink from 'next/link'
import { ConfirmationModal } from '@/components/Modals/ConfirmationModal'
import { useRouter } from 'next/navigation'
import { deleteProject } from '@/store/reducers/ProjectsSlice/asyncThunks'
import { deleteProjectById } from '@/store/reducers/ProjectsSlice/ProjectSlice'
import { enqueueSnackbar } from '@/store/reducers/NotificationsSlice/NotificationsSlice'
import { uniqueId } from 'lodash'
import { SNACKBAR_TYPES } from '@/types/notistack'

type HeaderIconsControls = {
  id: string
}
const HeaderIconsControls: React.FC<HeaderIconsControls> = ({ id }) => {
  const dispatch = useTypedDispatch()
  const formId = useId()
  const router = useRouter()
  const deleteProjectCb = useCallback(() => {
    dispatch(deleteProject({ id: +id }))
      .unwrap()
      .then((res) => {
        dispatch(deleteProjectById(+id))
        router.push('/projects')
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
  }, [])
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      <Tooltip title="CREATE TASK" arrow>
        <IconButton
          size="large"
          onClick={() => {
            dispatch(openModal(CreateTasksModal(formId)))
          }}
        >
          <AddBoxRoundedIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>

      <Tooltip title="INVITE USER" arrow>
        <IconButton
          size="large"
          onClick={() => {
            dispatch(openModal(InviteUserToProjectModal(formId)))
          }}
        >
          <GroupAddRoundedIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>

      <Tooltip title="PROJECT SETTINGS" arrow>
        <NextLink href={`${id}/settings`}>
          <IconButton size="large">
            <TuneIcon fontSize="inherit" />
          </IconButton>
        </NextLink>
      </Tooltip>

      <Tooltip title="DELETE PROJECT" arrow>
        <IconButton
          size="large"
          onClick={() => {
            dispatch(
              openModal(
                ConfirmationModal({
                  applyCb: deleteProjectCb,
                  title: 'Delete project',
                  text: 'Are you sure you want to delete this project?',
                })
              )
            )
          }}
        >
          <RemoveCircleRoundedIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default memo(HeaderIconsControls)
