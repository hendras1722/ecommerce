import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return {
      afterFiles: [
        {
          source: '/js-holder/:path*',
          destination: 'https://jsonplaceholder.typicode.com/:path*',
        },
      ],
      beforeFiles: [
        {
          source: '/js-holder/:path*',
          destination: 'https://jsonplaceholder.typicode.com/:path*',
        },
      ],
      fallback: [
        {
          source: '/js-holder/:path*',
          destination: 'https://jsonplaceholder.typicode.com/:path*',
        },
      ],
    }
    // return [
    //   {

    //     basePath: false,
    //   },
    // ]
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  async redirects() {
    return []
  },
  poweredByHeader: false,
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
        },
      ],
    },
  ],
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
}

export default nextConfig
