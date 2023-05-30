import React from 'react'

export default function FirstLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h1>FIRST LAYOUT!</h1>
      {children}
    </div>
  )
}
