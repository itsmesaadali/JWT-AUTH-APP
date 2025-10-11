/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google's avatar host
        port: '',
        pathname: '/**', // Allow all paths under it
      },
      // Add more if needed, e.g., for other providers like Gravatar
    ],
  },
}

module.exports = nextConfig