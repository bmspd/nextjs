import React, { useRef } from 'react'
import { Alert, Collapse, IconButton, InputAdornment, TextField } from '@mui/material'
import { Clear } from '@mui/icons-material'
import { DefaultTextFieldProps } from '../interfaces'
import styles from './DefaultTextField.module.scss'
import { capitalize } from 'lodash'

const REQ_LABEL = (label: React.ReactNode) => `${label} *`
const DefaultTextField = React.forwardRef<HTMLInputElement, DefaultTextFieldProps>((props, ref) => {
  const { isRequired, alertMessage, InputLabelProps, ...rest } = props
  const valueRef = useRef<HTMLInputElement>()
  /* don't like original 'required' prop - causes built-in form validation instead schema resolvers */
  const label = isRequired ? REQ_LABEL(props.label) : props.label
  const showClearIcon = (valueRef?.current?.value || props.value) && !props?.disabled

  const handleClearButton = () => {
    if (props.onChange) {
      props.onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
    }
    if (valueRef?.current) {
      valueRef.current.value = ''
    }
  }
  /* this goes before close icon*/
  const ExtraEndAdornment: React.FC = () => <>{props.InputProps?.endAdornment ?? null}</>
  const ClearIcon: React.FC = () => (
    <InputAdornment position="end">
      <IconButton onClick={handleClearButton}>
        <Clear />
      </IconButton>
    </InputAdornment>
  )
  return (
    <div className={styles.defaultTextFieldWrapper}>
      <TextField
        {...rest}
        ref={ref}
        label={label}
        inputRef={valueRef}
        /* when default values from react-hook-form label stays upside, even after handleClearButton */
        InputLabelProps={{
          ...InputLabelProps,
          shrink: props.value !== undefined ? !!props.value : undefined,
        }}
        InputProps={{
          endAdornment: (
            <>
              <ExtraEndAdornment />
              {showClearIcon && <ClearIcon />}
            </>
          ),
        }}
      />
      <Collapse in={!!alertMessage}>
        <Alert sx={{ padding: '0 16px', marginBottom: '2px' }} severity="error">
          {capitalize(alertMessage)}
        </Alert>
      </Collapse>
    </div>
  )
})
DefaultTextField.displayName = 'DefaultTextField'
export default DefaultTextField
