'use client'
import { FormControl, InputLabel, MenuItem, Select as MuiSelect, SelectProps } from '@mui/material'
import React, { useId } from 'react'

export interface ISelectProps extends Omit<SelectProps, 'label' | 'labelId'> {
  placeholder?: string
  options: DropDownOption[]
}
export interface DropDownOption {
  value: string | number
  label: string
}
// TODO: insert error notification inside this component
const Select = React.forwardRef<HTMLDivElement, ISelectProps>((props, ref) => {
  const { placeholder, options, value, ...rest } = props
  const labelId = useId()
  return (
    <FormControl ref={ref} fullWidth>
      <InputLabel id={labelId}>{placeholder}</InputLabel>
      <MuiSelect
        inputProps={{ onClick: (e) => e.stopPropagation() }}
        labelId={labelId}
        onClick={(e) => e.stopPropagation()}
        label={placeholder}
        {...rest}
        value={value ?? ''}
      >
        {options.map((option, index) => (
          <MenuItem
            key={`${option.label}-${index}`}
            value={option.value}
            onClick={(e) => e.stopPropagation()}
          >
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
})

Select.displayName = 'Select'
export default Select
