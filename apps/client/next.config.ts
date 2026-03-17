import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: [
    '@repo/api-client',
    '@repo/hooks',
    '@repo/ui',
    '@repo/types'
  ],
  images: {
    unoptimized: true,
  },
  turbopack: {}, // <-- добавлено для явного указания, что Turbopack разрешён (можно и без этого, но для ясности)
};

export default nextConfig;