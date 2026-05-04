import { createContext, useContext, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import api, { getErrorMessage } from '../services/api.js';

const AuthContext = createContext(null);

const readStoredUser = () => {
  try {
    const rawUser = localStorage.getItem('user');
    return rawUser ? JSON.parse(rawUser) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [authLoading, setAuthLoading] = useState(false);

  const persistSession = (payload) => {
    localStorage.setItem('token', payload.token);
    localStorage.setItem('user', JSON.stringify(payload.user));
    setUser(payload.user);
  };

  const register = async (formData) => {
    setAuthLoading(true);
    try {
      const { data } = await api.post('/auth/register', formData);
      persistSession(data);
      toast.success('Welcome to InkBloom!');
      return data.user;
    } catch (error) {
      toast.error(getErrorMessage(error));
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (formData) => {
    setAuthLoading(true);
    try {
      const { data } = await api.post('/auth/login', formData);
      persistSession(data);
      toast.success('You are signed in');
      return data.user;
    } catch (error) {
      toast.error(getErrorMessage(error));
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Signed out');
  };

  const value = useMemo(() => ({
    user,
    authLoading,
    login,
    logout,
    register,
    isAuthenticated: Boolean(user)
  }), [user, authLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
