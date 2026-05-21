import './StudentDashboardPage.css';
import './CertificatesPage.css';
import { MaterialIcon, StudentCourseNavigation } from './StudentCourseNavigation.jsx';

const certificateMetrics = [
  {
    icon: 'schedule',
    label: 'Horas Aprovadas',
    value: '142',
    helper: '/ 300h',
    progress: 47,
  },
  {
    icon: 'verified',
    label: 'Certificados Válidos',
    value: '12',
  },
  {
    icon: 'pending_actions',
    label: 'Em Análise',
    value: '2',
  },
];

const certificates = [
  {
    id: 1,
    course: 'Arquitetura de Sistemas Distribuídos',
    institution: 'AWS Training Center',
    workload: '40h',
    sentAt: '12 Out 2023',
    status: 'approved',
    statusLabel: 'Aprovado',
    statusIcon: 'check_circle',
  },
  {
    id: 2,
    course: 'Clean Code e Princípios SOLID',
    institution: 'Alura Cursos',
    workload: '24h',
    sentAt: '28 Nov 2023',
    status: 'pending',
    statusLabel: 'Pendente',
    statusIcon: 'hourglass_empty',
  },
  {
    id: 3,
    course: 'Workshop Design Thinking',
    institution: 'Evento Interno Jr',
    workload: '8h',
    sentAt: '05 Set 2023',
    status: 'rejected',
    statusLabel: 'Recusado',
    statusIcon: 'cancel',
    hasReason: true,
  },
];

function CertificateMetricCard({ metric }) {
  return (
    <article className="certificate-metric-card">
      <div className="certificate-metric-label">
        <MaterialIcon size={20}>{metric.icon}</MaterialIcon>
        <span>{metric.label}</span>
      </div>

      <div className="certificate-metric-value">
        <strong>{metric.value}</strong>
        {metric.helper ? <span>{metric.helper}</span> : null}
      </div>

      {typeof metric.progress === 'number' ? (
        <div className="certificate-progress-track" aria-label={`${metric.progress}% concluído`}>
          <span style={{ width: `${metric.progress}%` }} />
        </div>
      ) : null}
    </article>
  );
}

function StatusBadge({ certificate }) {
  return (
    <span className={`certificate-status is-${certificate.status}`}>
      <MaterialIcon size={14}>{certificate.statusIcon}</MaterialIcon>
      {certificate.statusLabel}
    </span>
  );
}

function CertificateRow({ certificate }) {
  return (
    <article className="certificate-row">
      <div className="certificate-course-cell">
        <strong>{certificate.course}</strong>
        <span>
          <MaterialIcon size={14}>domain</MaterialIcon>
          {certificate.institution}
        </span>
      </div>

      <div className="certificate-code-cell">{certificate.workload}</div>
      <div className="certificate-code-cell">{certificate.sentAt}</div>

      <div>
        <StatusBadge certificate={certificate} />
      </div>

      <div className="certificate-actions">
        <button type="button" aria-label={`Visualizar certificado de ${certificate.course}`}>
          <MaterialIcon size={20}>visibility</MaterialIcon>
        </button>

        {certificate.hasReason ? (
          <button type="button" className="is-danger" aria-label={`Ver motivo da recusa de ${certificate.course}`}>
            <MaterialIcon size={20}>info</MaterialIcon>
          </button>
        ) : null}
      </div>
    </article>
  );
}

export function CertificatesPage() {
  return (
    <div className="student-dashboard certificates-page">
      <StudentCourseNavigation />

      <main className="student-main certificates-main">
        <div className="certificates-content">
          <header className="certificates-header">
            <div>
              <h1>Meus Certificados</h1>
              <p>
                Gerencie e envie seus certificados de cursos externos. Submissões são analisadas pela coordenação para
                contabilização de horas complementares.
              </p>
            </div>

            <button type="button" className="certificate-upload-button">
              <MaterialIcon size={18}>upload</MaterialIcon>
              Enviar Certificado
            </button>
          </header>

          <section className="certificate-metrics-grid" aria-label="Resumo de certificados">
            {certificateMetrics.map((metric) => (
              <CertificateMetricCard key={metric.label} metric={metric} />
            ))}
          </section>

          <section className="certificate-table" aria-label="Histórico de submissões">
            <div className="certificate-table-header">
              <h2>Histórico de Submissões</h2>
              <div>
                <button type="button" aria-label="Filtrar certificados">
                  <MaterialIcon size={20}>filter_list</MaterialIcon>
                </button>
                <button type="button" aria-label="Baixar relatório">
                  <MaterialIcon size={20}>download</MaterialIcon>
                </button>
              </div>
            </div>

            <div className="certificate-table-columns" aria-hidden="true">
              <span>Curso / Instituição</span>
              <span>Carga Horária</span>
              <span>Data de Envio</span>
              <span>Status</span>
              <span>Ações</span>
            </div>

            <div className="certificate-table-body">
              {certificates.map((certificate) => (
                <CertificateRow key={certificate.id} certificate={certificate} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
