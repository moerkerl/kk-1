import { InsuranceProvider, Canton } from '../types/insurance';

export const insuranceProviders: InsuranceProvider[] = [
  {
    id: 'helsana',
    name: 'Helsana',
    description: 'Die führende Schweizer Krankenversicherung mit umfassendem Angebot',
    rating: 4.5,
    availableInCantons: ['AG', 'AI', 'AR', 'BE', 'BL', 'BS', 'FR', 'GE', 'GL', 'GR', 'JU', 'LU', 'NE', 'NW', 'OW', 'SG', 'SH', 'SO', 'SZ', 'TG', 'TI', 'UR', 'VD', 'VS', 'ZG', 'ZH'] as Canton[]
  },
  {
    id: 'css',
    name: 'CSS',
    description: 'Innovative Versicherungslösungen mit digitalen Services',
    rating: 4.3,
    availableInCantons: ['AG', 'AI', 'AR', 'BE', 'BL', 'BS', 'FR', 'GE', 'GL', 'GR', 'JU', 'LU', 'NE', 'NW', 'OW', 'SG', 'SH', 'SO', 'SZ', 'TG', 'TI', 'UR', 'VD', 'VS', 'ZG', 'ZH'] as Canton[]
  },
  {
    id: 'swica',
    name: 'SWICA',
    description: 'Fokus auf Gesundheitsförderung und Prävention',
    rating: 4.4,
    availableInCantons: ['AG', 'AI', 'AR', 'BE', 'BL', 'BS', 'FR', 'GE', 'GL', 'GR', 'JU', 'LU', 'NE', 'NW', 'OW', 'SG', 'SH', 'SO', 'SZ', 'TG', 'TI', 'UR', 'VD', 'VS', 'ZG', 'ZH'] as Canton[]
  },
  {
    id: 'visana',
    name: 'Visana',
    description: 'Persönliche Beratung und massgeschneiderte Lösungen',
    rating: 4.2,
    availableInCantons: ['AG', 'BE', 'BL', 'BS', 'FR', 'LU', 'NE', 'SO', 'VD', 'VS', 'ZH'] as Canton[]
  },
  {
    id: 'sanitas',
    name: 'Sanitas',
    description: 'Digital und kundennah - die moderne Krankenversicherung',
    rating: 4.3,
    availableInCantons: ['AG', 'BE', 'BL', 'BS', 'GE', 'LU', 'SG', 'SO', 'TG', 'VD', 'ZG', 'ZH'] as Canton[]
  },
  {
    id: 'concordia',
    name: 'Concordia',
    description: 'Faire Prämien und ausgezeichneter Service',
    rating: 4.4,
    availableInCantons: ['AG', 'BE', 'BL', 'BS', 'LU', 'SO', 'ZH'] as Canton[]
  },
  {
    id: 'kpt',
    name: 'KPT',
    description: 'Die persönliche Krankenversicherung aus Bern',
    rating: 4.5,
    availableInCantons: ['BE', 'FR', 'NE', 'VD', 'VS'] as Canton[]
  },
  {
    id: 'assura',
    name: 'Assura',
    description: 'Günstige Prämien für die Grundversicherung',
    rating: 3.8,
    availableInCantons: ['AG', 'AI', 'AR', 'BE', 'BL', 'BS', 'FR', 'GE', 'GL', 'GR', 'JU', 'LU', 'NE', 'NW', 'OW', 'SG', 'SH', 'SO', 'SZ', 'TG', 'TI', 'UR', 'VD', 'VS', 'ZG', 'ZH'] as Canton[]
  },
  {
    id: 'okk',
    name: 'ÖKK',
    description: 'Die menschliche Krankenversicherung',
    rating: 4.1,
    availableInCantons: ['AG', 'AR', 'BE', 'GL', 'GR', 'LU', 'SG', 'SH', 'SO', 'SZ', 'TG', 'ZG', 'ZH'] as Canton[]
  },
  {
    id: 'atupri',
    name: 'Atupri',
    description: 'Einfach, transparent und digital',
    rating: 4.0,
    availableInCantons: ['BE', 'FR', 'JU', 'NE', 'SO', 'VD'] as Canton[]
  }
];