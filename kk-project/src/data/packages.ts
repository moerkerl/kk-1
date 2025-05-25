// Mock insurance packages data
import { InsurancePackage, PackagePricing, Canton, DetailedAgeGroup } from '../types';

// Helper function to generate package pricing
function generatePackagePricing(
  basicId: string,
  supplementaryIds: string[],
  discountPercentage: number
): PackagePricing[] {
  const pricing: PackagePricing[] = [];
  
  // Simplified calculation for demo purposes
  const cantons: Canton[] = ['ZH', 'BE', 'BS', 'GE', 'LU'];
  const ageGroups: DetailedAgeGroup[] = ['26-30', '31-35', '36-40', '41-45', '46-50'];
  const franchises = [300, 1000, 2500];
  
  // Base prices for calculation
  const basePrices = {
    basic: 350,
    supplementary: supplementaryIds.length * 45
  };
  
  for (const canton of cantons) {
    for (const ageGroup of ageGroups) {
      for (const franchise of franchises) {
        const basicPremium = basePrices.basic * (franchise === 1000 ? 0.88 : franchise === 2500 ? 0.62 : 1);
        const supplementaryPremium = basePrices.supplementary;
        const totalWithoutPackage = basicPremium + supplementaryPremium;
        const totalWithPackage = totalWithoutPackage * (1 - discountPercentage / 100);
        
        pricing.push({
          canton,
          ageGroup,
          franchise,
          monthlyPremium: Math.round(totalWithPackage),
          monthlyPremiumWithoutPackage: Math.round(totalWithoutPackage),
          monthlySavings: Math.round(totalWithoutPackage - totalWithPackage)
        });
      }
    }
  }
  
  return pricing;
}

export const mockPackages: InsurancePackage[] = [
  // CSS Packages
  {
    id: 'css-myFlex-economy',
    providerId: 'css',
    name: 'CSS myFlex Economy',
    description: 'Günstiges Komplettpaket für preisbewusste Versicherte',
    basicInsuranceId: 'css-telmed',
    supplementaryProductIds: ['css-ambulant-myflex'],
    packagePricing: generatePackagePricing('css-telmed', ['css-ambulant-myflex'], 5),
    packageBenefits: [
      '5% Paketrabatt',
      'Einfache Verwaltung',
      'Eine Rechnung',
      'Koordinierte Leistungen'
    ],
    totalDiscount: 5
  },
  {
    id: 'css-myFlex-balance',
    providerId: 'css',
    name: 'CSS myFlex Balance',
    description: 'Ausgewogenes Paket mit gutem Preis-Leistungs-Verhältnis',
    basicInsuranceId: 'css-hausarzt',
    supplementaryProductIds: ['css-ambulant-myflex', 'css-hospital-flex'],
    packagePricing: generatePackagePricing('css-hausarzt', ['css-ambulant-myflex', 'css-hospital-flex'], 8),
    packageBenefits: [
      '8% Paketrabatt',
      'Umfassender Schutz',
      'Flexible Spitalwahl',
      'Premium-Service'
    ],
    totalDiscount: 8
  },
  
  // Helsana Packages
  {
    id: 'helsana-benefit-starter',
    providerId: 'helsana',
    name: 'Helsana BeneFit Starter',
    description: 'Einsteigerpaket für junge Erwachsene',
    basicInsuranceId: 'helsana-telmed',
    supplementaryProductIds: ['helsana-completa'],
    packagePricing: generatePackagePricing('helsana-telmed', ['helsana-completa'], 7),
    packageBenefits: [
      '7% Kombirabatt',
      'Ideal für Gesunde',
      'Digitale Services',
      'Präventionsbonus'
    ],
    totalDiscount: 7
  },
  {
    id: 'helsana-benefit-family',
    providerId: 'helsana',
    name: 'Helsana BeneFit Family',
    description: 'Familienpaket mit Kindervergünstigungen',
    basicInsuranceId: 'helsana-hausarzt',
    supplementaryProductIds: ['helsana-completa', 'helsana-hospital-halbprivat'],
    packagePricing: generatePackagePricing('helsana-hausarzt', ['helsana-completa', 'helsana-hospital-halbprivat'], 10),
    packageBenefits: [
      '10% Familienrabatt',
      'Kinder gratis mitversichert',
      'Familienberatung',
      'Notfall-Hotline 24/7'
    ],
    totalDiscount: 10
  },
  
  // SWICA Packages
  {
    id: 'swica-favorit-active',
    providerId: 'swica',
    name: 'SWICA FAVORIT Active',
    description: 'Für aktive und gesundheitsbewusste Menschen',
    basicInsuranceId: 'swica-telmed',
    supplementaryProductIds: ['swica-completa-top', 'swica-praeventa'],
    packagePricing: generatePackagePricing('swica-telmed', ['swica-completa-top', 'swica-praeventa'], 12),
    packageBenefits: [
      '12% Aktivrabatt',
      'Präventionsbonus',
      'Fitness-Partnerschaft',
      'Gesundheitscoaching'
    ],
    totalDiscount: 12
  },
  
  // Visana Packages
  {
    id: 'visana-compact-basic',
    providerId: 'visana',
    name: 'Visana Compact Basic',
    description: 'Kompakte Grundabsicherung',
    basicInsuranceId: 'visana-hausarzt',
    supplementaryProductIds: ['visana-ambulant-ii'],
    packagePricing: generatePackagePricing('visana-hausarzt', ['visana-ambulant-ii'], 6),
    packageBenefits: [
      '6% Paketrabatt',
      'Einfache Lösung',
      'Online-Verwaltung',
      'Schnelle Rückerstattung'
    ],
    totalDiscount: 6
  },
  {
    id: 'visana-compact-plus',
    providerId: 'visana',
    name: 'Visana Compact Plus',
    description: 'Erweiterte Absicherung mit Komplementärmedizin',
    basicInsuranceId: 'visana-hausarzt',
    supplementaryProductIds: ['visana-ambulant-ii', 'visana-complementary-ii'],
    packagePricing: generatePackagePricing('visana-hausarzt', ['visana-ambulant-ii', 'visana-complementary-ii'], 9),
    packageBenefits: [
      '9% Kombirabatt',
      'Naturheilkunde inklusive',
      'Therapeuten-Netzwerk',
      'Gesundheits-App'
    ],
    totalDiscount: 9
  },
  
  // Concordia Packages
  {
    id: 'concordia-natura-plus',
    providerId: 'concordia',
    name: 'CONCORDIA natura.plus',
    description: 'Ganzheitliches Gesundheitspaket',
    basicInsuranceId: 'concordia-telmed',
    supplementaryProductIds: ['concordia-natura', 'concordia-diversa-plus'],
    packagePricing: generatePackagePricing('concordia-telmed', ['concordia-natura', 'concordia-diversa-plus'], 15),
    packageBenefits: [
      '15% Treuerabatt',
      'Unbegrenzte Naturheilkunde',
      'Familienvorteile',
      'Persönlicher Berater'
    ],
    totalDiscount: 15
  },
  
  // Sanitas Packages
  {
    id: 'sanitas-compact',
    providerId: 'sanitas',
    name: 'Sanitas Compact',
    description: 'Digitales Versicherungspaket',
    basicInsuranceId: 'sanitas-telmed',
    supplementaryProductIds: ['sanitas-classic'],
    packagePricing: generatePackagePricing('sanitas-telmed', ['sanitas-classic'], 8),
    packageBenefits: [
      '8% Digital-Rabatt',
      'Sanitas App Premium',
      'Telemedizin inklusive',
      'Gesundheitscoach'
    ],
    totalDiscount: 8
  },
  {
    id: 'sanitas-family-dental',
    providerId: 'sanitas',
    name: 'Sanitas Family Dental',
    description: 'Familienpaket mit Zahnschutz',
    basicInsuranceId: 'sanitas-standard',
    supplementaryProductIds: ['sanitas-classic', 'sanitas-dental'],
    packagePricing: generatePackagePricing('sanitas-standard', ['sanitas-classic', 'sanitas-dental'], 11),
    packageBenefits: [
      '11% Familienbonus',
      'Zahnschutz für Kinder',
      'Prophylaxe inklusive',
      'Familienberatung'
    ],
    totalDiscount: 11
  },
  
  // Atupri Packages
  {
    id: 'atupri-digital-native',
    providerId: 'atupri',
    name: 'Atupri Digital Native',
    description: '100% digitales Versicherungspaket',
    basicInsuranceId: 'atupri-telmed',
    supplementaryProductIds: ['atupri-mivita-reala'],
    packagePricing: generatePackagePricing('atupri-telmed', ['atupri-mivita-reala'], 10),
    packageBenefits: [
      '10% Online-Rabatt',
      'Paperless-Bonus',
      'Instant-Entscheid',
      'App-only Service'
    ],
    totalDiscount: 10
  },
  
  // Assura Packages
  {
    id: 'assura-eco',
    providerId: 'assura',
    name: 'Assura Eco',
    description: 'Preisgünstiges Basispaket',
    basicInsuranceId: 'assura-hausarzt',
    supplementaryProductIds: ['assura-complementa-extra'],
    packagePricing: generatePackagePricing('assura-hausarzt', ['assura-complementa-extra'], 4),
    packageBenefits: [
      '4% Sparrabatt',
      'Tiefste Prämien',
      'Einfache Abwicklung',
      'Basis-Schutz'
    ],
    totalDiscount: 4
  },
  {
    id: 'assura-eco-natura',
    providerId: 'assura',
    name: 'Assura Eco Natura',
    description: 'Günstiges Paket mit Naturheilkunde',
    basicInsuranceId: 'assura-apotheken',
    supplementaryProductIds: ['assura-complementa-extra', 'assura-natura'],
    packagePricing: generatePackagePricing('assura-apotheken', ['assura-complementa-extra', 'assura-natura'], 6),
    packageBenefits: [
      '6% Kombirabatt',
      'Alternative Medizin',
      'Apotheken-Modell',
      'Preisvorteil'
    ],
    totalDiscount: 6
  },
  
  // Groupe Mutuel Packages
  {
    id: 'gm-global-protect',
    providerId: 'groupemutuel',
    name: 'Groupe Mutuel Global Protect',
    description: 'Weltweiter Rundumschutz',
    basicInsuranceId: 'gm-standard',
    supplementaryProductIds: ['gm-optimum', 'gm-mundo'],
    packagePricing: generatePackagePricing('gm-standard', ['gm-optimum', 'gm-mundo'], 9),
    packageBenefits: [
      '9% Globalrabatt',
      'Weltweite Deckung',
      'Reiseversicherung',
      'Multi-Sprachen-Support'
    ],
    totalDiscount: 9
  },
  
  // KPT Packages
  {
    id: 'kpt-win-complete',
    providerId: 'kpt',
    name: 'KPT win.complete',
    description: 'Gewinner-Paket mit Top-Service',
    basicInsuranceId: 'kpt-telmed',
    supplementaryProductIds: ['kpt-comfort'],
    packagePricing: generatePackagePricing('kpt-telmed', ['kpt-comfort'], 7),
    packageBenefits: [
      '7% Treuerabatt',
      'Award-winning Service',
      'Persönliche Betreuung',
      'Gesundheitsförderung'
    ],
    totalDiscount: 7
  }
];