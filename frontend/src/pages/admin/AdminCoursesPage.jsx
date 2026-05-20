import { Plus } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader.jsx';
import { courses } from '../../data/mockCourses.js';

export function AdminCoursesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cursos"
        title="Gerenciar cursos"
        description="Estrutura inicial para criação, edição e publicação de cursos pelos professores."
        action={
          <button type="button" className="button-primary">
            <Plus size={18} />
            Criar curso
          </button>
        }
      />

      <section className="list-panel">
        {courses.map((course) => (
          <article key={course.id} className="list-row">
            <div>
              <strong>{course.title}</strong>
              <span>
                {course.teacher} | {course.students} alunos | {course.status}
              </span>
            </div>
            <button type="button" className="button-secondary">
              Editar
            </button>
          </article>
        ))}
      </section>
    </>
  );
}
