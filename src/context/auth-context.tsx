
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';
import { OnboardingDialog } from '@/components/onboarding-dialog';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

type UserProfile = {
  role?: 'user' | 'admin';
  professionalStatus?: string;
  careerGoals?: string;
  onboardingComplete?: boolean;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  profile: UserProfile | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  profile: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const unsubscribeProfile = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const profileData = docSnap.data() as UserProfile;
          setProfile(profileData);
          if (!profileData.onboardingComplete) {
            setShowOnboarding(true);
          }
        } else {
            // Document might not exist yet right after signup
            setProfile({}); 
        }
        setLoading(false);
      });
      return () => unsubscribeProfile();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading: false, profile }}>
      {children}
      {user && showOnboarding && (
        <OnboardingDialog 
            user={user}
            onClose={() => setShowOnboarding(false)}
        />
       )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
