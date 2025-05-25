import { UserProfile } from '../types/user';
import { 
  generateInsuranceOffers, 
  generateRecommendationSet,
  generateRecommendationText,
  compareOffers,
  generateComparisonSummary
} from './index';

// Example user profile for testing
const exampleUserProfile: UserProfile = {
  id: 'user-123',
  firstName: 'Max',
  lastName: 'Muster',
  email: 'max.muster@example.com',
  dateOfBirth: new Date('1985-06-15'),
  age: 38,
  gender: 'male',
  canton: 'ZH',
  postalCode: '8001',
  city: 'Zürich',
  healthStatus: 'good',
  preExistingConditions: [],
  isSmoker: false,
  familyStatus: 'married',
  numberOfChildren: 2,
  childrenAges: [8, 12],
  employmentStatus: 'employed_fulltime',
  monthlyIncome: 8500,
  hasAccidentCoverageFromEmployer: true,
  preferences: {
    preferredModels: ['hausarzt', 'telmed'],
    wantsComplementaryMedicine: true,
    wantsDentalCoverage: true,
    wantsInternationalCoverage: false,
    wantsPreventiveCare: true,
    wantsFitnessContribution: true,
    wantsGlassesContribution: true,
    preferredHospitalClass: 'semi_private',
    wantsFreeDoctorChoice: false,
    wantsPrivateRoom: false,
    maxMonthlyPremium: 450,
    preferredFranchise: 1500,
    preferredLanguage: 'de',
    wantsOnlineServices: true,
    wantsLocalOffice: false
  },
  currentInsurance: {
    provider: 'CSS',
    basicInsuranceModel: 'standard',
    franchise: 300,
    monthlyPremium: 485,
    supplementaryInsurances: ['Ambulant', 'Spital Allgemein'],
    satisfactionLevel: 3,
    reasonsForChange: ['Zu teuer', 'Bessere Leistungen gewünscht']
  },
  createdAt: new Date(),
  updatedAt: new Date()
};

// Example function to demonstrate the offer engine
export async function demonstrateOfferEngine() {
  console.log('🚀 Demonstrating KrankenkassenAssistent Offer Engine\n');
  
  // 1. Generate insurance offers
  console.log('1️⃣ Generating personalized insurance offers...');
  const offers = generateInsuranceOffers({
    userProfile: exampleUserProfile,
    numberOfOffers: 8,
    includeCurrentProvider: false
  });
  
  console.log(`✅ Generated ${offers.length} offers\n`);
  
  // Display offers summary
  offers.forEach((offer, index) => {
    console.log(`Offer ${index + 1}:`);
    console.log(`- Provider: ${offer.basicInsurance.providerId}`);
    console.log(`- Model: ${offer.basicInsurance.model}`);
    console.log(`- Franchise: CHF ${offer.basicInsurance.franchise}`);
    console.log(`- Monthly Premium: CHF ${offer.totalMonthlyPremium}`);
    console.log(`- Additional Insurances: ${offer.additionalInsurances.length}`);
    if (offer.savings) {
      console.log(`- Savings: CHF ${offer.savings.amount}/month (${offer.savings.percentage}%)`);
    }
    console.log('');
  });
  
  // 2. Generate recommendations
  console.log('2️⃣ Generating personalized recommendations...\n');
  const recommendationSet = generateRecommendationSet(offers, exampleUserProfile);
  
  console.log('🌟 Top Recommendation:');
  console.log(generateRecommendationText(recommendationSet.topRecommendation, exampleUserProfile));
  
  if (recommendationSet.budgetOption) {
    console.log('\n💰 Budget Option:');
    console.log(`- Monthly Premium: CHF ${recommendationSet.budgetOption.offer.totalMonthlyPremium}`);
    console.log(`- ${recommendationSet.budgetOption.primaryBenefit}`);
  }
  
  if (recommendationSet.premiumOption) {
    console.log('\n👑 Premium Option:');
    console.log(`- Monthly Premium: CHF ${recommendationSet.premiumOption.offer.totalMonthlyPremium}`);
    console.log(`- ${recommendationSet.premiumOption.primaryBenefit}`);
  }
  
  // 3. Compare offers
  console.log('\n3️⃣ Comparing offers...\n');
  const comparisonResults = compareOffers(offers, exampleUserProfile);
  
  console.log('Top 3 offers by overall score:');
  comparisonResults.slice(0, 3).forEach((result, index) => {
    const offer = offers.find(o => o.id === result.offerId);
    console.log(`${index + 1}. ${offer?.basicInsurance.providerId} - Score: ${result.scores.total.toFixed(2)}`);
    console.log(`   Price: ${result.scores.price.toFixed(2)} | Coverage: ${result.scores.coverage.toFixed(2)} | Provider: ${result.scores.provider.toFixed(2)}`);
  });
  
  // 4. Generate comparison summary
  console.log('\n4️⃣ Overall comparison summary:\n');
  console.log(generateComparisonSummary(offers, exampleUserProfile));
  
  return {
    offers,
    recommendationSet,
    comparisonResults
  };
}

// Example: Calculate premium for specific scenario
export function calculatePremiumExample() {
  console.log('💡 Example Premium Calculation:\n');
  
  // Single person
  console.log('Single person (35 years, Zurich, HMO model, CHF 2500 franchise):');
  const singlePremium = generateInsuranceOffers({
    userProfile: {
      ...exampleUserProfile,
      age: 35,
      numberOfChildren: 0,
      familyStatus: 'single'
    },
    numberOfOffers: 1
  })[0];
  
  console.log(`Monthly premium: CHF ${singlePremium.totalMonthlyPremium}`);
  console.log(`Yearly premium: CHF ${singlePremium.totalYearlyPremium}\n`);
  
  // Family
  console.log('Family (2 adults + 2 children, Basel, Hausarzt model, CHF 1500 franchise):');
  const familyProfile = {
    ...exampleUserProfile,
    canton: 'BS' as const,
    age: 40,
    preferences: {
      ...exampleUserProfile.preferences,
      preferredModels: ['hausarzt' as const],
      preferredFranchise: 1500
    }
  };
  
  const familyOffer = generateInsuranceOffers({
    userProfile: familyProfile,
    numberOfOffers: 1
  })[0];
  
  console.log(`Family monthly premium: CHF ${familyOffer.totalMonthlyPremium}`);
  console.log(`Family yearly premium: CHF ${familyOffer.totalYearlyPremium}`);
}