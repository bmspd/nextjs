'use client'
import React from 'react'
import MainBlock from '@/components/Blocks/MainBlock'
import DeleteUser from './components/DeleteUser'
import styles from './styles.module.scss'
import ChangePassword from './components/ChangePassword'
export default function Home() {
  return (
    <div className={styles.settings}>
      <ChangePassword />
      <DeleteUser />
      <MainBlock>I AM SETTINGS PAGE - CHANGE PASSWORD, DELETE ACCOUNT</MainBlock>
    </div>
  )
}
