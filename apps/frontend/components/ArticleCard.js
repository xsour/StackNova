'use client';

import Image from 'next/image';
import Link from 'next/link';

function formatDate(value) {
  return new Intl.DateTimeFormat('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(value));
}

export default function ArticleCard({ article }) {
  return (
    <article className="card">
      <Link href={`/articles/${article.slug}`} className="card-image-link">
        <Image
          src={article.coverUrl || '/placeholder-cover.svg'}
          alt={article.title}
          width={960}
          height={540}
          className="card-image"
        />
      </Link>

      <div className="card-body">
        <div className="card-meta-row">
          {article.category ? (
            <Link href={`/categories/${article.category.slug}`} className="badge">
              {article.category.name}
            </Link>
          ) : (
            <span className="badge">Без категорії</span>
          )}
          <span className="muted">{formatDate(article.publishedAt || article.createdAt || Date.now())}</span>
        </div>

        <h3 className="card-title">
          <Link href={`/articles/${article.slug}`}>{article.title}</Link>
        </h3>

        {article.excerpt ? <p className="card-excerpt">{article.excerpt}</p> : null}

        <div className="card-footer">
          {article.author ? <Link href={`/authors/${article.author.slug}`}>{article.author.name}</Link> : <span>Автор не вказаний</span>}
          <span className="muted">{article.views ?? 0} переглядів</span>
        </div>
      </div>
    </article>
  );
}
