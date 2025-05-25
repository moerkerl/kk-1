// Mock supplementary insurance products data
import { SupplementaryProduct, SupplementaryCategory, Coverage, SupplementaryPricing, DetailedAgeGroup } from '../types';

// Helper function to generate age-based pricing
function generateSupplementaryPricing(basePrice: number, category: SupplementaryCategory): SupplementaryPricing[] {
  const pricing: SupplementaryPricing[] = [];
  
  const ageGroups: DetailedAgeGroup[] = ['0-18', '19-25', '26-30', '31-35', '36-40', '41-45', '46-50', '51-55', '56-60', '61-65', '66-70', '71+'];
  
  // Age factors for different categories
  const ageCategoryFactors: Record<SupplementaryCategory, Record<DetailedAgeGroup, number>> = {
    'ambulant': {
      '0-18': 0.4,
      '19-25': 0.6,
      '26-30': 0.8,
      '31-35': 1.0,
      '36-40': 1.1,
      '41-45': 1.2,
      '46-50': 1.4,
      '51-55': 1.6,
      '56-60': 1.9,
      '61-65': 2.2,
      '66-70': 2.5,
      '71+': 3.0
    },
    'hospital': {
      '0-18': 0.3,
      '19-25': 0.5,
      '26-30': 0.7,
      '31-35': 1.0,
      '36-40': 1.3,
      '41-45': 1.6,
      '46-50': 2.0,
      '51-55': 2.5,
      '56-60': 3.2,
      '61-65': 4.0,
      '66-70': 5.0,
      '71+': 6.5
    },
    'dental': {
      '0-18': 1.2,
      '19-25': 0.8,
      '26-30': 0.9,
      '31-35': 1.0,
      '36-40': 1.1,
      '41-45': 1.2,
      '46-50': 1.3,
      '51-55': 1.4,
      '56-60': 1.5,
      '61-65': 1.6,
      '66-70': 1.7,
      '71+': 1.8
    },
    'alternative_medicine': {
      '0-18': 0.5,
      '19-25': 0.7,
      '26-30': 0.9,
      '31-35': 1.0,
      '36-40': 1.1,
      '41-45': 1.15,
      '46-50': 1.2,
      '51-55': 1.25,
      '56-60': 1.3,
      '61-65': 1.35,
      '66-70': 1.4,
      '71+': 1.5
    },
    'travel': {
      '0-18': 0.5,
      '19-25': 0.8,
      '26-30': 1.0,
      '31-35': 1.0,
      '36-40': 1.0,
      '41-45': 1.0,
      '46-50': 1.1,
      '51-55': 1.2,
      '56-60': 1.3,
      '61-65': 1.5,
      '66-70': 1.7,
      '71+': 2.0
    },
    'prevention': {
      '0-18': 0.6,
      '19-25': 0.8,
      '26-30': 0.9,
      '31-35': 1.0,
      '36-40': 1.0,
      '41-45': 1.0,
      '46-50': 1.0,
      '51-55': 1.0,
      '56-60': 1.0,
      '61-65': 1.0,
      '66-70': 1.0,
      '71+': 1.0
    },
    'combined': {
      '0-18': 0.5,
      '19-25': 0.7,
      '26-30': 0.85,
      '31-35': 1.0,
      '36-40': 1.15,
      '41-45': 1.3,
      '46-50': 1.5,
      '51-55': 1.75,
      '56-60': 2.1,
      '61-65': 2.5,
      '66-70': 3.0,
      '71+': 3.8
    }
  };
  
  const factors = ageCategoryFactors[category];
  
  for (const ageGroup of ageGroups) {
    const monthlyPremium = Math.round(basePrice * factors[ageGroup]);
    pricing.push({
      ageGroup,
      monthlyPremium,
      yearlyPremium: monthlyPremium * 12
    });
  }
  
  return pricing;
}

export const mockSupplementaryProducts: SupplementaryProduct[] = [
  // CSS Supplementary Products
  {
    id: 'css-ambulant-myflex',
    providerId: 'css',
    name: 'CSS Ambulant myFlex Balance',
    category: 'ambulant',
    description: 'Erweiterte ambulante Leistungen mit flexibler Deckung',
    coverage: [
      {
        type: 'medications_non_listed',
        description: 'Nicht-kassenpflichtige Medikamente',
        coverageAmount: 'unlimited',
        coveragePercentage: 90,
      },
      {
        type: 'glasses_contacts',
        description: 'Brillen und Kontaktlinsen',
        coverageAmount: 150,
        coveragePercentage: 100,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'alternative_medicine',
        description: 'Komplementärmedizin',
        coverageAmount: 3000,
        coveragePercentage: 75,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'fitness_wellness',
        description: 'Fitness-Abo',
        coverageAmount: 200,
        coveragePercentage: 50,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'prevention_checkup',
        description: 'Vorsorgeuntersuchungen',
        coverageAmount: 500,
        coveragePercentage: 90,
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
    combinationDiscounts: [
      {
        combinedProducts: ['css-hospital-flex'],
        discountPercentage: 10,
        conditions: ['Bei gleichzeitigem Abschluss']
      }
    ]
  },
  {
    id: 'css-hospital-flex',
    providerId: 'css',
    name: 'CSS Hospital myFlex',
    category: 'hospital',
    description: 'Flexible Spitalversicherung',
    coverage: [
      {
        type: 'hospital_upgrade',
        description: 'Upgrade auf Halbprivat/Privat',
        coverageAmount: 'unlimited',
        coveragePercentage: 100,
      },
      {
        type: 'free_doctor_choice',
        description: 'Freie Arztwahl im Spital',
        coverageAmount: 'unlimited',
        coveragePercentage: 100,
      }
    ],
    pricing: generateSupplementaryPricing(85, 'hospital'),
    features: [
      'Flexible Abteilungswahl',
      'Weltweite Deckung',
      'Keine Selbstbehalte',
      'Rooming-in für Begleitperson'
    ]
  },
  
  // Helsana Supplementary Products
  {
    id: 'helsana-completa',
    providerId: 'helsana',
    name: 'Helsana COMPLETA',
    category: 'combined',
    description: 'Umfassender Zusatzschutz für alle Bereiche',
    coverage: [
      {
        type: 'medications_non_listed',
        description: 'Nicht-kassenpflichtige Medikamente',
        coverageAmount: 'unlimited',
        coveragePercentage: 90,
      },
      {
        type: 'glasses_contacts',
        description: 'Sehhilfen',
        coverageAmount: 300,
        coveragePercentage: 90,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'alternative_medicine',
        description: 'Komplementärmedizin',
        coverageAmount: 'unlimited',
        coveragePercentage: 75,
      },
      {
        type: 'dental_treatment',
        description: 'Zahnbehandlungen',
        coverageAmount: 3000,
        coveragePercentage: 75,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'transport_rescue',
        description: 'Transport- und Rettungskosten',
        coverageAmount: 100000,
        coveragePercentage: 100,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'abroad_emergency',
        description: 'Auslandnotfälle',
        coverageAmount: 'unlimited',
        coveragePercentage: 100,
      }
    ],
    pricing: generateSupplementaryPricing(51, 'combined'),
    features: [
      'All-in-One Lösung',
      'Weltweiter Schutz',
      'Präventionsbeiträge',
      'Familienrabatte'
    ]
  },
  {
    id: 'helsana-hospital-halbprivat',
    providerId: 'helsana',
    name: 'Helsana Hospital Halbprivat',
    category: 'hospital',
    description: 'Halbprivate Spitalversicherung',
    coverage: [
      {
        type: 'hospital_upgrade',
        description: 'Halbprivate Abteilung',
        coverageAmount: 'unlimited',
        coveragePercentage: 100,
      },
      {
        type: 'free_doctor_choice',
        description: 'Freie Arztwahl',
        coverageAmount: 'unlimited',
        coveragePercentage: 100,
      }
    ],
    pricing: generateSupplementaryPricing(120, 'hospital'),
    features: [
      '2-Bett-Zimmer',
      'Freie Spitalwahl Schweiz',
      'Oberarztbehandlung',
      'Weltweite Notfalldeckung'
    ]
  },
  
  // SWICA Supplementary Products
  {
    id: 'swica-completa-top',
    providerId: 'swica',
    name: 'SWICA COMPLETA TOP',
    category: 'ambulant',
    description: 'Premium ambulante Zusatzversicherung',
    coverage: [
      {
        type: 'medications_non_listed',
        description: 'Nicht-kassenpflichtige Medikamente',
        coverageAmount: 'unlimited',
        coveragePercentage: 90,
      },
      {
        type: 'alternative_medicine',
        description: 'Alternativmedizin',
        coverageAmount: 'unlimited',
        coveragePercentage: 90,
        conditions: ['Max. 80 CHF pro Sitzung']
      },
      {
        type: 'prevention_checkup',
        description: 'Prävention',
        coverageAmount: 500,
        coveragePercentage: 90,
        coverageLimit: { per: 'period', periodYears: 3 }
      },
      {
        type: 'psychotherapy',
        description: 'Psychotherapie',
        coverageAmount: 3000,
        coveragePercentage: 90,
        coverageLimit: { per: 'year' }
      }
    ],
    pricing: generateSupplementaryPricing(41, 'ambulant'),
    features: [
      'Höchste Leistungsstufe',
      'Weltweite Deckung',
      'SWICA Gesundheitszentren',
      'Telemedizin inklusive'
    ]
  },
  {
    id: 'swica-praeventa',
    providerId: 'swica',
    name: 'SWICA COMPLETA PRAEVENTA',
    category: 'prevention',
    description: 'Prävention und Gesundheitsförderung',
    coverage: [
      {
        type: 'fitness_wellness',
        description: 'Fitness und Wellness',
        coverageAmount: 500,
        coveragePercentage: 50,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'prevention_checkup',
        description: 'Check-ups',
        coverageAmount: 500,
        coveragePercentage: 90,
        coverageLimit: { per: 'period', periodYears: 3 }
      }
    ],
    pricing: generateSupplementaryPricing(14, 'prevention'),
    features: [
      'Gesundheitsförderung',
      'Präventionskurse',
      'Ernährungsberatung',
      'Bewegungsprogramme'
    ]
  },
  
  // Visana Supplementary Products
  {
    id: 'visana-ambulant-ii',
    providerId: 'visana',
    name: 'Visana Ambulant II',
    category: 'ambulant',
    description: 'Erweiterte ambulante Leistungen',
    coverage: [
      {
        type: 'medications_non_listed',
        description: 'Nicht-kassenpflichtige Medikamente',
        coverageAmount: 'unlimited',
        coveragePercentage: 90,
      },
      {
        type: 'glasses_contacts',
        description: 'Brillen und Kontaktlinsen',
        coverageAmount: 200,
        coveragePercentage: 90,
        coverageLimit: { per: 'period', periodYears: 3 }
      },
      {
        type: 'transport_rescue',
        description: 'Rettungs- und Transportkosten',
        coverageAmount: 25000,
        coveragePercentage: 90,
        coverageLimit: { per: 'year' }
      }
    ],
    pricing: generateSupplementaryPricing(22, 'ambulant'),
    features: [
      'Günstige Prämien',
      'Solide Grunddeckung',
      'Online-Services',
      'Kombinierbar'
    ]
  },
  {
    id: 'visana-complementary-ii',
    providerId: 'visana',
    name: 'Visana Komplementär II',
    category: 'alternative_medicine',
    description: 'Komplementärmedizin-Zusatz',
    coverage: [
      {
        type: 'alternative_medicine',
        description: 'Komplementärmedizinische Behandlungen',
        coverageAmount: 4000,
        coveragePercentage: 90,
        coverageLimit: { per: 'year' }
      }
    ],
    pricing: generateSupplementaryPricing(33, 'alternative_medicine'),
    features: [
      'Breite Methodenauswahl',
      'Anerkannte Therapeuten',
      'Keine Überweisung nötig',
      'Hohe Limite'
    ]
  },
  
  // Concordia Supplementary Products
  {
    id: 'concordia-natura',
    providerId: 'concordia',
    name: 'CONCORDIA natura',
    category: 'alternative_medicine',
    description: 'Naturheilkunde und Komplementärmedizin',
    coverage: [
      {
        type: 'alternative_medicine',
        description: 'Komplementärmedizin',
        coverageAmount: 'unlimited',
        coveragePercentage: 100,
        conditions: ['Anerkannte Methoden und Therapeuten']
      }
    ],
    pricing: generateSupplementaryPricing(38, 'alternative_medicine'),
    features: [
      'Unbegrenzte Deckung',
      '100% Kostenübernahme',
      'Grosse Therapeutenauswahl',
      'Naturheilmittel inklusive'
    ]
  },
  {
    id: 'concordia-diversa-plus',
    providerId: 'concordia',
    name: 'CONCORDIA DIVERSA plus',
    category: 'combined',
    description: 'Umfassende Zusatzversicherung',
    coverage: [
      {
        type: 'medications_non_listed',
        description: 'Nicht-kassenpflichtige Medikamente',
        coverageAmount: 'unlimited',
        coveragePercentage: 90,
      },
      {
        type: 'glasses_contacts',
        description: 'Sehhilfen',
        coverageAmount: 300,
        coveragePercentage: 100,
        coverageLimit: { per: 'period', periodYears: 2 }
      },
      {
        type: 'dental_treatment',
        description: 'Zahnbehandlung',
        coverageAmount: 1000,
        coveragePercentage: 50,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'fitness_wellness',
        description: 'Fitness und Prävention',
        coverageAmount: 200,
        coveragePercentage: 50,
        coverageLimit: { per: 'year' }
      }
    ],
    pricing: generateSupplementaryPricing(45, 'combined'),
    features: [
      'Vielseitige Leistungen',
      'Familienfreundlich',
      'Präventionsfokus',
      'Einfache Abwicklung'
    ]
  },
  
  // Sanitas Supplementary Products
  {
    id: 'sanitas-classic',
    providerId: 'sanitas',
    name: 'Sanitas Classic',
    category: 'ambulant',
    description: 'Klassische ambulante Zusatzversicherung',
    coverage: [
      {
        type: 'medications_non_listed',
        description: 'Nicht-kassenpflichtige Medikamente',
        coverageAmount: 'unlimited',
        coveragePercentage: 90,
      },
      {
        type: 'glasses_contacts',
        description: 'Brillen und Kontaktlinsen',
        coverageAmount: 300,
        coveragePercentage: 100,
        coverageLimit: { per: 'period', periodYears: 3 }
      },
      {
        type: 'alternative_medicine',
        description: 'Komplementärmedizin',
        coverageAmount: 5000,
        coveragePercentage: 80,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'prevention_checkup',
        description: 'Vorsorge und Check-ups',
        coverageAmount: 1000,
        coveragePercentage: 80,
        coverageLimit: { per: 'year' }
      }
    ],
    pricing: generateSupplementaryPricing(43, 'ambulant'),
    features: [
      'Digitale Services',
      'Sanitas App',
      'Gesundheitscoach',
      'Bonusprogramm'
    ]
  },
  {
    id: 'sanitas-dental',
    providerId: 'sanitas',
    name: 'Sanitas Dental',
    category: 'dental',
    description: 'Zahnversicherung',
    coverage: [
      {
        type: 'dental_treatment',
        description: 'Zahnbehandlungen',
        coverageAmount: 5000,
        coveragePercentage: 75,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'dental_correction',
        description: 'Zahnstellungskorrekturen',
        coverageAmount: 10000,
        coveragePercentage: 75,
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
    ]
  },
  
  // Atupri Supplementary Products
  {
    id: 'atupri-mivita-reala',
    providerId: 'atupri',
    name: 'Atupri Mivita Reala',
    category: 'ambulant',
    description: 'Digitale Zusatzversicherung',
    coverage: [
      {
        type: 'medications_non_listed',
        description: 'Nicht-kassenpflichtige Medikamente',
        coverageAmount: 'unlimited',
        coveragePercentage: 90,
      },
      {
        type: 'glasses_contacts',
        description: 'Brillen und Kontaktlinsen',
        coverageAmount: 300,
        coveragePercentage: 50,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'alternative_medicine',
        description: 'Komplementärmedizin',
        coverageAmount: 1500,
        coveragePercentage: 50,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'fitness_wellness',
        description: 'Fitness-Abo',
        coverageAmount: 200,
        coveragePercentage: 50,
        coverageLimit: { per: 'year' }
      }
    ],
    pricing: generateSupplementaryPricing(27, 'ambulant'),
    features: [
      '100% digital',
      'Atupri App',
      'Sofortentscheid',
      'Einfache Einreichung'
    ]
  },
  
  // Assura Supplementary Products
  {
    id: 'assura-complementa-extra',
    providerId: 'assura',
    name: 'Assura Complementa Extra',
    category: 'ambulant',
    description: 'Günstige Basisdeckung',
    coverage: [
      {
        type: 'medications_non_listed',
        description: 'Lebenswichtige Medikamente',
        coverageAmount: 50000,
        coveragePercentage: 90,
        coverageLimit: { per: 'lifetime' },
        conditions: ['Nur lebenswichtige Medikamente ohne Alternative']
      },
      {
        type: 'glasses_contacts',
        description: 'Sehhilfen',
        coverageAmount: 100,
        coveragePercentage: 100,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'transport_rescue',
        description: 'Transporte',
        coverageAmount: 20000,
        coveragePercentage: 100,
        coverageLimit: { per: 'case' }
      }
    ],
    pricing: generateSupplementaryPricing(14, 'ambulant'),
    features: [
      'Sehr günstig',
      'Basisschutz',
      'Einfache Leistungen',
      'Schnelle Abwicklung'
    ]
  },
  {
    id: 'assura-natura',
    providerId: 'assura',
    name: 'Assura Natura',
    category: 'alternative_medicine',
    description: 'Komplementärmedizin-Zusatz',
    coverage: [
      {
        type: 'alternative_medicine',
        description: 'Naturheilverfahren',
        coverageAmount: 110,
        coveragePercentage: 90,
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
    ]
  },
  
  // Groupe Mutuel Supplementary Products
  {
    id: 'gm-optimum',
    providerId: 'groupemutuel',
    name: 'Groupe Mutuel Optimum',
    category: 'combined',
    description: 'Premium Zusatzversicherung',
    coverage: [
      {
        type: 'medications_non_listed',
        description: 'Nicht-kassenpflichtige Medikamente',
        coverageAmount: 'unlimited',
        coveragePercentage: 90,
      },
      {
        type: 'glasses_contacts',
        description: 'Brillen und Kontaktlinsen',
        coverageAmount: 250,
        coveragePercentage: 100,
        coverageLimit: { per: 'period', periodYears: 3 }
      },
      {
        type: 'alternative_medicine',
        description: 'Komplementärmedizin',
        coverageAmount: 3000,
        coveragePercentage: 75,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'dental_treatment',
        description: 'Zahnbehandlung',
        coverageAmount: 500,
        coveragePercentage: 75,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'prevention_checkup',
        description: 'Vorsorge',
        coverageAmount: 1200,
        coveragePercentage: 90,
        coverageLimit: { per: 'period', periodYears: 3 }
      }
    ],
    pricing: generateSupplementaryPricing(56, 'combined'),
    features: [
      'Umfassende Deckung',
      'Hohe Leistungen',
      'Weltweiter Schutz',
      'Assistance-Leistungen'
    ]
  },
  {
    id: 'gm-mundo',
    providerId: 'groupemutuel',
    name: 'Groupe Mutuel Mundo',
    category: 'travel',
    description: 'Reiseversicherung',
    coverage: [
      {
        type: 'abroad_emergency',
        description: 'Auslandnotfälle',
        coverageAmount: 100000,
        coveragePercentage: 100,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'abroad_repatriation',
        description: 'Rückführung',
        coverageAmount: 'unlimited',
        coveragePercentage: 100,
      }
    ],
    pricing: generateSupplementaryPricing(5, 'travel'),
    features: [
      'Weltweite Deckung',
      'Notfall-Hotline 24/7',
      'Rückführung inklusive',
      'Gepäckversicherung'
    ]
  },
  
  // KPT Supplementary Products
  {
    id: 'kpt-comfort',
    providerId: 'kpt',
    name: 'KPT Krankenpflege-Comfort',
    category: 'ambulant',
    description: 'Komfort-Zusatzversicherung',
    coverage: [
      {
        type: 'medications_non_listed',
        description: 'Nicht-kassenpflichtige Medikamente',
        coverageAmount: 'unlimited',
        coveragePercentage: 90,
      },
      {
        type: 'glasses_contacts',
        description: 'Brillen und Kontaktlinsen',
        coverageAmount: 200,
        coveragePercentage: 100,
        coverageLimit: { per: 'year' },
        waitingPeriod: 365
      },
      {
        type: 'alternative_medicine',
        description: 'Komplementärmedizin',
        coverageAmount: 2000,
        coveragePercentage: 90,
        coverageLimit: { per: 'year' }
      },
      {
        type: 'prevention_checkup',
        description: 'Vorsorgeuntersuchungen',
        coverageAmount: 200,
        coveragePercentage: 90,
        coverageLimit: { per: 'year' }
      }
    ],
    pricing: generateSupplementaryPricing(39, 'ambulant'),
    features: [
      'Ausgezeichneter Service',
      'Hohe Kundenzufriedenheit',
      'Persönliche Beratung',
      'Gesundheitsförderung'
    ]
  }
];