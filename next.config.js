/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
    '@mui/material',
    '@mui/system',
    '@mui/icons-material', // If @mui/icons-material is being used
  ]);
const nextConfig = {
  reactStrictMode: true,
  styledComponents: true,
}

module.exports = nextConfig
