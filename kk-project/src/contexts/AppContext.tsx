import React, { createContext, useContext, useState, ReactNode } from 'react';
import { InsuranceOffer } from '../types/insurance';
import { UserProfile } from '../types/insurance';

interface AppContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  generatedOffers: InsuranceOffer[];
  setGeneratedOffers: (offers: InsuranceOffer[]) => void;
  selectedOffer: InsuranceOffer | null;
  setSelectedOffer: (offer: InsuranceOffer | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [generatedOffers, setGeneratedOffers] = useState<InsuranceOffer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<InsuranceOffer | null>(null);

  return (
    <AppContext.Provider
      value={{
        userProfile,
        setUserProfile,
        generatedOffers,
        setGeneratedOffers,
        selectedOffer,
        setSelectedOffer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}