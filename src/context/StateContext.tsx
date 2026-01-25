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
  fontSize: number;
  setFontSize: (size: number) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
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
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);

  // Persistence Layer
  useEffect(() => {
    const savedLang = localStorage.getItem('suvidha_lang') as Language;
    if (savedLang) setLanguage(savedLang);

    const savedUser = localStorage.getItem('suvidha_session_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }

    const savedSize = localStorage.getItem('suvidha_font_size');
    if (savedSize) setFontSize(parseInt(savedSize));

    const savedContrast = localStorage.getItem('suvidha_high_contrast');
    if (savedContrast) setHighContrast(JSON.parse(savedContrast));
  }, []);

  useEffect(() => {
    localStorage.setItem('suvidha_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('suvidha_font_size', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('suvidha_high_contrast', JSON.stringify(highContrast));
  }, [highContrast]);

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
      toasts, addToast, removeToast,
      fontSize, setFontSize,
      highContrast, setHighContrast
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
