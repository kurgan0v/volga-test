/** @type {import('next').NextConfig} */

const nextConfig = {
    distDir: 'build',
    images: {
        domains: ["localhost", "volga-test.ru"],
    },
    env: {
        API: process.env.APP_BASE_URL
    }
}

module.exports = nextConfig
