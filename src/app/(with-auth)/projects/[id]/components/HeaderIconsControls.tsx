import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
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
import { deleteProject, quitProject } from '@/store/reducers/ProjectsSlice/asyncThunks'
import { deleteProjectById } from '@/store/reducers/ProjectsSlice/ProjectSlice'
import { enqueueSnackbar } from '@/store/reducers/NotificationsSlice/NotificationsSlice'
import { uniqueId } from 'lodash'
import { SNACKBAR_TYPES } from '@/types/notistack'
import { selectProfile } from '@/store/reducers/ProfileSlice/selectors'
import { selectProjectById } from '@/store/reducers/ProjectsSlice/selectors'
import { PeopleAltRounded, SensorDoorRounded } from '@mui/icons-material'

type HeaderIconsControls = {
  id: string
}
const HeaderIconsControls: React.FC<HeaderIconsControls> = ({ id }) => {
  const dispatch = useTypedDispatch()
  const formId = useId()
  const router = useRouter()
  const profile = useTypedSelector(selectProfile)
  const project = useTypedSelector(selectProjectById(+id))
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
  const quitProjectCb = useCallback(() => {
    dispatch(quitProject({ projectId: +id }))
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

      <Tooltip title="PROJECT USERS" arrow>
        <NextLink href={`${id}/users`}>
          <IconButton size="large">
            <PeopleAltRounded fontSize="inherit" />
          </IconButton>
        </NextLink>
      </Tooltip>

      <Tooltip title="PROJECT SETTINGS" arrow>
        <NextLink href={`${id}/settings`}>
          <IconButton size="large">
            <TuneIcon fontSize="inherit" />
          </IconButton>
        </NextLink>
      </Tooltip>

      {profile.id === project?.creator?.id ? (
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
      ) : (
        <Tooltip title="QUIT PROJECT" arrow>
          <IconButton
            size="large"
            onClick={() => {
              dispatch(
                openModal(
                  ConfirmationModal({
                    applyCb: quitProjectCb,
                    title: 'Quit project',
                    text: 'Are you sure you want to quit this project?',
                    buttonsProps: { apply: { text: 'Quit' } },
                  })
                )
              )
            }}
          >
            <SensorDoorRounded fontSize="inherit" />
          </IconButton>
        </Tooltip>
      )}
    </div>
  )
}

export default memo(HeaderIconsControls)
