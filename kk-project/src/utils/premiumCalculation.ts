import { Canton, FranchiseOption, InsuranceModel, AgeGroup } from '../types/insurance';
import { UserProfile } from '../types/user';

// Base premium factors by canton (relative to national average)
const cantonFactors: Record<Canton, number> = {
  'AG': 0.95,
  'AI': 0.85,
  'AR': 0.88,
  'BE': 1.05,
  'BL': 1.10,
  'BS': 1.15,
  'FR': 0.92,
  'GE': 1.20,
  'GL': 0.90,
  'GR': 0.89,
  'JU': 0.95,
  'LU': 0.93,
  'NE': 0.98,
  'NW': 0.87,
  'OW': 0.86,
  'SG': 0.91,
  'SH': 0.92,
  'SO': 0.94,
  'SZ': 0.88,
  'TG': 0.90,
  'TI': 1.08,
  'UR': 0.85,
  'VD': 1.12,
  'VS': 0.96,
  'ZG': 0.89,
  'ZH': 1.00
};

// Age-based premium factors
const getAgeFactor = (age: number): { factor: number; group: AgeGroup } => {
  if (age <= 18) return { factor: 0.3, group: 'child' };
  if (age <= 25) return { factor: 0.65, group: 'young-adult' };
  if (age <= 60) return { factor: 1.0, group: 'adult' };
  return { factor: 1.35, group: 'senior' };
};

// Model discount factors
const modelDiscounts: Record<InsuranceModel, number> = {
  'standard': 1.0,
  'hausarzt': 0.93,
  'hmo': 0.88,
  'telmed': 0.90,
  'apotheke': 0.91,
  'kombiniert': 0.89
};

// Franchise discount factors
const franchiseDiscounts: Record<FranchiseOption, number> = {
  300: 1.0,
  500: 0.96,
  1000: 0.88,
  1500: 0.82,
  2000: 0.77,
  2500: 0.72
};

// Health status premium adjustments (for supplementary insurance)
const healthStatusFactors = {
  'excellent': 0.95,
  'good': 1.0,
  'fair': 1.1,
  'poor': 1.25
};

interface PremiumCalculationParams {
  age: number;
  canton: Canton;
  franchise: FranchiseOption;
  model: InsuranceModel;
  hasAccidentCoverage: boolean;
  providerId: string;
  healthStatus?: 'excellent' | 'good' | 'fair' | 'poor';
}

interface PremiumCalculationResult {
  monthlyPremium: number;
  yearlyPremium: number;
  ageGroup: AgeGroup;
  savings: {
    fromFranchise: number;
    fromModel: number;
    total: number;
  };
}

// Base premiums by provider (monthly for standard model, 300 CHF franchise, adult)
const providerBasePremiums: Record<string, number> = {
  'helsana': 380,
  'css': 375,
  'swica': 385,
  'visana': 370,
  'sanitas': 390,
  'concordia': 365,
  'kpt': 360,
  'assura': 340,
  'okk': 355,
  'atupri': 350
};

export function calculateBasicInsurancePremium(
  params: PremiumCalculationParams
): PremiumCalculationResult {
  const { age, canton, franchise, model, hasAccidentCoverage, providerId } = params;
  
  // Get base premium for provider
  const basePremium = providerBasePremiums[providerId] || 370;
  
  // Apply factors
  const { factor: ageFactor, group: ageGroup } = getAgeFactor(age);
  const cantonFactor = cantonFactors[canton] || 1.0;
  const modelDiscount = modelDiscounts[model] || 1.0;
  const franchiseDiscount = franchiseDiscounts[franchise] || 1.0;
  
  // Calculate base monthly premium
  let monthlyPremium = basePremium * ageFactor * cantonFactor * modelDiscount * franchiseDiscount;
  
  // Add accident coverage if not covered by employer (about 7% extra)
  if (!hasAccidentCoverage) {
    monthlyPremium *= 1.07;
  }
  
  // Round to nearest 0.05 CHF (Swiss rounding)
  monthlyPremium = Math.round(monthlyPremium * 20) / 20;
  
  // Calculate savings
  const standardPremium = basePremium * ageFactor * cantonFactor;
  const franchiseSavings = standardPremium - (standardPremium * franchiseDiscount);
  const modelSavings = standardPremium - (standardPremium * modelDiscount);
  
  return {
    monthlyPremium,
    yearlyPremium: monthlyPremium * 12,
    ageGroup,
    savings: {
      fromFranchise: Math.round(franchiseSavings * 100) / 100,
      fromModel: Math.round(modelSavings * 100) / 100,
      total: Math.round((franchiseSavings + modelSavings) * 100) / 100
    }
  };
}

// Supplementary insurance premium calculation
export function calculateSupplementaryPremium(
  category: string,
  age: number,
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor',
  providerId: string
): number {
  // Base premiums for supplementary insurance categories
  const categoryBasePremiums: Record<string, number> = {
    'ambulant': 25,
    'spital_general': 15,
    'spital_semi_private': 80,
    'spital_private': 180,
    'komplementaer': 35,
    'zahn': 20,
    'ausland': 15,
    'brille': 10
  };
  
  const basePremium = categoryBasePremiums[category] || 30;
  const { factor: ageFactor } = getAgeFactor(age);
  const healthFactor = healthStatusFactors[healthStatus] || 1.0;
  
  // Provider-specific adjustments
  const providerAdjustment = {
    'helsana': 1.05,
    'css': 1.02,
    'swica': 1.08,
    'visana': 0.98,
    'sanitas': 1.10,
    'concordia': 0.95,
    'kpt': 0.97,
    'assura': 0.90,
    'okk': 0.93,
    'atupri': 0.92
  }[providerId] || 1.0;
  
  const monthlyPremium = basePremium * ageFactor * healthFactor * providerAdjustment;
  
  return Math.round(monthlyPremium * 20) / 20; // Swiss rounding
}

// Calculate total family premium
export function calculateFamilyPremium(
  familyMembers: Array<{ age: number; hasAccidentCoverage: boolean }>,
  canton: Canton,
  franchise: FranchiseOption,
  model: InsuranceModel,
  providerId: string
): { total: number; breakdown: Array<{ age: number; premium: number }> } {
  const breakdown = familyMembers.map(member => {
    const result = calculateBasicInsurancePremium({
      age: member.age,
      canton,
      franchise,
      model,
      hasAccidentCoverage: member.hasAccidentCoverage,
      providerId
    });
    
    return {
      age: member.age,
      premium: result.monthlyPremium
    };
  });
  
  const total = breakdown.reduce((sum, member) => sum + member.premium, 0);
  
  return { total, breakdown };
}

// Calculate potential savings compared to current insurance
export function calculateSavings(
  newMonthlyPremium: number,
  currentMonthlyPremium: number
): { amount: number; percentage: number; yearly: number } {
  const monthlySavings = currentMonthlyPremium - newMonthlyPremium;
  const percentage = (monthlySavings / currentMonthlyPremium) * 100;
  const yearlySavings = monthlySavings * 12;
  
  return {
    amount: Math.round(monthlySavings * 100) / 100,
    percentage: Math.round(percentage * 10) / 10,
    yearly: Math.round(yearlySavings * 100) / 100
  };
}