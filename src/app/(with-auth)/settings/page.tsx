import React from 'react'
import MainBlock from '@/components/Blocks/MainBlock'
import DeleteUser from './components/DeleteUser'
import styles from './styles.module.scss'
export default function Home() {
  return (
    <div className={styles.settings}>
      <DeleteUser />
      <MainBlock>I AM SETTINGS PAGE - CHANGE PASSWORD, DELETE ACCOUNT</MainBlock>
    </div>
  )
}
