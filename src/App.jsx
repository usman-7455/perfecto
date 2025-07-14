import { useState, useEffect } from 'react'
import { supabase } from './api/supabaseClient'
import Navbar from './components/navbar/navbar'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { TaskProvider } from './context/TaskContext';
import { TaskFormProvider } from './context/TaskFormContext';
import { AuthProvider } from './context/AuthContext';
import { NavigationProvider } from './context/NavigationContext';
import { MobileFormProvider } from './context/MobileFormContext';

function App() {
 

  return (
    <>
      <BrowserRouter>
        <NavigationProvider>
          <AuthProvider>
            <TaskProvider>
              <TaskFormProvider>
                <MobileFormProvider>
                  <Navbar/>
                  <AppRoutes />
                </MobileFormProvider>
              </TaskFormProvider>
            </TaskProvider>
          </AuthProvider>
        </NavigationProvider>
      </BrowserRouter>
    </>
  )
}

export default App
