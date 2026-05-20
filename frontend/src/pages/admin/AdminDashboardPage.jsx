import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader.jsx';
import { StatCard } from '../../components/dashboard/StatCard.jsx';

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
