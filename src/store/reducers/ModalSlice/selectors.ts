import { RootState } from '@/store'

export const selectModal = (state: RootState) => state.modal
export const selectOpen = (state: RootState) => selectModal(state).open
export const selectModalProps = (state: RootState) => selectModal(state).modalProps
