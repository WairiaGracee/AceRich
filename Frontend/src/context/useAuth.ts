import { useContext } from 'react';
import { AuthContext } from './authContext';
import type { AuthContextType } from './AuthTypes';

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};