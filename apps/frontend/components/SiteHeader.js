import Link from 'next/link';

export default function SiteHeader({ categories }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div>
          <Link href="/" className="brand">
            IT Blog
          </Link>
          <p className="brand-note">Frontend · Backend · DevOps · AI</p>
        </div>

        <nav aria-label="Основна навігація" className="main-nav">
          <Link href="/">Головна</Link>
          {categories.map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`}>
              {category.shortName}
            </Link>
          ))}
          <Link href="/search">Пошук</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
