import React from 'react'
import MenuHeader from './MenuHeader'
import MenuBar from '@/components/layouts/MenuLayout/MenuBar'
import styles from './styles.module.scss'
const MenuLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <MenuHeader />
      <div className={styles.menuAndMain}>
        <MenuBar />
        {children}
      </div>
    </>
  )
}

export default MenuLayout
