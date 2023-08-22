'use client'
import { FormControl, InputLabel, MenuItem, Select as MuiSelect, SelectProps } from '@mui/material'
import useId from '@mui/material/utils/useId'
import React from 'react'

export interface ISelectProps extends Omit<SelectProps, 'label' | 'labelId'> {
  placeholder: string
  options: DropDownOption[]
}
export interface DropDownOption {
  value: string | number
  label: string
}
// TODO: insert error notification inside this component
const Select = React.forwardRef<HTMLDivElement, ISelectProps>((props, ref) => {
  const { placeholder, options, ...rest } = props
  const labelId = useId()
  return (
    <FormControl ref={ref} fullWidth>
      <InputLabel id={labelId}>{placeholder}</InputLabel>
      <MuiSelect labelId={labelId} label={placeholder} {...rest}>
        {options.map((option, index) => (
          <MenuItem key={`${option.label}-${index}`} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
})

Select.displayName = 'Select'
export default Select
