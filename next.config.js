const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === "development"
  },
  reactStrictMode: true,
  i18n: {
    locales: ['id-ID'],
    defaultLocale: 'id-ID',
  }
})

module.exports = nextConfig
