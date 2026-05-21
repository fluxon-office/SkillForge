import { Link } from 'react-router-dom';
import './StudentDashboardPage.css';

const courseCoverUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDPVKieJ_ybzjiOXmviFswpvSB0IMgRyxrGFsMrR9z6SgzJiBtWjFaV3SOoEW-RgFSlwHhU0ZYigL5K5YwQlPKjJXmeh3tL0QQnRl-6WokK7lDaAeLfkwwE1eEVwzHCl0WvF6G7ZOCku40HGbwKmqynxIksX7fzFaYKO_dc26lVbfJb9-SnsLYRFI9nyHRhDfc1rJ4nrHbKx0UUR16xs_RuoNvnuB_t7KsYnBbJ9ahvHE9vTKWrZxG0AJiVFfvYP_4SPWiMSiUH0ns';

const navItems = [
  { icon: 'home', label: 'Início', to: '/aluno', active: true },
  { icon: 'school', label: 'Cursos', to: '/aluno/cursos' },
  { icon: 'leaderboard', label: 'Classificação', to: '/aluno/classificacao', alert: true },
  { icon: 'card_membership', label: 'Certificados', to: '/aluno/certificados', desktopOnly: true },
  { icon: 'person', label: 'Perfil', to: '#profile' },
  { icon: 'settings', label: 'Configurações', to: '#settings', desktopOnly: true },
];

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

export function StudentDashboardPage() {
  return (
    <div className="student-dashboard">
      <header className="student-mobile-top-bar" id="mobile-top-bar">
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
              <div className="student-profile-title">Portal do Aluno</div>
              <div className="student-profile-level">Engenheiro Nível 42</div>
            </div>
          </div>
        </div>

        <nav className="student-side-nav" aria-label="Navegação do aluno">
          {navItems.map((item) => (
            <Link
              to={item.to}
              key={item.label}
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

      <main className="student-main">
        <div className="student-content">
          <section className="student-hero">
            <div>
              <h1>
                Olá, <span>Alex!</span>
              </h1>
              <p>
                Engenharia de Software <strong>Turma 3SIT</strong>
              </p>
            </div>

            <button type="button" className="student-daily-button">
              <MaterialIcon>rocket_launch</MaterialIcon>
              Missão Diária
            </button>
          </section>

          <section className="student-telemetry-grid" aria-label="Resumo do aluno">
            <article className="student-stat-card student-progress-card">
              <div>
                <div className="student-card-label">
                  <MaterialIcon className="student-primary-icon">trending_up</MaterialIcon>
                  Progresso Geral
                </div>
                <div className="student-stat-value">
                  65<span>%</span>
                </div>
              </div>
              <div className="student-progress-track">
                <span style={{ width: '65%' }} />
              </div>
            </article>

            <article className="student-stat-card">
              <div>
                <div className="student-card-label">
                  <MaterialIcon>stars</MaterialIcon>
                  Pontos Totais
                </div>
                <div className="student-stat-value">1.250</div>
              </div>
              <div className="student-card-caption">XP ACUMULADO</div>
            </article>

            <article className="student-stat-card">
              <div className="student-level-row">
                <div>
                  <div className="student-muted">Nível</div>
                  <div className="student-mid-value">42</div>
                </div>
                <div className="student-ranking-box">
                  <div className="student-muted">Classificação</div>
                  <div className="student-mid-value">3º</div>
                </div>
              </div>
              <div className="student-rank-change">
                <MaterialIcon className="student-primary-icon" size={16}>
                  arrow_upward
                </MaterialIcon>
                +12 posições esta semana
              </div>
            </article>

            <article className="student-stat-card student-completed-card">
              <div>
                <div className="student-card-label">
                  <MaterialIcon>task_alt</MaterialIcon>
                  Cursos Concluídos
                </div>
                <div className="student-stat-value">5</div>
              </div>
              <div className="student-medal">
                <MaterialIcon filled>workspace_premium</MaterialIcon>
              </div>
            </article>
          </section>

          <section className="student-continue-section">
            <div className="student-section-header">
              <h2>Continue de onde parou</h2>
              <button type="button">
                Ver todos <MaterialIcon size={18}>arrow_forward</MaterialIcon>
              </button>
            </div>

            <article className="student-course-card">
              <div className="student-course-media">
                <img src={courseCoverUrl} alt="Capa do curso" />
                <div className="student-course-gradient" />
                <div className="student-course-tags">
                  <span>Módulo 4</span>
                  <span>Prática</span>
                </div>
              </div>

              <div className="student-course-details">
                <div className="student-course-kicker">ARQUITETURA DE SISTEMAS</div>
                <h3>Implementação de Microserviços com Docker</h3>
                <p>
                  Aprenda a desvincular monolitos em serviços independentes, escaláveis e resilientes usando
                  contêineres e orquestração avançada.
                </p>

                <div className="student-module-progress">
                  <div>
                    <span>Progresso do Módulo</span>
                    <strong>82%</strong>
                  </div>
                  <div className="student-module-track">
                    <span style={{ width: '82%' }} />
                  </div>
                </div>

                <div className="student-course-actions">
                  <Link to="/aluno/cursos/1/aula" className="student-resume-button">
                    <MaterialIcon filled>play_arrow</MaterialIcon>
                    Retomar Aula
                  </Link>
                  <Link to="/aluno/cursos/1" className="student-details-button">
                    Detalhes do Módulo
                  </Link>
                </div>
              </div>
            </article>
          </section>
        </div>
      </main>

      <nav className="student-bottom-nav" aria-label="Navegação mobile">
        {navItems
          .filter((item) => !item.desktopOnly)
          .map((item) => (
            <Link
              to={item.to}
              key={item.label}
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
    </div>
  );
}
