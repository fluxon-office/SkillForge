import { certificates } from '../../data/mockCourses.js';

function PageHeader({ eyebrow, title, description }) {
  return (
    <header className="page-header">
      <div>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
    </header>
  );
}

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
