import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

function PageHeader({ eyebrow, title, description, action }) {
  return (
    <header className="page-header">
      <div>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>

      {action ? <div className="header-action">{action}</div> : null}
    </header>
  );
}

function StatCard({ label, value, helper }) {
  return (
    <article className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      {helper ? <small>{helper}</small> : null}
    </article>
  );
}

export function AdminDashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Área do professor"
        title="Gestão acadêmica"
        description="Controle cursos, alunos, publicações e indicadores da instituição."
        action={
          <Link to="/admin/cursos" className="button-primary">
            <Plus size={18} />
            Novo curso
          </Link>
        }
      />

      <section className="stats-grid">
        <StatCard label="Alunos matriculados" value="298" helper="+18 nos últimos 7 dias" />
        <StatCard label="Cursos publicados" value="12" helper="3 em atualização" />
        <StatCard label="Certificados emitidos" value="684" helper="42 este mês" />
      </section>
    </>
  );
}
