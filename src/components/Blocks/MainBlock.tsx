'use client'
import React from 'react'
import { Box, BoxProps } from '@mui/material'
import { merge } from 'lodash'
//interface MainBlockProps extends BoxProps {}
const defaultMainBlockProps = {
  sx: { backgroundColor: '#fff', borderRadius: 1, padding: 2, boxShadow: 2 },
}
const MainBlock = React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const { children, ...rest } = props
  return (
    <Box ref={ref} {...merge(defaultMainBlockProps, rest)}>
      {children}
    </Box>
  )
})
MainBlock.displayName = 'MainBlock'

export default MainBlock
