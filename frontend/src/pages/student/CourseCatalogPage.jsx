import { Link } from 'react-router-dom';
import './StudentDashboardPage.css';
import './CourseCatalogPage.css';
import { MaterialIcon, StudentCourseNavigation } from './StudentCourseNavigation.jsx';

const courseCards = [
  {
    id: 1,
    track: 'SIT',
    status: 'Em andamento',
    title: 'Arquitetura Avançada de Sistemas',
    description:
      'Aprofunde-se em sistemas distribuídos, microserviços e padrões de infraestrutura de alta disponibilidade.',
    icon: 'terminal',
    hours: '40h',
    rating: '4.9',
    progress: 65,
    action: 'Continuar',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBMuMItQ4DjLFuaH5jB4jAJk_8ppBWKLbXuW32t9okZM7oN4uCH47S4DphFAOPCd2HxdXfYK2t-f9PWXVktcTrU0KHv92gkpJJYU1ENzzfjRYDQsjmGMVQohsKREbCE5sK4hcI7Iu-ScJXW_KFKvMGlUbGnqIorskmxQYGkeRZ9jafh5w4tBp866es-P6jbSd5CQ0JsD58H6LbFjLXOGVgcA9Udy0-yOwZzxKu1-UHtwJaXlhmivlqMWEcke4Y6UQbodcP5BzzdldE',
  },
  {
    id: 2,
    track: 'SAT',
    status: 'Iniciado',
    title: 'Otimização em Nível de Hardware',
    description:
      'Entenda a camada física e técnicas para otimizar software explorando arquiteturas específicas de CPU.',
    icon: 'memory',
    hours: '24h',
    rating: '4.7',
    progress: 0,
    action: 'Iniciar',
    muted: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCyFTy-iYZuV3oGj2WpcCSF_4UvJucsDMJq6qBqWDSVoLkS1ECcwhqmwCNSurl8D3qUgc7xeh5-2P3BUghWUmmIi89sw6QGNjMsZhg5wZlQD9mHBLqxEPp50IwYYrKKA6A3plXkVUNPinyVEdjCyPdwj2qKLojwsLMylAfXGULzgKwzWPZXq35QReWFhAgyerTr_SZ7It4TRuoDdYLh21JwqOBbu21otaAreWiKgTsBQ4HSo0YSGE_O8qAT8gf5xTGTMK2JK0TCvFc',
  },
  {
    id: 3,
    track: 'SRT',
    status: 'Concluído',
    title: 'Criptografia Aplicada',
    description:
      'Implementação de padrões modernos de criptografia, protocolos de troca de chaves e canais seguros.',
    icon: 'verified',
    hours: '32h',
    rating: '5.0',
    progress: 100,
    completed: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDIAZAE1oQseVWbDsLtFL1ncc_fwHL76DYBAQraWtGk7_LaEfgdsyUEZv9owJuzVUzFbvyJSOi5aQLYVp-INDcg7oPbwIRhWALvxZiN3A7pB1ww395ZeK0Tf4eJl24eYwZ6SJy91MKCPTatwhrGva1AHRbPdEIOU5pSbv716B0OJhyRAC9qX-6nCZnBmjzbyxLE_loTiWaAL0VobYZ37IwvAeaFxX53XPOZtEyB461RDMnvg31DcWllAXQw5NYhAjrVvjxF_vKFQXg',
  },
];

const filters = ['Todos', 'SIT', 'SAT', 'SRT', 'SPT', 'Geral'];

function CourseCard({ course }) {
  return (
    <article className="student-course-catalog-card">
      <div className="catalog-card-media">
        <div className="catalog-card-gradient" />
        <img src={course.image} alt={course.title} className={course.muted ? 'is-muted' : ''} />
        <div className="catalog-card-tags">
          <span>{course.track}</span>
          <span className={course.completed ? 'is-complete' : ''}>{course.status}</span>
        </div>
      </div>

      <div className="catalog-card-content">
        <div className="catalog-card-icon">
          <MaterialIcon className={course.completed ? 'student-primary-icon' : ''}>{course.icon}</MaterialIcon>
        </div>

        <h3>{course.title}</h3>
        <p>{course.description}</p>

        <div className="catalog-card-meta">
          <span>
            <MaterialIcon size={18}>schedule</MaterialIcon>
            {course.hours}
          </span>
          <span>
            <MaterialIcon size={18}>star</MaterialIcon>
            <strong>{course.rating}</strong>
          </span>
        </div>

        <div className="catalog-card-progress">
          <div>
            <span>Progresso</span>
            <strong className={course.completed ? 'is-complete' : ''}>{course.progress}%</strong>
          </div>
          <div className="catalog-progress-track">
            <span className={course.completed ? 'is-complete' : ''} style={{ width: `${course.progress}%` }} />
          </div>
        </div>

        <div className="catalog-card-actions">
          {course.completed ? (
            <button type="button" className="catalog-certificate-button">
              <MaterialIcon size={18}>download</MaterialIcon>
              Certificado
            </button>
          ) : (
            <>
              <Link to={`/aluno/cursos/${course.id}`} className="catalog-secondary-button">
                Saber mais
              </Link>
              <button type="button" className="catalog-primary-button">
                {course.action}
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export function CourseCatalogPage() {
  return (
    <div className="student-dashboard course-catalog-page">
      <StudentCourseNavigation />

      <main className="student-main course-main">
        <div className="course-canvas">
          <section className="course-header">
            <div>
              <h1>Currículo Disponível</h1>
              <p>Explore módulos técnicos criados para elevar suas habilidades de engenharia. Domine a pilha tecnológica.</p>
            </div>

            <div className="course-toolbar">
              <label className="course-search" aria-label="Buscar módulos">
                <MaterialIcon>search</MaterialIcon>
                <input type="text" placeholder="Buscar módulos..." />
              </label>

              <div className="course-filters" aria-label="Filtros de trilha">
                {filters.map((filter, index) => (
                  <button key={filter} type="button" className={index === 0 ? 'is-active' : ''}>
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="course-grid" aria-label="Cursos disponíveis">
            {courseCards.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </section>

          <div className="course-mobile-spacer" />
        </div>
      </main>
    </div>
  );
}
