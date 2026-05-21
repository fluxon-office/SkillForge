import { useState } from 'react';
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
    issuedTo: 'Alex Martins',
    verificationCode: 'AWS-SF-2023-142-01',
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
    issuedTo: 'Alex Martins',
    verificationCode: 'ALU-SF-2023-024-02',
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
    rejectionReason:
      'Certificado recusado para contabilização de horas. Converse com o professor responsável pelo curso para entender o motivo da recusa e reenviar a documentação correta.',
  },
];

function createCertificateText(certificate) {
  return [
    'SKILLFORGE - CERTIFICADO',
    '',
    `Aluno: ${certificate.issuedTo ?? 'Alex Martins'}`,
    `Curso: ${certificate.course}`,
    `Instituição: ${certificate.institution}`,
    `Carga horária: ${certificate.workload}`,
    `Data de envio: ${certificate.sentAt}`,
    `Status: ${certificate.statusLabel}`,
    `Código de verificação: ${certificate.verificationCode ?? `SFG-${certificate.id}`}`,
    '',
    'Documento mockado para visualização no protótipo SkillForge.',
  ].join('\n');
}

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function downloadCertificate(certificate) {
  const fileName = `${certificate.course.toLowerCase().replace(/[^a-z0-9]+/gi, '-')}-certificado.txt`;
  downloadTextFile(fileName, createCertificateText(certificate));
}

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
      <MaterialIcon filled size={14}>
        {certificate.statusIcon}
      </MaterialIcon>
      {certificate.statusLabel}
    </span>
  );
}

function CertificatePreview({ certificate }) {
  return (
    <div className="certificate-preview">
      <div className="certificate-preview-top">
        <span>SkillForge</span>
        <small>{certificate.verificationCode ?? 'Documento em análise'}</small>
      </div>

      <div className="certificate-preview-body">
        <MaterialIcon filled className="certificate-preview-medal">
          workspace_premium
        </MaterialIcon>
        <span>Certificado de Conclusão</span>
        <h3>{certificate.course}</h3>
        <p>
          Certificamos que <strong>{certificate.issuedTo ?? 'Alex Martins'}</strong> concluiu a atividade promovida por{' '}
          <strong>{certificate.institution}</strong>, com carga horária de <strong>{certificate.workload}</strong>.
        </p>
      </div>

      <div className="certificate-preview-footer">
        <span>Enviado em {certificate.sentAt}</span>
        <StatusBadge certificate={certificate} />
      </div>
    </div>
  );
}

function CertificateModal({ certificate, onClose }) {
  if (!certificate) {
    return null;
  }

  return (
    <div className="certificate-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="certificate-modal-title">
      <div className="certificate-modal">
        <header className="certificate-modal-header">
          <div>
            <span>Visualização do Certificado</span>
            <h2 id="certificate-modal-title">{certificate.course}</h2>
          </div>
        </header>

        <CertificatePreview certificate={certificate} />

        <footer className="certificate-modal-actions">
          <button type="button" className="certificate-secondary-action" onClick={onClose}>
            Fechar
          </button>
          <button
            type="button"
            className="certificate-primary-action"
            disabled={certificate.status !== 'approved'}
            onClick={() => downloadCertificate(certificate)}
            title={certificate.status !== 'approved' ? 'Disponível somente após aprovação' : undefined}
          >
            <MaterialIcon size={18}>download</MaterialIcon>
            Baixar Certificado
          </button>
        </footer>
      </div>
    </div>
  );
}

function RejectionModal({ certificate, onClose }) {
  if (!certificate) {
    return null;
  }

  return (
    <div className="certificate-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="rejection-modal-title">
      <div className="certificate-modal certificate-rejection-modal">
        <header className="certificate-modal-header">
          <div>
            <span>Motivo da Recusa</span>
            <h2 id="rejection-modal-title">{certificate.course}</h2>
          </div>
        </header>

        <div className="certificate-rejection-box">
          <MaterialIcon size={28}>info</MaterialIcon>
          <p>{certificate.rejectionReason}</p>
        </div>

        <footer className="certificate-modal-actions">
          <button type="button" className="certificate-primary-action" onClick={onClose}>
            Entendi
          </button>
        </footer>
      </div>
    </div>
  );
}

function CertificateRow({ certificate, onView, onReason }) {
  const canView = certificate.status !== 'rejected';

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
        {canView ? (
          <button type="button" aria-label={`Visualizar certificado de ${certificate.course}`} onClick={() => onView(certificate)}>
            <MaterialIcon size={20}>visibility</MaterialIcon>
          </button>
        ) : null}

        {certificate.rejectionReason ? (
          <button type="button" className="is-danger" aria-label={`Ver motivo da recusa de ${certificate.course}`} onClick={() => onReason(certificate)}>
            <MaterialIcon size={20}>info</MaterialIcon>
          </button>
        ) : null}
      </div>
    </article>
  );
}

export function CertificatesPage() {
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [rejectedCertificate, setRejectedCertificate] = useState(null);

  function handleDownloadAll() {
    certificates.filter((certificate) => certificate.status !== 'rejected').forEach((certificate, index) => {
      window.setTimeout(() => downloadCertificate(certificate), index * 120);
    });
  }

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

            <div className="certificate-header-actions">
              <button type="button" className="certificate-upload-button" onClick={handleDownloadAll}>
                <MaterialIcon size={18}>download</MaterialIcon>
                Baixar Todos
              </button>
            </div>
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
                <button type="button" aria-label="Baixar todos os certificados" onClick={handleDownloadAll}>
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
                <CertificateRow
                  key={certificate.id}
                  certificate={certificate}
                  onView={setActiveCertificate}
                  onReason={setRejectedCertificate}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <CertificateModal certificate={activeCertificate} onClose={() => setActiveCertificate(null)} />
      <RejectionModal certificate={rejectedCertificate} onClose={() => setRejectedCertificate(null)} />
    </div>
  );
}
