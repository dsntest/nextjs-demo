/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    BASE_URL: process.env.BASE_URL,
  },
}

module.exports = nextConfig
