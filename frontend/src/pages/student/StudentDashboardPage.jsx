import { PageHeader } from '../../components/common/PageHeader.jsx';
import { CourseCard } from '../../components/courses/CourseCard.jsx';
import { StatCard } from '../../components/dashboard/StatCard.jsx';
import { RankingList } from '../../components/ranking/RankingList.jsx';
import { courses, ranking } from '../../data/mockCourses.js';

export function StudentDashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Area do aluno"
        title="Resumo de aprendizado"
        description="Acompanhe cursos ativos, certificados conquistados e sua posicao no ranking."
      />

      <section className="stats-grid">
        <StatCard label="Cursos ativos" value="2" helper="1 novo curso recomendado" />
        <StatCard label="Certificados" value="6" helper="2 emitidos este mes" />
        <StatCard label="Pontos" value="2.450" helper="Top 3 da turma" />
      </section>

      <section className="content-grid">
        <div>
          <h2 className="section-title">Cursos em andamento</h2>
          <div className="card-grid">
            {courses.slice(0, 2).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        <aside>
          <h2 className="section-title">Ranking</h2>
          <RankingList items={ranking} />
        </aside>
      </section>
    </>
  );
}
