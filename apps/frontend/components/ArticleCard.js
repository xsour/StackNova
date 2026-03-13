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
          src={article.coverUrl}
          alt={article.title}
          width={960}
          height={540}
          className="card-image"
        />
      </Link>

      <div className="card-body">
        <div className="card-meta-row">
          <Link href={`/categories/${article.category.slug}`} className="badge">
            {article.category.name}
          </Link>
          <span className="muted">{formatDate(article.publishedAt)}</span>
        </div>

        <h3 className="card-title">
          <Link href={`/articles/${article.slug}`}>{article.title}</Link>
        </h3>

        <p className="card-excerpt">{article.excerpt}</p>

        <div className="card-footer">
          <Link href={`/authors/${article.author.slug}`}>{article.author.name}</Link>
          <span className="muted">{article.views} переглядів</span>
        </div>
      </div>
    </article>
  );
}
