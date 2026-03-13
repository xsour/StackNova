import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleCard from '../../../components/ArticleCard';
import {
  getArticleBySlug,
  getPublishedArticles,
  getRelatedArticles,
  siteConfig
} from '../../../lib/mock-data';

export const revalidate = 3600;

export function generateStaticParams() {
  return getPublishedArticles().map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Статтю не знайдено'
    };
  }

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: {
      canonical: `/articles/${article.slug}`
    },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: `${siteConfig.baseUrl}/articles/${article.slug}`,
      type: 'article',
      publishedTime: article.publishedAt
    }
  };
}

function formatDate(value) {
  return new Intl.DateTimeFormat('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(value));
}

export default function ArticlePage({ params }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.slug, 3);

  return (
    <main className="container page narrow">
      <article className="article-layout">
        <Image
          src={article.coverUrl}
          alt={article.title}
          width={1200}
          height={675}
          className="article-cover"
        />

        <header className="article-header">
          <div className="article-meta">
            <Link href={`/categories/${article.category.slug}`} className="badge">
              {article.category.name}
            </Link>
            <span className="muted">{formatDate(article.publishedAt)}</span>
          </div>

          <h1>{article.title}</h1>
          <p className="muted">{article.excerpt}</p>

          <div className="inline-list">
            <Link href={`/authors/${article.author.slug}`} className="pill">
              Автор: {article.author.name}
            </Link>
            <span className="pill">Переглядів: {article.views}</span>
          </div>
        </header>

        <section className="article-content prose">
          {article.content.split('\n\n').map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className="related-block">
          <h2 className="section-title">Теги</h2>
          <div className="tag-list">
            {article.tags.map((tag) => (
              <Link key={tag.slug} href={`/tags/${tag.slug}`} className="tag">
                #{tag.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="related-block">
          <h2 className="section-title">Пов’язані статті</h2>
          <div className="article-grid">
            {relatedArticles.map((related) => (
              <ArticleCard key={related.slug} article={related} />
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
