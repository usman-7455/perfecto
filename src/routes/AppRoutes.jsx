import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../components/pages/Home/Home';
import About from '../components/pages/About/About';
import Services from '../components/pages/Services/Services';
import Contact from '../components/pages/Contact/Contact';
import Tasks from '../components/pages/task/task';
import SignIn from '../components/pages/SignIn/signin';
import SignUp from '../components/pages/signUp/SignUp';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default AppRoutes;
