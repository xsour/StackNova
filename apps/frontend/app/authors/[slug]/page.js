import Image from 'next/image';
import { notFound } from 'next/navigation';

import ArticleCard from '../../../components/ArticleCard';
import Pagination from '../../../components/Pagination';
import { getAuthorPageData } from '../../../lib/api';
import { authors } from '../../../lib/mock-data';

export const revalidate = 86400;

export function generateStaticParams() {
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata(props) {
  const params = await props.params;
  const { author } = await getAuthorPageData(params.slug, { page: 1 });

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
    },
    openGraph: {
      title: `${author.name} | IT Blog`,
      description: author.bio,
      url: `/authors/${author.slug}`
    }
  };
}

export default async function AuthorPage(props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const page = Math.max(1, Number(searchParams?.page || 1) || 1);
  const { author, items, meta } = await getAuthorPageData(params.slug, { page });

  if (!author) {
    notFound();
  }

  return (
    <main className="container page">
      <section className="author-box">
        <div className="author-top">
          <Image
            src={author.avatarUrl || '/author-avatar.svg'}
            alt={author.name}
            width={96}
            height={96}
          />
          <div>
            <p className="eyebrow">Автор</p>
            <h1>{author.name}</h1>
            <p className="muted">{author.bio}</p>
          </div>
        </div>
      </section>

      <section className="panel section-spacer">
        <h2>Матеріали автора</h2>
        {items.length ? (
          <div className="article-grid">
            {items.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>У цього автора поки немає опублікованих статей.</p>
          </div>
        )}
        <Pagination basePath={`/authors/${author.slug}`} page={meta.page} totalPages={meta.totalPages} />
      </section>
    </main>
  );
}
