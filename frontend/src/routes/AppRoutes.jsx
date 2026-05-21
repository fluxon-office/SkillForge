import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout.jsx';
import { AdminCoursesPage } from '../pages/admin/AdminCoursesPage.jsx';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage.jsx';
import { LoginPage } from '../pages/public/LoginPage.jsx';
import { CertificatesPage } from '../pages/student/CertificatesPage.jsx';
import { CourseCatalogPage } from '../pages/student/CourseCatalogPage.jsx';
import { CourseDetailPage } from '../pages/student/CourseDetailPage.jsx';
import { CoursePlayerPage } from '../pages/student/CoursePlayerPage.jsx';
import { RankingPage } from '../pages/student/RankingPage.jsx';
import { StudentDashboardPage } from '../pages/student/StudentDashboardPage.jsx';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="/aluno" element={<StudentDashboardPage />} />

      <Route path="/aluno/cursos" element={<CourseCatalogPage />} />
      <Route path="/aluno/cursos/:courseId" element={<CourseDetailPage />} />
      <Route path="/aluno/cursos/:courseId/aula" element={<CoursePlayerPage />} />
      <Route path="/aluno/classificacao" element={<RankingPage />} />

      <Route path="/aluno/certificados" element={<CertificatesPage />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="cursos" element={<AdminCoursesPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
