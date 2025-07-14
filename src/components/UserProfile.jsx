import React from 'react';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="user-profile">
      <span className="user-name">
        {user?.email ? user.email.split('@')[0] : user?.email}
      </span>
      <button onClick={handleSignOut} className="sign-out-btn">
        Sign Out
      </button>
    </div>
  );
};

export default UserProfile; 