'use client'

import { Z_INDEX } from '@/constants/global.constants'
import React, { forwardRef } from 'react'
import { createPortal } from 'react-dom'
import DefaultLoader from './DefaultLoader'
import styles from './styles.module.scss'

const PageLoader = forwardRef<HTMLDivElement, object>((props, ref) => {
  return createPortal(
    <div ref={ref} className={styles.pageLoader} style={{ zIndex: Z_INDEX.PAGE_LOADER }}>
      <DefaultLoader />
    </div>,
    document.body
  )
})

PageLoader.displayName = 'PageLoader'
export default PageLoader
