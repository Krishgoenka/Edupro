
'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type SplashContextType = {
  splashKey: number;
  triggerSplash: () => void;
};

const SplashContext = createContext<SplashContextType | undefined>(undefined);

export const SplashProvider = ({ children }: { children: ReactNode }) => {
  const [splashKey, setSplashKey] = useState(1);

  const triggerSplash = useCallback(() => {
    setSplashKey(prevKey => prevKey + 1);
  }, []);

  const value = { splashKey, triggerSplash };

  return (
    <SplashContext.Provider value={value}>
      {children}
    </SplashContext.Provider>
  );
};

export const useSplash = () => {
  const context = useContext(SplashContext);
  if (context === undefined) {
    throw new Error('useSplash must be used within a SplashProvider');
  }
  return context;
};
