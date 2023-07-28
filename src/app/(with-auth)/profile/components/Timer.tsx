import { Alert } from '@mui/material'
import React from 'react'
type TimerProps = {
  timeValues: [number, number]
}
const Timer: React.FC<TimerProps> = React.memo(({ timeValues }) => {
  const [minutes, seconds] = timeValues
  const fValues = `${minutes < 10 ? '0' + minutes : minutes}:${
    seconds < 10 ? '0' + seconds : seconds
  }`
  return (
    <Alert variant="outlined" severity="warning">
      You can resend verification link in {fValues}
    </Alert>
  )
})

Timer.displayName = 'Timer'

export default Timer
