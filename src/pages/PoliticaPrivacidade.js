import React from 'react';
import NoticeBanner from '../components/NoticeBanner/NoticeBanner';
import FooterSection from '../sections/FooterSection/FooterSection';
import './PrivacyPage.css';

function PoliticaPrivacidade() {
  return (
    <div className="privacy-page">
      <NoticeBanner />
      
      <div className="privacy-container">
        <div className="privacy-content">
          <h1>Política de Privacidade</h1>

          <section>
            <h2>1. Introdução</h2>
            <p>
              A ML EDUCAÇÃO MENTORIAS E PRODUTOS DIGITAIS LTDA ("ML EDUCAÇÃO"), inscrita no CNPJ 58.090.837/0001-59, com sede na Alameda Rio Negro, nº 503, Sala 2020, Bairro Alphaville Centro Industrial e Empresarial/Alphaville, no município de Barueri, São Paulo, CEP 06454-000, está comprometida em proteger a privacidade e os dados pessoais de seus usuários. Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos suas informações pessoais ao acessar o site https://supercaso.com.br.
            </p>
          </section>

          <section>
            <h2>2. Informações Coletadas</h2>
            <p>Ao utilizar o site, podemos coletar as seguintes informações:</p>
            <ul>
              <li>Informações Pessoais: Nome, e-mail, telefone, CPF, endereço e outras informações fornecidas diretamente pelo usuário por meio de formulários.</li>
              <li>Informações de Navegação: Endereço IP, tipo de navegador, páginas acessadas, tempo de permanência no site, cookies e outras informações relacionadas à interação do usuário com o site.</li>
            </ul>
          </section>

          <section>
            <h2>3. Finalidade da Coleta de Dados</h2>
            <p>A ML EDUCAÇÃO utiliza as informações coletadas para os seguintes propósitos:</p>
            <ul>
              <li>Prover os serviços oferecidos no site;</li>
              <li>Melhorar a experiência do usuário;</li>
              <li>Enviar comunicações, ofertas e conteúdos relevantes, desde que autorizados pelo usuário;</li>
              <li>Realizar análises estatísticas e de comportamento para aprimorar os serviços;</li>
              <li>Atender às obrigações legais e regulatórias.</li>
            </ul>
          </section>

          <section>
            <h2>4. Compartilhamento de Dados</h2>
            <p>A ML EDUCAÇÃO não compartilha informações pessoais dos usuários com terceiros, exceto nas seguintes situações:</p>
            <ul>
              <li>Quando necessário para o cumprimento de obrigações legais;</li>
              <li>Com prestadores de serviços que auxiliam na operação do site, desde que estes sigam os mesmos padrões de proteção de dados estabelecidos nesta política;</li>
              <li>Em casos de fusão, aquisição ou venda da empresa, sendo garantido que os dados continuarão protegidos.</li>
            </ul>
          </section>

          <section>
            <h2>5. Direitos dos Usuários</h2>
            <p>Os usuários têm os seguintes direitos em relação aos seus dados pessoais:</p>
            <ul>
              <li>Acessar, corrigir e atualizar suas informações pessoais;</li>
              <li>Solicitar a exclusão de seus dados pessoais, exceto quando houver obrigação legal para mantê-los;</li>
              <li>Revogar o consentimento para o uso de seus dados a qualquer momento.</li>
            </ul>
            <p>Para exercer esses direitos, entre em contato através do e-mail suporte@mlgrupo.com.br.</p>
          </section>

          <section>
            <h2>6. Segurança dos Dados</h2>
            <p>
              A ML EDUCAÇÃO adota medidas de segurança técnicas e organizacionais para proteger os dados pessoais contra acessos não autorizados, perdas, alterações ou divulgações indevidas. No entanto, nenhuma transmissão de dados pela internet é completamente segura, e não podemos garantir a segurança absoluta das informações.
            </p>
          </section>

          <section>
            <h2>7. Retenção de Dados</h2>
            <p>
              Os dados pessoais serão mantidos pelo tempo necessário para cumprir as finalidades descritas nesta política, salvo quando houver obrigação legal ou regulatória para a retenção por período superior.
            </p>
          </section>

          <section>
            <h2>8. Cookies</h2>
            <p>
              Utilizamos cookies para melhorar a experiência do usuário no site. Os cookies podem ser desativados pelo usuário nas configurações do navegador. No entanto, algumas funcionalidades do site podem ser afetadas.
            </p>
          </section>

          <section>
            <h2>9. Alterações na Política de Privacidade</h2>
            <p>
              A ML EDUCAÇÃO reserva-se o direito de modificar esta Política de Privacidade a qualquer momento. As alterações serão publicadas nesta página, com a data de atualização indicada no topo do documento. Recomendamos que o usuário revise esta política periodicamente para se manter informado sobre como estamos protegendo seus dados pessoais.
            </p>
          </section>

          <section>
            <h2>10. Contato</h2>
            <p>
              Para dúvidas, solicitações ou informações adicionais sobre nossa Política de Privacidade, entre em contato pelo e-mail: suporte@mlgrupo.com.br.
            </p>
          </section>

          <div className="last-update">Última atualização: 06/01/25</div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}

export default PoliticaPrivacidade;

