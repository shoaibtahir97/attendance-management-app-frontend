import React, { createContext, useState } from 'react';
const AuthContext = createContext(false);

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });

  const Login = (user) => {
    setAuthState({
      isAuthenticated: true,
      user,
    });
    localStorage.setItem('user', JSON.stringify(user));
  };

  const Logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ authState, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
