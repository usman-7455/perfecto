import React from "react";
import { Link } from "react-router-dom";
import "./DesktopNavbar.css";
import SignInButton from '../SignInButton';
import SignUpButton from '../SignUpButton';
import UserProfile from '../UserProfile';
import { useAuth } from '../../context/AuthContext';

const DesktopNavbar = () => {
  const { user } = useAuth();

  return (
    <nav className="desktop-navbar">
      <div className="desktop-navbar-logo">Perfecto</div>
      
      <ul className="desktop-navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
        {user && user.email === 'muhammadusmanarshad7455@gmail.com' && <li><Link to="/admin">Admin</Link></li>}
      </ul>
      
      <div className="desktop-navbar-auth-buttons">
        {user ? (
          <UserProfile />
        ) : (
          <>
            <SignInButton />
            <SignUpButton />
          </>
        )}
      </div>
    </nav>
  );
};

export default DesktopNavbar; 