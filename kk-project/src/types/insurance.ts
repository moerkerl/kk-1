// Import Canton from user types to avoid duplication
import { Canton, UserProfile } from './user';

// Re-export for convenience
export { Canton, UserProfile };

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
  | 'hospital'  // English alias for spital
  | 'komplementaer'
  | 'zahn'
  | 'dental'  // English alias for zahn
  | 'ausland'
  | 'brille'
  | 'combined'
  | 'prevention'
  | 'alternative_medicine'
  | 'travel';

export type SupplementaryCategory = AdditionalInsuranceCategory;

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
  // Additional properties used in UI
  providerName: string;
  monthlyPremium: number;
  insuranceModel: string;
  franchise: number;
  isRecommended?: boolean;
  rating?: number;
  annualSavings?: number;
  keyFeatures?: string[];
}

// UserProfile is defined in user.ts, no need to duplicate here

// Familienmitglied
export interface FamilyMember {
  id: string;
  relationship: 'partner' | 'child';
  age: number;
  name?: string;
}

// Extended type definitions
export interface BasicInsuranceProduct {
  id: string;
  providerId: string;
  name: string;
  model: InsuranceModel;
  description: string;
  features: string[];
  availableInCantons: Canton[];
  pricing: BasicInsurancePricing;
}

export interface BasicInsurancePricing {
  baseRates: Record<AgeGroup, number>;
  franchiseDiscounts: Record<FranchiseOption | ChildFranchiseOption, number>;
  cantonFactors: Record<Canton, number>;
  accidentCoverageReduction: number;
}

export interface SupplementaryProduct {
  id: string;
  providerId: string;
  name: string;
  category: SupplementaryCategory;
  description: string;
  features?: string[];
  coverages: Coverage[];
  exclusions: string[];
  waitingPeriod: number; // in months
  pricing: SupplementaryPricing;
}

export interface Coverage {
  type: string;
  description: string;
  maxAmount?: number | 'unlimited';
  percentage?: number;
  conditions?: string[];
  coverageLimit?: {
    per: 'year' | 'case' | 'lifetime' | 'period';
    periodYears?: number;
  };
  deductible?: number;
  waitingPeriod?: number;
}

export interface SupplementaryPricing {
  baseRates: Record<DetailedAgeGroup, number>;
  riskFactors: {
    smoker: number;
    preExistingConditions: number;
    occupation: Record<string, number>;
  };
}

export type DetailedAgeGroup = 
  | '0-18'
  | '19-25'
  | '26-35'
  | '36-45'
  | '46-55'
  | '56-65'
  | '66-75'
  | '76+';

export interface InsurancePackage {
  id: string;
  providerId: string;
  name: string;
  description: string;
  basicInsuranceId?: string; // product ID
  supplementaryInsurances?: string[]; // product IDs
  includedProducts: {
    basicInsurance?: string; // product ID
    supplementaryInsurances: string[]; // product IDs
  };
  discountPercentage: number;
  features: string[];
  pricing: PackagePricing;
}

export interface PackagePricing {
  baseDiscount: number;
  additionalDiscounts: {
    family: number;
    youngAdult: number;
    loyalty: number;
  };
}