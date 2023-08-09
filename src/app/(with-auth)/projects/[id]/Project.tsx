'use client'
import MainBlock from '@/components/Blocks/MainBlock'
import React from 'react'

const Project: React.FC<{ id: string }> = ({ id }) => {
  return <MainBlock>PROJECT {id}</MainBlock>
}

export default Project
