/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: '*'
    },
    {
      protocol: 'https',
      hostname: '*.com'
    },
    {
      protocol: 'https',
      hostname: 'miro.medium.com'
    }
    ]
  }
}

module.exports = nextConfig
