import { SWISS_CANTONS, INSURANCE_PROVIDERS } from './chatFlow';

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation for Swiss numbers
export function isValidSwissPhone(phone: string): boolean {
  // Remove spaces, dashes, and parentheses
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  
  // Check if it's a valid Swiss phone number
  // Swiss phone numbers can start with +41, 0041, or 0
  const swissPhoneRegex = /^(\+41|0041|0)[1-9]\d{8,9}$/;
  return swissPhoneRegex.test(cleaned);
}

// Postal code validation for Switzerland
export function isValidSwissPostalCode(code: string): boolean {
  // Swiss postal codes are 4 digits between 1000 and 9999
  const numCode = parseInt(code);
  return !isNaN(numCode) && numCode >= 1000 && numCode <= 9999;
}

// Canton validation
export function isValidCanton(canton: string): boolean {
  return SWISS_CANTONS.some(c => c.toLowerCase() === canton.toLowerCase());
}

// Insurance provider validation
export function isValidInsuranceProvider(provider: string): boolean {
  if (provider.toLowerCase() === 'keine' || provider.toLowerCase() === 'none') {
    return true;
  }
  return INSURANCE_PROVIDERS.some(p => p.toLowerCase() === provider.toLowerCase());
}

// Parse yes/no responses in multiple languages
export function parseYesNo(input: string): boolean | null {
  const normalized = input.toLowerCase().trim();
  
  const yesVariants = ['ja', 'yes', 'oui', 'si', 'j', 'y'];
  const noVariants = ['nein', 'no', 'non', 'n'];
  
  if (yesVariants.includes(normalized)) return true;
  if (noVariants.includes(normalized)) return false;
  
  return null;
}

// Parse numeric input with validation
export function parseNumber(input: string, min?: number, max?: number): number | null {
  const num = parseInt(input.trim());
  
  if (isNaN(num)) return null;
  if (min !== undefined && num < min) return null;
  if (max !== undefined && num > max) return null;
  
  return num;
}

// Parse date input
export function parseDate(input: string): Date | null {
  // Try different date formats
  const formats = [
    /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/, // DD.MM.YYYY
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, // DD/MM/YYYY
    /^(\d{4})-(\d{2})-(\d{2})$/,       // YYYY-MM-DD
  ];
  
  for (const format of formats) {
    const match = input.match(format);
    if (match) {
      let day, month, year;
      
      if (format === formats[2]) {
        // YYYY-MM-DD format
        year = parseInt(match[1]);
        month = parseInt(match[2]) - 1;
        day = parseInt(match[3]);
      } else {
        // DD.MM.YYYY or DD/MM/YYYY format
        day = parseInt(match[1]);
        month = parseInt(match[2]) - 1;
        year = parseInt(match[3]);
      }
      
      const date = new Date(year, month, day);
      
      // Validate the date
      if (date.getDate() === day && 
          date.getMonth() === month && 
          date.getFullYear() === year) {
        return date;
      }
    }
  }
  
  return null;
}

// Calculate age from birth date
export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

// Validate health status input
export function parseHealthStatus(input: string): 'excellent' | 'good' | 'fair' | 'poor' | null {
  const normalized = input.toLowerCase().trim();
  
  const mapping: Record<string, 'excellent' | 'good' | 'fair' | 'poor'> = {
    // German
    'ausgezeichnet': 'excellent',
    'sehr gut': 'excellent',
    'excellent': 'excellent',
    'gut': 'good',
    'good': 'good',
    'durchschnittlich': 'fair',
    'mittel': 'fair',
    'fair': 'fair',
    'nicht so gut': 'poor',
    'schlecht': 'poor',
    'poor': 'poor',
    // French
    'excellent': 'excellent',
    'très bien': 'excellent',
    'bien': 'good',
    'bon': 'good',
    'moyen': 'fair',
    'passable': 'fair',
    'mauvais': 'poor',
    'faible': 'poor',
    // Italian
    'eccellente': 'excellent',
    'ottimo': 'excellent',
    'buono': 'good',
    'bene': 'good',
    'medio': 'fair',
    'discreto': 'fair',
    'scarso': 'poor',
    'male': 'poor'
  };
  
  return mapping[normalized] || null;
}

// Parse multiple selections (e.g., "1,3,5" or "1 3 5")
export function parseMultipleSelections(input: string, maxOption: number): number[] {
  if (input.toLowerCase() === 'keine' || input.toLowerCase() === 'none') {
    return [];
  }
  
  // Split by comma, space, or semicolon
  const parts = input.split(/[,\s;]+/).filter(p => p.trim());
  const selections: number[] = [];
  
  for (const part of parts) {
    const num = parseInt(part.trim());
    if (!isNaN(num) && num >= 1 && num <= maxOption) {
      selections.push(num);
    }
  }
  
  // Remove duplicates
  return [...new Set(selections)];
}

// Format currency for display
export function formatCurrency(amount: number): string {
  return `CHF ${amount.toFixed(2)}`;
}

// Format percentage
export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(0)}%`;
}