/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true, // Enable Server Actions (if needed)
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint during builds
  },
  images: { 
    unoptimized: true, // Keep unoptimized images (useful for static exports)
  },
  // ❌ Removed `output: 'export'` because it prevents dynamic rendering
};

module.exports = nextConfig;
