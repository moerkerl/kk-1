export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  options?: QuickReplyOption[];
}

export interface QuickReplyOption {
  id: string;
  text: string;
  value: string | number | boolean;
}

export interface ChatState {
  messages: Message[];
  currentStep: ChatStep;
  collectedData: Partial<ChatFormData>;
  isTyping: boolean;
}

export type ChatStep = 
  | 'welcome'
  | 'age'
  | 'canton'
  | 'accident-insurance'
  | 'current-insurance'
  | 'health-status'
  | 'doctor-preference'
  | 'hospital-preference'
  | 'additional-needs'
  | 'family-members'
  | 'summary'
  | 'generating-offers'
  | 'offers-ready';

export interface ChatFormData {
  age: number;
  canton: string;
  hasAccidentInsuranceThroughEmployer: boolean;
  currentInsuranceProvider?: string;
  currentMonthlyPremium?: number;
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
  doctorChoice: 'free' | 'limited' | 'no-preference';
  hospitalChoice: 'free' | 'limited' | 'no-preference';
  needsComplementaryMedicine: boolean;
  needsDentalCare: boolean;
  needsGlasses: boolean;
  needsFitness: boolean;
  needsAbroadCoverage: boolean;
  familyMembers: Array<{
    relationship: 'partner' | 'child';
    age: number;
    name?: string;
  }>;
}