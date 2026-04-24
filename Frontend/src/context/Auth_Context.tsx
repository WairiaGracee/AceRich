import React, { useState } from 'react';
import { AuthContext } from './authContext';
import type { AuthUser } from './AuthTypes';

const getSavedToken = (): string | null => {
  try { return localStorage.getItem('acerich_token'); }
  catch { return null; }
};

const getSavedUser = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem('acerich_user');
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch { return null; }
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(getSavedToken);
  const [user, setUser]   = useState<AuthUser | null>(getSavedUser);

  const login = (newToken: string, newUser: AuthUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('acerich_token', newToken);
    localStorage.setItem('acerich_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('acerich_token');
    localStorage.removeItem('acerich_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading: false }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;