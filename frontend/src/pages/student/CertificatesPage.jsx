import { PageHeader } from '../../components/common/PageHeader.jsx';
import { certificates } from '../../data/mockCourses.js';

export function CertificatesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Conquistas"
        title="Certificados"
        description="Histórico de certificados emitidos para o aluno."
      />

      <section className="list-panel">
        {certificates.map((certificate) => (
          <article key={certificate.id} className="list-row">
            <div>
              <strong>{certificate.course}</strong>
              <span>Emitido em {certificate.issuedAt}</span>
            </div>
            <button type="button" className="button-secondary">
              Ver certificado
            </button>
          </article>
        ))}
      </section>
    </>
  );
}
