function normalizeUrl(rawValue, fallback) {
  try {
    return new URL(rawValue || fallback).toString().replace(/\/$/, '');
  } catch {
    return fallback;
  }
}

export function getSiteBaseUrl() {
  return normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL, 'http://localhost:3000');
}

export function getApiBaseUrl() {
  const explicit = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
  return normalizeUrl(explicit, 'http://localhost:4000');
}

export function toAbsoluteUrl(pathname = '/') {
  if (!pathname) {
    return getSiteBaseUrl();
  }

  if (/^https?:\/\//i.test(pathname)) {
    return pathname;
  }

  const siteBase = getSiteBaseUrl();
  return `${siteBase}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

export function toAbsoluteImageUrl(imageUrl) {
  if (!imageUrl) {
    return toAbsoluteUrl('/placeholder-cover.svg');
  }

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  return toAbsoluteUrl(imageUrl);
}

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'IT Blog',
  baseUrl: getSiteBaseUrl(),
  apiBaseUrl: getApiBaseUrl(),
  description:
    'Новини та статті про frontend, backend, DevOps, AI, кібербезпеку й корисні інструменти.'
};
