import { useState } from 'react';
import { Link } from 'react-router-dom';
import './StudentDashboardPage.css';
import './CourseCatalogPage.css';
import './CourseDetailPage.css';
import { MaterialIcon, StudentCourseNavigation } from './StudentCourseNavigation.jsx';

const previewImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBt0MnC9g6pQC1C6Te5SXgmPp0FZRLwY9NupUvqDaWrDbFJ8HKT9NygmbRVn0g4Se9Iya_BwpAHcKzcomQrBIPAmDqXM3ga1h7EIzD8PAFj4VGACRMWGm2XWmVbi36ehfu2RfLgXzff_K4UxJg-zBP9pX9hCyhAQFctdo4EI2-Yj47ZUcdfop-T9q48VLf3SRGYAKqtW52bP-aNl4CDNMIFDYPkRu7IlGDdlfgyPsN9AIemC7g40wZZF-ZAJscH0qtqnWLETLRJX9M';

const learningItems = [
  'Implemente Compound Components, Render Props e Hooks personalizados com eficiência.',
  'Otimize re-renderizações e uso de memória em aplicações de grande escala.',
  'Estruture soluções escaláveis de gerenciamento de estado sem depender de bibliotecas externas.',
  'Domine Concurrent Mode e Suspense para estratégias avançadas de carregamento de dados.',
];

const syllabusModules = [
  {
    id: 'mod-01',
    number: 'MOD 01',
    title: 'Fundamentos de Reutilização',
    meta: '8 aulas  1h 45m',
    lessons: [
      { icon: 'play_circle', title: 'A filosofia dos componentes React', duration: '12:30' },
      { icon: 'play_circle', title: 'Props vs Estado: análise completa', duration: '18:45' },
    ],
  },
  {
    id: 'mod-02',
    number: 'MOD 02',
    title: 'Padrões Avançados: Compound Components',
    meta: '12 aulas  2h 15m',
    lessons: [{ icon: 'lock', title: 'Introdução à Context API para componentes', duration: '22:10' }],
  },
];

function CourseDetailHeader() {
  return (
    <header className="course-detail-topbar">
      <Link to="/aluno/cursos" className="course-detail-back-link">
        <MaterialIcon>arrow_back</MaterialIcon>
        <span>Voltar para cursos</span>
      </Link>

      <div className="course-detail-top-actions">
        <button type="button" aria-label="Compartilhar">
          <MaterialIcon>share</MaterialIcon>
        </button>
        <button type="button" aria-label="Salvar curso">
          <MaterialIcon>bookmark</MaterialIcon>
        </button>
      </div>
    </header>
  );
}

function EnrollmentCard() {
  return (
    <aside className="course-enrollment-card">
      <div
        className="course-enrollment-media"
        role="img"
        aria-label="Representação abstrata e profissional de estruturas de código React."
        style={{ backgroundImage: `url("${previewImage}")` }}
      >
        <div className="course-enrollment-gradient" />
        <button type="button" className="course-preview-button" aria-label="Assistir prévia do curso">
          <span>
            <MaterialIcon>play_arrow</MaterialIcon>
          </span>
        </button>
      </div>

      <div className="course-enrollment-content">
        <div className="course-price-row">
          <strong>R$ 299</strong>
          <span>R$ 399</span>
        </div>

        <button type="button" className="course-enroll-button">
          Inscrever-se agora
        </button>

        <p>Garantia de reembolso em 30 dias</p>

        <hr />

        <div className="course-includes-list">
          {['Acesso vitalício', 'Acesso à comunidade no Discord', '5 projetos reais'].map((item) => (
            <div key={item}>
              <MaterialIcon size={18}>check</MaterialIcon>
              {item}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

function SyllabusModule({ module, isOpen, onToggle }) {
  return (
    <article className="course-syllabus-module">
      <button type="button" onClick={onToggle} aria-expanded={isOpen}>
        <div className="course-module-title">
          <span>{module.number}</span>
          <strong>{module.title}</strong>
        </div>

        <div className="course-module-meta">
          <span>{module.meta}</span>
          <MaterialIcon>expand_more</MaterialIcon>
        </div>
      </button>

      {isOpen ? (
        <div className="course-lesson-list">
          {module.lessons.map((lesson) => (
            <div key={lesson.title} className="course-lesson-row">
              <div>
                <MaterialIcon size={18}>{lesson.icon}</MaterialIcon>
                <span>{lesson.title}</span>
              </div>
              <span>{lesson.duration}</span>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function CourseDetailPage() {
  const [openModuleId, setOpenModuleId] = useState(null);

  return (
    <div className="student-dashboard course-catalog-page course-detail-page">
      <StudentCourseNavigation />

      <main className="student-main course-main">
        <CourseDetailHeader />

        <div className="course-detail-canvas">
          <section className="course-detail-hero">
            <div className="course-detail-copy">
              <div className="course-detail-tags">
                <span>FRONTEND</span>
                <span>AVANÇADO</span>
                <div>
                  <MaterialIcon filled size={16}>
                    star
                  </MaterialIcon>
                  <strong>4,9 (2.104 avaliações)</strong>
                </div>
              </div>

              <h1>Padrões Avançados de React e Performance</h1>
              <p>
                Domine arquitetura React em nível empresarial. Aprenda a construir aplicações escaláveis e altamente
                performáticas usando padrões avançados, hooks personalizados e estratégias de gerenciamento de estado
                usadas por grandes empresas de tecnologia.
              </p>

              <div className="course-detail-stats">
                <span>
                  <MaterialIcon>schedule</MaterialIcon>
                  48 horas
                </span>
                <span>
                  <MaterialIcon>play_circle</MaterialIcon>
                  124 aulas
                </span>
                <span>
                  <MaterialIcon>workspace_premium</MaterialIcon>
                  Certificado
                </span>
              </div>
            </div>

            <EnrollmentCard />
          </section>

          <hr className="course-detail-divider" />

          <div className="course-detail-content-grid">
            <div className="course-detail-main-column">
              <section className="course-learn-card">
                <h2>O que você vai aprender</h2>

                <div className="course-learn-grid">
                  {learningItems.map((item) => (
                    <div key={item}>
                      <MaterialIcon>check_circle</MaterialIcon>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="course-syllabus-section">
                <div className="course-syllabus-heading">
                  <h2>Conteúdo do curso</h2>
                  <span>12 módulos  124 aulas</span>
                </div>

                <div className="course-syllabus-list">
                  {syllabusModules.map((module) => (
                    <SyllabusModule
                      key={module.id}
                      module={module}
                      isOpen={openModuleId === module.id}
                      onToggle={() => setOpenModuleId(openModuleId === module.id ? null : module.id)}
                    />
                  ))}
                </div>
              </section>
            </div>
          </div>

          <div className="course-mobile-spacer" />
        </div>
      </main>
    </div>
  );
}
