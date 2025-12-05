import React from 'react';
import NoticeBanner from '../components/NoticeBanner/NoticeBanner';
import FooterSection from '../sections/FooterSection/FooterSection';
import './PrivacyPage.css';

function TermosDeUso() {
  return (
    <div className="privacy-page">
      <NoticeBanner />
      
      <div className="privacy-container">
        <div className="privacy-content">
          <h1>Termos de Uso</h1>

          <section>
            <h2>1. Identificação da Empresa</h2>
            <p>
              Este site é operado pela ML EDUCAÇÃO MENTORIAS E PRODUTOS DIGITAIS LTDA, inscrita sob o CNPJ 58.090.837/0001-59, com sede na Alameda Rio Negro, nº 503, Sala 2020, Bairro Alphaville Centro Industrial e Empresarial/Alphaville, no município de Barueri, São Paulo, CEP 06454-000. Para fins deste documento, a empresa será referida como "ML EDUCAÇÃO".
            </p>
          </section>

          <section>
            <h2>2. Aceitação dos Termos</h2>
            <p>
              Ao acessar ou utilizar o site https://supercaso.com.br, o usuário concorda expressamente com os Termos de Uso aqui estabelecidos. Se você não concordar com estes termos, não deve utilizar os serviços oferecidos pelo site.
            </p>
          </section>

          <section>
            <h2>3. Alterações nos Termos</h2>
            <p>
              ML EDUCAÇÃO reserva-se o direito de modificar os Termos de Uso a qualquer momento. As alterações serão publicadas nesta página, com a data de atualização. É responsabilidade do usuário revisar periodicamente os Termos para se manter informado sobre quaisquer alterações.
            </p>
          </section>

          <section>
            <h2>4. Uso do Site</h2>
            <p>O usuário compromete-se a utilizar o site de acordo com a legislação vigente e os princípios de boa-fé. É expressamente proibido:</p>
            <ul>
              <li>Utilizar o site para fins ilícitos;</li>
              <li>Violar os direitos de propriedade intelectual da ML EDUCAÇÃO ou de terceiros;</li>
              <li>Reproduzir, distribuir, modificar ou criar obras derivadas sem autorização prévia.</li>
            </ul>
          </section>

          <section>
            <h2>5. Propriedade Intelectual</h2>
            <p>
              Todos os conteúdos disponíveis no site https://supercaso.com.br, incluindo textos, imagens, vídeos, áudios, logotipos, marcas e design, são protegidos por direitos autorais e outras leis de propriedade intelectual. Qualquer uso não autorizado desses materiais pode resultar em penalidades legais.
            </p>
          </section>

          <section>
            <h2>6. Cadastro de Usuários</h2>
            <p>
              Algumas funcionalidades do site podem exigir que o usuário forneça informações pessoais, como nome, e-mail e CPF. O usuário é responsável por fornecer informações verdadeiras, completas e atualizadas.
            </p>
            <p>
              ML EDUCAÇÃO não se responsabiliza por danos decorrentes de informações incorretas fornecidas pelos usuários.
            </p>
          </section>

          <section>
            <h2>7. Privacidade e Proteção de Dados</h2>
            <p>
              ML EDUCAÇÃO compromete-se a proteger a privacidade dos usuários e a utilizar seus dados pessoais conforme a legislação aplicável. Para mais informações, consulte nossa Política de Privacidade.
            </p>
          </section>

          <section>
            <h2>8. Limitação de Responsabilidade</h2>
            <p>ML EDUCAÇÃO não se responsabiliza por:</p>
            <ul>
              <li>Erros, falhas ou interrupções no funcionamento do site;</li>
              <li>Perdas ou danos decorrentes do uso indevido do site;</li>
              <li>Conteúdo de terceiros acessado por meio de links no site.</li>
            </ul>
          </section>

          <section>
            <h2>9. Rescisão</h2>
            <p>
              ML EDUCAÇÃO pode, a qualquer momento, suspender ou encerrar o acesso do usuário ao site caso identifique uma violação dos Termos de Uso.
            </p>
          </section>

          <section>
            <h2>10. Legislação Aplicável e Foro</h2>
            <p>
              Estes Termos de Uso são regidos pelas leis brasileiras. Qualquer disputa será resolvida no Foro da Comarca de Barueri, Estado de São Paulo, com renúncia expressa a qualquer outro.
            </p>
          </section>

          <section>
            <h2>11. Contato</h2>
            <p>
              Para dúvidas ou informações adicionais, entre em contato pelo e-mail: suporte@mlgrupo.com.br.
            </p>
          </section>

          <div className="last-update">Última atualização: 06/01/25</div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}

export default TermosDeUso;

