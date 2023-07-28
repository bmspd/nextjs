import { useRef, useEffect } from 'react'

export const useDidMount = () => {
  const mountRef = useRef(true)
  useEffect(() => {
    mountRef.current = false
  }, [])
  return mountRef.current
}
