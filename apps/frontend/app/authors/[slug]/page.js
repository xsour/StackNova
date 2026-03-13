import Image from 'next/image';
import { notFound } from 'next/navigation';
import ArticleCard from '../../../components/ArticleCard';
import Pagination from '../../../components/Pagination';
import { authors, getArticlesByAuthor, getAuthorBySlug } from '../../../lib/mock-data';

export const revalidate = 3600;

export function generateStaticParams() {
  return authors.map((author) => ({ slug: author.slug }));
}

export function generateMetadata({ params }) {
  const author = getAuthorBySlug(params.slug);

  if (!author) {
    return {
      title: 'Автора не знайдено'
    };
  }

  return {
    title: author.name,
    description: author.bio,
    alternates: {
      canonical: `/authors/${author.slug}`
    }
  };
}

export default function AuthorPage({ params, searchParams }) {
  const author = getAuthorBySlug(params.slug);

  if (!author) {
    notFound();
  }

  const page = Math.max(1, Number(searchParams?.page || 1) || 1);
  const { items, meta } = getArticlesByAuthor(author.slug, { page, perPage: 10 });

  return (
    <main className="container page">
      <section className="author-box">
        <div className="author-top">
          <Image src={author.avatarUrl} alt={author.name} width={96} height={96} />
          <div>
            <p className="eyebrow">Автор</p>
            <h1>{author.name}</h1>
            <p className="muted">{author.bio}</p>
          </div>
        </div>
      </section>

      <section className="panel section-spacer">
        <h2>Матеріали автора</h2>
        <div className="article-grid">
          {items.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        <Pagination basePath={`/authors/${author.slug}`} page={meta.page} totalPages={meta.totalPages} />
      </section>
    </main>
  );
}
