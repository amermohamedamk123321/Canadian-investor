/**
 * Admin Authentication Context
 * Manages admin user state and authentication
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { postRequest } from '../api/client';
import type { AdminUser, APIResponse } from '../types';

interface AdminAuthContextType {
  user: (AdminUser & { token: string }) | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role?: 'admin' | 'editor') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<(AdminUser & { token: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Verify token is still valid (optional)
      setUser(JSON.parse(localStorage.getItem('adminUser') || 'null'));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);

      const response = await postRequest<APIResponse<AdminUser & { token: string }>>(
        '/auth/login',
        { email, password }
      );

      if (response.success && response.data) {
        const userData = response.data;
        setUser(userData);
        localStorage.setItem('adminToken', userData.token);
        localStorage.setItem('adminUser', JSON.stringify(userData));
      } else {
        throw new Error(response.error || 'Login failed');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      console.error('[Auth] Login error:', { error: err, message });
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, role: 'admin' | 'editor' = 'editor') => {
    try {
      setError(null);
      setLoading(true);

      const response = await postRequest<APIResponse<AdminUser & { token: string }>>(
        '/auth/register',
        { email, password, role }
      );

      if (response.success && response.data) {
        const userData = response.data;
        setUser(userData);
        localStorage.setItem('adminToken', userData.token);
        localStorage.setItem('adminUser', JSON.stringify(userData));
      } else {
        throw new Error(response.error || 'Registration failed');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  };

  const value: AdminAuthContextType = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
