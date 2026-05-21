import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { icon: 'home', label: 'Início', to: '/aluno', end: true },
  { icon: 'school', label: 'Cursos', to: '/aluno/cursos' },
  { icon: 'leaderboard', label: 'Classificação', to: '/aluno/classificacao', alert: true },
  { icon: 'card_membership', label: 'Certificados', to: '/aluno/certificados', desktopOnly: true },
  { icon: 'person', label: 'Perfil', to: '#profile' },
  { icon: 'settings', label: 'Configurações', to: '#settings', desktopOnly: true },
];

export function MaterialIcon({ children, filled = false, className = '', size }) {
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

function StudentNavigationItem({ item, variant }) {
  const isPlaceholder = item.to.startsWith('#');
  const baseClass = variant === 'bottom' ? 'student-bottom-link' : 'student-side-link';
  const activeClass = variant === 'bottom' ? 'student-bottom-link-active' : 'student-side-link-active';

  if (isPlaceholder) {
    return (
      <Link key={item.label} to={item.to} className={baseClass}>
        {variant === 'bottom' ? (
          <>
            <span className="student-bottom-icon-wrap">
              <MaterialIcon>{item.icon}</MaterialIcon>
            </span>
            <small>{item.label}</small>
          </>
        ) : (
          <>
            <MaterialIcon>{item.icon}</MaterialIcon>
            {item.label}
          </>
        )}
      </Link>
    );
  }

  return (
    <NavLink
      key={item.label}
      to={item.to}
      end={item.end}
      className={({ isActive }) => (isActive ? `${baseClass} ${activeClass}` : baseClass)}
    >
      {({ isActive }) =>
        variant === 'bottom' ? (
          <>
            {item.alert ? <span className="student-bottom-alert" /> : null}
            <span className="student-bottom-icon-wrap">
              <MaterialIcon filled={isActive}>{item.icon}</MaterialIcon>
            </span>
            <small>{item.label}</small>
          </>
        ) : (
          <>
            <MaterialIcon filled={isActive}>{item.icon}</MaterialIcon>
            {item.label}
          </>
        )
      }
    </NavLink>
  );
}

export function StudentCourseNavigation() {
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
              <div className="student-profile-title">Portal do Aluno</div>
              <div className="student-profile-level">Engenheiro Nível 42</div>
            </div>
          </div>
        </div>

        <nav className="student-side-nav" aria-label="Navegação do aluno">
          {navItems.map((item) => (
            <StudentNavigationItem key={item.label} item={item} variant="side" />
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
            <StudentNavigationItem key={item.label} item={item} variant="bottom" />
          ))}
      </nav>
    </>
  );
}
