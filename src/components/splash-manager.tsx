
'use client';

import { useSplash } from '@/context/splash-context';
import { SplashScreen } from '@/components/splash-screen';

export function SplashManager() {
  const { splashKey } = useSplash();
  return <SplashScreen key={splashKey} />;
}
