import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import MenuLayout from '../../components/layouts/MenuLayout/MenuLayout'

export default async function WithAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthLayout>
      <MenuLayout>
        <main>{children}</main>
      </MenuLayout>
    </AuthLayout>
  )
}
