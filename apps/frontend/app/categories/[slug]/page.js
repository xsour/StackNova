import { notFound } from 'next/navigation';
import ArticleCard from '../../../components/ArticleCard';
import Pagination from '../../../components/Pagination';
import { categories, getArticlesByCategory, getCategoryBySlug } from '../../../lib/mock-data';

export const revalidate = 3600;

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: 'Категорію не знайдено'
    };
  }

  return {
    title: `${category.name}`,
    description: category.description,
    alternates: {
      canonical: `/categories/${category.slug}`
    }
  };
}

export default function CategoryPage({ params, searchParams }) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const page = Math.max(1, Number(searchParams?.page || 1) || 1);
  const { items, meta } = getArticlesByCategory(category.slug, { page, perPage: 10 });

  return (
    <main className="container page">
      <section className="panel">
        <p className="eyebrow">Категорія</p>
        <h1>{category.name}</h1>
        <p className="muted">{category.description}</p>
      </section>

      <section className="panel section-spacer">
        <h2>Статті категорії</h2>
        <div className="article-grid">
          {items.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        <Pagination basePath={`/categories/${category.slug}`} page={meta.page} totalPages={meta.totalPages} />
      </section>
    </main>
  );
}
