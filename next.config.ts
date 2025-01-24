/** @type {import('next').NextConfig} */
export default {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/roboguard.github.io' : '',
  images: {
    unoptimized: true,
  },
};
