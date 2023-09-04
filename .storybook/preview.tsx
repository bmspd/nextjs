import type { Preview } from '@storybook/react'
import themeCreate from '../src/components/Theme/ThemeRegistry/theme'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview

const withMuiTheme = (Story, context) => {
  const theme = context.parameters.theme || context.globals.theme
  return (
    <ThemeProvider theme={themeCreate(theme)}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          minHeight: 'calc(100vh - 40px)',
        }}
      >
        <Story />
      </Box>
    </ThemeProvider>
  )
}
export const decorators = [withMuiTheme]

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'circlehollow', title: 'light' },
        { value: 'dark', icon: 'circle', title: 'dark' },
      ],
      showName: true,
    },
  },
}
