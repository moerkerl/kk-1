// Mock supplementary insurance products data
import { SupplementaryProduct, SupplementaryCategory, SupplementaryPricing, DetailedAgeGroup } from '../types';

// Helper function to generate age-based pricing
function generateSupplementaryPricing(basePrice: number, category: SupplementaryCategory): SupplementaryPricing {
  const ageGroups: DetailedAgeGroup[] = ['0-18', '19-25', '26-35', '36-45', '46-55', '56-65', '66-75', '76+'];
  
  // Age factors for different categories
  const ageCategoryFactors: Record<SupplementaryCategory, Record<DetailedAgeGroup, number>> = {
    'ambulant': {
      '0-18': 0.4,
      '19-25': 0.6,
      '26-35': 0.9,
      '36-45': 1.15,
      '46-55': 1.5,
      '56-65': 2.05,
      '66-75': 2.75,
      '76+': 3.5
    },
    'hospital': {
      '0-18': 0.3,
      '19-25': 0.5,
      '26-35': 0.85,
      '36-45': 1.45,
      '46-55': 2.25,
      '56-65': 3.6,
      '66-75': 5.75,
      '76+': 7.5
    },
    'dental': {
      '0-18': 1.2,
      '19-25': 0.8,
      '26-35': 0.95,
      '36-45': 1.15,
      '46-55': 1.35,
      '56-65': 1.55,
      '66-75': 1.75,
      '76+': 1.9
    },
    'travel': {
      '0-18': 0.5,
      '19-25': 0.8,
      '26-35': 1.0,
      '36-45': 1.0,
      '46-55': 1.15,
      '56-65': 1.4,
      '66-75': 1.85,
      '76+': 2.2
    },
    'prevention': {
      '0-18': 0.6,
      '19-25': 0.8,
      '26-35': 0.95,
      '36-45': 1.0,
      '46-55': 1.0,
      '56-65': 1.0,
      '66-75': 1.0,
      '76+': 1.0
    },
    'combined': {
      '0-18': 0.5,
      '19-25': 0.7,
      '26-35': 0.925,
      '36-45': 1.225,
      '46-55': 1.625,
      '56-65': 2.3,
      '66-75': 3.4,
      '76+': 4.3
    },
    'alternative_medicine': {
      '0-18': 0.4,
      '19-25': 0.6,
      '26-35': 0.8,
      '36-45': 1.0,
      '46-55': 1.2,
      '56-65': 1.5,
      '66-75': 1.8,
      '76+': 2.2
    },
    'spital': {
      '0-18': 0.3,
      '19-25': 0.5,
      '26-35': 0.85,
      '36-45': 1.45,
      '46-55': 2.25,
      '56-65': 3.6,
      '66-75': 5.75,
      '76+': 7.5
    },
    'komplementaer': {
      '0-18': 0.4,
      '19-25': 0.6,
      '26-35': 0.8,
      '36-45': 1.0,
      '46-55': 1.2,
      '56-65': 1.5,
      '66-75': 1.8,
      '76+': 2.2
    },
    'zahn': {
      '0-18': 1.2,
      '19-25': 0.8,
      '26-35': 0.95,
      '36-45': 1.15,
      '46-55': 1.35,
      '56-65': 1.55,
      '66-75': 1.75,
      '76+': 1.9
    },
    'ausland': {
      '0-18': 0.5,
      '19-25': 0.8,
      '26-35': 1.0,
      '36-45': 1.0,
      '46-55': 1.15,
      '56-65': 1.4,
      '66-75': 1.85,
      '76+': 2.2
    },
    'brille': {
      '0-18': 0.8,
      '19-25': 0.9,
      '26-35': 1.0,
      '36-45': 1.1,
      '46-55': 1.2,
      '56-65': 1.3,
      '66-75': 1.4,
      '76+': 1.5
    }
  };
  
  const factors = ageCategoryFactors[category] || ageCategoryFactors['ambulant'];
  const baseRates: Record<DetailedAgeGroup, number> = {} as Record<DetailedAgeGroup, number>;
  
  for (const ageGroup of ageGroups) {
    baseRates[ageGroup] = Math.round(basePrice * factors[ageGroup]);
  }
  
  return {
    baseRates,
    riskFactors: {
      smoker: 1.2,
      preExistingConditions: 1.5,
      occupation: {
        'office': 1.0,
        'manual': 1.3,
        'high_risk': 1.8
      }
    }
  };
}

export const mockSupplementaryProducts: SupplementaryProduct[] = [
  // CSS Supplementary Products
  {
    id: 'css-ambulant-myflex',
    providerId: 'css',
    name: 'CSS Ambulant myFlex Balance',
    category: 'ambulant',
    description: 'Erweiterte ambulante Leistungen mit flexibler Deckung',
    coverages: [
      {
        type: 'medications_non_listed',
        description: 'Nicht-kassenpflichtige Medikamente',
        maxAmount: 'unlimited',
        percentage: 90,
      },
      {
        type: 'glasses_contacts',
        description: 'Brillen und Kontaktlinsen',
        maxAmount: 150,
        percentage: 100,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'alternative_medicine',
        description: 'Komplementärmedizin',
        maxAmount: 3000,
        percentage: 75,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'fitness_wellness',
        description: 'Fitness-Abo',
        maxAmount: 200,
        percentage: 50,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'prevention_checkup',
        description: 'Vorsorgeuntersuchungen',
        maxAmount: 500,
        percentage: 90,
        coverageLimit: { per: 'year' }
      }
    ],
    pricing: generateSupplementaryPricing(52, 'ambulant'),
    features: [
      'Weltweiter Notfallschutz',
      'Freie Therapeutenwahl',
      'Keine Wartefristen',
      'Online-Kostenrückerstattung'
    ],
    exclusions: [],
    waitingPeriod: 0
  },
  {
    id: 'css-hospital-flex',
    providerId: 'css',
    name: 'CSS Hospital myFlex',
    category: 'hospital',
    description: 'Flexible Spitalversicherung',
    coverages: [
      {
        type: 'hospital_upgrade',
        description: 'Upgrade auf Halbprivat/Privat',
        maxAmount: 'unlimited',
        percentage: 100,
      },
      {
        type: 'free_doctor_choice',
        description: 'Freie Arztwahl im Spital',
        maxAmount: 'unlimited',
        percentage: 100,
      }
    ],
    pricing: generateSupplementaryPricing(85, 'hospital'),
    features: [
      'Flexible Abteilungswahl',
      'Weltweite Deckung',
      'Keine Selbstbehalte',
      'Rooming-in für Begleitperson'
    ],
    exclusions: [],
    waitingPeriod: 0
  },
  
  // Helsana Supplementary Products
  {
    id: 'helsana-completa',
    providerId: 'helsana',
    name: 'Helsana COMPLETA',
    category: 'combined',
    description: 'Umfassender Zusatzschutz für alle Bereiche',
    coverages: [
      {
        type: 'medications_non_listed',
        description: 'Nicht-kassenpflichtige Medikamente',
        maxAmount: 'unlimited',
        percentage: 90,
      },
      {
        type: 'glasses_contacts',
        description: 'Sehhilfen',
        maxAmount: 300,
        percentage: 90,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'alternative_medicine',
        description: 'Komplementärmedizin',
        maxAmount: 'unlimited',
        percentage: 75,
      },
      {
        type: 'dental_treatment',
        description: 'Zahnbehandlungen',
        maxAmount: 3000,
        percentage: 75,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'transport_rescue',
        description: 'Transport- und Rettungskosten',
        maxAmount: 100000,
        percentage: 100,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'abroad_emergency',
        description: 'Auslandnotfälle',
        maxAmount: 'unlimited',
        percentage: 100,
      }
    ],
    pricing: generateSupplementaryPricing(51, 'combined'),
    features: [
      'All-in-One Lösung',
      'Weltweiter Schutz',
      'Präventionsbeiträge',
      'Familienrabatte'
    ],
    exclusions: [],
    waitingPeriod: 0
  },
  {
    id: 'helsana-hospital-halbprivat',
    providerId: 'helsana',
    name: 'Helsana Hospital Halbprivat',
    category: 'hospital',
    description: 'Halbprivate Spitalversicherung',
    coverages: [
      {
        type: 'hospital_upgrade',
        description: 'Halbprivate Abteilung',
        maxAmount: 'unlimited',
        percentage: 100,
      },
      {
        type: 'free_doctor_choice',
        description: 'Freie Arztwahl',
        maxAmount: 'unlimited',
        percentage: 100,
      }
    ],
    pricing: generateSupplementaryPricing(120, 'hospital'),
    features: [
      '2-Bett-Zimmer',
      'Freie Spitalwahl Schweiz',
      'Oberarztbehandlung',
      'Weltweite Notfalldeckung'
    ],
    exclusions: [],
    waitingPeriod: 0
  },
  
  // SWICA Supplementary Products
  {
    id: 'swica-completa-top',
    providerId: 'swica',
    name: 'SWICA COMPLETA TOP',
    category: 'ambulant',
    description: 'Premium ambulante Zusatzversicherung',
    coverages: [
      {
        type: 'medications_non_listed',
        description: 'Nicht-kassenpflichtige Medikamente',
        maxAmount: 'unlimited',
        percentage: 90,
      },
      {
        type: 'alternative_medicine',
        description: 'Alternativmedizin',
        maxAmount: 'unlimited',
        percentage: 90,
        conditions: ['Max. 80 CHF pro Sitzung']
      },
      {
        type: 'prevention_checkup',
        description: 'Prävention',
        maxAmount: 500,
        percentage: 90,
        coverageLimit: { per: 'period', periodYears: 3 }
      },
      {
        type: 'psychotherapy',
        description: 'Psychotherapie',
        maxAmount: 3000,
        percentage: 90,
        coverageLimit: { per: 'year' }
      }
    ],
    pricing: generateSupplementaryPricing(41, 'ambulant'),
    features: [
      'Höchste Leistungsstufe',
      'Weltweite Deckung',
      'SWICA Gesundheitszentren',
      'Telemedizin inklusive'
    ],
    exclusions: [],
    waitingPeriod: 0
  },
  {
    id: 'swica-praeventa',
    providerId: 'swica',
    name: 'SWICA COMPLETA PRAEVENTA',
    category: 'prevention',
    description: 'Prävention und Gesundheitsförderung',
    coverages: [
      {
        type: 'fitness_wellness',
        description: 'Fitness und Wellness',
        maxAmount: 500,
        percentage: 50,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'prevention_checkup',
        description: 'Check-ups',
        maxAmount: 500,
        percentage: 90,
        coverageLimit: { per: 'period', periodYears: 3 }
      }
    ],
    pricing: generateSupplementaryPricing(14, 'prevention'),
    features: [
      'Gesundheitsförderung',
      'Präventionskurse',
      'Ernährungsberatung',
      'Bewegungsprogramme'
    ],
    exclusions: [],
    waitingPeriod: 0
  },
  
  // Visana Supplementary Products
  {
    id: 'visana-ambulant-ii',
    providerId: 'visana',
    name: 'Visana Ambulant II',
    category: 'ambulant',
    description: 'Erweiterte ambulante Leistungen',
    coverages: [
      {
        type: 'medications_non_listed',
        description: 'Nicht-kassenpflichtige Medikamente',
        maxAmount: 'unlimited',
        percentage: 90,
      },
      {
        type: 'glasses_contacts',
        description: 'Brillen und Kontaktlinsen',
        maxAmount: 200,
        percentage: 90,
        coverageLimit: { per: 'period', periodYears: 3 }
      },
      {
        type: 'transport_rescue',
        description: 'Rettungs- und Transportkosten',
        maxAmount: 25000,
        percentage: 90,
        coverageLimit: { per: 'year' }
      }
    ],
    pricing: generateSupplementaryPricing(22, 'ambulant'),
    features: [
      'Günstige Prämien',
      'Solide Grunddeckung',
      'Online-Services',
      'Kombinierbar'
    ],
    exclusions: [],
    waitingPeriod: 0
  },
  {
    id: 'visana-complementary-ii',
    providerId: 'visana',
    name: 'Visana Komplementär II',
    category: 'alternative_medicine',
    description: 'Komplementärmedizin-Zusatz',
    coverages: [
      {
        type: 'alternative_medicine',
        description: 'Komplementärmedizinische Behandlungen',
        maxAmount: 4000,
        percentage: 90,
        coverageLimit: { per: 'year' }
      }
    ],
    pricing: generateSupplementaryPricing(33, 'alternative_medicine'),
    features: [
      'Breite Methodenauswahl',
      'Anerkannte Therapeuten',
      'Keine Überweisung nötig',
      'Hohe Limite'
    ],
    exclusions: [],
    waitingPeriod: 0
  },
  
  // Concordia Supplementary Products
  {
    id: 'concordia-natura',
    providerId: 'concordia',
    name: 'CONCORDIA natura',
    category: 'alternative_medicine',
    description: 'Naturheilkunde und Komplementärmedizin',
    coverages: [
      {
        type: 'alternative_medicine',
        description: 'Komplementärmedizin',
        maxAmount: 'unlimited',
        percentage: 100,
        conditions: ['Anerkannte Methoden und Therapeuten']
      }
    ],
    pricing: generateSupplementaryPricing(38, 'alternative_medicine'),
    features: [
      'Unbegrenzte Deckung',
      '100% Kostenübernahme',
      'Grosse Therapeutenauswahl',
      'Naturheilmittel inklusive'
    ],
    exclusions: [],
    waitingPeriod: 0
  },
  {
    id: 'concordia-diversa-plus',
    providerId: 'concordia',
    name: 'CONCORDIA DIVERSA plus',
    category: 'combined',
    description: 'Umfassende Zusatzversicherung',
    coverages: [
      {
        type: 'medications_non_listed',
        description: 'Nicht-kassenpflichtige Medikamente',
        maxAmount: 'unlimited',
        percentage: 90,
      },
      {
        type: 'glasses_contacts',
        description: 'Sehhilfen',
        maxAmount: 300,
        percentage: 100,
        coverageLimit: { per: 'period', periodYears: 2 }
      },
      {
        type: 'dental_treatment',
        description: 'Zahnbehandlung',
        maxAmount: 1000,
        percentage: 50,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'fitness_wellness',
        description: 'Fitness und Prävention',
        maxAmount: 200,
        percentage: 50,
        coverageLimit: { per: 'year' }
      }
    ],
    pricing: generateSupplementaryPricing(45, 'combined'),
    features: [
      'Vielseitige Leistungen',
      'Familienfreundlich',
      'Präventionsfokus',
      'Einfache Abwicklung'
    ],
    exclusions: [],
    waitingPeriod: 0
  },
  
  // Sanitas Supplementary Products
  {
    id: 'sanitas-classic',
    providerId: 'sanitas',
    name: 'Sanitas Classic',
    category: 'ambulant',
    description: 'Klassische ambulante Zusatzversicherung',
    coverages: [
      {
        type: 'medications_non_listed',
        description: 'Nicht-kassenpflichtige Medikamente',
        maxAmount: 'unlimited',
        percentage: 90,
      },
      {
        type: 'glasses_contacts',
        description: 'Brillen und Kontaktlinsen',
        maxAmount: 300,
        percentage: 100,
        coverageLimit: { per: 'period', periodYears: 3 }
      },
      {
        type: 'alternative_medicine',
        description: 'Komplementärmedizin',
        maxAmount: 5000,
        percentage: 80,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'prevention_checkup',
        description: 'Vorsorge und Check-ups',
        maxAmount: 1000,
        percentage: 80,
        coverageLimit: { per: 'year' }
      }
    ],
    pricing: generateSupplementaryPricing(43, 'ambulant'),
    features: [
      'Digitale Services',
      'Sanitas App',
      'Gesundheitscoach',
      'Bonusprogramm'
    ],
    exclusions: [],
    waitingPeriod: 0
  },
  {
    id: 'sanitas-dental',
    providerId: 'sanitas',
    name: 'Sanitas Dental',
    category: 'dental',
    description: 'Zahnversicherung',
    coverages: [
      {
        type: 'dental_treatment',
        description: 'Zahnbehandlungen',
        maxAmount: 5000,
        percentage: 75,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'dental_correction',
        description: 'Zahnstellungskorrekturen',
        maxAmount: 10000,
        percentage: 75,
        coverageLimit: { per: 'lifetime' },
        conditions: ['Bis 20 Jahre']
      }
    ],
    pricing: generateSupplementaryPricing(25, 'dental'),
    features: [
      'Hohe Leistungen',
      'Kieferorthopädie',
      'Prophylaxe inklusive',
      'Keine Wartezeiten für Kinder'
    ],
    exclusions: [],
    waitingPeriod: 0
  },
  
  // Atupri Supplementary Products
  {
    id: 'atupri-mivita-reala',
    providerId: 'atupri',
    name: 'Atupri Mivita Reala',
    category: 'ambulant',
    description: 'Digitale Zusatzversicherung',
    coverages: [
      {
        type: 'medications_non_listed',
        description: 'Nicht-kassenpflichtige Medikamente',
        maxAmount: 'unlimited',
        percentage: 90,
      },
      {
        type: 'glasses_contacts',
        description: 'Brillen und Kontaktlinsen',
        maxAmount: 300,
        percentage: 50,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'alternative_medicine',
        description: 'Komplementärmedizin',
        maxAmount: 1500,
        percentage: 50,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'fitness_wellness',
        description: 'Fitness-Abo',
        maxAmount: 200,
        percentage: 50,
        coverageLimit: { per: 'year' }
      }
    ],
    pricing: generateSupplementaryPricing(27, 'ambulant'),
    features: [
      '100% digital',
      'Atupri App',
      'Sofortentscheid',
      'Einfache Einreichung'
    ],
    exclusions: [],
    waitingPeriod: 0
  },
  
  // Assura Supplementary Products
  {
    id: 'assura-complementa-extra',
    providerId: 'assura',
    name: 'Assura Complementa Extra',
    category: 'ambulant',
    description: 'Günstige Basisdeckung',
    coverages: [
      {
        type: 'medications_non_listed',
        description: 'Lebenswichtige Medikamente',
        maxAmount: 50000,
        percentage: 90,
        coverageLimit: { per: 'lifetime' },
        conditions: ['Nur lebenswichtige Medikamente ohne Alternative']
      },
      {
        type: 'glasses_contacts',
        description: 'Sehhilfen',
        maxAmount: 100,
        percentage: 100,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'transport_rescue',
        description: 'Transporte',
        maxAmount: 20000,
        percentage: 100,
        coverageLimit: { per: 'case' }
      }
    ],
    pricing: generateSupplementaryPricing(14, 'ambulant'),
    features: [
      'Sehr günstig',
      'Basisschutz',
      'Einfache Leistungen',
      'Schnelle Abwicklung'
    ],
    exclusions: [],
    waitingPeriod: 0
  },
  {
    id: 'assura-natura',
    providerId: 'assura',
    name: 'Assura Natura',
    category: 'alternative_medicine',
    description: 'Komplementärmedizin-Zusatz',
    coverages: [
      {
        type: 'alternative_medicine',
        description: 'Naturheilverfahren',
        maxAmount: 110,
        percentage: 90,
        coverageLimit: { per: 'case' },
        deductible: 200,
        conditions: ['Max. 12 Sitzungen pro Jahr']
      }
    ],
    pricing: generateSupplementaryPricing(17, 'alternative_medicine'),
    features: [
      'Günstige Alternative',
      'Breite Methodenauswahl',
      'Anerkannte Therapeuten',
      'Medikamente inklusive'
    ],
    exclusions: [],
    waitingPeriod: 0
  },
  
  // Groupe Mutuel Supplementary Products
  {
    id: 'gm-optimum',
    providerId: 'groupemutuel',
    name: 'Groupe Mutuel Optimum',
    category: 'combined',
    description: 'Premium Zusatzversicherung',
    coverages: [
      {
        type: 'medications_non_listed',
        description: 'Nicht-kassenpflichtige Medikamente',
        maxAmount: 'unlimited',
        percentage: 90,
      },
      {
        type: 'glasses_contacts',
        description: 'Brillen und Kontaktlinsen',
        maxAmount: 250,
        percentage: 100,
        coverageLimit: { per: 'period', periodYears: 3 }
      },
      {
        type: 'alternative_medicine',
        description: 'Komplementärmedizin',
        maxAmount: 3000,
        percentage: 75,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'dental_treatment',
        description: 'Zahnbehandlung',
        maxAmount: 500,
        percentage: 75,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'prevention_checkup',
        description: 'Vorsorge',
        maxAmount: 1200,
        percentage: 90,
        coverageLimit: { per: 'period', periodYears: 3 }
      }
    ],
    pricing: generateSupplementaryPricing(56, 'combined'),
    features: [
      'Umfassende Deckung',
      'Hohe Leistungen',
      'Weltweiter Schutz',
      'Assistance-Leistungen'
    ],
    exclusions: [],
    waitingPeriod: 0
  },
  {
    id: 'gm-mundo',
    providerId: 'groupemutuel',
    name: 'Groupe Mutuel Mundo',
    category: 'travel',
    description: 'Reiseversicherung',
    coverages: [
      {
        type: 'abroad_emergency',
        description: 'Auslandnotfälle',
        maxAmount: 100000,
        percentage: 100,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'abroad_repatriation',
        description: 'Rückführung',
        maxAmount: 'unlimited',
        percentage: 100,
      }
    ],
    pricing: generateSupplementaryPricing(5, 'travel'),
    features: [
      'Weltweite Deckung',
      'Notfall-Hotline 24/7',
      'Rückführung inklusive',
      'Gepäckversicherung'
    ],
    exclusions: [],
    waitingPeriod: 0
  },
  
  // KPT Supplementary Products
  {
    id: 'kpt-comfort',
    providerId: 'kpt',
    name: 'KPT Krankenpflege-Comfort',
    category: 'ambulant',
    description: 'Komfort-Zusatzversicherung',
    coverages: [
      {
        type: 'medications_non_listed',
        description: 'Nicht-kassenpflichtige Medikamente',
        maxAmount: 'unlimited',
        percentage: 90,
      },
      {
        type: 'glasses_contacts',
        description: 'Brillen und Kontaktlinsen',
        maxAmount: 200,
        percentage: 100,
        coverageLimit: { per: 'year' },
        waitingPeriod: 365
      },
      {
        type: 'alternative_medicine',
        description: 'Komplementärmedizin',
        maxAmount: 2000,
        percentage: 90,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'prevention_checkup',
        description: 'Vorsorgeuntersuchungen',
        maxAmount: 200,
        percentage: 90,
        coverageLimit: { per: 'year' }
      }
    ],
    pricing: generateSupplementaryPricing(39, 'ambulant'),
    features: [
      'Ausgezeichneter Service',
      'Hohe Kundenzufriedenheit',
      'Persönliche Beratung',
      'Gesundheitsförderung'
    ],
    exclusions: [],
    waitingPeriod: 0
  }
];