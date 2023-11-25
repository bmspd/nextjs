/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  modularizeImports: {
    '@mui/icons-material/?(((\\w*)?/?)*)': {
      transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}',
    },
  },
}
module.exports = nextConfig
