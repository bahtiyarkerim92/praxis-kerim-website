import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Internationalization
  i18n: undefined, // Using custom i18n solution

  // Image optimization - WebP/AVIF priority for maximum compression
  images: {
    // Prioritize AVIF first, then WebP, fallback to original
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    loader: 'default',
    // Force WebP/AVIF in all environments
    ...(process.env.NODE_ENV === 'development' && {
      formats: ['image/avif', 'image/webp'],
    }),
    // Enable aggressive optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'praxiskerim.de',
        port: '',
        pathname: '/images/**',
      },
    ],
  },

  // Compression
  compress: true,

  // Trailing slash
  trailingSlash: false,

  // Generate etags
  generateEtags: true,

  // HTTP headers for security and SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
      {
        source: '/:path*.(jpg|jpeg|png|gif|svg|webp|avif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Rewrites for language paths
  async rewrites() {
    return [
      {
        source: '/de/:path*',
        destination: '/:path*',
      },
    ];
  },

  // Redirects (if needed)
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Experimental features (disabled for build stability)
  // experimental: {
  //   optimizeCss: true,
  // },
};

export default nextConfig;
