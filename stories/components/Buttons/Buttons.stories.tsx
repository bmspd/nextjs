import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Button, ButtonTypeMap } from '@mui/material'
import { capitalize } from 'lodash'
import { ValueOf } from '@/types/utils'
type ButtonProps = ValueOf<Pick<ButtonTypeMap, 'props'>>
type Colors = ValueOf<Pick<ButtonProps, 'color'>>
type Variants = ValueOf<Pick<ButtonProps, 'variant'>>
const BUTTON_VARIANTS: Variants[] = ['contained', 'outlined', 'text']
const ButtonsSet = ({ color }: { color: Colors }) => (
  <>
    {BUTTON_VARIANTS.map((variant) => (
      <Grid
        key={`${color}-${variant}`}
        display="flex"
        justifyContent="center"
        alignItems="center"
        xs={4}
      >
        <Button sx={{ width: '200px' }} color={color} variant={variant}>
          {capitalize(color)} Button
        </Button>
      </Grid>
    ))}
  </>
)
const ButtonsView = () => {
  return (
    <Grid container spacing={2}>
      <ButtonsSet color="primary" />
      <ButtonsSet color="secondary" />
      <ButtonsSet color="success" />
      <ButtonsSet color="error" />
      <ButtonsSet color="warning" />
      <ButtonsSet color="info" />
    </Grid>
  )
}

const meta: Meta<typeof ButtonsView> = {
  component: ButtonsView,
  title: 'Components/Buttons',
}

export default meta
type Story = StoryObj<typeof ButtonsView>
export const View: Story = {
  args: {},
}
