import { InsuranceOffer } from '../types/insurance';
import { UserProfile } from '../types/user';
import { insuranceProviders } from '../data/providers';

export interface ComparisonCriteria {
  price: number; // 0-1 weight
  coverage: number; // 0-1 weight
  provider: number; // 0-1 weight
  flexibility: number; // 0-1 weight
}

export interface ComparisonResult {
  offerId: string;
  scores: {
    price: number;
    coverage: number;
    provider: number;
    flexibility: number;
    total: number;
  };
  rank: number;
}

export interface OfferComparison {
  offer1: InsuranceOffer;
  offer2: InsuranceOffer;
  differences: {
    monthlyPremium: number;
    yearlyPremium: number;
    coverageItems: string[];
    modelDifference: string;
    franchiseDifference: number;
  };
  recommendation: string;
}

// Default comparison weights
const DEFAULT_WEIGHTS: ComparisonCriteria = {
  price: 0.4,
  coverage: 0.3,
  provider: 0.2,
  flexibility: 0.1
};

// Score an offer based on price (lower is better)
function scorePriceValue(offer: InsuranceOffer, allOffers: InsuranceOffer[]): number {
  const prices = allOffers.map(o => o.totalMonthlyPremium);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  
  if (maxPrice === minPrice) return 1;
  
  // Inverse scoring: lowest price gets highest score
  const normalized = (maxPrice - offer.totalMonthlyPremium) / (maxPrice - minPrice);
  return normalized;
}

// Score coverage completeness
function scoreCoverage(offer: InsuranceOffer, userProfile: UserProfile): number {
  let score = 0;
  let desiredCount = 0;
  
  const coverageMap = offer.additionalInsurances.reduce((acc, ins) => {
    acc[ins.category] = true;
    return acc;
  }, {} as Record<string, boolean>);
  
  // Check each desired coverage
  if (userProfile.preferences.wantsComplementaryMedicine) {
    desiredCount++;
    if (coverageMap['komplementaer']) score++;
  }
  
  if (userProfile.preferences.wantsDentalCoverage) {
    desiredCount++;
    if (coverageMap['zahn']) score++;
  }
  
  if (userProfile.preferences.wantsInternationalCoverage) {
    desiredCount++;
    if (coverageMap['ausland']) score++;
  }
  
  if (userProfile.preferences.wantsGlassesContribution) {
    desiredCount++;
    if (coverageMap['brille']) score++;
  }
  
  if (userProfile.preferences.preferredHospitalClass !== 'general') {
    desiredCount++;
    if (coverageMap['spital_semi_private'] || coverageMap['spital_private'] || coverageMap['spital_flex']) {
      score++;
    }
  }
  
  if (userProfile.preferences.wantsFreeDoctorChoice) {
    desiredCount++;
    if (coverageMap['ambulant']) score++;
  }
  
  return desiredCount > 0 ? score / desiredCount : 0.5;
}

// Score provider quality
function scoreProvider(offer: InsuranceOffer): number {
  const provider = insuranceProviders.find(p => p.id === offer.basicInsurance.providerId);
  if (!provider) return 0.5;
  
  // Normalize rating from 1-5 to 0-1
  return (provider.rating - 1) / 4;
}

// Score model flexibility
function scoreFlexibility(offer: InsuranceOffer): number {
  const flexibilityScores = {
    'standard': 1.0,
    'telmed': 0.8,
    'apotheke': 0.7,
    'hausarzt': 0.6,
    'kombiniert': 0.9,
    'hmo': 0.5
  };
  
  return flexibilityScores[offer.basicInsurance.model] || 0.5;
}

// Compare and rank multiple offers
export function compareOffers(
  offers: InsuranceOffer[],
  userProfile: UserProfile,
  criteria: ComparisonCriteria = DEFAULT_WEIGHTS
): ComparisonResult[] {
  // Normalize weights to sum to 1
  const totalWeight = Object.values(criteria).reduce((sum, w) => sum + w, 0);
  const normalizedCriteria = Object.entries(criteria).reduce((acc, [key, value]) => {
    acc[key as keyof ComparisonCriteria] = value / totalWeight;
    return acc;
  }, {} as ComparisonCriteria);
  
  const results: ComparisonResult[] = offers.map(offer => {
    const scores = {
      price: scorePriceValue(offer, offers),
      coverage: scoreCoverage(offer, userProfile),
      provider: scoreProvider(offer),
      flexibility: scoreFlexibility(offer),
      total: 0
    };
    
    // Calculate weighted total
    scores.total = 
      scores.price * normalizedCriteria.price +
      scores.coverage * normalizedCriteria.coverage +
      scores.provider * normalizedCriteria.provider +
      scores.flexibility * normalizedCriteria.flexibility;
    
    return {
      offerId: offer.id,
      scores,
      rank: 0 // Will be set after sorting
    };
  });
  
  // Sort by total score (descending) and assign ranks
  results.sort((a, b) => b.scores.total - a.scores.total);
  results.forEach((result, index) => {
    result.rank = index + 1;
  });
  
  return results;
}

// Direct comparison between two offers
export function compareTwoOffers(
  offer1: InsuranceOffer,
  offer2: InsuranceOffer
): OfferComparison {
  const monthlyDiff = offer2.totalMonthlyPremium - offer1.totalMonthlyPremium;
  const yearlyDiff = offer2.totalYearlyPremium - offer1.totalYearlyPremium;
  
  // Find coverage differences
  const coverage1 = new Set(offer1.additionalInsurances.map(ins => ins.category));
  const coverage2 = new Set(offer2.additionalInsurances.map(ins => ins.category));
  
  const onlyInOffer1 = [...coverage1].filter(cat => !coverage2.has(cat));
  const onlyInOffer2 = [...coverage2].filter(cat => !coverage1.has(cat));
  
  const coverageItems: string[] = [];
  if (onlyInOffer1.length > 0) {
    coverageItems.push(`Nur in Angebot 1: ${onlyInOffer1.join(', ')}`);
  }
  if (onlyInOffer2.length > 0) {
    coverageItems.push(`Nur in Angebot 2: ${onlyInOffer2.join(', ')}`);
  }
  
  // Model and franchise differences
  const modelDiff = offer1.basicInsurance.model !== offer2.basicInsurance.model
    ? `${offer1.basicInsurance.model} vs ${offer2.basicInsurance.model}`
    : 'Gleiches Modell';
  
  const franchiseDiff = offer2.basicInsurance.franchise - offer1.basicInsurance.franchise;
  
  // Generate recommendation
  let recommendation = '';
  if (Math.abs(monthlyDiff) < 10 && coverage1.size === coverage2.size) {
    recommendation = 'Beide Angebote sind sehr ähnlich. Wählen Sie basierend auf dem bevorzugten Anbieter.';
  } else if (monthlyDiff < 0 && coverage2.size >= coverage1.size) {
    recommendation = 'Angebot 2 bietet besseren Wert: günstiger mit gleicher oder besserer Deckung.';
  } else if (monthlyDiff > 0 && coverage2.size > coverage1.size) {
    recommendation = 'Angebot 2 bietet mehr Deckung für einen höheren Preis. Überlegen Sie, ob die Zusatzleistungen den Aufpreis wert sind.';
  } else if (monthlyDiff < 0 && coverage2.size < coverage1.size) {
    recommendation = 'Angebot 2 ist günstiger, bietet aber weniger Deckung. Prüfen Sie, ob Sie auf die fehlenden Leistungen verzichten können.';
  } else {
    recommendation = 'Angebot 1 bietet das bessere Preis-Leistungs-Verhältnis.';
  }
  
  return {
    offer1,
    offer2,
    differences: {
      monthlyPremium: monthlyDiff,
      yearlyPremium: yearlyDiff,
      coverageItems,
      modelDifference: modelDiff,
      franchiseDifference: franchiseDiff
    },
    recommendation
  };
}

// Find similar offers for comparison
export function findSimilarOffers(
  targetOffer: InsuranceOffer,
  allOffers: InsuranceOffer[],
  maxResults: number = 3
): InsuranceOffer[] {
  const similarityScores = allOffers
    .filter(offer => offer.id !== targetOffer.id)
    .map(offer => {
      let score = 0;
      
      // Same model = high similarity
      if (offer.basicInsurance.model === targetOffer.basicInsurance.model) score += 3;
      
      // Same franchise = medium similarity
      if (offer.basicInsurance.franchise === targetOffer.basicInsurance.franchise) score += 2;
      
      // Similar price (within 10%)
      const priceDiff = Math.abs(offer.totalMonthlyPremium - targetOffer.totalMonthlyPremium);
      const pricePercent = priceDiff / targetOffer.totalMonthlyPremium;
      if (pricePercent <= 0.1) score += 2;
      else if (pricePercent <= 0.2) score += 1;
      
      // Similar coverage count
      const coverageDiff = Math.abs(offer.additionalInsurances.length - targetOffer.additionalInsurances.length);
      if (coverageDiff === 0) score += 2;
      else if (coverageDiff === 1) score += 1;
      
      return { offer, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => item.offer);
  
  return similarityScores;
}

// Generate comparison summary for multiple offers
export function generateComparisonSummary(
  offers: InsuranceOffer[],
  userProfile: UserProfile
): string {
  if (offers.length === 0) return 'Keine Angebote zum Vergleichen vorhanden.';
  
  const priceRange = {
    min: Math.min(...offers.map(o => o.totalMonthlyPremium)),
    max: Math.max(...offers.map(o => o.totalMonthlyPremium))
  };
  
  const avgPremium = offers.reduce((sum, o) => sum + o.totalMonthlyPremium, 0) / offers.length;
  const savingsOffers = offers.filter(o => o.savings && o.savings.amount > 0);
  const avgSavings = savingsOffers.length > 0
    ? savingsOffers.reduce((sum, o) => sum + (o.savings?.amount || 0), 0) / savingsOffers.length
    : 0;
  
  let summary = `Vergleich von ${offers.length} Angeboten:\n\n`;
  summary += `💰 Preisspanne: CHF ${priceRange.min.toFixed(2)} - ${priceRange.max.toFixed(2)} pro Monat\n`;
  summary += `📊 Durchschnittsprämie: CHF ${avgPremium.toFixed(2)} pro Monat\n`;
  
  if (avgSavings > 0) {
    summary += `💵 Durchschnittliche Ersparnis: CHF ${avgSavings.toFixed(2)} pro Monat\n`;
  }
  
  // Model distribution
  const modelCounts = offers.reduce((acc, offer) => {
    acc[offer.basicInsurance.model] = (acc[offer.basicInsurance.model] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  summary += `\n🏥 Versicherungsmodelle:\n`;
  Object.entries(modelCounts).forEach(([model, count]) => {
    summary += `- ${model}: ${count} Angebot${count > 1 ? 'e' : ''}\n`;
  });
  
  return summary;
}