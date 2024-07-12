import React, { createContext, useState } from "react";
const AuthContext = createContext(false);

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });
  console.log("authState", authState);
  const Login = (user) => {
    setAuthState({
      isAuthenticated: true,
      user,
    });
  };

  const Logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
