'use client'
import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
import { closeModal, resetModal } from '@/store/reducers/ModalSlice/ModalSlice'
import { selectModalProps, selectOpen } from '@/store/reducers/ModalSlice/selectors'
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React from 'react'
export interface CustomDialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

const CustomDialogTitle: React.FC<CustomDialogTitleProps> = (props) => {
  const { children, onClose, ...other } = props
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}
const ModalLayout = ({ children }: { children: React.ReactNode }) => {
  const open = useTypedSelector(selectOpen)
  const modalProps = useTypedSelector(selectModalProps)
  const { content, title, actions } = modalProps
  const dispatch = useTypedDispatch()
  const handleClose = () => {
    dispatch(closeModal())
  }
  const resetOnExit = () => {
    dispatch(resetModal())
  }
  const customActions = actions ? actions({ handleClose }) : null
  return (
    <>
      <div>
        <Dialog TransitionProps={{ onExited: resetOnExit }} open={open} onClose={handleClose}>
          <CustomDialogTitle id="dialog-title" onClose={handleClose}>
            {title}
          </CustomDialogTitle>
          <DialogContent dividers>{content}</DialogContent>
          {!!customActions && (
            <DialogActions>{customActions.map((action) => action)}</DialogActions>
          )}
        </Dialog>
      </div>
      {children}
    </>
  )
}

export default ModalLayout
