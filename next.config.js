/** @type {import('next').NextConfig} */

const baseRoute = '/main-vite/app-nextjs11'
const assetPrefix = `http://localhost:4002${baseRoute}`

const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    publicRuntimeConfig: {
        assetPrefix,
    },
    basePath: baseRoute,
    assetPrefix,
}

module.exports = nextConfig
