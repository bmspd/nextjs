'use client'
import { Clear } from '@mui/icons-material'
import {
  Checkbox,
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
  uncontrolled?: boolean
}
export interface DropDownOption {
  value: string | number
  label: string
}
// TODO: insert error notification inside this component
const Select = React.forwardRef<HTMLDivElement, ISelectProps>((props, ref) => {
  const { placeholder, options, value, isClearable, uncontrolled, ...rest } = props
  const labelId = useId()
  const ClearIcon: React.FC = () => (
    <InputAdornment sx={{ mr: 2 }} position="end">
      <IconButton
        onClick={() => {
          if (rest?.onChange)
            rest.onChange(
              {
                target: { value: props.multiple ? [] : null, name: rest?.name ?? '' },
              } as SelectChangeEvent<unknown>,
              null
            )
        }}
      >
        <Clear />
      </IconButton>
    </InputAdornment>
  )
  const isNotEmptyValue = props.multiple ? !!(value as Array<string>)?.length : !!value
  return (
    <FormControl ref={ref} fullWidth>
      <InputLabel id={labelId}>{placeholder}</InputLabel>
      <MuiSelect
        inputProps={{ onClick: (e) => e.stopPropagation() }}
        labelId={labelId}
        endAdornment={isClearable && isNotEmptyValue ? <ClearIcon /> : undefined}
        onClick={(e) => e.stopPropagation()}
        label={placeholder}
        {...rest}
        renderValue={props.multiple ? (seleted) => (seleted as string[]).join(', ') : undefined}
        value={uncontrolled ? undefined : value ?? ''}
      >
        {options.map((option, index) => (
          <MenuItem
            key={`${option.label}-${index}`}
            value={option.value}
            onClick={(e) => e.stopPropagation()}
          >
            {props.multiple && (
              <Checkbox checked={(value as (string | number)[]).indexOf(option.value) > -1} />
            )}
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
})

Select.displayName = 'Select'
export default Select
