/*eslint-disable react/display-name*/
'use client'
import React from 'react'
import { CustomContentProps, SnackbarContent } from 'notistack'
import cn from 'classnames'
import CloseIcon from '@mui/icons-material/Close'
import InfoIcon from '@mui/icons-material/Info'
import styles from './styles.module.scss'
import { useTypedDispatch } from '../../hooks/typedStoreHooks'
import { closeSnackbar } from '../../store/reducers/NotificationsSlice/NotificationsSlice'
import { SNACKBAR_TYPES, SnackbarCustomVariants } from '../../types/notistack'
import { Typography } from '@mui/material'
import { omit } from 'lodash'

const VARIANTS_CLASSNAMES = {
  [SNACKBAR_TYPES.DEFAULT]: 'default',
  [SNACKBAR_TYPES.ERROR]: 'error',
  [SNACKBAR_TYPES.SUCCESS]: 'success',
}
const BaseSnackBar = (variant: SnackbarCustomVariants) =>
  React.forwardRef<HTMLDivElement, CustomContentProps>((props, ref) => {
    const { id, message, className, ...other } = props
    const dispatch = useTypedDispatch()
    return (
      <SnackbarContent
        ref={ref}
        className={cn(className, styles.snackbar)}
        role="alert"
        {...omit(other, [
          'iconVariant',
          'hideIconVariant',
          'autoHideDuration',
          'anchorOrigin',
          'persist',
        ])}
      >
        <div className={cn(styles.snackbarHeader, VARIANTS_CLASSNAMES[variant])}>
          <InfoIcon sx={{ color: 'black' }} />
          <CloseIcon
            className={styles.closeIcon}
            onClick={() => dispatch(closeSnackbar(id))}
            sx={{ cursor: 'pointer' }}
          />
        </div>
        <Typography fontSize={18} className={styles.snackbarMessage}>
          {message}
        </Typography>
      </SnackbarContent>
    )
  })
const DefaultSnackbar = BaseSnackBar(SNACKBAR_TYPES.DEFAULT)
DefaultSnackbar.displayName = 'DefaultSnackbar'
const ErrorSnackbar = BaseSnackBar(SNACKBAR_TYPES.ERROR)
ErrorSnackbar.displayName = 'ErrorSnackbar'
const SuccessSnackbar = BaseSnackBar(SNACKBAR_TYPES.SUCCESS)
SuccessSnackbar.displayName = 'SuccessSnackbar'
export const SNACKBAR_COMPONENTS = {
  [SNACKBAR_TYPES.DEFAULT]: DefaultSnackbar,
  [SNACKBAR_TYPES.ERROR]: ErrorSnackbar,
  [SNACKBAR_TYPES.SUCCESS]: SuccessSnackbar,
}
