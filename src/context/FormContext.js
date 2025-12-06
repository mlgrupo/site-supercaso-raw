import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within FormProvider');
  }
  return context;
};

export const FormProvider = ({ children }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    // Prevenir qualquer scroll quando abrir o formulário
    const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    window.scrollTo(0, currentScrollY);
    setIsFormOpen(true);
  };
  
  const closeForm = () => setIsFormOpen(false);

  return (
    <FormContext.Provider value={{ isFormOpen, openForm, closeForm }}>
      {children}
    </FormContext.Provider>
  );
};

