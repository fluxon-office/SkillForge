import { Award, BookOpen, GraduationCap, LayoutDashboard } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

const studentLinks = [
  { to: '/aluno', label: 'Painel', icon: LayoutDashboard, end: true },
  { to: '/aluno/cursos', label: 'Cursos', icon: BookOpen },
  { to: '/aluno/certificados', label: 'Certificados', icon: Award },
];

export function StudentLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark">
          <GraduationCap size={26} />
          <span>SkillForge</span>
        </div>

        <nav className="sidebar-nav" aria-label="Navegacao do aluno">
          {studentLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink key={link.to} to={link.to} end={link.end} className="nav-item">
                <Icon size={18} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
