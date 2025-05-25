// Calculation and pricing types
import { UserProfile } from './user';
import { BasicInsuranceProduct, SupplementaryProduct, InsurancePackage, FranchiseOption as InsuranceFranchiseOption } from './insurance';

export interface CalculationRequest {
  userProfile: UserProfile;
  selectedProducts: SelectedProducts;
  comparisonSettings: ComparisonSettings;
}

export interface SelectedProducts {
  basicInsuranceId?: string;
  supplementaryProductIds: string[];
  packageId?: string;
}

export interface ComparisonSettings {
  includeSavingsModels: boolean;
  maxResults: number;
  sortBy: 'price' | 'value' | 'rating' | 'features';
  filterByCantons?: string[];
  filterByProviders?: string[];
  minRating?: number;
}

export interface CalculationResult {
  id: string;
  calculationDate: Date;
  userProfileId: string;
  
  // Recommendations
  recommendations: InsuranceRecommendation[];
  
  // Current vs recommended comparison
  currentCosts?: CurrentCosts;
  potentialSavings?: PotentialSavings;
  
  // Detailed breakdown
  detailedComparison: DetailedComparison[];
}

export interface InsuranceRecommendation {
  rank: number;
  providerId: string;
  providerName: string;
  
  // Products
  basicInsurance: RecommendedBasicInsurance;
  supplementaryInsurances: RecommendedSupplementary[];
  package?: RecommendedPackage;
  
  // Costs
  totalMonthlyCost: number;
  totalYearlyCost: number;
  
  // Scores
  overallScore: number; // 0-100
  priceScore: number; // 0-100
  coverageScore: number; // 0-100
  serviceScore: number; // 0-100
  
  // Benefits
  keyBenefits: string[];
  limitations: string[];
  
  // Match percentage
  matchPercentage: number; // How well it matches user preferences
}

export interface RecommendedBasicInsurance {
  product: BasicInsuranceProduct;
  franchise: number;
  monthlyPremium: number;
  yearlyPremium: number;
  discountApplied: number;
}

export interface RecommendedSupplementary {
  product: SupplementaryProduct;
  monthlyPremium: number;
  yearlyPremium: number;
  relevantCoverages: string[]; // Which coverages match user needs
}

export interface RecommendedPackage {
  package: InsurancePackage;
  monthlyPremium: number;
  yearlyPremium: number;
  packageSavings: number;
}

export interface CurrentCosts {
  monthlyPremium: number;
  yearlyPremium: number;
  franchise: number;
  estimatedOutOfPocket: number; // Based on health status
  totalYearlyCost: number;
}

export interface PotentialSavings {
  monthlyAmount: number;
  yearlyAmount: number;
  percentageSaved: number;
  breakEvenMonths: number; // Considering switching costs
}

export interface DetailedComparison {
  category: ComparisonCategory;
  currentValue: string | number | boolean;
  recommendedValue: string | number | boolean;
  difference: string;
  impact: 'positive' | 'neutral' | 'negative';
}

export type ComparisonCategory = 
  | 'monthly_premium'
  | 'yearly_premium'
  | 'franchise'
  | 'coverage_medications'
  | 'coverage_dental'
  | 'coverage_alternative'
  | 'coverage_glasses'
  | 'coverage_fitness'
  | 'coverage_prevention'
  | 'coverage_abroad'
  | 'hospital_class'
  | 'doctor_choice'
  | 'service_quality'
  | 'digital_services';

// Franchise optimization
export interface FranchiseOptimization {
  userProfileId: string;
  estimatedYearlyHealthCosts: number;
  
  franchiseOptions: FranchiseCalculationOption[];
  optimalFranchise: number;
  reasoning: string;
}

export interface FranchiseCalculationOption {
  franchise: number;
  monthlyPremium: number;
  maxOutOfPocket: number;
  estimatedTotalCost: number;
  probabilityBestChoice: number; // Based on health cost distribution
}

// Price prediction
export interface PricePrediction {
  userAge: number;
  canton: string;
  
  currentYearPremium: number;
  
  // Future projections
  projections: YearlyProjection[];
  
  // Factors
  agingImpact: number; // Percentage increase due to aging
  inflationImpact: number; // Percentage increase due to inflation
  cantonalTrend: number; // Canton-specific trend
}

export interface YearlyProjection {
  year: number;
  age: number;
  estimatedPremium: number;
  confidenceInterval: {
    low: number;
    high: number;
  };
}