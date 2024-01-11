'use client'
import { useTypedSelector } from '@/hooks/typedStoreHooks'
import { selectSpecificLoading } from '@/store/reducers/LoadingSlice/selectors'
import { DialogModalProps } from '@/store/reducers/ModalSlice/ModalSlice'
import { Button, Typography } from '@mui/material'
import React from 'react'

// made different components, not inline => to allow normal hot reload for nextjs
const Content: React.FC<{ text?: string }> = ({ text }) => (
  <Typography fontSize={18}>{text}</Typography>
)
const ApplyBtn: React.FC<{
  applyCb?: () => void
  handleClose: () => void
  deleteFunc?: string
  buttonProps?: TButtonProps
}> = ({ applyCb, handleClose, deleteFunc, buttonProps }) => {
  const isDeleting = useTypedSelector(selectSpecificLoading(deleteFunc ?? ''))
  return (
    <Button
      color="error"
      onClick={async () => {
        applyCb && (await applyCb())
        handleClose()
      }}
      disabled={isDeleting}
      variant="contained"
    >
      {buttonProps?.text ? buttonProps.text : 'Delete'}
    </Button>
  )
}
const CancelBtn: React.FC<{ handleClose: () => void }> = ({ handleClose }) => (
  <Button onClick={handleClose} variant="outlined">
    Cancel
  </Button>
)
type TButtonProps = { text?: string }
type TConfirmationModal = {
  applyCb?: () => void
  text?: string
  title?: string
  deleteFunc?: string
  buttonsProps?: { apply?: TButtonProps; cancel?: TButtonProps }
}
export const ConfirmationModal = ({
  applyCb,
  text,
  title,
  deleteFunc,
  buttonsProps,
}: TConfirmationModal = {}): DialogModalProps => {
  return {
    content: () => <Content text={text} />,
    actions: ({ handleClose }) => [
      <ApplyBtn
        key="apply-btn"
        applyCb={applyCb}
        handleClose={handleClose}
        deleteFunc={deleteFunc}
        buttonProps={buttonsProps?.apply}
      />,
      <CancelBtn key="cancel-btn" handleClose={handleClose} />,
    ],
    title,
  }
}
