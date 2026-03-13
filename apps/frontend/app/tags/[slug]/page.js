import { notFound } from 'next/navigation';
import ArticleCard from '../../../components/ArticleCard';
import Pagination from '../../../components/Pagination';
import { getArticlesByTag, getTagBySlug, tags } from '../../../lib/mock-data';

export const revalidate = 3600;

export function generateStaticParams() {
  return tags.map((tag) => ({ slug: tag.slug }));
}

export function generateMetadata({ params }) {
  const tag = getTagBySlug(params.slug);

  if (!tag) {
    return {
      title: 'Тег не знайдено'
    };
  }

  return {
    title: `Тег: ${tag.name}`,
    description: `Список статей з тегом ${tag.name}`,
    alternates: {
      canonical: `/tags/${tag.slug}`
    }
  };
}

export default function TagPage({ params, searchParams }) {
  const tag = getTagBySlug(params.slug);

  if (!tag) {
    notFound();
  }

  const page = Math.max(1, Number(searchParams?.page || 1) || 1);
  const { items, meta } = getArticlesByTag(tag.slug, { page, perPage: 10 });

  return (
    <main className="container page">
      <section className="panel">
        <p className="eyebrow">Тег</p>
        <h1>#{tag.name}</h1>
        <p className="muted">Список матеріалів, де використано цей тег.</p>
      </section>

      <section className="panel section-spacer">
        <h2>Матеріали за тегом</h2>
        <div className="article-grid">
          {items.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        <Pagination basePath={`/tags/${tag.slug}`} page={meta.page} totalPages={meta.totalPages} />
      </section>
    </main>
  );
}
