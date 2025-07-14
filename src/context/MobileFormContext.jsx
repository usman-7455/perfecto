import React, { createContext, useContext, useState } from 'react';

const MobileFormContext = createContext();

export const MobileFormProvider = ({ children }) => {
  const [showMobileForm, setShowMobileForm] = useState(false);

  const openMobileForm = () => {
    setShowMobileForm(true);
  };

  const closeMobileForm = () => {
    setShowMobileForm(false);
  };

  const toggleMobileForm = () => {
    setShowMobileForm(!showMobileForm);
  };

  return (
    <MobileFormContext.Provider value={{
      showMobileForm,
      openMobileForm,
      closeMobileForm,
      toggleMobileForm
    }}>
      {children}
    </MobileFormContext.Provider>
  );
};

export const useMobileForm = () => {
  const context = useContext(MobileFormContext);
  if (!context) {
    throw new Error('useMobileForm must be used within a MobileFormProvider');
  }
  return context;
}; 