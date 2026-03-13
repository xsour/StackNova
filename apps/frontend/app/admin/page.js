export const metadata = {
  title: 'Панель адміністрування',
  description: 'Службова зона для керування контентом.',
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminPage() {
  return (
    <main className="container page narrow">
      <section className="panel">
        <p className="admin-note">Службова зона</p>
        <h1>Панель адміністрування</h1>
        <p className="muted">
          Розділ призначений для керування контентом і закритий від індексації.
        </p>
      </section>
    </main>
  );
}
