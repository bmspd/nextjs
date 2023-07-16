import React from 'react'
import ThemeRegistry from '../components/Theme/ThemeRegistry/ThemeRegistry'
import StoreProvider from '../store/StoreProvider'
import SnackBarProvider from '../components/Providers/SnackBarProvider'

import '../styles/_global.scss'
import NextAuthProvider from '@/components/Providers/NextAuthProvider'
import $api from '@/http'
import axios from 'axios'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <NextAuthProvider>
            <ThemeRegistry>
              <SnackBarProvider>{children}</SnackBarProvider>
            </ThemeRegistry>
          </NextAuthProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
