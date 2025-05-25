// Central export file for all mock data
export * from './providers';
export * from './basicInsurance';
export * from './supplementaryInsurance';
export * from './packages';
export * from './mockUsers';
export * from './chatTemplates';

// Aggregate data for easy access
import { mockProviders } from './providers';
import { mockBasicInsuranceProducts } from './basicInsurance';
import { mockSupplementaryProducts } from './supplementaryInsurance';
import { mockPackages } from './packages';

// Update providers with their products
export const providers = mockProviders.map(provider => {
  const basicProducts = mockBasicInsuranceProducts.filter(p => p.providerId === provider.id);
  const supplementaryProducts = mockSupplementaryProducts.filter(p => p.providerId === provider.id);
  
  return {
    ...provider,
    basicInsuranceProducts: basicProducts,
    supplementaryProducts: supplementaryProducts
  };
});

// Helper functions for data access
export const getProviderById = (id: string) => providers.find(p => p.id === id);

export const getBasicInsuranceById = (id: string) => mockBasicInsuranceProducts.find(p => p.id === id);

export const getSupplementaryById = (id: string) => mockSupplementaryProducts.find(p => p.id === id);

export const getPackageById = (id: string) => mockPackages.find(p => p.id === id);

export const getProductsByProvider = (providerId: string) => ({
  basic: mockBasicInsuranceProducts.filter(p => p.providerId === providerId),
  supplementary: mockSupplementaryProducts.filter(p => p.providerId === providerId),
  packages: mockPackages.filter(p => p.providerId === providerId)
});

// Canton-specific data
export const cantonNames: Record<string, string> = {
  'AG': 'Aargau',
  'AI': 'Appenzell Innerrhoden',
  'AR': 'Appenzell Ausserrhoden',
  'BE': 'Bern',
  'BL': 'Basel-Landschaft',
  'BS': 'Basel-Stadt',
  'FR': 'Freiburg',
  'GE': 'Genf',
  'GL': 'Glarus',
  'GR': 'Graubünden',
  'JU': 'Jura',
  'LU': 'Luzern',
  'NE': 'Neuenburg',
  'NW': 'Nidwalden',
  'OW': 'Obwalden',
  'SG': 'St. Gallen',
  'SH': 'Schaffhausen',
  'SO': 'Solothurn',
  'SZ': 'Schwyz',
  'TG': 'Thurgau',
  'TI': 'Tessin',
  'UR': 'Uri',
  'VD': 'Waadt',
  'VS': 'Wallis',
  'ZG': 'Zug',
  'ZH': 'Zürich'
};

// Insurance model descriptions
export const insuranceModelDescriptions = {
  'standard': {
    name: 'Standard',
    description: 'Freie Arztwahl - Sie können jeden Arzt in der Schweiz aufsuchen',
    discount: '0%',
    pros: ['Maximale Flexibilität', 'Keine Einschränkungen', 'Direkter Spezialistenzugang'],
    cons: ['Höchste Prämien', 'Kein Sparrabatt']
  },
  'telmed': {
    name: 'Telemedizin',
    description: 'Erste Beratung immer telefonisch durch medizinisches Fachpersonal',
    discount: 'bis zu 20%',
    pros: ['24/7 Verfügbarkeit', 'Keine Wartezeiten', 'Professionelle Beratung'],
    cons: ['Immer zuerst anrufen', 'Nicht für alle geeignet']
  },
  'hausarzt': {
    name: 'Hausarzt-Modell',
    description: 'Ihr Hausarzt ist die erste Anlaufstelle für alle Gesundheitsfragen',
    discount: 'bis zu 15%',
    pros: ['Persönliche Betreuung', 'Koordinierte Behandlung', 'Vertrauensperson'],
    cons: ['Hausarzt muss zuerst konsultiert werden', 'Arztwechsel eingeschränkt']
  },
  'hmo': {
    name: 'HMO',
    description: 'Behandlung in einem HMO-Gesundheitszentrum mit verschiedenen Fachärzten',
    discount: 'bis zu 25%',
    pros: ['Alles unter einem Dach', 'Kurze Wege', 'Höchster Rabatt'],
    cons: ['Standortgebunden', 'Eingeschränkte Zentrenauswahl']
  },
  'apotheken': {
    name: 'Apotheken-Modell',
    description: 'Erste Anlaufstelle ist eine Partnerapotheke für Beratung und Triage',
    discount: 'bis zu 15%',
    pros: ['Niederschwelliger Zugang', 'Lange Öffnungszeiten', 'Kompetente Erstberatung'],
    cons: ['Nur Partnerapotheken', 'Nicht überall verfügbar']
  }
};