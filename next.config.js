/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "gpts-works.s3.us-west-1.amazonaws.com",
      "trysai.s3.us-west-1.amazonaws.com",
      "localhost:3000.s3.us-west-1.amazonaws.com",
      "aiwallpaper-flying1101.s3.ap-northeast-1.amazonaws.com"
    ],
  },
  roductionBrowserSourceMaps: true, // For browser source maps
  // For server-side source maps (Next.js 13+)
  experimental: {
    serverSourceMaps: true,
  },
};

module.exports = nextConfig;
