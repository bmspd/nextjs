'use client'
import { FormControl, InputLabel, MenuItem, Select as MuiSelect, SelectProps } from '@mui/material'
import useId from '@mui/material/utils/useId'
import React from 'react'

export interface ISelectProps extends Omit<SelectProps, 'label' | 'labelId'> {
  placeholder: string
  options: DropDownOptions[]
}
export interface DropDownOptions {
  value: string
  label: string
}
// TODO: insert error notification inside this component
const Select: React.FC<ISelectProps> = (props) => {
  const { placeholder, options, ...rest } = props
  const labelId = useId()
  return (
    <FormControl fullWidth>
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
}

export default Select
