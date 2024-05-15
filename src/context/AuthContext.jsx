import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthPharmEase") || false;
  });

  function login() {
    localStorage.setItem("isAuthPharmEase", true);
    setIsAuthenticated(true);
  }

  function logout() {
    localStorage.removeItem("isAuthPharmEase");
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Auth context was used outside the provider");
  }

  return context;
}

export { AuthProvider, useAuthContext };

export default AuthContext;
