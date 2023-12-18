/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins')

const nextConfig = {
  productionBrowserSourceMaps: true,
  webpack: (config) => {
    config.devtool = 'hidden-source-map'
    return config
  },
  pageExtensions: [
    // `.page.tsx` for page components
    'page.tsx',
    // `.api.ts` for API routes
    'api.ts',
  ],
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins([withBundleAnalyzer], nextConfig)
