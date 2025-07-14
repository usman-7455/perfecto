import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();

  const navigateTo = {
    home: () => navigate('/'),
    about: () => navigate('/about'),
    services: () => navigate('/services'),
    contact: () => navigate('/contact'),
    tasks: () => navigate('/tasks'),
    signin: () => navigate('/signin'),
    signup: () => navigate('/signup'),
  };

  return (
    <NavigationContext.Provider value={{ navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}; 