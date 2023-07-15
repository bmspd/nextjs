import React, { useEffect, useState } from 'react'
import { Alert, AlertColor, Collapse, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useDebounce } from '../../hooks/useDebounce'

type DefaultAlertProps = {
  message?: string
  isOpen: boolean
  severity: AlertColor
}
const DefaultAlert: React.FC<DefaultAlertProps> = React.memo(({ message, isOpen, severity }) => {
  const [open, setOpen] = useState(isOpen)
  const debIsOpen = useDebounce(open, 200)
  const debMessage = useDebounce(message, 200)
  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])
  return (
    <Collapse in={debIsOpen}>
      <Alert
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => setOpen(false)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {debMessage}
      </Alert>
    </Collapse>
  )
})
DefaultAlert.displayName = 'DefaultAlert'
export default DefaultAlert
