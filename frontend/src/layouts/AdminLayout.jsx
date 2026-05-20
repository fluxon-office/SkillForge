import { BookPlus, GraduationCap, LayoutDashboard } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

const adminLinks = [
  { to: '/admin', label: 'Painel', icon: LayoutDashboard, end: true },
  { to: '/admin/cursos', label: 'Cursos', icon: BookPlus },
];

export function AdminLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar sidebar-admin">
        <div className="brand-mark">
          <GraduationCap size={26} />
          <span>SkillForge Professores</span>
        </div>

        <nav className="sidebar-nav" aria-label="Navegação do administrador">
          {adminLinks.map((link) => {
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
