import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  currentUser: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  setCurrentUser: () => {},
  setAccessToken: () => {},
  setRefreshToken: () => {},
  handleLogin: () => {},
  handleRegistration: () => {},
  handleLogout: () => {},
});

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('');
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedAccessToken = getCookie('access_token');
    const storedRefreshToken = getCookie('refresh_token');

    if (storedUser && storedAccessToken) {
      setCurrentUser(JSON.parse(storedUser));
      setAccessToken(storedAccessToken);
      setIsAuthenticated(true);
    }
  }, []);

  
  const setCookie = (name, value, options = {}) => {
    options = {
      path: '/',
      secure: true,
      httpOnly: true,
      ...options,
    };
    const encodedValue = encodeURIComponent(value);
    const cookieString = `${name}=${encodedValue}`;

    Object.keys(options).forEach((key) => {
      const optionValue = options[key];
      cookieString += `; ${key}`;
      if (optionValue !== true) {
        cookieString += `=${optionValue}`;
      }
    });
    document.cookie = cookieString;
  };
  const removeCookie = (name) => {
    setCookie(name, '', { expires: 0 });
  };

  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const [key, value] = cookies[i].trim().split('=');
      if (key === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        accessToken,
        refreshToken,
        isAuthenticated,
        setIsAuthenticated,
        setCurrentUser,
        setAccessToken,
        setRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
