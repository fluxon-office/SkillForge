import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader.jsx';
import { StatCard } from '../../components/dashboard/StatCard.jsx';

export function AdminDashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Area do professor"
        title="Gestao academica"
        description="Controle cursos, alunos, publicacoes e indicadores da instituicao."
        action={
          <Link to="/admin/cursos" className="button-primary">
            <Plus size={18} />
            Novo curso
          </Link>
        }
      />

      <section className="stats-grid">
        <StatCard label="Alunos matriculados" value="298" helper="+18 nos ultimos 7 dias" />
        <StatCard label="Cursos publicados" value="12" helper="3 em atualizacao" />
        <StatCard label="Certificados emitidos" value="684" helper="42 este mes" />
      </section>
    </>
  );
}
