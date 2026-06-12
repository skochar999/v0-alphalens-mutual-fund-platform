/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Proxy the backend through our own domain: browsers only ever call
  // alphapicker.in (some ISPs DNS-block *.up.railway.app), and Vercel
  // forwards to Railway server-side where DNS always resolves.
  async rewrites() {
    const API = 'https://alphalens-production-21b7.up.railway.app'
    return [
      { source: '/api/:path*', destination: `${API}/api/:path*` },
      { source: '/health', destination: `${API}/health` },
    ]
  },
}

export default nextConfig
