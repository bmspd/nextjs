'use client'
import React, { useState } from 'react'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { DataWithPagination } from '@/types/pagination'
import { useTypedSelector } from '@/hooks/typedStoreHooks'
import { RootState } from '@/store'
import { ValueOf } from '@/types/utils'
import { selectSpecificLoading } from '@/store/reducers/LoadingSlice/selectors'

export interface AsyncSelectProps<T> {
  fetchCallback?: (page: number, per_page: number) => void
  loadingFunc?: string
  selector: (state: RootState) => DataWithPagination<T>
  valueField: keyof T
  labelField: keyof T
}

const AsyncSelect = <T extends DataWithPagination<object>>({
  fetchCallback,
  selector,
  valueField,
  labelField,
  loadingFunc,
}: AsyncSelectProps<ValueOf<Pick<T, 'data'>>[number]>) => {
  const [open, setOpen] = useState(false)
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
    <Autocomplete
      sx={{ width: '100%' }}
      open={open}
      onOpen={() => {
        setOpen(true)
        if (!options) {
          fetchCallback && fetchCallback(1, 8)
        }
      }}
      onClose={() => setOpen(false)}
      options={dataOptions}
      loading={loading}
      ListboxProps={{ onScroll }}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
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
  )
}

export default AsyncSelect
