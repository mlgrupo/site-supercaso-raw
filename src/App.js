import React from 'react';
import HeaderSection from './sections/HeaderSection/HeaderSection';
import TestimonialsSection from './sections/TestimonialsSection/TestimonialsSection';
import StrategicSessionSection from './sections/StrategicSessionSection/StrategicSessionSection';
import ClientsSection from './sections/ClientsSection/ClientsSection';
import AboutSection from './sections/AboutSection/AboutSection';
import FooterSection from './sections/FooterSection/FooterSection';
import './App.css';

function App() {
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

export default App;

