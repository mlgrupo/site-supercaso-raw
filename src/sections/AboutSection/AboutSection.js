import React from 'react';
import Button from '../../components/Button/Button';
import './AboutSection.css';

const AboutSection = () => {
  const handleCheckAvailability = () => {
    console.log('Verificar disponibilidade');
  };

  return (
    <section className="about" data-section-name="about">
      <div className="bg">
        {/* Imagem de fundo será adicionada via CSS */}
      </div>
      <div className="container">
        <div className="content">
          <div className="header">
            <h2 className="title">
              <span className="title-main">LEONARDO ROSSO</span>
              <br />
              <span className="title-sub">MEIO BILHÃO EM VENDAS.</span>
            </h2>
            <p className="tagline">
              <strong>UMA ÚNICA ESTRATÉGIA.</strong>
            </p>
          </div>

          <div className="text">
            <p className="paragraph">
              Responsável por um volume de vendas superior a{' '}
              <span className="highlight">
                <strong>R$ 500 milhões</strong>
              </span>{' '}
              na harmonização facial desde 2022,{' '}
              <span className="highlight">
                <strong>Leonardo é o maior investidor em tráfego pago do segmento</strong>
              </span>{' '}
              e o nome que revolucionou o marketing digital para dentistas no Brasil. Sua expertise transformou o mercado, trocando o amadorismo por estratégias de escala baseadas em dados.
            </p>

            <p className="paragraph">
              Nos últimos três anos, suas metodologias permitiram que doutoras saíssem do{' '}
              <span className="highlight">
                <strong>zero</strong>
              </span>{' '}
              para faturamentos de{' '}
              <span className="highlight">
                <strong>R$ 400 mil mensais</strong>
              </span>{' '}
              operando apenas com uma secretária e comercializassem mentorias presenciais de{' '}
              <span className="highlight">
                <strong>R$ 18 mil a R$ 250 mil.</strong>
              </span>{' '}
              Ele estabeleceu um{' '}
              <span className="white">novo padrão de aquisição:</span>{' '}
              <span className="highlight">
                <strong>15 a 60 novos pacientes mensais via Instagram</strong>
              </span>, sem a necessidade de produção de conteúdo cansativa ou vídeos invasivos.
            </p>

            <p className="paragraph">
              Ex-CEO da AJA (maior agência do setor entre 2022 e 2024) e atual CEO da Reconecta, Leonardo já formou a elite dos profissionais do mercado. Hoje, ele se mantém como a principal referência para escalar clínicas de forma previsível e lucrativa, entregando o modelo de negócio exato para quem busca o próximo nível.
            </p>
          </div>

          <div className="cta">
            <Button onClick={handleCheckAvailability} variant="primary">
              Verificar Disponibilidade
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

