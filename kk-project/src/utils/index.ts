// Premium calculation utilities
export {
  calculateBasicInsurancePremium,
  calculateSupplementaryPremium,
  calculateFamilyPremium,
  calculateSavings
} from './premiumCalculation';

// Offer generation utilities
export {
  generateInsuranceOffers,
  generateRecommendations as generateOfferRecommendations
} from './offerGeneration';

// Offer comparison utilities
export {
  compareOffers,
  compareTwoOffers,
  findSimilarOffers,
  generateComparisonSummary,
  type ComparisonCriteria,
  type ComparisonResult,
  type OfferComparison
} from './offerComparison';

// Recommendation engine utilities
export {
  generateRecommendations,
  generateRecommendationSet,
  generateRecommendationText,
  type RecommendationReason,
  type OfferRecommendation,
  type RecommendationSet
} from './recommendationEngine';

// Re-export existing utilities
export { cn } from './cn';
export * from './chatFlow';
export * from './chatValidation';