import React from 'react';
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
import FormularioHarmonizacao from './components/FormularioHarmonizacao/FormularioHarmonizacao';
import './App.css';

function HomePage() {
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
        </Routes>
        <FormularioHarmonizacao />
      </Router>
    </FormProvider>
  );
}

export default App;

