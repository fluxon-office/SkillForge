import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout.jsx';
import { StudentLayout } from '../layouts/StudentLayout.jsx';
import { AdminCoursesPage } from '../pages/admin/AdminCoursesPage.jsx';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage.jsx';
import { LoginPage } from '../pages/public/LoginPage.jsx';
import { CertificatesPage } from '../pages/student/CertificatesPage.jsx';
import { CourseCatalogPage } from '../pages/student/CourseCatalogPage.jsx';
import { CourseDetailPage } from '../pages/student/CourseDetailPage.jsx';
import { StudentDashboardPage } from '../pages/student/StudentDashboardPage.jsx';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="/aluno" element={<StudentDashboardPage />} />

      <Route path="/aluno/cursos" element={<CourseCatalogPage />} />
      <Route path="/aluno/cursos/:courseId" element={<CourseDetailPage />} />

      <Route path="/aluno/certificados" element={<StudentLayout />}>
        <Route index element={<CertificatesPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="cursos" element={<AdminCoursesPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
