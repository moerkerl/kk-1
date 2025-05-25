// User profile types
export interface UserProfile {
  id: string;
  // Personal information
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: Date;
  age: number;
  gender: 'male' | 'female' | 'other';
  
  // Location
  canton: Canton;
  postalCode: string;
  city: string;
  
  // Health status
  healthStatus: HealthStatus;
  preExistingConditions: PreExistingCondition[];
  isPregnant?: boolean;
  isSmoker: boolean;
  
  // Family situation
  familyStatus: FamilyStatus;
  numberOfChildren: number;
  childrenAges?: number[];
  
  // Employment
  employmentStatus: EmploymentStatus;
  monthlyIncome?: number;
  hasAccidentCoverageFromEmployer: boolean;
  
  // Preferences
  preferences: UserPreferences;
  
  // Current insurance
  currentInsurance?: CurrentInsurance;
  
  createdAt: Date;
  updatedAt: Date;
}

export type Canton = 
  | 'AG' | 'AI' | 'AR' | 'BE' | 'BL' | 'BS' | 'FR' | 'GE' 
  | 'GL' | 'GR' | 'JU' | 'LU' | 'NE' | 'NW' | 'OW' | 'SG' 
  | 'SH' | 'SO' | 'SZ' | 'TG' | 'TI' | 'UR' | 'VD' | 'VS' 
  | 'ZG' | 'ZH';

export type HealthStatus = 'excellent' | 'good' | 'fair' | 'poor';

export interface PreExistingCondition {
  id: string;
  name: string;
  diagnosedYear?: number;
  isChronicCondition: boolean;
  requiresRegularTreatment: boolean;
}

export type FamilyStatus = 'single' | 'married' | 'divorced' | 'widowed' | 'partnership';

export type EmploymentStatus = 
  | 'employed_fulltime' 
  | 'employed_parttime' 
  | 'self_employed' 
  | 'unemployed' 
  | 'student' 
  | 'retired' 
  | 'homemaker';

export interface UserPreferences {
  // Insurance model preferences
  preferredModels: InsuranceModelType[];
  
  // Coverage preferences
  wantsComplementaryMedicine: boolean;
  wantsDentalCoverage: boolean;
  wantsInternationalCoverage: boolean;
  wantsPreventiveCare: boolean;
  wantsFitnessContribution: boolean;
  wantsGlassesContribution: boolean;
  
  // Hospital preferences
  preferredHospitalClass: HospitalClass;
  wantsFreeDoctorChoice: boolean;
  wantsPrivateRoom: boolean;
  
  // Financial preferences
  maxMonthlyPremium?: number;
  preferredFranchise?: number;
  
  // Service preferences
  preferredLanguage: 'de' | 'fr' | 'it' | 'en';
  wantsOnlineServices: boolean;
  wantsLocalOffice: boolean;
}

export type InsuranceModelType = 
  | 'standard' 
  | 'hmo' 
  | 'hausarzt' 
  | 'telmed' 
  | 'apotheken';

export type HospitalClass = 
  | 'general' 
  | 'semi_private' 
  | 'private' 
  | 'flex';

export interface CurrentInsurance {
  provider: string;
  basicInsuranceModel: InsuranceModelType;
  franchise: number;
  monthlyPremium: number;
  supplementaryInsurances: string[];
  satisfactionLevel: 1 | 2 | 3 | 4 | 5;
  reasonsForChange: string[];
}