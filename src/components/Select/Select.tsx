'use client'
import { Clear } from '@mui/icons-material'
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material'
import React, { useId } from 'react'

export interface ISelectProps extends Omit<SelectProps, 'label' | 'labelId'> {
  placeholder?: string
  options: DropDownOption[]
  isClearable?: boolean
}
export interface DropDownOption {
  value: string | number
  label: string
}
// TODO: insert error notification inside this component
const Select = React.forwardRef<HTMLDivElement, ISelectProps>((props, ref) => {
  const { placeholder, options, value, isClearable, ...rest } = props
  const labelId = useId()
  const ClearIcon: React.FC = () => (
    <InputAdornment sx={{ mr: 2 }} position="end">
      <IconButton
        onClick={() => {
          if (rest?.onChange)
            rest.onChange(
              { target: { value: null, name: rest?.name ?? '' } } as SelectChangeEvent<unknown>,
              null
            )
        }}
      >
        <Clear />
      </IconButton>
    </InputAdornment>
  )
  return (
    <FormControl ref={ref} fullWidth>
      <InputLabel id={labelId}>{placeholder}</InputLabel>
      <MuiSelect
        inputProps={{ onClick: (e) => e.stopPropagation() }}
        labelId={labelId}
        endAdornment={isClearable && value ? <ClearIcon /> : undefined}
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
