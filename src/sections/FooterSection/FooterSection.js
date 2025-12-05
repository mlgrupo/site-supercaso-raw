import React from 'react';
import { Link } from 'react-router-dom';
import './FooterSection.css';

const FooterSection = () => {
  return (
    <footer className="footer" data-section-name="footer">
      <div className="container">
        <div className="content">
          <p className="disclaimer">
            Este site não faz parte do Facebook ou Meta Platforms, Inc., nem é endossado por eles de qualquer maneira. FACEBOOK é uma marca registrada de Meta Platforms, Inc. A ML Educação Mentorias e Produtos Digitais dedica-se a ajudar profissionais da saúde que encontraram na harmonização facial a área que amam, fornecendo cursos, mentorias e treinamentos projetados para transformar carreiras.
          </p>

          <p className="company">
            A ML EDUCAÇÃO MENTORIAS E PRODUTOS DIGITAIS LTDA | CNPJ: 58.090.837/0001-59 Alameda Rio Negro, nº 503, Sala 2020, Bairro Alphaville, Barueri - SP, CEP : 06454-000
          </p>

          <div className="links">
            <Link 
              to="/politica-de-privacidade" 
              className="link"
            >
              Política de Privacidade
            </Link>
            <Link 
              to="/termos-de-uso" 
              className="link"
            >
              Termos de Uso
            </Link>
          </div>

          <p className="copyright">
            Copyright © ML EDUCAÇÃO · 2025 |{' '}
            <Link 
              to="/termos-de-uso"
              className="link"
            >
              <strong>Termos de Uso</strong>
            </Link>
            {' '}·{' '}
            <Link 
              to="/politica-de-privacidade"
              className="link"
            >
              <strong>Política de Privacidade</strong>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

