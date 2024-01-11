import { InviteUserToProjectBody } from '@/http/services/ProjectsService'
import { inviteUserToProjectSchema } from '@/validation/user.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import DefaultTextField from '../Inputs/DefaultTextField/DefaultTextField'
import { Button } from '@mui/material'
import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
import { selectSpecificLoading } from '@/store/reducers/LoadingSlice/selectors'
import { DialogModalProps } from '@/store/reducers/ModalSlice/ModalSlice'
import { inviteUserToProject } from '@/store/reducers/ProjectsSlice/asyncThunks'
import { useParams } from 'next/navigation'
import { enqueueSnackbar } from '@/store/reducers/NotificationsSlice/NotificationsSlice'
import { uniqueId } from 'lodash'
import { SNACKBAR_TYPES } from '@/types/notistack'
import { useServerErrors } from '@/hooks/useServerErrors'

const Content: React.FC<{ formId: string | undefined; handleClose: () => void }> = ({
  formId,
  handleClose,
}) => {
  const dispatch = useTypedDispatch()
  const params = useParams()
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(inviteUserToProjectSchema),
  })
  const setServerErrors = useServerErrors<InviteUserToProjectBody>(setError)
  const onSubmit: SubmitHandler<InviteUserToProjectBody> = async (data) => {
    await dispatch(inviteUserToProject({ projectId: params.id as string, email: data.email }))
      .unwrap()
      .then(() => {
        dispatch(
          enqueueSnackbar({
            message: 'User successfully invited',
            options: {
              key: uniqueId(),
              variant: SNACKBAR_TYPES.SUCCESS,
            },
          })
        )
        handleClose()
      })
      .catch((e) => setServerErrors(e))
  }
  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <DefaultTextField
            {...field}
            label="Email"
            isRequired
            autoComplete="off"
            type="text"
            error={!!errors.email?.message}
            alertMessage={errors.email?.message}
          />
        )}
      />
    </form>
  )
}

const CancelBtn: React.FC<{ handleClose: () => void }> = ({ handleClose }) => (
  <Button onClick={handleClose} variant="outlined">
    Cancel
  </Button>
)

const ApplyBtn: React.FC<{ formId: string | undefined }> = ({ formId }) => {
  const isSendingInvite = useTypedSelector(selectSpecificLoading('projects/inviteUserToProject'))
  return (
    <Button disabled={isSendingInvite} form={formId} type="submit" variant="contained">
      Invite
    </Button>
  )
}

const InviteUserToProjectModal = (formId: string | undefined): DialogModalProps => {
  return {
    content: ({ handleClose }) => <Content handleClose={handleClose} formId={formId} />,
    actions: ({ handleClose }) => [
      <CancelBtn key="cancel-btn" handleClose={handleClose} />,
      <ApplyBtn formId={formId} key="apply-btn" />,
    ],
    title: 'Invite user to project',
  }
}

export default InviteUserToProjectModal
