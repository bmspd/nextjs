'use client'
import { ValueOf } from 'next/dist/shared/lib/constants'
import { ImageProps } from 'next/image'
import React from 'react'
import styles from './style.module.scss'
import Image from 'next/image'
import cn from 'classnames'
import { useTheme } from '@mui/material'
type TImageSrc = ValueOf<Pick<ImageProps, 'src'>>
type ThemeImageProps = Omit<ImageProps, 'src' | 'priority' | 'loading'> & {
  srcLight: TImageSrc
  srcDark: TImageSrc
}
const ThemeImage = (props: ThemeImageProps) => {
  const { srcLight, srcDark, alt, ...rest } = props
  const mode = useTheme().palette.mode
  return (
    <>
      <Image alt={alt} {...rest} src={srcLight} className={cn(styles.imgLight, mode)} />
      <Image alt={alt} {...rest} src={srcDark} className={cn(styles.imgDark, mode)} />
    </>
  )
}

export default ThemeImage
