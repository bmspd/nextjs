import { RootState } from '@/store'

export const selectLoading = (state: RootState) => state.loading.loading

export const selectSpecificLoading = (loading: string) => (state: RootState) =>
  !!state.loading.currentLoading[loading]
