import { useEffect, useState } from 'react'

const getReturnValues = (countDown: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((countDown / 1000) % 60)

  return [days, hours, minutes, seconds]
}
export const useCountDown = (targetTime: number) => {
  const countDownDate = new Date(targetTime).getTime()
  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime())

  useEffect(() => {
    setCountDown(countDownDate - new Date().getTime())
    const interval = setInterval(() => {
      const timeLeft = countDownDate - new Date().getTime()
      setCountDown(timeLeft)
      if (timeLeft < 0) clearInterval(interval)
    }, 1000)
    return () => clearInterval(interval)
  }, [countDownDate])
  return getReturnValues(countDown)
}
