import useAxios from '@hooks/useAxios';
import React, { createContext, useState, useContext, useEffect } from 'react';


const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const api = useAxios()

  useEffect(() => {
    const checkedLoggedInUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await api.get("api/user", config);
          setIsLoggedIn(true);
          setUser(response.data);
        } else {
          setIsLoggedIn(false);
          setUser("");
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUser("");
      }
    };

    checkedLoggedInUser();
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await api.post("api/logout/", { "refresh": refreshToken });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLoggedIn(false);
        setUser("");
      }
    } catch (error) {
      console.error("Logout failed");
    }
  };

    const handleLogin = (userData, tokens) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("accessToken", tokens.access);
    localStorage.setItem("refreshToken", tokens.refresh);

    
  };


  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    handleLogout,
    handleLogin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;