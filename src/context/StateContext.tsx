'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { LanguageKey } from '@/constants/translations';

type Language = LanguageKey; // Support all 13 Indian languages

interface StateContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  contrast: 'normal' | 'high';
  toggleContrast: () => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  user: { name: string; mobile: string } | null;
  setUser: (user: { name: string; mobile: string } | null) => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [contrast, setContrast] = useState<'normal' | 'high'>('normal');
  const [fontSize, setFontSize] = useState(18);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; mobile: string } | null>(null);

  const toggleContrast = () => setContrast(prev => prev === 'normal' ? 'high' : 'normal');

  useEffect(() => {
    document.documentElement.setAttribute('data-contrast', contrast);
    document.documentElement.style.setProperty('--font-base', `${fontSize}px`);
  }, [contrast, fontSize]);

  return (
    <StateContext.Provider value={{
      language, setLanguage,
      contrast, toggleContrast,
      fontSize, setFontSize,
      isLoggedIn, setIsLoggedIn,
      user, setUser
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
