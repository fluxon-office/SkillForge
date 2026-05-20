import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const logoUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB68nLNFE64eNRQJ9pEPW6GST1MMXcRQJqw7IIJk5uJcOu9H7WX_nCL-Na0kckwBusZWFxPqGmXe0pmhOjonPquVeRt_r6Tl60gPtFQ8Q1LQbaqkNFcmMlj-D3LioFGVgUB30GWj7Qb7VegXp3kKzAQevv_TDZJ-2eXZ8XtOKFeSXmDl9QdvX7wD0_cBX5cwdILaUqTagWOt_Tk4SUzsRFi5OgFonloRrnjfDegyP6uwceeqxyXJ2N5oadSlQ0iWGRs9XRfGUiW5q0';

export function LoginPage() {
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate(role === 'admin' ? '/admin' : '/aluno');
  }

  return (
    <main className="login-page bg-grid-pattern">
      <section className="login-card" aria-labelledby="login-title">
        <header className="login-header">
          <img className="login-logo" src={logoUrl} alt="SkillForge Logo" />
          <h1 id="login-title">Bem-vindo ao SkillForge</h1>
          <p>Evolua, acompanhe e conquiste seu progresso</p>
        </header>

        <div className="role-toggle" aria-label="Selecao de perfil">
          <button
            type="button"
            className={role === 'student' ? 'role-button role-button-active' : 'role-button'}
            onClick={() => setRole('student')}
          >
            Aluno
          </button>
          <button
            type="button"
            className={role === 'admin' ? 'role-button role-button-active' : 'role-button'}
            onClick={() => setRole('admin')}
          >
            Administrador
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">E-mail Corporativo</label>
            <div className="input-wrapper">
              <span className="material-symbols-outlined input-icon" aria-hidden="true">
                mail
              </span>
              <input
                id="email"
                name="email"
                placeholder="seu.nome@empresa.com"
                required
                type="email"
              />
            </div>
          </div>

          <div className="form-field">
            <div className="field-label-row">
              <label htmlFor="password">Senha de Acesso</label>
              <a href="#recuperar-senha">Esqueceu?</a>
            </div>
            <div className="input-wrapper">
              <span className="material-symbols-outlined input-icon" aria-hidden="true">
                lock
              </span>
              <input id="password" name="password" required type="password" />
            </div>
          </div>

          <button className="login-submit" type="submit">
            Entrar
            <span className="material-symbols-outlined submit-icon" aria-hidden="true">
              arrow_forward
            </span>
          </button>
        </form>

        <footer className="login-footer">
          <p>
            Problemas de acesso? <a href="#suporte-ti">Contate o Suporte TI</a>
          </p>
        </footer>
      </section>
    </main>
  );
}
