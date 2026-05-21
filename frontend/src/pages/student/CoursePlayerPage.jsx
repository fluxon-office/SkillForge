import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Captions,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Lock,
  Maximize,
  Minimize,
  Pause,
  Play,
  PlayCircle,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './StudentDashboardPage.css';
import './CourseCatalogPage.css';
import './CoursePlayerPage.css';
import { StudentCourseNavigation } from './StudentCourseNavigation.jsx';

const lessonCoverUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCO9XZt2wwGcM8L7x9fEqsYGiIybdd6qO6Q7OjMhIqbnH0klAO5PL2xV-pRwRIZZnBVdTolZdl8raF4qm9cU2a46Od0RBtC1Pi_YBPHBb5jf6KPUtRZ7u6dZReMQfkVdEzJ2shhGxbZaush8yeSXLRw8FGuU3UJ-nB5WEQoIGFdhCdICralz6DDjEmdfitKLGBGbPzL0TiYJYGfNVTEEQFonV2bcNILjkxnhLyBHJEmxT8YZeDkaZ1rPrU6N3qVowfU4SYj2tbG3ww';

const courseModules = [
  {
    id: 'modulo-01',
    label: 'Modulo 1',
    title: 'Fundamentos',
    locked: false,
    lessons: [
      {
        id: 'boas-vindas',
        title: 'Boas-vindas ao curso',
        duration: '08:20',
        completed: true,
      },
      {
        id: 'arquitetura-base',
        title: 'Arquitetura base de sistemas',
        duration: '16:40',
        completed: true,
      },
    ],
  },
  {
    id: 'modulo-02',
    label: 'Modulo 2',
    title: 'Modelagem de Dados',
    locked: false,
    lessons: [
      {
        id: 'modelagem-relacional',
        title: 'Modelagem relacional aplicada',
        duration: '18:30',
        completed: true,
      },
      {
        id: 'consistencia-dados',
        title: 'Consistencia e escalabilidade',
        duration: '21:05',
        completed: true,
      },
    ],
  },
  {
    id: 'modulo-03',
    label: 'Modulo 3',
    title: 'Consenso Distribuido',
    locked: false,
    lessons: [
      {
        id: 'introducao-consenso',
        title: 'Introducao ao consenso',
        duration: '10:45',
        completed: true,
      },
      {
        id: 'paxos-raft',
        title: 'Entendendo Paxos e Raft',
        duration: '34:15',
        completed: false,
      },
      {
        id: 'restricoes-implementacao',
        title: 'Restricoes de implementacao',
        duration: '22:10',
        completed: false,
      },
    ],
  },
  {
    id: 'modulo-04',
    label: 'Modulo 4',
    title: 'Seguranca de Sistemas',
    locked: true,
    lessons: [
      {
        id: 'seguranca-sistemas',
        title: 'Superficie de ataque em sistemas distribuidos',
        duration: '24:00',
        completed: false,
      },
    ],
  },
];

const tabContent = {
  overview: {
    label: 'Visao geral',
    title: 'Entendendo Paxos e Raft',
    body:
      'Nesta aula, aprofundamos algoritmos de consenso distribuido, conectando os fundamentos teoricos do Paxos com as decisoes praticas que tornam o Raft mais direto de implementar e auditar em ambientes reais.',
    items: [
      'O problema dos generais bizantinos aplicado a redes empresariais.',
      'Protocolos de eleicao de lider e replicacao de maquinas de estado.',
      'Tratamento de particoes de rede e cenarios de split-brain.',
    ],
  },
  notes: {
    label: 'Anotacoes',
    title: 'Anotacoes da aula',
    body:
      'Use este espaco como resumo rapido do estudo. Em uma integracao futura, estas anotacoes podem ser salvas por aluno e por aula.',
    items: ['Paxos prioriza rigor teorico.', 'Raft facilita a leitura operacional.', 'Definir lider reduz conflito de escrita.'],
  },
  discussion: {
    label: 'Discussao',
    title: 'Discussao da turma',
    body:
      'Area preparada para perguntas, respostas e comentarios sobre a aula atual. A estrutura visual ja esta pronta para receber uma API depois.',
    items: ['Como lidar com particoes longas?', 'Quando escolher Raft em vez de Paxos?', 'Quais metricas monitorar no cluster?'],
  },
  resources: {
    label: 'Recursos',
    title: 'Materiais de apoio',
    body: 'Arquivos e referencias complementares para revisar antes de avancar para o proximo modulo.',
    items: ['Resumo em PDF sobre consenso distribuido.', 'Checklist de implementacao Raft.', 'Exercicio pratico de eleicao de lider.'],
  },
};

const initialLessonId = 'paxos-raft';

function findLessonById(lessonId) {
  for (const module of courseModules) {
    const lesson = module.lessons.find((item) => item.id === lessonId);

    if (lesson) {
      return { module, lesson };
    }
  }

  return { module: courseModules[2], lesson: courseModules[2].lessons[1] };
}

function getLessonStatus(lesson, activeLessonId) {
  if (lesson.id === activeLessonId) {
    return 'active';
  }

  return lesson.completed ? 'completed' : 'upcoming';
}

function LessonStatusIcon({ status }) {
  if (status === 'completed') {
    return (
      <span className="course-player-lesson-icon is-complete">
        <CheckCircle2 size={18} strokeWidth={2.2} />
      </span>
    );
  }

  if (status === 'active') {
    return (
      <span className="course-player-lesson-icon is-playing">
        <span aria-hidden="true" />
        <PlayCircle size={18} fill="currentColor" strokeWidth={2.2} />
      </span>
    );
  }

  return (
    <span className="course-player-empty-icon" aria-hidden="true">
      <Circle size={14} />
    </span>
  );
}

function CourseModule({ module, activeLessonId, expandedModuleIds, onToggleModule, onSelectLesson }) {
  const isExpanded = expandedModuleIds.includes(module.id);
  const isLocked = module.locked;

  return (
    <article
      className={[
        'course-player-module',
        isExpanded ? 'is-active' : '',
        isLocked ? 'is-locked' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button type="button" disabled={isLocked} aria-expanded={isExpanded} onClick={() => onToggleModule(module.id)}>
        <div>
          <span>{module.label}</span>
          <strong>{module.title}</strong>
        </div>
        {isLocked ? <Lock size={18} /> : isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isExpanded ? (
        <div className="course-player-lessons">
          {module.lessons.map((lesson) => {
            const status = getLessonStatus(lesson, activeLessonId);

            return (
              <button
                key={lesson.id}
                type="button"
                className={status === 'active' ? 'course-player-lesson is-current' : 'course-player-lesson'}
                onClick={() => onSelectLesson(module.id, lesson.id)}
              >
                <LessonStatusIcon status={status} />
                <div>
                  <strong>{lesson.title}</strong>
                  <span>{lesson.duration}</span>
                </div>
              </button>
            );
          })}
        </div>
      ) : null}
    </article>
  );
}

function VideoPlayer({ lesson, isPlaying, isMuted, captionsEnabled, isExpanded, onTogglePlay, onToggleMute, onToggleCaptions, onToggleExpanded }) {
  return (
    <section className={isExpanded ? 'course-player-video-card is-expanded' : 'course-player-video-card'} aria-label="Player da aula">
      <img src={lessonCoverUrl} alt="Editor de codigo em tema escuro representando uma aula tecnica." />
      <div className="course-player-video-overlay" />

      <button type="button" className="course-player-play-button" aria-label={isPlaying ? 'Pausar aula' : 'Reproduzir aula'} onClick={onTogglePlay}>
        {isPlaying ? <Pause size={34} fill="currentColor" /> : <Play size={34} fill="currentColor" />}
      </button>

      <div className="course-player-video-title">
        <span>Aula atual</span>
        <strong>{lesson.title}</strong>
      </div>

      <div className="course-player-controls" aria-label="Controles do video">
        <div className="course-player-scrub">
          <span style={{ width: isPlaying ? '42%' : '35%' }} />
        </div>

        <div className="course-player-control-row">
          <div>
            <button type="button" aria-label={isPlaying ? 'Pausar aula' : 'Reproduzir aula'} onClick={onTogglePlay}>
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <span>{isPlaying ? '14:28' : '12:04'} / {lesson.duration}</span>
          </div>

          <div>
            <button type="button" aria-label={isMuted ? 'Ativar volume' : 'Silenciar'} onClick={onToggleMute}>
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <button
              type="button"
              className={captionsEnabled ? 'is-active' : ''}
              aria-label={captionsEnabled ? 'Desativar legendas' : 'Ativar legendas'}
              onClick={onToggleCaptions}
            >
              <Captions size={20} />
            </button>
            <button type="button" aria-label={isExpanded ? 'Sair da tela expandida' : 'Expandir player'} onClick={onToggleExpanded}>
              {isExpanded ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function LessonTabs({ activeTab, onChangeTab }) {
  const content = tabContent[activeTab];

  return (
    <section className="course-player-tabs">
      <div className="course-player-tab-list" aria-label="Informacoes da aula">
        {Object.entries(tabContent).map(([key, tab]) => (
          <button key={key} type="button" className={key === activeTab ? 'is-active' : ''} onClick={() => onChangeTab(key)}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="course-player-tab-content">
        <h3>{content.title}</h3>
        <p>{content.body}</p>

        <ul>
          {content.items.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PlayerHeader({ module, progress }) {
  return (
    <header className="course-player-header">
      <div className="course-player-title-row">
        <Link to="/aluno/cursos" className="course-player-back-link" aria-label="Voltar para cursos">
          <ArrowLeft size={20} />
        </Link>

        <div>
          <h1>Arquitetura Avancada de Sistemas</h1>
          <p>{module.label}: {module.title}</p>
        </div>
      </div>

      <div className="course-player-progress" aria-label="Progresso do curso">
        <div>
          <span>Progresso do curso</span>
          <strong>{progress}%</strong>
        </div>
        <div className="course-player-progress-track">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
    </header>
  );
}

function CourseContentSidebar({ activeLessonId, expandedModuleIds, onToggleModule, onSelectLesson }) {
  return (
    <aside className="course-player-content-sidebar" aria-label="Conteudo do curso">
      <div className="course-player-content-heading">
        <h2>Conteudo do curso</h2>
        <p>24 aulas  5h 30min no total</p>
      </div>

      <div className="course-player-module-list">
        {courseModules.map((module) => (
          <CourseModule
            key={module.id}
            module={module}
            activeLessonId={activeLessonId}
            expandedModuleIds={expandedModuleIds}
            onToggleModule={onToggleModule}
            onSelectLesson={onSelectLesson}
          />
        ))}
      </div>
    </aside>
  );
}

export function CoursePlayerPage() {
  const [activeLessonId, setActiveLessonId] = useState(initialLessonId);
  const [expandedModuleIds, setExpandedModuleIds] = useState(['modulo-03']);
  const [activeTab, setActiveTab] = useState('overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);

  const activeCourse = useMemo(() => findLessonById(activeLessonId), [activeLessonId]);
  const completedLessons = courseModules.flatMap((module) => module.lessons).filter((lesson) => lesson.completed).length;
  const totalLessons = courseModules.flatMap((module) => module.lessons).length;
  const progress = Math.round((completedLessons / totalLessons) * 100);

  function handleToggleModule(moduleId) {
    setExpandedModuleIds((currentModuleIds) =>
      currentModuleIds.includes(moduleId)
        ? currentModuleIds.filter((currentModuleId) => currentModuleId !== moduleId)
        : [...currentModuleIds, moduleId],
    );
  }

  function handleSelectLesson(moduleId, lessonId) {
    setActiveLessonId(lessonId);
    setIsPlaying(false);
    setExpandedModuleIds((currentModuleIds) =>
      currentModuleIds.includes(moduleId) ? currentModuleIds : [...currentModuleIds, moduleId],
    );
  }

  return (
    <div className="student-dashboard course-catalog-page course-player-page">
      <StudentCourseNavigation />

      <main className="student-main course-main course-player-main">
        <PlayerHeader module={activeCourse.module} progress={progress} />

        <div className="course-player-layout">
          <div className="course-player-study-area">
            <VideoPlayer
              lesson={activeCourse.lesson}
              isPlaying={isPlaying}
              isMuted={isMuted}
              captionsEnabled={captionsEnabled}
              isExpanded={isVideoExpanded}
              onTogglePlay={() => setIsPlaying((currentValue) => !currentValue)}
              onToggleMute={() => setIsMuted((currentValue) => !currentValue)}
              onToggleCaptions={() => setCaptionsEnabled((currentValue) => !currentValue)}
              onToggleExpanded={() => setIsVideoExpanded((currentValue) => !currentValue)}
            />
            <LessonTabs activeTab={activeTab} onChangeTab={setActiveTab} />
          </div>

          <CourseContentSidebar
            activeLessonId={activeLessonId}
            expandedModuleIds={expandedModuleIds}
            onToggleModule={handleToggleModule}
            onSelectLesson={handleSelectLesson}
          />
        </div>
      </main>
    </div>
  );
}
