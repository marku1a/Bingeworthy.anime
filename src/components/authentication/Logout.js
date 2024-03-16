import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Logout = () => {
  const { setCurrentUser, setAccessToken, setRefreshToken, setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    setCurrentUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);

    localStorage.removeItem('currentUser');
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1999 00:00:00 UTC; path=/;';
    document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1999 00:00:00 UTC; path=/;';
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;