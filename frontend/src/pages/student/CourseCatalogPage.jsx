import { PageHeader } from '../../components/common/PageHeader.jsx';
import { CourseCard } from '../../components/courses/CourseCard.jsx';
import { courses } from '../../data/mockCourses.js';

export function CourseCatalogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Catalogo"
        title="Cursos disponiveis"
        description="Lista inicial de cursos mockados para evoluir depois com filtros, busca e detalhes."
      />

      <section className="card-grid">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </section>
    </>
  );
}
