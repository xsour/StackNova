import { siteConfig } from '../lib/mock-data';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin'
      }
    ],
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`,
    host: siteConfig.baseUrl
  };
}
