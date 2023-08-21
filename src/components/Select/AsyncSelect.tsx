'use client'
import React, { useState } from 'react'
import { Alert, Autocomplete, CircularProgress, Collapse, TextField } from '@mui/material'
import { DataWithPagination } from '@/types/pagination'
import { useTypedSelector } from '@/hooks/typedStoreHooks'
import { RootState } from '@/store'
import { ValueOf } from '@/types/utils'
import { selectSpecificLoading } from '@/store/reducers/LoadingSlice/selectors'
import { ControllerRenderProps } from 'react-hook-form'
import { capitalize } from 'lodash'
import styles from './style.module.scss'
export type AsyncSelectProps<T> = {
  fetchCallback?: (page: number, per_page: number, timestamp?: Date) => void
  loadingFunc?: string
  selector: (state: RootState) => DataWithPagination<T>
  valueField: keyof T
  labelField: keyof T
  controlProps?: ControllerRenderProps
  alertMessage?: string
  error?: boolean
}

const AsyncSelect = <T extends DataWithPagination<object>>({
  fetchCallback,
  selector,
  valueField,
  labelField,
  loadingFunc,
  controlProps,
  alertMessage,
  error,
}: AsyncSelectProps<ValueOf<Pick<T, 'data'>>[number]>) => {
  const [open, setOpen] = useState(false)
  const { onChange: controlOnchange, ...restControlProps } = controlProps ?? {}
  const options = useTypedSelector(selector)
  const loading = useTypedSelector(selectSpecificLoading(loadingFunc ?? ''))
  const dataOptions = (options?.data ?? []).map((option) => ({
    ...option,
    value: option[valueField],
    label: option[labelField],
  }))
  const currentPage = options?.meta?.pagination?.page
  const isDataLeft = options?.meta?.pagination?.last_page > currentPage
  const onScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const list = e.target as HTMLUListElement
    const bottom = list.scrollHeight - Math.ceil(list.scrollTop) === list.clientHeight
    if (bottom && isDataLeft) {
      fetchCallback && fetchCallback(currentPage + 1, 8)
    }
  }
  return (
    <div className={styles.selectWrapper}>
      <Autocomplete
        {...restControlProps}
        sx={{ width: '100%' }}
        open={open}
        onOpen={() => {
          setOpen(true)
          const currentTime = new Date()
          const timestamp = options?.meta?.refetch?.timestamp ?? currentTime
          if (!options || currentTime.getTime() - timestamp.getTime() > 600000) {
            fetchCallback && fetchCallback(1, 8, currentTime)
          }
        }}
        onClose={() => setOpen(false)}
        options={dataOptions}
        loading={loading}
        onChange={(ev, val) => {
          controlOnchange && controlOnchange(val?.value)
        }}
        ListboxProps={{ onScroll }}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            error={error}
            {...params}
            label="Test async"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <Collapse in={!!alertMessage}>
        <Alert sx={{ padding: '0 16px', marginBottom: '2px' }} severity="error">
          {capitalize(alertMessage)}
        </Alert>
      </Collapse>
    </div>
  )
}

export default AsyncSelect
