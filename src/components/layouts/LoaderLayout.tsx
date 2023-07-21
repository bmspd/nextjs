'use client'
import { useTypedSelector } from '@/hooks/typedStoreHooks'
import { selectLoading } from '@/store/reducers/LoadingSlice/selectors'
import React, { useRef } from 'react'
import PageLoader from '../Loaders/PageLoader'
import { CSSTransition } from 'react-transition-group'
import loaderStles from '../Loaders/styles.module.scss'
const LoaderLayout = ({ children }: { children: React.ReactNode }) => {
  const isLoading = useTypedSelector(selectLoading)
  const ref = useRef<HTMLDivElement>(null)
  return (
    <>
      <CSSTransition
        // delay before unmount
        timeout={200}
        nodeRef={ref}
        in={isLoading}
        classNames={{
          enter: loaderStles.pageLoaderEnter,
          enterActive: loaderStles.pageLoaderEnterActive,
          exit: loaderStles.pageLoaderExit,
          exitActive: loaderStles.pageLoaderExitActive,
        }}
        unmountOnExit
      >
        <PageLoader ref={ref} />
      </CSSTransition>
      {children}
    </>
  )
}

export default LoaderLayout
