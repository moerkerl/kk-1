// Mock basic insurance products data
import { BasicInsuranceProduct, Canton, AgeGroup, FranchiseOption, ChildFranchiseOption, InsuranceModel } from '../types';

// Helper function to generate pricing for different cantons and age groups
function generatePricing(
  basePrice: number,
  model: string,
  cantonFactors: Record<Canton, number>
): any {
  const franchises = [300, 500, 1000, 1500, 2000, 2500];
  const ageFactors: Record<AgeGroup, number> = {
    'child': 0.25,
    'young-adult': 0.75,
    'adult': 1.0,
    'senior': 1.5
  };
  
  // Model discount factors
  const modelDiscounts: Record<string, number> = {
    'standard': 0,
    'telmed': 0.07,
    'hausarzt': 0.10,
    'hmo': 0.15,
    'apotheken': 0.12
  };
  
  const modelDiscount = modelDiscounts[model] || 0;
  
  const baseRates: Record<AgeGroup, number> = {
    'child': 0,
    'young-adult': 0,
    'adult': 0,
    'senior': 0
  };
  const franchiseDiscounts: Record<FranchiseOption | ChildFranchiseOption, number> = {
    0: 0,
    100: 0,
    200: 0,
    300: 0,
    400: 0.02,
    500: 0.035,
    600: 0.05,
    1000: 0.12,
    1500: 0.21,
    2000: 0.30,
    2500: 0.38
  };
  
  // Calculate base rates for each age group
  for (const [ageGroup, ageFactor] of Object.entries(ageFactors)) {
    baseRates[ageGroup as AgeGroup] = Math.round(
      basePrice * ageFactor * (1 - modelDiscount)
    );
  }
  
  // Return the pricing structure
  return {
    baseRates,
    franchiseDiscounts,
    cantonFactors,
    accidentCoverageReduction: 30 // CHF reduction if accident coverage through employer
  };
}

// Canton price factors (relative to base price)
const cantonFactors: Record<Canton, number> = {
  'ZH': 1.15,
  'BE': 1.0,
  'LU': 1.05,
  'UR': 0.85,
  'SZ': 0.95,
  'OW': 0.88,
  'NW': 0.87,
  'GL': 0.92,
  'ZG': 1.05,
  'FR': 0.98,
  'SO': 1.02,
  'BS': 1.20,
  'BL': 1.10,
  'SH': 1.08,
  'AR': 0.90,
  'AI': 0.85,
  'SG': 0.98,
  'GR': 0.95,
  'AG': 1.08,
  'TG': 1.0,
  'TI': 1.10,
  'VD': 1.12,
  'VS': 0.93,
  'NE': 1.05,
  'GE': 1.25,
  'JU': 0.95
};

export const mockBasicInsuranceProducts: BasicInsuranceProduct[] = [
  // CSS Products
  {
    id: 'css-standard',
    providerId: 'css',
    name: 'CSS Standard',
    model: 'standard' as InsuranceModel,
    description: 'Freie Arztwahl in der ganzen Schweiz',
    features: ['Freie Arztwahl', 'Direktzugang Gynäkologe', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(380, 'standard', cantonFactors)
  },
  {
    id: 'css-telmed',
    providerId: 'css',
    name: 'CSS Callmed',
    model: 'telmed' as InsuranceModel,
    description: 'Erste Beratung immer telefonisch',
    features: ['24/7 Telemedizin: 0844 277 277', 'Direktzugang Gynäkologe', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(380, 'telmed', cantonFactors)
  },
  {
    id: 'css-hausarzt',
    providerId: 'css',
    name: 'CSS Hausarzt',
    model: 'hausarzt' as InsuranceModel,
    description: 'Ihr Hausarzt als erste Anlaufstelle',
    features: ['Hausarzt erforderlich', 'Direktzugang Gynäkologe', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(380, 'hausarzt', cantonFactors)
  },
  
  // Helsana Products
  {
    id: 'helsana-standard',
    providerId: 'helsana',
    name: 'Helsana Basis',
    model: 'standard' as InsuranceModel,
    description: 'Freie Arztwahl schweizweit',
    features: ['Freie Arztwahl', 'Direktzugang Gynäkologe', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(385, 'standard', cantonFactors)
  },
  {
    id: 'helsana-telmed',
    providerId: 'helsana',
    name: 'Helsana BeneFit PLUS Telmed',
    model: 'telmed' as InsuranceModel,
    description: 'Telefonische Erstberatung mit Rabatten',
    features: ['24/7 Telemedizin: 0800 340 340', 'Direktzugang Gynäkologe', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(385, 'telmed', cantonFactors)
  },
  {
    id: 'helsana-hmo',
    providerId: 'helsana',
    name: 'Helsana BeneFit PLUS HMO',
    model: 'hmo' as InsuranceModel,
    description: 'Behandlung im HMO-Zentrum',
    features: ['HMO-Zentrum', 'Direktzugang Gynäkologe', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(385, 'hmo', cantonFactors)
  },
  
  // SWICA Products
  {
    id: 'swica-standard',
    providerId: 'swica',
    name: 'SWICA FAVORIT',
    model: 'standard' as InsuranceModel,
    description: 'Klassische Grundversicherung',
    features: ['Freie Arztwahl', 'Direktzugang Gynäkologe', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(375, 'standard', cantonFactors)
  },
  {
    id: 'swica-telmed',
    providerId: 'swica',
    name: 'SWICA FAVORIT TELMED',
    model: 'telmed' as InsuranceModel,
    description: 'Mit telefonischer Gesundheitsberatung',
    features: ['24/7 Telemedizin: 0800 80 90 80', 'Direktzugang Gynäkologe', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(375, 'telmed', cantonFactors)
  },
  
  // Visana Products
  {
    id: 'visana-standard',
    providerId: 'visana',
    name: 'Visana Basic',
    model: 'standard' as InsuranceModel,
    description: 'Grundversicherung mit freier Arztwahl',
    features: ['Freie Arztwahl', 'Direktzugang Gynäkologe', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(370, 'standard', cantonFactors)
  },
  {
    id: 'visana-hausarzt',
    providerId: 'visana',
    name: 'Visana Managed Care Hausarzt',
    model: 'hausarzt' as InsuranceModel,
    description: 'Mit Ihrem Hausarzt als Vertrauensperson',
    features: ['Hausarzt erforderlich', 'Direktzugang Gynäkologe', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(370, 'hausarzt', cantonFactors)
  },
  
  // Concordia Products
  {
    id: 'concordia-standard',
    providerId: 'concordia',
    name: 'CONCORDIA Standard',
    model: 'standard' as InsuranceModel,
    description: 'Bewährte Grundversicherung',
    features: ['Freie Arztwahl', 'Direktzugang Gynäkologe', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(365, 'standard', cantonFactors)
  },
  {
    id: 'concordia-telmed',
    providerId: 'concordia',
    name: 'CONCORDIA myDoc',
    model: 'telmed' as InsuranceModel,
    description: 'Digitale Erstberatung mit myDoc App',
    features: ['24/7 Telemedizin: myDoc App', 'Direktzugang Gynäkologe', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(365, 'telmed', cantonFactors)
  },
  
  // Sanitas Products
  {
    id: 'sanitas-standard',
    providerId: 'sanitas',
    name: 'Sanitas Basic',
    model: 'standard' as InsuranceModel,
    description: 'Grundversicherung ohne Einschränkungen',
    features: ['Freie Arztwahl', 'Direktzugang Gynäkologe', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(390, 'standard', cantonFactors)
  },
  {
    id: 'sanitas-telmed',
    providerId: 'sanitas',
    name: 'Sanitas CallMed',
    model: 'telmed' as InsuranceModel,
    description: 'Erste Anlaufstelle per Telefon',
    features: ['24/7 Telemedizin: 0844 124 365', 'Direktzugang Gynäkologe', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(390, 'telmed', cantonFactors)
  },
  
  // Atupri Products
  {
    id: 'atupri-standard',
    providerId: 'atupri',
    name: 'Atupri Basic',
    model: 'standard' as InsuranceModel,
    description: 'Einfache Grundversicherung',
    features: ['Freie Arztwahl', 'Direktzugang Gynäkologe', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(355, 'standard', cantonFactors)
  },
  {
    id: 'atupri-telmed',
    providerId: 'atupri',
    name: 'Atupri TelFirst',
    model: 'telmed' as InsuranceModel,
    description: 'Digital first - Beratung per App',
    features: ['24/7 Telemedizin: Atupri App', 'Direktzugang Gynäkologe', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(355, 'telmed', cantonFactors)
  },
  
  // Assura Products
  {
    id: 'assura-standard',
    providerId: 'assura',
    name: 'Assura Basis',
    model: 'standard' as InsuranceModel,
    description: 'Günstige Grundversicherung',
    features: ['Freie Arztwahl', 'Direktzugang Gynäkologe', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(340, 'standard', cantonFactors)
  },
  {
    id: 'assura-hausarzt',
    providerId: 'assura',
    name: 'Assura Médecin de famille',
    model: 'hausarzt' as InsuranceModel,
    description: 'Mit Hausarzt als Koordinator',
    features: ['Hausarzt erforderlich', 'Direktzugang Gynäkologe', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(340, 'hausarzt', cantonFactors)
  },
  {
    id: 'assura-apotheken',
    providerId: 'assura',
    name: 'Assura PharMed',
    model: 'apotheken' as InsuranceModel,
    description: 'Erste Anlaufstelle in der Apotheke',
    features: ['Partner-Apotheken: Amavita, Sun Store, Coop Vitality', '24/7 Telemedizin: 0800 277 872', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(340, 'apotheken', cantonFactors)
  },
  
  // Groupe Mutuel Products
  {
    id: 'gm-standard',
    providerId: 'groupemutuel',
    name: 'Groupe Mutuel Global',
    model: 'standard' as InsuranceModel,
    description: 'Klassische Grundversicherung',
    features: ['Freie Arztwahl', 'Direktzugang Gynäkologe', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(360, 'standard', cantonFactors)
  },
  {
    id: 'gm-telmed',
    providerId: 'groupemutuel',
    name: 'Groupe Mutuel PrimaTel',
    model: 'telmed' as InsuranceModel,
    description: 'Telemedizin-Modell mit Beratung',
    features: ['24/7 Telemedizin: 0800 808 848', 'Direktzugang Gynäkologe', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(360, 'telmed', cantonFactors)
  },
  
  // KPT Products
  {
    id: 'kpt-standard',
    providerId: 'kpt',
    name: 'KPT win.doc',
    model: 'standard' as InsuranceModel,
    description: 'Volle Wahlfreiheit beim Arzt',
    features: ['Freie Arztwahl', 'Direktzugang Gynäkologe', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(395, 'standard', cantonFactors)
  },
  {
    id: 'kpt-telmed',
    providerId: 'kpt',
    name: 'KPT win.call',
    model: 'telmed' as InsuranceModel,
    description: 'Telefonische Beratung rund um die Uhr',
    features: ['24/7 Telemedizin: 0800 069 777', 'Direktzugang Gynäkologe', 'Notfall-Ausnahmen'],
    availableInCantons: Object.keys(cantonFactors) as Canton[],
    pricing: generatePricing(395, 'telmed', cantonFactors)
  }
];