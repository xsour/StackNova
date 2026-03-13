import { authors, categories, getPublishedArticles, siteConfig, tags } from '../lib/mock-data';

export default function sitemap() {
  const baseUrl = siteConfig.baseUrl;
  const now = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified: now
    },
    ...categories.map((category) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: now
    })),
    ...authors.map((author) => ({
      url: `${baseUrl}/authors/${author.slug}`,
      lastModified: now
    })),
    ...tags.map((tag) => ({
      url: `${baseUrl}/tags/${tag.slug}`,
      lastModified: now
    })),
    ...getPublishedArticles().map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.publishedAt)
    }))
  ];
}
