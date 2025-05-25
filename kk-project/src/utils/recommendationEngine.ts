import { InsuranceOffer } from '../types/insurance';
import { UserProfile } from '../types/user';
import { compareOffers, ComparisonCriteria } from './offerComparison';
import { insuranceProviders } from '../data/providers';

export interface RecommendationReason {
  type: 'price' | 'coverage' | 'savings' | 'provider' | 'model' | 'preference';
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface OfferRecommendation {
  offer: InsuranceOffer;
  score: number;
  reasons: RecommendationReason[];
  suitabilityLevel: 'excellent' | 'good' | 'fair' | 'poor';
  primaryBenefit: string;
}

export interface RecommendationSet {
  topRecommendation: OfferRecommendation;
  alternativeRecommendations: OfferRecommendation[];
  budgetOption?: OfferRecommendation;
  premiumOption?: OfferRecommendation;
}

// Determine user's priority based on profile
function determineUserPriority(userProfile: UserProfile): ComparisonCriteria {
  const criteria: ComparisonCriteria = {
    price: 0.25,
    coverage: 0.25,
    provider: 0.25,
    flexibility: 0.25
  };
  
  // Adjust based on user preferences and situation
  
  // Budget conscious users
  if (userProfile.preferences.maxMonthlyPremium && 
      userProfile.preferences.maxMonthlyPremium < 400) {
    criteria.price = 0.5;
    criteria.coverage = 0.2;
    criteria.provider = 0.2;
    criteria.flexibility = 0.1;
  }
  
  // Users wanting comprehensive coverage
  const wantsManyCoverages = [
    userProfile.preferences.wantsComplementaryMedicine,
    userProfile.preferences.wantsDentalCoverage,
    userProfile.preferences.wantsInternationalCoverage,
    userProfile.preferences.wantsGlassesContribution,
    userProfile.preferences.preferredHospitalClass !== 'general'
  ].filter(Boolean).length >= 3;
  
  if (wantsManyCoverages) {
    criteria.price = 0.2;
    criteria.coverage = 0.5;
    criteria.provider = 0.2;
    criteria.flexibility = 0.1;
  }
  
  // Users with health issues prioritize provider quality
  if (userProfile.healthStatus === 'fair' || userProfile.healthStatus === 'poor') {
    criteria.price = 0.2;
    criteria.coverage = 0.3;
    criteria.provider = 0.4;
    criteria.flexibility = 0.1;
  }
  
  // Users who want flexibility
  if (userProfile.preferences.wantsFreeDoctorChoice && 
      userProfile.preferences.preferredModels.includes('standard')) {
    criteria.flexibility = 0.35;
    criteria.price = 0.25;
    criteria.coverage = 0.25;
    criteria.provider = 0.15;
  }
  
  return criteria;
}

// Generate reasons for recommendation
function generateRecommendationReasons(
  offer: InsuranceOffer,
  userProfile: UserProfile,
  allOffers: InsuranceOffer[]
): RecommendationReason[] {
  const reasons: RecommendationReason[] = [];
  const provider = insuranceProviders.find(p => p.id === offer.basicInsurance.providerId);
  
  // Price analysis
  const prices = allOffers.map(o => o.totalMonthlyPremium);
  const avgPrice = prices.reduce((sum, p) => sum + p, 0) / prices.length;
  const minPrice = Math.min(...prices);
  
  if (offer.totalMonthlyPremium === minPrice) {
    reasons.push({
      type: 'price',
      description: 'Günstigstes Angebot im Vergleich',
      impact: 'positive'
    });
  } else if (offer.totalMonthlyPremium < avgPrice * 0.9) {
    reasons.push({
      type: 'price',
      description: 'Preis deutlich unter dem Durchschnitt',
      impact: 'positive'
    });
  } else if (offer.totalMonthlyPremium > avgPrice * 1.1) {
    reasons.push({
      type: 'price',
      description: 'Preis über dem Durchschnitt, aber mit Mehrwert',
      impact: 'neutral'
    });
  }
  
  // Savings analysis
  if (offer.savings && offer.savings.amount > 0) {
    if (offer.savings.percentage > 20) {
      reasons.push({
        type: 'savings',
        description: `Ersparnis von ${offer.savings.percentage.toFixed(1)}% gegenüber aktueller Versicherung`,
        impact: 'positive'
      });
    } else if (offer.savings.percentage > 10) {
      reasons.push({
        type: 'savings',
        description: `Moderate Ersparnis von CHF ${offer.savings.amount.toFixed(2)} pro Monat`,
        impact: 'positive'
      });
    }
  }
  
  // Coverage analysis
  const desiredCoverages = [];
  if (userProfile.preferences.wantsComplementaryMedicine) desiredCoverages.push('komplementaer');
  if (userProfile.preferences.wantsDentalCoverage) desiredCoverages.push('zahn');
  if (userProfile.preferences.wantsInternationalCoverage) desiredCoverages.push('ausland');
  if (userProfile.preferences.wantsGlassesContribution) desiredCoverages.push('brille');
  
  const offerCoverages = offer.additionalInsurances.map(ins => ins.category);
  const matchedCoverages = desiredCoverages.filter(cov => offerCoverages.includes(cov as any));
  
  if (matchedCoverages.length === desiredCoverages.length && desiredCoverages.length > 0) {
    reasons.push({
      type: 'coverage',
      description: 'Alle gewünschten Zusatzversicherungen enthalten',
      impact: 'positive'
    });
  } else if (matchedCoverages.length > 0) {
    reasons.push({
      type: 'coverage',
      description: `${matchedCoverages.length} von ${desiredCoverages.length} gewünschten Zusatzversicherungen`,
      impact: matchedCoverages.length >= desiredCoverages.length * 0.7 ? 'positive' : 'neutral'
    });
  }
  
  // Provider analysis
  if (provider && provider.rating >= 4.5) {
    reasons.push({
      type: 'provider',
      description: `${provider.name} hat ausgezeichnete Kundenbewertungen (${provider.rating}/5)`,
      impact: 'positive'
    });
  } else if (provider && provider.rating >= 4.0) {
    reasons.push({
      type: 'provider',
      description: `${provider.name} ist ein zuverlässiger Anbieter`,
      impact: 'positive'
    });
  }
  
  // Model analysis
  const preferredModels = userProfile.preferences.preferredModels.map(m => 
    m === 'apotheken' ? 'apotheke' : m
  );
  
  if (preferredModels.includes(offer.basicInsurance.model as any)) {
    reasons.push({
      type: 'model',
      description: `${offer.basicInsurance.model}-Modell entspricht Ihren Präferenzen`,
      impact: 'positive'
    });
  }
  
  // Special preferences
  if (userProfile.preferences.wantsOnlineServices && provider) {
    reasons.push({
      type: 'preference',
      description: 'Umfangreiche Online-Services verfügbar',
      impact: 'positive'
    });
  }
  
  return reasons;
}

// Calculate suitability level
function calculateSuitabilityLevel(score: number): 'excellent' | 'good' | 'fair' | 'poor' {
  if (score >= 0.8) return 'excellent';
  if (score >= 0.6) return 'good';
  if (score >= 0.4) return 'fair';
  return 'poor';
}

// Determine primary benefit
function determinePrimaryBenefit(
  offer: InsuranceOffer,
  reasons: RecommendationReason[]
): string {
  // Check for strong positive reasons
  const strongPriceReason = reasons.find(r => r.type === 'price' && r.impact === 'positive');
  const strongCoverageReason = reasons.find(r => r.type === 'coverage' && r.impact === 'positive');
  const strongSavingsReason = reasons.find(r => r.type === 'savings' && r.impact === 'positive');
  
  if (strongSavingsReason && offer.savings && offer.savings.percentage > 15) {
    return `Sparen Sie ${offer.savings.percentage.toFixed(0)}% im Vergleich zu Ihrer aktuellen Versicherung`;
  }
  
  if (strongPriceReason) {
    return `Ausgezeichnetes Preis-Leistungs-Verhältnis mit CHF ${offer.totalMonthlyPremium.toFixed(2)}/Monat`;
  }
  
  if (strongCoverageReason) {
    return 'Umfassender Versicherungsschutz nach Ihren Wünschen';
  }
  
  const provider = insuranceProviders.find(p => p.id === offer.basicInsurance.providerId);
  if (provider && provider.rating >= 4.5) {
    return `Top-bewerteter Anbieter ${provider.name} mit exzellentem Service`;
  }
  
  return 'Ausgewogenes Angebot mit gutem Preis-Leistungs-Verhältnis';
}

// Generate recommendations for offers
export function generateRecommendations(
  offers: InsuranceOffer[],
  userProfile: UserProfile
): OfferRecommendation[] {
  const criteria = determineUserPriority(userProfile);
  const comparisonResults = compareOffers(offers, userProfile, criteria);
  
  const recommendations: OfferRecommendation[] = offers.map(offer => {
    const compResult = comparisonResults.find(cr => cr.offerId === offer.id);
    const score = compResult?.scores.total || 0;
    const reasons = generateRecommendationReasons(offer, userProfile, offers);
    const suitabilityLevel = calculateSuitabilityLevel(score);
    const primaryBenefit = determinePrimaryBenefit(offer, reasons);
    
    return {
      offer,
      score,
      reasons,
      suitabilityLevel,
      primaryBenefit
    };
  });
  
  // Sort by score
  recommendations.sort((a, b) => b.score - a.score);
  
  return recommendations;
}

// Generate complete recommendation set
export function generateRecommendationSet(
  offers: InsuranceOffer[],
  userProfile: UserProfile
): RecommendationSet {
  const recommendations = generateRecommendations(offers, userProfile);
  
  if (recommendations.length === 0) {
    throw new Error('Keine Angebote für Empfehlungen verfügbar');
  }
  
  // Top recommendation
  const topRecommendation = recommendations[0];
  
  // Alternative recommendations (next 2-3 best)
  const alternativeRecommendations = recommendations.slice(1, 4);
  
  // Budget option (cheapest with decent score)
  const budgetOption = recommendations
    .filter(rec => rec.score >= 0.5)
    .sort((a, b) => a.offer.totalMonthlyPremium - b.offer.totalMonthlyPremium)[0];
  
  // Premium option (best coverage regardless of price)
  const premiumOption = recommendations
    .filter(rec => rec.offer.additionalInsurances.length >= 3)
    .sort((a, b) => b.offer.additionalInsurances.length - a.offer.additionalInsurances.length)[0];
  
  return {
    topRecommendation,
    alternativeRecommendations,
    budgetOption: budgetOption !== topRecommendation ? budgetOption : undefined,
    premiumOption: premiumOption !== topRecommendation ? premiumOption : undefined
  };
}

// Generate personalized recommendation text
export function generateRecommendationText(
  recommendation: OfferRecommendation,
  userProfile: UserProfile
): string {
  const provider = insuranceProviders.find(p => p.id === recommendation.offer.basicInsurance.providerId);
  let text = '';
  
  // Opening based on suitability
  switch (recommendation.suitabilityLevel) {
    case 'excellent':
      text = `🌟 Ausgezeichnete Wahl für Sie!\n\n`;
      break;
    case 'good':
      text = `✅ Gut geeignetes Angebot\n\n`;
      break;
    case 'fair':
      text = `👍 Solides Angebot mit Kompromissen\n\n`;
      break;
    default:
      text = `ℹ️ Mögliche Option\n\n`;
  }
  
  // Main benefit
  text += `${recommendation.primaryBenefit}\n\n`;
  
  // Key details
  text += `📋 Details:\n`;
  text += `• Anbieter: ${provider?.name || 'Unbekannt'}\n`;
  text += `• Modell: ${recommendation.offer.basicInsurance.model}\n`;
  text += `• Franchise: CHF ${recommendation.offer.basicInsurance.franchise}\n`;
  text += `• Monatsprämie: CHF ${recommendation.offer.totalMonthlyPremium.toFixed(2)}\n`;
  
  if (recommendation.offer.additionalInsurances.length > 0) {
    text += `• Zusatzversicherungen: ${recommendation.offer.additionalInsurances.length}\n`;
  }
  
  // Top reasons
  text += `\n✨ Vorteile:\n`;
  const positiveReasons = recommendation.reasons
    .filter(r => r.impact === 'positive')
    .slice(0, 3);
  
  positiveReasons.forEach(reason => {
    text += `• ${reason.description}\n`;
  });
  
  // Savings highlight
  if (recommendation.offer.savings && recommendation.offer.savings.amount > 0) {
    text += `\n💰 Ersparnis: CHF ${recommendation.offer.savings.amount.toFixed(2)}/Monat `;
    text += `(CHF ${(recommendation.offer.savings.amount * 12).toFixed(0)}/Jahr)\n`;
  }
  
  return text;
}