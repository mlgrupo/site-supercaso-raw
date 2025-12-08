import React, { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import NoticeBanner from '../../components/NoticeBanner/NoticeBanner';
import { useForm } from '../../context/FormContext';
import backLeoDesk from '../../imgs/back-leo-desk.png';
import backgroundMobile from '../../imgs/background-mobile.png';
import './HeaderSection.css';

const HeaderSection = () => {
  const { openForm } = useForm();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 810);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handleCheckAvailability = () => {
    openForm();
  };

  return (
    <>
      <NoticeBanner 
        message={
          <>
            <span style={{ color: 'rgb(255, 225, 166)' }}>
              <strong>ATENÇÃO</strong>
            </span>
            <strong>:</strong> SOMENTE PARA QUEM É FORMADO NA ÁREA DA SAÚDE E JÁ
            TEM SUA CLÍNICA DE HARMONIZAÇÃO, OU PELO MENOS DESEJA
          </>
        }
      />
      <section className="header" data-section-name="header">
        <div className="bg">
          <img
            src={isMobile ? backgroundMobile : backLeoDesk}
            alt=""
            className="bg-image"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            aria-hidden="true"
          />
        </div>
        <div className="container">
          <div className="content">
            <h1 className="title">
              SESSÃO ESTRATÉGICA
            </h1>
            <div className="bottom-content">
              <div className="text">
                <p className="text-line">
                  O MEU TIME DE ESTRATEGISTAS
                  PODE FAZER UM <strong>DIAGNÓSTICO </strong>
                  <strong>GRATUITO</strong> <span className="normal">DO</span> <strong>MARKETING</strong>, <strong>VENDAS E GESTÃO</strong> DA<br/> <u>SUA CLÍNICA</u>
               </p>
              </div>
              <div className="description">
                <p className="desc-text">
                  Em uma <strong>Avaliação estratégica gratuita</strong> <span className="normal">de 30 minutos</span>, será identificado
                  todos os pontos cegos que vem impedindo seus objetivos.
                </p>
                <p className="desc-text">
                  E receberá um <strong>Plano de Ação Personalizado</strong> para estruturar sua clínica à 
                  um faturamento de 100 mil ou mais, nos próximos meses.
                </p>
                <p className="desc-text">
                  <strong>Clique no botão abaixo</strong>, verifique os horários <br/>
                   ainda disponíveis e faça seu agendamento.
                </p>
              </div>
              <div className="cta">
                <Button onClick={handleCheckAvailability} variant="primary">
                  Verificar Disponibilidade
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeaderSection;

