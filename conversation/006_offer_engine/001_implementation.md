# Offer Engine Implementation

## Overview
Created a comprehensive offer engine for the KrankenkassenAssistent project that handles premium calculations, offer generation, comparison, and recommendations based on Swiss health insurance market data.

## Components Created

### 1. Premium Calculation (`/src/utils/premiumCalculation.ts`)
- **Base Premium Calculation**: Uses canton factors, age groups, insurance models, and franchise levels
- **Canton Factors**: Realistic pricing differences between Swiss cantons (e.g., Geneva 1.20x, Uri 0.85x)
- **Age-based Pricing**:
  - Children (0-18): 30% of adult premium
  - Young adults (19-25): 65% of adult premium
  - Adults (26-60): 100% base premium
  - Seniors (61+): 135% of adult premium
- **Model Discounts**:
  - Standard: 0% discount
  - Hausarzt: 7% discount
  - HMO: 12% discount
  - Telmed: 10% discount
  - Apotheke: 9% discount
- **Franchise Discounts**: From 0% (CHF 300) to 28% (CHF 2500)
- **Supplementary Insurance**: Considers age, health status, and provider
- **Family Premium Calculation**: Aggregates individual premiums

### 2. Offer Generation (`/src/utils/offerGeneration.ts`)
- **Dynamic Offer Creation**: Based on user profile and preferences
- **Provider Filtering**: Only shows providers available in user's canton
- **Supplementary Insurance Matching**: Generates options based on user preferences:
  - Ambulatory care
  - Hospital insurance (semi-private, private, flex)
  - Complementary medicine
  - Dental coverage
  - International coverage
  - Glasses/contact lenses
- **Multiple Model Support**: Generates offers for each preferred insurance model
- **Budget Optimization**: Creates alternative franchise options for budget-conscious users
- **Savings Calculation**: Compares with current insurance

### 3. Offer Comparison (`/src/utils/offerComparison.ts`)
- **Multi-criteria Scoring**:
  - Price (value for money)
  - Coverage completeness
  - Provider quality (ratings)
  - Model flexibility
- **Weighted Comparison**: Customizable criteria weights
- **Direct Comparison**: Side-by-side comparison of two offers
- **Similar Offer Detection**: Finds comparable alternatives
- **Comparison Summary**: Statistical overview of all offers

### 4. Recommendation Engine (`/src/utils/recommendationEngine.ts`)
- **User Priority Detection**: Automatically adjusts criteria based on user profile:
  - Budget-conscious users: Price weight increased
  - Health-conscious users: Provider quality prioritized
  - Coverage seekers: Coverage completeness emphasized
- **Recommendation Reasons**: Clear explanations for each recommendation
- **Suitability Levels**: Excellent, Good, Fair, Poor
- **Recommendation Sets**:
  - Top recommendation
  - Alternative options
  - Budget option (lowest price with decent coverage)
  - Premium option (best coverage)
- **Personalized Text Generation**: Creates user-friendly recommendation descriptions

## Key Features

### Realistic Premium Calculation
- Based on actual Swiss market factors
- Considers all major variables affecting premiums
- Swiss rounding (to nearest 0.05 CHF)
- Accident coverage handling

### Smart Offer Generation
- Respects provider availability by canton
- Matches user preferences intelligently
- Generates appropriate number of alternatives
- Includes savings calculations

### Comprehensive Comparison
- Multiple scoring dimensions
- Customizable weights
- Visual comparison tools
- Statistical summaries

### Intelligent Recommendations
- Adapts to user priorities
- Provides clear reasoning
- Offers multiple recommendation types
- Generates human-readable explanations

## Example Usage

```typescript
// Generate offers for a user
const offers = generateInsuranceOffers({
  userProfile: userProfile,
  numberOfOffers: 8,
  includeCurrentProvider: false
});

// Get recommendations
const recommendations = generateRecommendationSet(offers, userProfile);

// Compare offers
const comparison = compareOffers(offers, userProfile);

// Get recommendation text
const text = generateRecommendationText(
  recommendations.topRecommendation, 
  userProfile
);
```

## Data Sources
- Provider base premiums aligned with Swiss market averages
- Canton factors based on regional price differences
- Model discounts reflect typical market discounts
- Age factors follow standard Swiss insurance pricing

## Next Steps
- Integration with chat flow for dynamic offer presentation
- Addition of more detailed supplementary insurance options
- Provider-specific features and benefits
- Historical premium trend analysis
- Family member management improvements