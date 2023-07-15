import React from 'react'
import MenuHeader from './MenuHeader'

const MenuLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <MenuHeader />
      <div>{children}</div>
    </>
  )
}

export default MenuLayout
