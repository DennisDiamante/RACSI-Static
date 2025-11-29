/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output for traditional Node.js hosting (Hostinger)
  output: 'standalone',
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Unoptimized images for shared hosting compatibility
  images: { 
    unoptimized: true 
  },
  
  // Ensure proper asset handling
  assetPrefix: process.env.ASSET_PREFIX || '',
};

module.exports = nextConfig;
