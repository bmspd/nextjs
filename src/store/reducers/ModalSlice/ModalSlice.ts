import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import React from 'react'
export type InitialModalState = {
  open: boolean
  modalProps: DialogModalProps
}

const initialState: InitialModalState = {
  open: false,
  modalProps: {},
}
export interface DialogModalProps {
  content?: React.ReactNode
  title?: string
  actions?: ({ handleClose }: { handleClose: () => void }) => React.ReactNode[]
}
const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<DialogModalProps>) => {
      state.open = true
      state.modalProps = action.payload
    },
    // TODO: отдельно задекларировать это все
    // eslint-disable-next-line
    closeModal: (state, action: PayloadAction<void>) => {
      state.open = false
    },
    // eslint-disable-next-line
    resetModal: (state, action: PayloadAction<void>) => {
      state.modalProps = {}
    },
  },
})

export const { openModal, closeModal, resetModal } = ModalSlice.actions
export default ModalSlice.reducer
