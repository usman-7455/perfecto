import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignInButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="navbar-auth-btn"
      onClick={() => navigate('/signin')}
      style={{ marginLeft: '1em' }}
    >
      Sign In
    </button>
  );
};

export default SignInButton; 