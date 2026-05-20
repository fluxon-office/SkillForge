import { Plus } from 'lucide-react';
import { courses } from '../../data/mockCourses.js';

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
