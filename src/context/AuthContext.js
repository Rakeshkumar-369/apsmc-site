import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // We check localStorage to see if a token was saved from a previous session.
  // This keeps the admin logged in even if they refresh the page.
  const [token, setToken] = useState(localStorage.getItem('apsmc-admin-token'));

  const login = (newToken) => {
    localStorage.setItem('apsmc-admin-token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('apsmc-admin-token');
    setToken(null);
  };

  // A simple boolean check: if a token exists, the user is authenticated.
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// This is a custom hook that makes it easy for other components
// to access the authentication data (like the token or the login function).
export const useAuth = () => {
  return useContext(AuthContext);
};