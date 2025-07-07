'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export function SplashScreen() {
  const [isFading, setIsFading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Start the fade-out process after the initial logo animation
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1500); // Wait 1.5s before fading out

    // Remove the splash screen from the DOM after it has faded out
    const finishTimer = setTimeout(() => {
      setIsFinished(true);
    }, 2200); // 1.5s wait + 0.7s fade duration

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, []); // Runs only on mount

  if (isFinished) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-700 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative">
        <Image
          src="/icon.jpg"
          alt="EduPro Logo"
          width={128}
          height={128}
          className="rounded-2xl animate-logo-fade-in-scale"
          priority
        />
        <div className="absolute inset-0 rounded-2xl animate-bright-light-flash" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
}
