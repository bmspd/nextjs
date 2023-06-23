import React, { useState } from 'react'
import { IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import DefaultTextField from '../DefaultTextField/DefaultTextField'
import { DefaultTextFieldProps } from '../interfaces'

const PasswordTextField = React.forwardRef<HTMLInputElement, DefaultTextFieldProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
    }
    return (
      <DefaultTextField
        {...props}
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    )
  }
)
PasswordTextField.displayName = 'PasswordTextField'
export default PasswordTextField
