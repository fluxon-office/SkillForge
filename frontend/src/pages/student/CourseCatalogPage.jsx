import { Link } from 'react-router-dom';
import './StudentDashboardPage.css';
import './CourseCatalogPage.css';

const courseCards = [
  {
    id: 1,
    track: 'SIT',
    status: 'Em andamento',
    title: 'Advanced Systems Architecture',
    description:
      'Deep dive into distributed systems, microservices, and high-availability infrastructure design patterns.',
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
    title: 'Hardware-Level Optimization',
    description:
      'Understand the physical layer. Techniques for optimizing software to leverage specific CPU architectures.',
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
    title: 'Applied Cryptography',
    description:
      'Implementation of modern encryption standards, key exchange protocols, and secure communication channels.',
    icon: 'verified',
    hours: '32h',
    rating: '5.0',
    progress: 100,
    completed: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDIAZAE1oQseVWbDsLtFL1ncc_fwHL76DYBAQraWtGk7_LaEfgdsyUEZv9owJuzVUzFbvyJSOi5aQLYVp-INDcg7oPbwIRhWALvxZiN3A7pB1ww395ZeK0Tf4eJl24eYwZ6SJy91MKCPTatwhrGva1AHRbPdEIOU5pSbv716B0OJhyRAC9qX-6nCZnBmjzbyxLE_loTiWaAL0VobYZ37IwvAeaFxX53XPOZtEyB461RDMnvg31DcWllAXQw5NYhAjrVvjxF_vKFQXg',
  },
];

const navItems = [
  { icon: 'home', label: 'Home', to: '/aluno' },
  { icon: 'school', label: 'Courses', to: '/aluno/cursos', active: true },
  { icon: 'leaderboard', label: 'Ranking', to: '#ranking', alert: true },
  { icon: 'card_membership', label: 'Certificates', to: '/aluno/certificados', desktopOnly: true },
  { icon: 'person', label: 'Profile', to: '#profile' },
  { icon: 'settings', label: 'Settings', to: '#settings', desktopOnly: true },
];

const filters = ['All', 'SIT', 'SAT', 'SRT', 'SPT', 'Geral'];

function MaterialIcon({ children, filled = false, className = '', size }) {
  const style = {
    ...(filled ? { fontVariationSettings: "'FILL' 1" } : undefined),
    ...(size ? { fontSize: size } : undefined),
  };

  return (
    <span className={`material-symbols-outlined ${className}`} style={style} aria-hidden="true">
      {children}
    </span>
  );
}

function StudentCourseNavigation() {
  return (
    <>
      <header className="student-mobile-top-bar">
        <div className="student-mobile-brand">SkillForge</div>
        <div className="student-mobile-actions">
          <button type="button" aria-label="Notificações">
            <MaterialIcon>notifications</MaterialIcon>
          </button>
          <button type="button" aria-label="Configurações">
            <MaterialIcon>settings</MaterialIcon>
          </button>
        </div>
      </header>

      <aside className="student-sidebar">
        <div className="student-sidebar-header">
          <div className="student-brand">
            <MaterialIcon filled className="student-brand-icon">
              terminal
            </MaterialIcon>
            SkillForge
          </div>

          <div className="student-profile-card">
            <div className="student-avatar">
              <MaterialIcon filled>person</MaterialIcon>
            </div>
            <div>
              <div className="student-profile-title">Student Portal</div>
              <div className="student-profile-level">Level 42 Engineer</div>
            </div>
          </div>
        </div>

        <nav className="student-side-nav" aria-label="Navegação do aluno">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={item.active ? 'student-side-link student-side-link-active' : 'student-side-link'}
            >
              <MaterialIcon filled={item.active}>{item.icon}</MaterialIcon>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="student-sidebar-footer">
          <button type="button" className="student-logout-button">
            <MaterialIcon>logout</MaterialIcon>
            Sair
          </button>
        </div>
      </aside>

      <nav className="student-bottom-nav" aria-label="Navegação mobile">
        {navItems
          .filter((item) => !item.desktopOnly)
          .map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={item.active ? 'student-bottom-link student-bottom-link-active' : 'student-bottom-link'}
            >
              {item.alert ? <span className="student-bottom-alert" /> : null}
              <span className="student-bottom-icon-wrap">
                <MaterialIcon filled={item.active}>{item.icon}</MaterialIcon>
              </span>
              <small>{item.label}</small>
            </Link>
          ))}
      </nav>
    </>
  );
}

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
            <span>Progress</span>
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
              Certificate
            </button>
          ) : (
            <>
              <button type="button" className="catalog-secondary-button">
                Saber mais
              </button>
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
              <h1>Available Curriculum</h1>
              <p>Explore technical modules designed to elevate your engineering capabilities. Master the stack.</p>
            </div>

            <div className="course-toolbar">
              <label className="course-search" aria-label="Buscar módulos">
                <MaterialIcon>search</MaterialIcon>
                <input type="text" placeholder="Search modules..." />
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
