import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import HeaderSection from './sections/HeaderSection/HeaderSection';
import TestimonialsSection from './sections/TestimonialsSection/TestimonialsSection';
import StrategicSessionSection from './sections/StrategicSessionSection/StrategicSessionSection';
import ClientsSection from './sections/ClientsSection/ClientsSection';
import AboutSection from './sections/AboutSection/AboutSection';
import FooterSection from './sections/FooterSection/FooterSection';
import PrivacyPage from './pages/PrivacyPage';
import TermosDeUso from './pages/TermosDeUso';
import PreCall from './pages/PreCall';
import Consulta from './pages/Consulta';
import FormularioHarmonizacao from './components/FormularioHarmonizacao/FormularioHarmonizacao';
import './App.css';

function HomePage() {
  useEffect(() => {
    // Definir title e meta description para a home
    const originalTitle = document.title;
    const originalMetaDescription = document.querySelector('meta[name="description"]');
    const originalMetaContent = originalMetaDescription ? originalMetaDescription.getAttribute('content') : null;
    
    document.title = 'Consulta de avaliação - Verifique a disponibilidade';
    
    // Criar ou atualizar meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Saiba o que está sendo feito e também ter 10-60 novos pacientes, visite para mais informações');

    // Cleanup - restaurar valores originais ao sair da página
    return () => {
      document.title = originalTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        if (originalMetaContent) {
          metaDesc.setAttribute('content', originalMetaContent);
        } else {
          metaDesc.remove();
        }
      }
    };
  }, []);

  return (
    <div className="App">
      <HeaderSection />
      <TestimonialsSection />
      <StrategicSessionSection />
      <ClientsSection />
      <AboutSection />
      <FooterSection />
    </div>
  );
}

function App() {
  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/politica-de-privacidade" element={<PrivacyPage />} />
          <Route path="/termos-de-uso" element={<TermosDeUso />} />
          <Route path="/pre-call" element={<PreCall />} />
          <Route path="/consulta" element={<Consulta />} />
        </Routes>
        <FormularioHarmonizacao />
      </Router>
    </FormProvider>
  );
}

export default App;

