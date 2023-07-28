import MainBlock from '@/components/Blocks/MainBlock'
import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
import { sendVerificationLink } from '@/store/reducers/ProfileSlice/asyncThunks'
import { selectIsEmailVerified, selectLinkSent } from '@/store/reducers/ProfileSlice/selectors'
import { Alert, Button, Collapse, Typography } from '@mui/material'
import React from 'react'
import Timer from './Timer'
import styles from '../styles.module.scss'
import { useCountDown } from '@/hooks/useCountDown'
import { selectSpecificLoading } from '@/store/reducers/LoadingSlice/selectors'
import { enqueueSnackbar } from '@/store/reducers/NotificationsSlice/NotificationsSlice'
import { uniqueId } from 'lodash'
import { SNACKBAR_TYPES } from '@/types/notistack'
const timeLimit = 300000
const AccountVerifiedMessage: React.FC<{ isVerified: boolean }> = ({ isVerified }) => {
  const SUCCESS_MESSAGE = 'Your account is verified'
  const ERROR_MESSAGE = 'Your account is not verified'
  return (
    <Alert severity={isVerified ? 'success' : 'error'}>
      {isVerified ? SUCCESS_MESSAGE : ERROR_MESSAGE}
    </Alert>
  )
}
const VerifyEmail = React.memo(() => {
  const dispatch = useTypedDispatch()
  const isEmailVerified = useTypedSelector(selectIsEmailVerified)
  const linkSent = useTypedSelector(selectLinkSent)
  const isLoading = useTypedSelector(selectSpecificLoading('profile/sendVerificationLink'))
  const [, , minutes, seconds] = useCountDown((linkSent ? linkSent.getTime() : 0) + timeLimit)
  const needWait = minutes + seconds >= 0
  return (
    <MainBlock className={styles.profilePageBlock}>
      <div className={styles.statusProfileHeader}>
        <Typography variant="h5">Profile status</Typography>
      </div>
      <div className={styles.blockElement}>
        <AccountVerifiedMessage isVerified={isEmailVerified} />
        <Collapse in={needWait} unmountOnExit key="test">
          <Timer timeValues={[minutes, seconds]} />
        </Collapse>
        {!isEmailVerified && (
          <Button
            disabled={isLoading || needWait}
            variant="outlined"
            onClick={() => {
              dispatch(sendVerificationLink())
                .unwrap()
                .then((res) =>
                  dispatch(
                    enqueueSnackbar({
                      message: res.message,
                      options: {
                        key: uniqueId(),
                        variant: SNACKBAR_TYPES.SUCCESS,
                      },
                    })
                  )
                )
            }}
          >
            Send verification link
          </Button>
        )}
      </div>
    </MainBlock>
  )
})

VerifyEmail.displayName = 'VerifyEmail'

export default VerifyEmail
