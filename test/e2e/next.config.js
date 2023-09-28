const { NextWorkerPlugin } = require('next-worker');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: NextWorkerPlugin()
}

module.exports = nextConfig
