import React from 'react'
import ThemeRegistry from '../components/Theme/ThemeRegistry/ThemeRegistry'
import StoreProvider from '../store/StoreProvider'
import SnackBarProvider from '../components/Providers/SnackBarProvider'
import NextAuthProvider from '@/components/Providers/NextAuthProvider'
import LoaderLayout from '@/components/layouts/LoaderLayout'
import ModalLayout from '@/components/layouts/ModalLayout/ModalLayout'
import '../styles/_global.scss'

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
              <SnackBarProvider>
                <LoaderLayout>
                  <ModalLayout>{children}</ModalLayout>
                </LoaderLayout>
              </SnackBarProvider>
            </ThemeRegistry>
          </NextAuthProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
