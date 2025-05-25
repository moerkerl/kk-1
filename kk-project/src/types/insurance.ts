// Kantone der Schweiz
export type Canton = 
  | 'AG' | 'AI' | 'AR' | 'BE' | 'BL' | 'BS' | 'FR' | 'GE' | 'GL' | 'GR'
  | 'JU' | 'LU' | 'NE' | 'NW' | 'OW' | 'SG' | 'SH' | 'SO' | 'SZ' | 'TG'
  | 'TI' | 'UR' | 'VD' | 'VS' | 'ZG' | 'ZH';

// Altersgruppen
export type AgeGroup = 'child' | 'young-adult' | 'adult' | 'senior';

// Franchise-Optionen
export type FranchiseOption = 300 | 500 | 1000 | 1500 | 2000 | 2500;
export type ChildFranchiseOption = 0 | 100 | 200 | 300 | 400 | 500 | 600;

// Versicherungsmodelle
export type InsuranceModel = 
  | 'standard'
  | 'hausarzt'
  | 'hmo'
  | 'telmed'
  | 'apotheke'
  | 'kombiniert';

// Krankenkasse (Versicherer)
export interface InsuranceProvider {
  id: string;
  name: string;
  logo?: string;
  description: string;
  rating: number;
  availableInCantons: Canton[];
}

// Grundversicherung
export interface BasicInsurance {
  providerId: string;
  model: InsuranceModel;
  monthlyPremium: number;
  franchise: FranchiseOption | ChildFranchiseOption;
  accidentCoverage: boolean;
  features: string[];
}

// Zusatzversicherung Kategorien
export type AdditionalInsuranceCategory = 
  | 'ambulant'
  | 'spital'
  | 'komplementaer'
  | 'zahn'
  | 'ausland'
  | 'brille';

// Zusatzversicherung
export interface AdditionalInsurance {
  id: string;
  providerId: string;
  name: string;
  category: AdditionalInsuranceCategory;
  monthlyPremium: number;
  coverageDetails: {
    [key: string]: string | number | boolean;
  };
  features: string[];
  waitingPeriod?: number; // in months
}

// Komplettes Versicherungsangebot
export interface InsuranceOffer {
  id: string;
  basicInsurance: BasicInsurance;
  additionalInsurances: AdditionalInsurance[];
  totalMonthlyPremium: number;
  totalYearlyPremium: number;
  savings?: {
    amount: number;
    percentage: number;
    comparedTo: string;
  };
}

// Benutzer-Profil
export interface UserProfile {
  age: number;
  canton: Canton;
  hasAccidentInsuranceThroughEmployer: boolean;
  currentInsurance?: {
    provider: string;
    monthlyPremium: number;
  };
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
  preferences: {
    doctorChoice: 'free' | 'limited' | 'no-preference';
    hospitalChoice: 'free' | 'limited' | 'no-preference';
    complementaryMedicine: boolean;
    dentalCare: boolean;
    glasses: boolean;
    fitness: boolean;
    abroad: boolean;
  };
  familyMembers: FamilyMember[];
}

// Familienmitglied
export interface FamilyMember {
  id: string;
  relationship: 'partner' | 'child';
  age: number;
  name?: string;
}