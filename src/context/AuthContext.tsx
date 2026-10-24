'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface User {
  _id: string;
  name?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: 'student' | 'admin' | 'instructor';
  status: 'pending' | 'active' | 'rejected' | 'suspended';
  program?: string;
  institution?: string;
  district?: string;
  phone?: string;
  whatsappNumber?: string;
  dob?: string;
  avatar?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isSignedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Record<string, unknown>) => Promise<any>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API_BASE = typeof window === 'undefined' ? 'http://52.64.117.32:8000/api' : '/api';


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount, restore session from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        document.cookie = `token=${savedToken}; path=/; max-age=604800; SameSite=Lax`;
        if (parsedUser.role) {
          document.cookie = `user_role=${parsedUser.role}; path=/; max-age=604800; SameSite=Lax`;
        }
        if (savedToken.startsWith('mock-')) {
          setIsLoading(false);
          return;
        }
        // Verify token is still valid
        fetch(`${API_BASE}/auth/profile`, {
          headers: { Authorization: `Bearer ${savedToken}` },
        })
          .then(async (res) => {
            if (res.ok) {
              const data = await res.json();
              const fresh = data.data || data.user || data;
              setUser(fresh);
              localStorage.setItem('user', JSON.stringify(fresh));
            } else {
              // Token expired — clear session
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              setToken(null);
              setUser(null);
            }
          })
          .catch(() => {
            // Network error — keep local state, don't clear session
          })
          .finally(() => setIsLoading(false));
      } catch {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Login failed');
    }
    const data = await res.json();
    const tok = data.token || data.data?.token;
    const usr = data.user || data.data?.user || data.data;
    if (!tok || !usr) throw new Error('Invalid response from server');
    localStorage.setItem('token', tok);
    localStorage.setItem('user', JSON.stringify(usr));
    document.cookie = `token=${tok}; path=/; max-age=604800; SameSite=Lax`;
    if (usr.role) {
      document.cookie = `user_role=${usr.role}; path=/; max-age=604800; SameSite=Lax`;
    }
    setToken(tok);
    setUser(usr);
  }, []);

  const register = useCallback(async (userData: Record<string, unknown>) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Registration failed');
    }
    return await res.json();
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setToken(null);
    setUser(null);
    // Attempt backend logout (fire & forget)
    if (token) {
      fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    window.location.href = '/login';
  }, [token]);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isSignedIn: !!user && !!token,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
