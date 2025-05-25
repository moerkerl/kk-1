import { InsuranceOffer, BasicInsurance, AdditionalInsurance, InsuranceModel, FranchiseOption } from '../types/insurance';
import { UserProfile, UserPreferences, InsuranceModelType } from '../types/user';
import { calculateBasicInsurancePremium, calculateSupplementaryPremium, calculateSavings } from './premiumCalculation';
import { insuranceProviders } from '../data/providers';
import { v4 as uuidv4 } from 'uuid';

interface OfferGenerationParams {
  userProfile: UserProfile;
  numberOfOffers?: number;
  includeCurrentProvider?: boolean;
}

interface SupplementaryOption {
  category: string;
  name: string;
  monthlyPremium: number;
  features: string[];
}

// Map user model types to insurance model types
const mapUserModelToInsuranceModel = (userModel: InsuranceModelType): InsuranceModel => {
  const mapping: Record<InsuranceModelType, InsuranceModel> = {
    'standard': 'standard',
    'hmo': 'hmo',
    'hausarzt': 'hausarzt',
    'telmed': 'telmed',
    'apotheken': 'apotheke'
  };
  return mapping[userModel] || 'standard';
};

// Generate supplementary insurance options based on user preferences
function generateSupplementaryOptions(
  userProfile: UserProfile,
  providerId: string
): SupplementaryOption[] {
  const options: SupplementaryOption[] = [];
  const { preferences, age, healthStatus } = userProfile;
  
  // Ambulatory care (basic supplementary)
  if (preferences.wantsFreeDoctorChoice || preferences.wantsPreventiveCare) {
    options.push({
      category: 'ambulant',
      name: 'Ambulante Zusatzversicherung Plus',
      monthlyPremium: calculateSupplementaryPremium('ambulant', age, healthStatus, providerId),
      features: [
        'Freie Arztwahl weltweit',
        'Notfallbehandlungen im Ausland',
        'Präventionsleistungen bis CHF 500/Jahr',
        'Transport- und Rettungskosten'
      ]
    });
  }
  
  // Hospital insurance based on preferred class
  if (preferences.preferredHospitalClass !== 'general') {
    const hospitalCategory = `spital_${preferences.preferredHospitalClass}`;
    const hospitalName = {
      'semi_private': 'Halbprivat-Versicherung',
      'private': 'Privat-Versicherung',
      'flex': 'Flex-Spitalversicherung'
    }[preferences.preferredHospitalClass];
    
    options.push({
      category: hospitalCategory,
      name: hospitalName || 'Spital-Zusatzversicherung',
      monthlyPremium: calculateSupplementaryPremium(hospitalCategory, age, healthStatus, providerId),
      features: [
        preferences.preferredHospitalClass === 'private' ? 'Einbettzimmer' : 'Zweibettzimmer',
        'Freie Spitalwahl schweizweit',
        'Chefarztbehandlung',
        preferences.preferredHospitalClass === 'flex' ? 'Flexible Upgrade-Möglichkeit' : 'Komfort-Services'
      ]
    });
  }
  
  // Complementary medicine
  if (preferences.wantsComplementaryMedicine) {
    options.push({
      category: 'komplementaer',
      name: 'Komplementärmedizin Plus',
      monthlyPremium: calculateSupplementaryPremium('komplementaer', age, healthStatus, providerId),
      features: [
        'Naturheilverfahren (80%, max. CHF 3000/Jahr)',
        'Akupunktur und TCM',
        'Homöopathie und Phytotherapie',
        'Osteopathie'
      ]
    });
  }
  
  // Dental insurance
  if (preferences.wantsDentalCoverage) {
    options.push({
      category: 'zahn',
      name: 'Zahnversicherung Comfort',
      monthlyPremium: calculateSupplementaryPremium('zahn', age, healthStatus, providerId),
      features: [
        'Zahnbehandlungen 75% bis CHF 3000/Jahr',
        'Dentalhygiene 75% bis CHF 300/Jahr',
        'Kieferorthopädie für Kinder',
        'Weltweiter Schutz'
      ]
    });
  }
  
  // International coverage
  if (preferences.wantsInternationalCoverage) {
    options.push({
      category: 'ausland',
      name: 'Reise- und Auslandschutz',
      monthlyPremium: calculateSupplementaryPremium('ausland', age, healthStatus, providerId),
      features: [
        'Weltweiter Versicherungsschutz',
        'Rücktransport in die Schweiz',
        'Such- und Bergungskosten',
        'Assistance-Leistungen 24/7'
      ]
    });
  }
  
  // Glasses and contact lenses
  if (preferences.wantsGlassesContribution) {
    options.push({
      category: 'brille',
      name: 'Brillen und Kontaktlinsen',
      monthlyPremium: calculateSupplementaryPremium('brille', age, healthStatus, providerId),
      features: [
        'Brillen/Kontaktlinsen CHF 300/Jahr',
        'Augenlaserbehandlungen 80%',
        'Vorsorgeuntersuchungen',
        'Kinderbrillenschutz'
      ]
    });
  }
  
  return options;
}

// Generate a single insurance offer
function generateOffer(
  userProfile: UserProfile,
  providerId: string,
  model: InsuranceModel,
  franchise: FranchiseOption
): InsuranceOffer {
  const provider = insuranceProviders.find(p => p.id === providerId);
  if (!provider) throw new Error(`Provider ${providerId} not found`);
  
  // Check if provider is available in user's canton
  if (!provider.availableInCantons.includes(userProfile.canton)) {
    throw new Error(`Provider ${providerId} not available in canton ${userProfile.canton}`);
  }
  
  // Calculate basic insurance premium
  const basicPremiumResult = calculateBasicInsurancePremium({
    age: userProfile.age,
    canton: userProfile.canton,
    franchise,
    model,
    hasAccidentCoverage: userProfile.hasAccidentCoverageFromEmployer,
    providerId
  });
  
  // Create basic insurance object
  const basicInsurance: BasicInsurance = {
    providerId,
    model,
    monthlyPremium: basicPremiumResult.monthlyPremium,
    franchise,
    accidentCoverage: !userProfile.hasAccidentCoverageFromEmployer,
    features: getModelFeatures(model)
  };
  
  // Generate supplementary insurance options
  const supplementaryOptions = generateSupplementaryOptions(userProfile, providerId);
  const additionalInsurances: AdditionalInsurance[] = supplementaryOptions.map(option => ({
    id: uuidv4(),
    providerId,
    name: option.name,
    category: option.category as any,
    monthlyPremium: option.monthlyPremium,
    coverageDetails: {},
    features: option.features,
    waitingPeriod: option.category === 'zahn' ? 6 : option.category.includes('spital') ? 3 : 0
  }));
  
  // Calculate total premiums
  const totalMonthlyPremium = basicInsurance.monthlyPremium + 
    additionalInsurances.reduce((sum, ins) => sum + ins.monthlyPremium, 0);
  
  // Calculate savings if current insurance exists
  let savings;
  if (userProfile.currentInsurance) {
    const savingsCalc = calculateSavings(
      totalMonthlyPremium,
      userProfile.currentInsurance.monthlyPremium
    );
    
    if (savingsCalc.amount > 0) {
      savings = {
        amount: savingsCalc.amount,
        percentage: savingsCalc.percentage,
        comparedTo: userProfile.currentInsurance.provider
      };
    }
  }
  
  return {
    id: uuidv4(),
    basicInsurance,
    additionalInsurances,
    totalMonthlyPremium: Math.round(totalMonthlyPremium * 20) / 20,
    totalYearlyPremium: Math.round(totalMonthlyPremium * 12 * 20) / 20,
    savings
  };
}

// Get features for insurance model
function getModelFeatures(model: InsuranceModel): string[] {
  const features: Record<InsuranceModel, string[]> = {
    'standard': [
      'Freie Arztwahl',
      'Direkter Zugang zu Spezialisten',
      'Keine Einschränkungen'
    ],
    'hausarzt': [
      'Hausarzt als erste Anlaufstelle',
      'Koordinierte Behandlung',
      'Prämienrabatt ca. 7%'
    ],
    'hmo': [
      'Behandlung im HMO-Center',
      'Integrierte Versorgung',
      'Prämienrabatt ca. 12%'
    ],
    'telmed': [
      'Telefonische Erstberatung',
      'Flexible Erreichbarkeit',
      'Prämienrabatt ca. 10%'
    ],
    'apotheke': [
      'Apotheke als erste Anlaufstelle',
      'Direkte Medikamentenabgabe',
      'Prämienrabatt ca. 9%'
    ],
    'kombiniert': [
      'Kombination verschiedener Modelle',
      'Maximale Flexibilität',
      'Attraktive Rabatte'
    ]
  };
  
  return features[model] || features['standard'];
}

// Main offer generation function
export function generateInsuranceOffers(params: OfferGenerationParams): InsuranceOffer[] {
  const { userProfile, numberOfOffers = 5, includeCurrentProvider = false } = params;
  const offers: InsuranceOffer[] = [];
  
  // Get available providers for user's canton
  const availableProviders = insuranceProviders.filter(provider => 
    provider.availableInCantons.includes(userProfile.canton) &&
    (includeCurrentProvider || provider.name !== userProfile.currentInsurance?.provider)
  );
  
  // Determine preferred models and franchises
  const preferredModels = userProfile.preferences.preferredModels.map(mapUserModelToInsuranceModel);
  const preferredFranchise = (userProfile.preferences.preferredFranchise as FranchiseOption) || 1000;
  
  // Generate offers for each preferred model
  for (const model of preferredModels) {
    // Sort providers by rating and take top ones
    const topProviders = [...availableProviders]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, Math.ceil(numberOfOffers / preferredModels.length));
    
    for (const provider of topProviders) {
      try {
        const offer = generateOffer(userProfile, provider.id, model, preferredFranchise);
        offers.push(offer);
        
        // Also generate an alternative franchise option if budget conscious
        if (userProfile.preferences.maxMonthlyPremium && preferredFranchise < 2500) {
          const highFranchiseOffer = generateOffer(userProfile, provider.id, model, 2500);
          if (highFranchiseOffer.totalMonthlyPremium <= userProfile.preferences.maxMonthlyPremium) {
            offers.push(highFranchiseOffer);
          }
        }
      } catch (error) {
        console.error(`Error generating offer for ${provider.id}:`, error);
      }
    }
  }
  
  // Sort offers by total premium (ascending) and limit to requested number
  return offers
    .sort((a, b) => a.totalMonthlyPremium - b.totalMonthlyPremium)
    .slice(0, numberOfOffers);
}

// Generate personalized recommendations
export function generateRecommendations(
  offers: InsuranceOffer[],
  userProfile: UserProfile
): { bestValue: InsuranceOffer; bestCoverage: InsuranceOffer; bestSavings?: InsuranceOffer } {
  // Best value: lowest premium with decent coverage
  const bestValue = offers[0]; // Already sorted by premium
  
  // Best coverage: most supplementary insurances
  const bestCoverage = offers.reduce((best, current) => 
    current.additionalInsurances.length > best.additionalInsurances.length ? current : best
  );
  
  // Best savings: highest savings compared to current
  const bestSavings = offers
    .filter(offer => offer.savings && offer.savings.amount > 0)
    .sort((a, b) => (b.savings?.amount || 0) - (a.savings?.amount || 0))[0];
  
  return { bestValue, bestCoverage, bestSavings };
}