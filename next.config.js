/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  env: {
    INFURA_ID: 'a5b51678f5c248c5af6c10dc7c5501ea',
    BACKEND_URL: 'https://18.221.134.53/api'
  },
}
