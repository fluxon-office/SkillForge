import { useMemo, useState } from 'react';
import './StudentDashboardPage.css';
import './RankingPage.css';
import { MaterialIcon, StudentCourseNavigation } from './StudentCourseNavigation.jsx';

const rankingViews = {
  turma: {
    title: 'Ranking da Turma',
    highlight: 'Turma',
    description: 'Compare seu desempenho com os alunos da sua turma e acompanhe quem mais evoluiu nesta semana.',
    podium: [
      { rank: 2, name: 'Ana S.', xp: 14200, label: 'XP', tone: 'silver' },
      { rank: 1, name: 'Carlos M.', xp: 15800, label: 'Líder em XP', tone: 'gold' },
      { rank: 3, name: 'Júlia F.', xp: 13500, label: 'XP', tone: 'bronze' },
    ],
    students: [
      { rank: 4, name: 'Pedro R.', xp: 12840, detail: 'Turma 3SIT' },
      { rank: 5, name: 'Marina R.', xp: 12100, detail: 'Turma 3SIT' },
      { rank: 6, name: 'Elena G.', xp: 11950, detail: 'Turma 3SIT' },
    ],
    currentStudent: {
      rank: 12,
      name: 'Você',
      xp: 8420,
      nextGap: 420,
      movement: 3,
      detail: 'Turma 3SIT',
    },
    nextStudent: { rank: 13, name: 'João S.', xp: 8100, detail: 'Turma 3SIT' },
  },
  curso: {
    title: 'Ranking do Curso',
    highlight: 'Curso',
    description: 'Veja os alunos com maior pontuação dentro do curso de Arquitetura de Sistemas.',
    podium: [
      { rank: 2, name: 'Bianca L.', xp: 16820, label: 'XP', tone: 'silver' },
      { rank: 1, name: 'Rafael A.', xp: 18140, label: 'Maior avanço', tone: 'gold' },
      { rank: 3, name: 'Thiago N.', xp: 15970, label: 'XP', tone: 'bronze' },
    ],
    students: [
      { rank: 4, name: 'Camila T.', xp: 15120, detail: 'Arquitetura de Sistemas' },
      { rank: 5, name: 'Lucas P.', xp: 14640, detail: 'Arquitetura de Sistemas' },
      { rank: 6, name: 'Nina C.', xp: 13980, detail: 'Arquitetura de Sistemas' },
    ],
    currentStudent: {
      rank: 58,
      name: 'Você',
      xp: 11260,
      nextGap: 920,
      movement: 5,
      detail: 'Arquitetura de Sistemas',
    },
    nextStudent: { rank: 59, name: 'Mateus F.', xp: 10940, detail: 'Arquitetura de Sistemas' },
  },
  geral: {
    title: 'Ranking Geral',
    highlight: 'Geral',
    description: 'Acompanhe sua posição entre todos os alunos ativos da plataforma SkillForge.',
    podium: [
      { rank: 2, name: 'Lara P.', xp: 24920, label: 'XP', tone: 'silver' },
      { rank: 1, name: 'Diego C.', xp: 27110, label: 'Top global', tone: 'gold' },
      { rank: 3, name: 'Fernanda O.', xp: 23760, label: 'XP', tone: 'bronze' },
    ],
    students: [
      { rank: 4, name: 'Henrique V.', xp: 22180, detail: 'Backend Avançado' },
      { rank: 5, name: 'Sofia M.', xp: 21420, detail: 'Criptografia Aplicada' },
      { rank: 6, name: 'André B.', xp: 20750, detail: 'Infraestrutura Cloud' },
    ],
    currentStudent: {
      rank: 214,
      name: 'Você',
      xp: 8420,
      nextGap: 740,
      movement: 11,
      detail: 'SkillForge Global',
    },
    nextStudent: { rank: 215, name: 'Bruna K.', xp: 8190, detail: 'SkillForge Global' },
  },
};

const filterOptions = [
  { id: 'turma', label: 'Turma' },
  { id: 'curso', label: 'Curso' },
  { id: 'geral', label: 'Geral' },
];

function formatCompactXp(value) {
  return `${(value / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}k`;
}

function formatXp(value) {
  return value.toLocaleString('pt-BR');
}

function StudentAvatar({ size = 'small' }) {
  return (
    <div className={`ranking-avatar ranking-avatar-${size}`}>
      <MaterialIcon filled>person</MaterialIcon>
    </div>
  );
}

function RankingHeader({ activeFilter, onFilterChange, view }) {
  return (
    <header className="ranking-header">
      <div>
        <h1>
          {view.title.split(' ').slice(0, -1).join(' ')} <span>{view.highlight}</span>
        </h1>
        <p>{view.description}</p>
      </div>

      <div className="ranking-filter-tabs" aria-label="Filtros de classificação">
        {filterOptions.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={filter.id === activeFilter ? 'is-active' : ''}
            onClick={() => onFilterChange(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </header>
  );
}

function PodiumCard({ student }) {
  return (
    <article className={`ranking-podium-card is-${student.tone}`}>
      <span className="ranking-podium-position">{student.rank}</span>
      <StudentAvatar size={student.rank === 1 ? 'large' : student.rank === 2 ? 'medium' : 'bronze'} />
      <strong>{student.name}</strong>
      <b>{formatCompactXp(student.xp)}</b>
      <small>{student.label}</small>
    </article>
  );
}

function RankingPodium({ students }) {
  return (
    <section className="ranking-podium-panel" aria-label="Pódio da classificação">
      <div className="ranking-podium">
        {students.map((student) => (
          <PodiumCard key={student.rank} student={student} />
        ))}
      </div>
    </section>
  );
}

function RankingRow({ student, muted = false }) {
  return (
    <article className={muted ? 'ranking-row is-muted' : 'ranking-row'}>
      <span className="ranking-position">{student.rank}</span>
      <div className="ranking-student-cell">
        <StudentAvatar />
        <div>
          <strong>{student.name}</strong>
          <small>{student.detail}</small>
        </div>
      </div>
      <span className="ranking-xp">{formatXp(student.xp)}</span>
    </article>
  );
}

function CurrentStudentRow({ student }) {
  return (
    <article className="ranking-row ranking-current-row">
      <span className="ranking-position">{student.rank}</span>
      <div className="ranking-student-cell">
        <StudentAvatar size="current" />
        <div>
          <strong>
            {student.name}
            <em>Atual</em>
          </strong>
          <small>
            <MaterialIcon size={14}>arrow_upward</MaterialIcon>
            Subiu {student.movement} posições
          </small>
        </div>
      </div>
      <span className="ranking-xp">
        {formatXp(student.xp)}
        <small>-{formatXp(student.nextGap)} para o próximo</small>
      </span>
    </article>
  );
}

function RankingBoard({ view, activeFilter }) {
  return (
    <section className="ranking-board" aria-label="Lista de classificação">
      <div className="ranking-board-head">
        <span>Rank</span>
        <span>Aluno</span>
        <span>XP</span>
      </div>

      {view.students.map((student) => (
        <RankingRow key={`${activeFilter}-${student.rank}`} student={student} />
      ))}

      <div className="ranking-gap" aria-hidden="true">
        <MaterialIcon>more_vert</MaterialIcon>
      </div>

      <CurrentStudentRow student={view.currentStudent} />
      <RankingRow student={view.nextStudent} muted />
    </section>
  );
}

export function RankingPage() {
  const [activeFilter, setActiveFilter] = useState('turma');
  const activeView = useMemo(() => rankingViews[activeFilter], [activeFilter]);

  return (
    <div className="student-dashboard ranking-page">
      <StudentCourseNavigation />

      <main className="student-main ranking-main">
        <div className="ranking-content">
          <RankingHeader activeFilter={activeFilter} onFilterChange={setActiveFilter} view={activeView} />

          <div className="ranking-grid">
            <RankingPodium students={activeView.podium} />
            <RankingBoard view={activeView} activeFilter={activeFilter} />
          </div>
        </div>
      </main>
    </div>
  );
}
