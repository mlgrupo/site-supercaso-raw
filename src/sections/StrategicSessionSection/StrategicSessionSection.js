import React from 'react';
import Button from '../../components/Button/Button';
import { useForm } from '../../context/FormContext';
import './StrategicSessionSection.css';
import reconecta from '../../imgs/reconecta.svg';

const StrategicSessionSection = () => {
  const { openForm } = useForm();
  
  const strategicPoints = [
    {
      icon: <img src={reconecta} alt="Reconecta" />,
      text: (
        <>
          Identificaremos exatamente os gargalos de gestão que tornam seu negócio{' '}
          <strong>invisível</strong> para o lucro real. Vamos ajustar o modelo da sua clínica para atingir faturamentos expressivos{' '}
          <strong>(25k, 50k ou 100k/semana)</strong>, honrando sua capacidade técnica impecável.
        </>
      )
    },
    {
      icon: <img src={reconecta} alt="Reconecta" />,
      text: (
        <>
          O ponto de virada para você deixar de ser refém do operacional. Aprenda a lógica numérica por trás das clínicas que{' '}
          <strong>faturam alto</strong> com leveza, transformando seu <strong>consultório</strong> em uma{' '}
          <strong>empresa que funciona bem</strong>, com ou sem você na sala o tempo todo.
        </>
      )
    },
    {
      icon: <img src={reconecta} alt="Reconecta" />,
      text: (
        <>
          <strong>Pare</strong> de competir por descontos. Implemente um plano validado para preencher sua agenda com pacientes que
          desejam sua excelência e pagam <strong>tickets de R$ 5k+ com satisfação</strong>. É a estratégia definitiva para{' '}
          <strong>valorizar sua hora</strong> clínica e sua autoridade.
        </>
      )
    }
  ];

  const handleCheckAvailability = () => {
    openForm();
  };

  return (
    <section className="strategic" data-section-name="strategic-session">
      <div className="container">
        <div className="header">
          <h2 className="title">
            SESSÃO ESTRATÉGICA
          </h2>
          <p className="subtitle">
            <strong>O QUE ESTÁ EM JOGO NESTA CONVERSA</strong>
          </p>
        </div>

        <div className="points">
          {strategicPoints.map((point, index) => (
            <div key={index} className="point">
              <div className="icon">{point.icon}</div>
              <div className="text">
                <p>{point.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="cta">
          <Button onClick={handleCheckAvailability} variant="primary">
            Verificar Disponibilidade
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StrategicSessionSection;

