import React from 'react'

export default function SecondLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h2>THIS IS SECOND LAYOUT</h2>
      {children}
    </div>
  )
}
