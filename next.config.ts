import type { NextConfig } from 'next';

const isStaticMirror = process.env.STATIC_EXPORT === 'true';
const pagesBasePath = process.env.GITHUB_PAGES_BASE_PATH || '/everydaynews';

const nextConfig: NextConfig = isStaticMirror
  ? {
      output: 'export',
      basePath: pagesBasePath,
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
