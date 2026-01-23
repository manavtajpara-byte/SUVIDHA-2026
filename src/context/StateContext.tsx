'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { LanguageKey } from '@/constants/translations';

type Language = LanguageKey; // Support all 13 Indian languages

interface StateContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  user: {
    name: string;
    mobile: string;
    role?: 'student' | 'youth' | 'government' | 'citizen';
    details?: {
      student?: { institution: string; id: string; class: string; interests: string[] };
      youth?: { qualification: string; skills: string[]; employment: string };
      govt?: { department: string; id: string; designation: string };
    }
  } | null;
  setUser: (user: {
    name: string;
    mobile: string;
    role?: 'student' | 'youth' | 'government' | 'citizen';
    details?: any
  } | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toasts: Array<{ id: string; message: string; type: 'success' | 'error' | 'warning' | 'info'; duration?: number }>;
  addToast: (toast: Omit<{ id: string; message: string; type: 'success' | 'error' | 'warning' | 'info'; duration?: number }, 'id'>) => void;
  removeToast: (id: string) => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    mobile: string;
    role?: 'student' | 'youth' | 'government' | 'citizen';
    details?: any
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' | 'warning' | 'info'; duration?: number }>>([]);

  const addToast = (toast: Omit<{ id: string; message: string; type: 'success' | 'error' | 'warning' | 'info'; duration?: number }, 'id'>) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { ...toast, id }]);

    // Auto remove after duration
    if (toast.duration !== 0) {
      setTimeout(() => removeToast(id), toast.duration || 3000);
    }
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <StateContext.Provider value={{
      language, setLanguage,
      isLoggedIn, setIsLoggedIn,
      user, setUser,
      searchQuery, setSearchQuery,
      toasts, addToast, removeToast
    }}>
      {children}
    </StateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a StateProvider');
  }
  return context;
}
