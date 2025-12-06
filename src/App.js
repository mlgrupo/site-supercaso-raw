import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import HeaderSection from './sections/HeaderSection/HeaderSection';
import StrategicSessionSection from './sections/StrategicSessionSection/StrategicSessionSection';
import FormularioHarmonizacao from './components/FormularioHarmonizacao/FormularioHarmonizacao';
import './App.css';

// Lazy load de componentes não críticos para melhor performance
// HeaderSection e StrategicSessionSection são críticos (above the fold) - não lazy load
const TestimonialsSection = lazy(() => import('./sections/TestimonialsSection/TestimonialsSection'));
const ClientsSection = lazy(() => import('./sections/ClientsSection/ClientsSection'));
const AboutSection = lazy(() => import('./sections/AboutSection/AboutSection'));
const FooterSection = lazy(() => import('./sections/FooterSection/FooterSection'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermosDeUso = lazy(() => import('./pages/TermosDeUso'));
const PreCall = lazy(() => import('./pages/PreCall'));
const Consulta = lazy(() => import('./pages/Consulta'));

// Componente de loading skeleton otimizado
const SectionSkeleton = React.memo(() => (
  <div style={{ 
    minHeight: '400px', 
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    margin: '20px 0',
    animation: 'pulse 1.5s ease-in-out infinite',
    contain: 'layout style paint'
  }} />
));
SectionSkeleton.displayName = 'SectionSkeleton';

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

    // Adicionar canonical URL para SEO
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + window.location.pathname);

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
      if (canonical && !originalMetaContent) {
        canonical.remove();
      }
    };
  }, []);

  return (
    <div className="App">
      <HeaderSection />
      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsSection />
      </Suspense>
      <StrategicSessionSection />
      <Suspense fallback={<SectionSkeleton />}>
        <ClientsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FooterSection />
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/politica-de-privacidade" 
            element={
              <Suspense fallback={<SectionSkeleton />}>
                <PrivacyPage />
              </Suspense>
            } 
          />
          <Route 
            path="/termos-de-uso" 
            element={
              <Suspense fallback={<SectionSkeleton />}>
                <TermosDeUso />
              </Suspense>
            } 
          />
          <Route 
            path="/pre-call" 
            element={
              <Suspense fallback={<SectionSkeleton />}>
                <PreCall />
              </Suspense>
            } 
          />
          <Route 
            path="/consulta" 
            element={
              <Suspense fallback={<SectionSkeleton />}>
                <Consulta />
              </Suspense>
            } 
          />
        </Routes>
        {/* Formulário carregado apenas quando necessário */}
        {typeof window !== 'undefined' && <FormularioHarmonizacao />}
      </Router>
    </FormProvider>
  );
}

export default App;

