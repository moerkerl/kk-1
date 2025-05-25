// Mock basic insurance products data
import { BasicInsuranceProduct, BasicInsurancePricing, Canton, AgeGroup } from '../types';

// Helper function to generate pricing for different cantons and age groups
function generatePricing(
  basePrice: number,
  model: string,
  cantonFactors: Record<Canton, number>
): BasicInsurancePricing[] {
  const pricing: BasicInsurancePricing[] = [];
  const franchises = [300, 500, 1000, 1500, 2000, 2500];
  const ageFactors: Record<AgeGroup, number> = {
    'child': 0.25,
    'young_adult': 0.75,
    'adult': 1.0
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
  
  for (const [canton, cantonFactor] of Object.entries(cantonFactors)) {
    for (const [ageGroup, ageFactor] of Object.entries(ageFactors)) {
      for (const franchise of franchises) {
        // Skip high franchises for children
        if (ageGroup === 'child' && franchise > 600) continue;
        
        // Calculate franchise discount
        let franchiseDiscount = 0;
        switch (franchise) {
          case 500: franchiseDiscount = 0.035; break;
          case 1000: franchiseDiscount = 0.12; break;
          case 1500: franchiseDiscount = 0.21; break;
          case 2000: franchiseDiscount = 0.30; break;
          case 2500: franchiseDiscount = 0.38; break;
        }
        
        const monthlyPremium = Math.round(
          basePrice * cantonFactor * ageFactor * (1 - franchiseDiscount) * (1 - modelDiscount)
        );
        
        pricing.push({
          canton: canton as Canton,
          ageGroup: ageGroup as AgeGroup,
          franchise,
          monthlyPremium,
          yearlyPremium: monthlyPremium * 12,
          maxDiscount: Math.round((modelDiscount + franchiseDiscount) * 100)
        });
      }
    }
  }
  
  return pricing;
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
    model: 'standard',
    description: 'Freie Arztwahl in der ganzen Schweiz',
    pricing: generatePricing(380, 'standard', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: false,
      doctorListAvailable: false,
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  },
  {
    id: 'css-telmed',
    providerId: 'css',
    name: 'CSS Callmed',
    model: 'telmed',
    description: 'Erste Beratung immer telefonisch',
    pricing: generatePricing(380, 'telmed', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: false,
      doctorListAvailable: false,
      telemedHotline: '0844 277 277',
      telemedAvailable24_7: true,
      telemedLanguages: ['de', 'fr', 'it', 'en'],
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  },
  {
    id: 'css-hausarzt',
    providerId: 'css',
    name: 'CSS Hausarzt',
    model: 'hausarzt',
    description: 'Ihr Hausarzt als erste Anlaufstelle',
    pricing: generatePricing(380, 'hausarzt', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: true,
      doctorListAvailable: true,
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  },
  
  // Helsana Products
  {
    id: 'helsana-standard',
    providerId: 'helsana',
    name: 'Helsana Basis',
    model: 'standard',
    description: 'Freie Arztwahl schweizweit',
    pricing: generatePricing(385, 'standard', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: false,
      doctorListAvailable: false,
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  },
  {
    id: 'helsana-telmed',
    providerId: 'helsana',
    name: 'Helsana BeneFit PLUS Telmed',
    model: 'telmed',
    description: 'Telefonische Erstberatung mit Rabatten',
    pricing: generatePricing(385, 'telmed', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: false,
      doctorListAvailable: false,
      telemedHotline: '0800 340 340',
      telemedAvailable24_7: true,
      telemedLanguages: ['de', 'fr', 'it'],
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  },
  {
    id: 'helsana-hmo',
    providerId: 'helsana',
    name: 'Helsana BeneFit PLUS HMO',
    model: 'hmo',
    description: 'Behandlung im HMO-Zentrum',
    pricing: generatePricing(385, 'hmo', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: false,
      doctorListAvailable: false,
      hmoCenter: 'Helsana HMO-Zentren',
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  },
  
  // SWICA Products
  {
    id: 'swica-standard',
    providerId: 'swica',
    name: 'SWICA FAVORIT',
    model: 'standard',
    description: 'Klassische Grundversicherung',
    pricing: generatePricing(375, 'standard', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: false,
      doctorListAvailable: false,
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  },
  {
    id: 'swica-telmed',
    providerId: 'swica',
    name: 'SWICA FAVORIT TELMED',
    model: 'telmed',
    description: 'Mit telefonischer Gesundheitsberatung',
    pricing: generatePricing(375, 'telmed', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: false,
      doctorListAvailable: false,
      telemedHotline: '0800 80 90 80',
      telemedAvailable24_7: true,
      telemedLanguages: ['de', 'fr', 'it', 'en'],
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  },
  
  // Visana Products
  {
    id: 'visana-standard',
    providerId: 'visana',
    name: 'Visana Basic',
    model: 'standard',
    description: 'Grundversicherung mit freier Arztwahl',
    pricing: generatePricing(370, 'standard', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: false,
      doctorListAvailable: false,
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  },
  {
    id: 'visana-hausarzt',
    providerId: 'visana',
    name: 'Visana Managed Care Hausarzt',
    model: 'hausarzt',
    description: 'Mit Ihrem Hausarzt als Vertrauensperson',
    pricing: generatePricing(370, 'hausarzt', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: true,
      doctorListAvailable: true,
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  },
  
  // Concordia Products
  {
    id: 'concordia-standard',
    providerId: 'concordia',
    name: 'CONCORDIA Standard',
    model: 'standard',
    description: 'Bewährte Grundversicherung',
    pricing: generatePricing(365, 'standard', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: false,
      doctorListAvailable: false,
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  },
  {
    id: 'concordia-telmed',
    providerId: 'concordia',
    name: 'CONCORDIA myDoc',
    model: 'telmed',
    description: 'Digitale Erstberatung mit myDoc App',
    pricing: generatePricing(365, 'telmed', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: false,
      doctorListAvailable: false,
      telemedHotline: 'myDoc App',
      telemedAvailable24_7: true,
      telemedLanguages: ['de', 'fr', 'it'],
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  },
  
  // Sanitas Products
  {
    id: 'sanitas-standard',
    providerId: 'sanitas',
    name: 'Sanitas Basic',
    model: 'standard',
    description: 'Grundversicherung ohne Einschränkungen',
    pricing: generatePricing(390, 'standard', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: false,
      doctorListAvailable: false,
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  },
  {
    id: 'sanitas-telmed',
    providerId: 'sanitas',
    name: 'Sanitas CallMed',
    model: 'telmed',
    description: 'Erste Anlaufstelle per Telefon',
    pricing: generatePricing(390, 'telmed', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: false,
      doctorListAvailable: false,
      telemedHotline: '0844 124 365',
      telemedAvailable24_7: true,
      telemedLanguages: ['de', 'fr', 'it', 'en'],
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  },
  
  // Atupri Products
  {
    id: 'atupri-standard',
    providerId: 'atupri',
    name: 'Atupri Basic',
    model: 'standard',
    description: 'Einfache Grundversicherung',
    pricing: generatePricing(355, 'standard', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: false,
      doctorListAvailable: false,
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  },
  {
    id: 'atupri-telmed',
    providerId: 'atupri',
    name: 'Atupri TelFirst',
    model: 'telmed',
    description: 'Digital first - Beratung per App',
    pricing: generatePricing(355, 'telmed', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: false,
      doctorListAvailable: false,
      telemedHotline: 'Atupri App',
      telemedAvailable24_7: true,
      telemedLanguages: ['de', 'fr'],
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  },
  
  // Assura Products
  {
    id: 'assura-standard',
    providerId: 'assura',
    name: 'Assura Basis',
    model: 'standard',
    description: 'Günstige Grundversicherung',
    pricing: generatePricing(340, 'standard', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: false,
      doctorListAvailable: false,
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  },
  {
    id: 'assura-hausarzt',
    providerId: 'assura',
    name: 'Assura Médecin de famille',
    model: 'hausarzt',
    description: 'Mit Hausarzt als Koordinator',
    pricing: generatePricing(340, 'hausarzt', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: true,
      doctorListAvailable: true,
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  },
  {
    id: 'assura-apotheken',
    providerId: 'assura',
    name: 'Assura PharMed',
    model: 'apotheken',
    description: 'Erste Anlaufstelle in der Apotheke',
    pricing: generatePricing(340, 'apotheken', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: false,
      doctorListAvailable: false,
      partnerPharmacies: ['Amavita', 'Sun Store', 'Coop Vitality'],
      pharmacyHotline: '0800 277 872',
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  },
  
  // Groupe Mutuel Products
  {
    id: 'gm-standard',
    providerId: 'groupemutuel',
    name: 'Groupe Mutuel Global',
    model: 'standard',
    description: 'Klassische Grundversicherung',
    pricing: generatePricing(360, 'standard', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: false,
      doctorListAvailable: false,
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  },
  {
    id: 'gm-telmed',
    providerId: 'groupemutuel',
    name: 'Groupe Mutuel PrimaTel',
    model: 'telmed',
    description: 'Telemedizin-Modell mit Beratung',
    pricing: generatePricing(360, 'telmed', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: false,
      doctorListAvailable: false,
      telemedHotline: '0800 808 848',
      telemedAvailable24_7: true,
      telemedLanguages: ['de', 'fr', 'it'],
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  },
  
  // KPT Products
  {
    id: 'kpt-standard',
    providerId: 'kpt',
    name: 'KPT win.doc',
    model: 'standard',
    description: 'Volle Wahlfreiheit beim Arzt',
    pricing: generatePricing(395, 'standard', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: false,
      doctorListAvailable: false,
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  },
  {
    id: 'kpt-telmed',
    providerId: 'kpt',
    name: 'KPT win.call',
    model: 'telmed',
    description: 'Telefonische Beratung rund um die Uhr',
    pricing: generatePricing(395, 'telmed', cantonFactors),
    modelFeatures: {
      requiresFamilyDoctor: false,
      doctorListAvailable: false,
      telemedHotline: '0800 069 777',
      telemedAvailable24_7: true,
      telemedLanguages: ['de', 'fr', 'it'],
      emergencyExceptions: true,
      gynecologistDirectAccess: true,
      eyeDoctorDirectAccess: true,
      pediatricianDirectAccess: true
    }
  }
];