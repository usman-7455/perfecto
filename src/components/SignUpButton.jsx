import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="navbar-auth-btn"
      onClick={() => navigate('/signup')}
      style={{ marginLeft: '0.5em' }}
    >
      Sign Up
    </button>
  );
};

export default SignUpButton; 