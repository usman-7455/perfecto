import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MobileNavbar.css";
import SignInButton from '../SignInButton';
import SignUpButton from '../SignUpButton';
import { useAuth } from '../../context/AuthContext';

const MobileNavbar = () => {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    closeMobileMenu();
  };

  return (
    <nav className="mobile-navbar">
      <div className="mobile-navbar-logo">Perfecto</div>
      
      {/* Mobile Menu Toggle */}
      <button 
        className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={closeMobileMenu}>
        <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <h3>Menu</h3>
            <button 
              className="mobile-menu-close"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          
          <ul className="mobile-nav-links">
            <li>
              <Link to="/" onClick={closeMobileMenu} className="mobile-nav-link">
                <span className="mobile-nav-icon">🏠</span>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={closeMobileMenu} className="mobile-nav-link">
                <span className="mobile-nav-icon">ℹ️</span>
                About
              </Link>
            </li>
            <li>
              <Link to="/services" onClick={closeMobileMenu} className="mobile-nav-link">
                <span className="mobile-nav-icon">🛠️</span>
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeMobileMenu} className="mobile-nav-link">
                <span className="mobile-nav-icon">📞</span>
                Contact
              </Link>
            </li>
            <li>
              <Link to="/tasks" onClick={closeMobileMenu} className="mobile-nav-link">
                <span className="mobile-nav-icon">📋</span>
                Tasks
              </Link>
            </li>
            {user && user.email === 'muhammadusmanarshad7455@gmail.com' && (
              <li>
                <Link to="/admin" onClick={closeMobileMenu} className="mobile-nav-link">
                  <span className="mobile-nav-icon">🛡️</span>
                  Admin
                </Link>
              </li>
            )}
          </ul>

          <div className="mobile-auth-section">
            {user ? (
              <div className="mobile-user-profile">
                <div className="mobile-user-info">
                  <span className="mobile-user-avatar">👤</span>
                  <span className="mobile-user-name">
                    {user?.email ? user.email.split('@')[0] : user?.email}
                  </span>
                </div>
                <button className="mobile-sign-out-btn" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="mobile-auth-buttons">
                <SignInButton />
                <SignUpButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavbar; 