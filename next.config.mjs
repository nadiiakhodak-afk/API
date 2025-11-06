import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const repo = process.env.GITHUB_REPOSITORY?.split('/')?.[1] ?? '';
const isCI = process.env.GITHUB_ACTIONS === 'true';
const basePathFromEnv = process.env.NEXT_PUBLIC_BASE_PATH?.trim();

function normalizeBasePath(input) {
  if (!input) return '';
  const trimmed = input.replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}` : '';
}

const resolvedBasePath = normalizeBasePath(
  basePathFromEnv || (isCI && repo ? repo : ''),
);

const config = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: resolvedBasePath || undefined,
  assetPrefix: resolvedBasePath || undefined,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: resolvedBasePath,
  },
};

export default withMDX(config);
