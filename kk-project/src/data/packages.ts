// Mock insurance packages data
import { InsurancePackage, Canton } from '../types';

// Helper function to generate package pricing
function generatePackagePricing(
  _basicId: string,
  _supplementaryIds: string[],
  discountPercentage: number
): any {
  // Return pricing structure matching PackagePricing interface
  return {
    baseDiscount: discountPercentage,
    additionalDiscounts: {
      family: 5,
      youngAdult: 10,
      loyalty: 3
    }
  };
}

export const mockPackages: InsurancePackage[] = [
  // CSS Packages
  {
    id: 'css-myFlex-economy',
    providerId: 'css',
    name: 'CSS myFlex Economy',
    description: 'Günstiges Komplettpaket für preisbewusste Versicherte',
    basicInsuranceId: 'css-telmed',
    includedProducts: {
      basicInsurance: 'css-telmed',
      supplementaryInsurances: ['css-ambulant-myflex']
    },
    discountPercentage: 5,
    features: [
      '5% Paketrabatt',
      'Einfache Verwaltung',
      'Eine Rechnung',
      'Koordinierte Leistungen'
    ],
    pricing: generatePackagePricing('css-telmed', ['css-ambulant-myflex'], 5)
  },
  {
    id: 'css-myFlex-balance',
    providerId: 'css',
    name: 'CSS myFlex Balance',
    description: 'Ausgewogenes Paket mit gutem Preis-Leistungs-Verhältnis',
    basicInsuranceId: 'css-hausarzt',
    includedProducts: {
      basicInsurance: 'css-hausarzt',
      supplementaryInsurances: ['css-ambulant-myflex', 'css-hospital-flex']
    },
    discountPercentage: 8,
    features: [
      '8% Paketrabatt',
      'Umfassender Schutz',
      'Flexible Spitalwahl',
      'Premium-Service'
    ],
    pricing: generatePackagePricing('css-hausarzt', ['css-ambulant-myflex', 'css-hospital-flex'], 8)
  },
  
  // Helsana Packages
  {
    id: 'helsana-benefit-starter',
    providerId: 'helsana',
    name: 'Helsana BeneFit Starter',
    description: 'Einsteigerpaket für junge Erwachsene',
    basicInsuranceId: 'helsana-telmed',
    includedProducts: {
      supplementaryInsurances: ['helsana-completa']
    },
    pricing: generatePackagePricing('helsana-telmed', ['helsana-completa'], 7),
    features: [
      '7% Kombirabatt',
      'Ideal für Gesunde',
      'Digitale Services',
      'Präventionsbonus'
    ],
    discountPercentage: 7
  },
  {
    id: 'helsana-benefit-family',
    providerId: 'helsana',
    name: 'Helsana BeneFit Family',
    description: 'Familienpaket mit Kindervergünstigungen',
    basicInsuranceId: 'helsana-hausarzt',
    includedProducts: {
      supplementaryInsurances: ['helsana-completa', 'helsana-hospital-halbprivat']
    },
    pricing: generatePackagePricing('helsana-hausarzt', ['helsana-completa', 'helsana-hospital-halbprivat'], 10),
    features: [
      '10% Familienrabatt',
      'Kinder gratis mitversichert',
      'Familienberatung',
      'Notfall-Hotline 24/7'
    ],
    discountPercentage: 10
  },
  
  // SWICA Packages
  {
    id: 'swica-favorit-active',
    providerId: 'swica',
    name: 'SWICA FAVORIT Active',
    description: 'Für aktive und gesundheitsbewusste Menschen',
    basicInsuranceId: 'swica-telmed',
    includedProducts: {
      supplementaryInsurances: ['swica-completa-top', 'swica-praeventa']
    },
    pricing: generatePackagePricing('swica-telmed', ['swica-completa-top', 'swica-praeventa'], 12),
    features: [
      '12% Aktivrabatt',
      'Präventionsbonus',
      'Fitness-Partnerschaft',
      'Gesundheitscoaching'
    ],
    discountPercentage: 12
  },
  
  // Visana Packages
  {
    id: 'visana-compact-basic',
    providerId: 'visana',
    name: 'Visana Compact Basic',
    description: 'Kompakte Grundabsicherung',
    basicInsuranceId: 'visana-hausarzt',
    includedProducts: {
      supplementaryInsurances: ['visana-ambulant-ii']
    },
    pricing: generatePackagePricing('visana-hausarzt', ['visana-ambulant-ii'], 6),
    features: [
      '6% Paketrabatt',
      'Einfache Lösung',
      'Online-Verwaltung',
      'Schnelle Rückerstattung'
    ],
    discountPercentage: 6
  },
  {
    id: 'visana-compact-plus',
    providerId: 'visana',
    name: 'Visana Compact Plus',
    description: 'Erweiterte Absicherung mit Komplementärmedizin',
    basicInsuranceId: 'visana-hausarzt',
    includedProducts: {
      supplementaryInsurances: ['visana-ambulant-ii', 'visana-complementary-ii']
    },
    pricing: generatePackagePricing('visana-hausarzt', ['visana-ambulant-ii', 'visana-complementary-ii'], 9),
    features: [
      '9% Kombirabatt',
      'Naturheilkunde inklusive',
      'Therapeuten-Netzwerk',
      'Gesundheits-App'
    ],
    discountPercentage: 9
  },
  
  // Concordia Packages
  {
    id: 'concordia-natura-plus',
    providerId: 'concordia',
    name: 'CONCORDIA natura.plus',
    description: 'Ganzheitliches Gesundheitspaket',
    basicInsuranceId: 'concordia-telmed',
    includedProducts: {
      supplementaryInsurances: ['concordia-natura', 'concordia-diversa-plus']
    },
    pricing: generatePackagePricing('concordia-telmed', ['concordia-natura', 'concordia-diversa-plus'], 15),
    features: [
      '15% Treuerabatt',
      'Unbegrenzte Naturheilkunde',
      'Familienvorteile',
      'Persönlicher Berater'
    ],
    discountPercentage: 15
  },
  
  // Sanitas Packages
  {
    id: 'sanitas-compact',
    providerId: 'sanitas',
    name: 'Sanitas Compact',
    description: 'Digitales Versicherungspaket',
    basicInsuranceId: 'sanitas-telmed',
    includedProducts: {
      supplementaryInsurances: ['sanitas-classic']
    },
    pricing: generatePackagePricing('sanitas-telmed', ['sanitas-classic'], 8),
    features: [
      '8% Digital-Rabatt',
      'Sanitas App Premium',
      'Telemedizin inklusive',
      'Gesundheitscoach'
    ],
    discountPercentage: 8
  },
  {
    id: 'sanitas-family-dental',
    providerId: 'sanitas',
    name: 'Sanitas Family Dental',
    description: 'Familienpaket mit Zahnschutz',
    basicInsuranceId: 'sanitas-standard',
    includedProducts: {
      supplementaryInsurances: ['sanitas-classic', 'sanitas-dental']
    },
    pricing: generatePackagePricing('sanitas-standard', ['sanitas-classic', 'sanitas-dental'], 11),
    features: [
      '11% Familienbonus',
      'Zahnschutz für Kinder',
      'Prophylaxe inklusive',
      'Familienberatung'
    ],
    discountPercentage: 11
  },
  
  // Atupri Packages
  {
    id: 'atupri-digital-native',
    providerId: 'atupri',
    name: 'Atupri Digital Native',
    description: '100% digitales Versicherungspaket',
    basicInsuranceId: 'atupri-telmed',
    includedProducts: {
      supplementaryInsurances: ['atupri-mivita-reala']
    },
    pricing: generatePackagePricing('atupri-telmed', ['atupri-mivita-reala'], 10),
    features: [
      '10% Online-Rabatt',
      'Paperless-Bonus',
      'Instant-Entscheid',
      'App-only Service'
    ],
    discountPercentage: 10
  },
  
  // Assura Packages
  {
    id: 'assura-eco',
    providerId: 'assura',
    name: 'Assura Eco',
    description: 'Preisgünstiges Basispaket',
    basicInsuranceId: 'assura-hausarzt',
    includedProducts: {
      supplementaryInsurances: ['assura-complementa-extra']
    },
    pricing: generatePackagePricing('assura-hausarzt', ['assura-complementa-extra'], 4),
    features: [
      '4% Sparrabatt',
      'Tiefste Prämien',
      'Einfache Abwicklung',
      'Basis-Schutz'
    ],
    discountPercentage: 4
  },
  {
    id: 'assura-eco-natura',
    providerId: 'assura',
    name: 'Assura Eco Natura',
    description: 'Günstiges Paket mit Naturheilkunde',
    basicInsuranceId: 'assura-apotheken',
    includedProducts: {
      supplementaryInsurances: ['assura-complementa-extra', 'assura-natura']
    },
    pricing: generatePackagePricing('assura-apotheken', ['assura-complementa-extra', 'assura-natura'], 6),
    features: [
      '6% Kombirabatt',
      'Alternative Medizin',
      'Apotheken-Modell',
      'Preisvorteil'
    ],
    discountPercentage: 6
  },
  
  // Groupe Mutuel Packages
  {
    id: 'gm-global-protect',
    providerId: 'groupemutuel',
    name: 'Groupe Mutuel Global Protect',
    description: 'Weltweiter Rundumschutz',
    basicInsuranceId: 'gm-standard',
    includedProducts: {
      supplementaryInsurances: ['gm-optimum', 'gm-mundo']
    },
    pricing: generatePackagePricing('gm-standard', ['gm-optimum', 'gm-mundo'], 9),
    features: [
      '9% Globalrabatt',
      'Weltweite Deckung',
      'Reiseversicherung',
      'Multi-Sprachen-Support'
    ],
    discountPercentage: 9
  },
  
  // KPT Packages
  {
    id: 'kpt-win-complete',
    providerId: 'kpt',
    name: 'KPT win.complete',
    description: 'Gewinner-Paket mit Top-Service',
    basicInsuranceId: 'kpt-telmed',
    includedProducts: {
      supplementaryInsurances: ['kpt-comfort']
    },
    pricing: generatePackagePricing('kpt-telmed', ['kpt-comfort'], 7),
    features: [
      '7% Treuerabatt',
      'Award-winning Service',
      'Persönliche Betreuung',
      'Gesundheitsförderung'
    ],
    discountPercentage: 7
  }
];