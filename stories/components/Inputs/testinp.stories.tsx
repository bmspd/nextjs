import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Input } from '@mui/material'

const InputTest = ({ dis = false }: { dis?: boolean }) => {
  return <Input disabled={dis} placeholder="text" />
}
const meta: Meta<typeof InputTest> = {
  component: InputTest,
  title: 'Components/InputTest',
}
export default meta
type Story = StoryObj<typeof InputTest>
export const Primary: Story = {
  args: {
    dis: false,
  },
}
