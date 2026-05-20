export const courses = [
  {
    id: 1,
    title: 'Fundamentos de Front-end',
    teacher: 'Profa. Marina Alves',
    level: 'Iniciante',
    duration: '24h',
    progress: 78,
    students: 148,
    status: 'Publicado',
  },
  {
    id: 2,
    title: 'React para Produtos Digitais',
    teacher: 'Prof. Lucas Mendes',
    level: 'Intermediario',
    duration: '36h',
    progress: 42,
    students: 96,
    status: 'Publicado',
  },
  {
    id: 3,
    title: 'UX aplicado a Plataformas',
    teacher: 'Profa. Camila Rocha',
    level: 'Intermediario',
    duration: '18h',
    progress: 0,
    students: 54,
    status: 'Rascunho',
  },
];

export const ranking = [
  { id: 1, name: 'Ana Souza', points: 2450, certificates: 7 },
  { id: 2, name: 'Bruno Lima', points: 2210, certificates: 6 },
  { id: 3, name: 'Carla Nunes', points: 1985, certificates: 5 },
];

export const certificates = [
  { id: 1, course: 'HTML e CSS Profissional', issuedAt: '12/05/2026' },
  { id: 2, course: 'Logica de Programacao', issuedAt: '04/05/2026' },
];
