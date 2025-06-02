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
  env: {
    AWS_AK: process.env.AWS_AK,
  },
};

module.exports = nextConfig;
