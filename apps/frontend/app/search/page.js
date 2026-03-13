import ArticleCard from '../../components/ArticleCard';
import { searchArticles } from '../../lib/mock-data';

export const metadata = {
  title: 'Пошук',
  description: 'Пошук статей за заголовком, описом, текстом та тегами.'
};

export default function SearchPage({ searchParams }) {
  const query = String(searchParams?.q || '').trim();
  const results = query ? searchArticles(query) : [];

  return (
    <main className="container page">
      <section className="search-box panel">
        <p className="eyebrow">Пошук</p>
        <h1>Пошук по блогу</h1>
        <form action="/search" method="get" className="search-form">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Наприклад: Railway, SSR, PostgreSQL"
            className="input"
          />
          <button type="submit" className="button">
            Знайти
          </button>
        </form>
      </section>

      {query ? (
        <section className="panel section-spacer">
          <h2>Результати для: {query}</h2>
          {results.length ? (
            <div className="article-grid">
              {results.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Нічого не знайдено. Спробуй інший запит.</p>
            </div>
          )}
        </section>
      ) : (
        <section className="empty-state section-spacer">
          <p>Введи ключове слово, щоб знайти матеріали по темі.</p>
        </section>
      )}
    </main>
  );
}
