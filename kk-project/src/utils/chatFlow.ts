import { ChatStep, ChatFormData, QuickReplyOption, Message } from '../types/chat';

// Canton list for Switzerland
export const SWISS_CANTONS = [
  'Zürich', 'Bern', 'Luzern', 'Uri', 'Schwyz', 'Obwalden', 'Nidwalden', 
  'Glarus', 'Zug', 'Freiburg', 'Solothurn', 'Basel-Stadt', 'Basel-Landschaft',
  'Schaffhausen', 'Appenzell Ausserrhoden', 'Appenzell Innerrhoden', 'St. Gallen',
  'Graubünden', 'Aargau', 'Thurgau', 'Tessin', 'Waadt', 'Wallis', 'Neuenburg', 
  'Genf', 'Jura'
];

// Insurance providers
export const INSURANCE_PROVIDERS = [
  'CSS', 'Helsana', 'Swica', 'Sanitas', 'Concordia', 'Visana', 'Groupe Mutuel',
  'Assura', 'Sympany', 'KPT', 'Atupri', 'EGK', 'Andere'
];

interface ChatFlowStep {
  step: ChatStep;
  getMessage: (data: Partial<ChatFormData>) => string;
  getQuickReplies?: () => QuickReplyOption[];
  validateInput?: (input: string) => { valid: boolean; error?: string };
  processInput: (input: string, data: Partial<ChatFormData>) => Partial<ChatFormData>;
  nextStep: (data: Partial<ChatFormData>) => ChatStep;
}

export const chatFlow: Record<ChatStep, ChatFlowStep> = {
  welcome: {
    step: 'welcome',
    getMessage: () => 
      'Grüezi! 👋 Ich bin Ihr persönlicher Krankenkassen-Assistent. ' +
      'Ich helfe Ihnen dabei, die perfekte Krankenkassenkonfiguration zu finden. ' +
      'Lass uns mit ein paar Fragen beginnen.\n\nWie alt sind Sie?',
    validateInput: (input) => {
      const age = parseInt(input);
      if (isNaN(age)) return { valid: false, error: 'Bitte geben Sie eine gültige Zahl ein.' };
      if (age < 0 || age > 120) return { valid: false, error: 'Bitte geben Sie ein realistisches Alter ein.' };
      return { valid: true };
    },
    processInput: (input) => ({ age: parseInt(input) }),
    nextStep: () => 'canton'
  },

  age: {
    step: 'age',
    getMessage: () => 'Wie alt sind Sie?',
    validateInput: (input) => {
      const age = parseInt(input);
      if (isNaN(age)) return { valid: false, error: 'Bitte geben Sie eine gültige Zahl ein.' };
      if (age < 0 || age > 120) return { valid: false, error: 'Bitte geben Sie ein realistisches Alter ein.' };
      return { valid: true };
    },
    processInput: (input) => ({ age: parseInt(input) }),
    nextStep: () => 'canton'
  },

  canton: {
    step: 'canton',
    getMessage: (data) => 
      `Danke! ${data.age && data.age < 26 ? 'Als junger Erwachsener haben Sie besondere Vorteile! 🎓 ' : ''}` +
      'In welchem Kanton wohnen Sie?',
    getQuickReplies: () => 
      SWISS_CANTONS.slice(0, 5).map(canton => ({
        id: canton.toLowerCase(),
        text: canton,
        value: canton
      })),
    validateInput: (input) => {
      const normalizedInput = input.trim();
      const isValid = SWISS_CANTONS.some(
        canton => canton.toLowerCase() === normalizedInput.toLowerCase()
      );
      return isValid 
        ? { valid: true }
        : { valid: false, error: 'Bitte wählen Sie einen gültigen Schweizer Kanton.' };
    },
    processInput: (input) => {
      const canton = SWISS_CANTONS.find(
        c => c.toLowerCase() === input.trim().toLowerCase()
      );
      return { canton: canton || input };
    },
    nextStep: () => 'accident-insurance'
  },

  'accident-insurance': {
    step: 'accident-insurance',
    getMessage: () => 
      'Sind Sie angestellt und haben eine Unfallversicherung durch Ihren Arbeitgeber? ' +
      '(Falls ja, können Sie bei der Grundversicherung Geld sparen)',
    getQuickReplies: () => [
      { id: 'yes', text: 'Ja, bin angestellt', value: true },
      { id: 'no', text: 'Nein / Selbständig', value: false }
    ],
    validateInput: (input) => {
      const normalized = input.toLowerCase().trim();
      if (['ja', 'yes', 'j', 'nein', 'no', 'n'].includes(normalized)) {
        return { valid: true };
      }
      return { valid: false, error: 'Bitte antworten Sie mit Ja oder Nein.' };
    },
    processInput: (input) => {
      const normalized = input.toLowerCase().trim();
      return { 
        hasAccidentInsuranceThroughEmployer: ['ja', 'yes', 'j'].includes(normalized)
      };
    },
    nextStep: () => 'current-insurance'
  },

  'current-insurance': {
    step: 'current-insurance',
    getMessage: () => 
      'Bei welcher Krankenkasse sind Sie aktuell versichert? ' +
      '(Falls Sie noch keine haben, schreiben Sie "Keine")',
    getQuickReplies: () => 
      INSURANCE_PROVIDERS.slice(0, 6).map(provider => ({
        id: provider.toLowerCase().replace(' ', '-'),
        text: provider,
        value: provider
      })),
    processInput: (input) => {
      if (input.toLowerCase() === 'keine' || input.toLowerCase() === 'none') {
        return {};
      }
      return { currentInsuranceProvider: input };
    },
    nextStep: (data) => 
      data.currentInsuranceProvider ? 'health-status' : 'health-status'
  },

  'health-status': {
    step: 'health-status',
    getMessage: () => 
      'Wie würden Sie Ihren allgemeinen Gesundheitszustand beschreiben? ' +
      '(Dies hilft mir, passende Zusatzversicherungen zu finden)',
    getQuickReplies: () => [
      { id: 'excellent', text: '💪 Ausgezeichnet', value: 'excellent' },
      { id: 'good', text: '😊 Gut', value: 'good' },
      { id: 'fair', text: '😐 Durchschnittlich', value: 'fair' },
      { id: 'poor', text: '😔 Nicht so gut', value: 'poor' }
    ],
    validateInput: (input) => {
      const normalized = input.toLowerCase();
      const valid = ['ausgezeichnet', 'gut', 'durchschnittlich', 'nicht so gut',
                    'excellent', 'good', 'fair', 'poor'].includes(normalized);
      return valid 
        ? { valid: true }
        : { valid: false, error: 'Bitte wählen Sie eine der Optionen.' };
    },
    processInput: (input) => {
      const mapping: Record<string, ChatFormData['healthStatus']> = {
        'ausgezeichnet': 'excellent',
        'excellent': 'excellent',
        'gut': 'good',
        'good': 'good',
        'durchschnittlich': 'fair',
        'fair': 'fair',
        'nicht so gut': 'poor',
        'poor': 'poor'
      };
      return { healthStatus: mapping[input.toLowerCase()] || 'good' };
    },
    nextStep: () => 'doctor-preference'
  },

  'doctor-preference': {
    step: 'doctor-preference',
    getMessage: () => 
      'Wie wichtig ist Ihnen die freie Arztwahl? ' +
      '(Einschränkungen können Ihre Prämie reduzieren)',
    getQuickReplies: () => [
      { id: 'free', text: '🏥 Freie Arztwahl', value: 'free' },
      { id: 'limited', text: '👨‍⚕️ Hausarztmodell OK', value: 'limited' },
      { id: 'no-pref', text: '🤷 Egal', value: 'no-preference' }
    ],
    processInput: (input) => {
      const mapping: Record<string, ChatFormData['doctorChoice']> = {
        'freie arztwahl': 'free',
        'free': 'free',
        'hausarztmodell ok': 'limited',
        'limited': 'limited',
        'egal': 'no-preference',
        'no-preference': 'no-preference'
      };
      return { doctorChoice: mapping[input.toLowerCase()] || 'no-preference' };
    },
    nextStep: () => 'hospital-preference'
  },

  'hospital-preference': {
    step: 'hospital-preference',
    getMessage: () => 
      'Wie wichtig ist Ihnen die freie Spitalwahl in der ganzen Schweiz?',
    getQuickReplies: () => [
      { id: 'free', text: '🏥 Sehr wichtig', value: 'free' },
      { id: 'limited', text: '🏨 Kantonal reicht', value: 'limited' },
      { id: 'no-pref', text: '🤷 Nicht wichtig', value: 'no-preference' }
    ],
    processInput: (input) => {
      const mapping: Record<string, ChatFormData['hospitalChoice']> = {
        'sehr wichtig': 'free',
        'free': 'free',
        'kantonal reicht': 'limited',
        'limited': 'limited',
        'nicht wichtig': 'no-preference',
        'no-preference': 'no-preference'
      };
      return { hospitalChoice: mapping[input.toLowerCase()] || 'no-preference' };
    },
    nextStep: () => 'additional-needs'
  },

  'additional-needs': {
    step: 'additional-needs',
    getMessage: () => 
      'Welche Zusatzleistungen sind Ihnen wichtig? (Mehrfachauswahl möglich)\n\n' +
      '1️⃣ Komplementärmedizin (Homöopathie, TCM, etc.)\n' +
      '2️⃣ Zahnbehandlungen\n' +
      '3️⃣ Brillen/Kontaktlinsen\n' +
      '4️⃣ Fitness-Abo Beiträge\n' +
      '5️⃣ Auslandschutz\n\n' +
      'Geben Sie die Nummern ein (z.B. "1,3,4") oder "Keine"',
    processInput: (input) => {
      if (input.toLowerCase() === 'keine' || input.toLowerCase() === 'none') {
        return {
          needsComplementaryMedicine: false,
          needsDentalCare: false,
          needsGlasses: false,
          needsFitness: false,
          needsAbroadCoverage: false
        };
      }
      
      const selections = input.split(',').map(s => s.trim());
      return {
        needsComplementaryMedicine: selections.includes('1'),
        needsDentalCare: selections.includes('2'),
        needsGlasses: selections.includes('3'),
        needsFitness: selections.includes('4'),
        needsAbroadCoverage: selections.includes('5')
      };
    },
    nextStep: () => 'family-members'
  },

  'family-members': {
    step: 'family-members',
    getMessage: () => 
      'Möchten Sie auch Familienmitglieder versichern? ' +
      '(Partner, Kinder)',
    getQuickReplies: () => [
      { id: 'yes', text: 'Ja', value: 'yes' },
      { id: 'no', text: 'Nein, nur ich', value: 'no' }
    ],
    processInput: (input) => {
      // This will be handled with follow-up questions if yes
      return {};
    },
    nextStep: (data) => 'summary'
  },

  summary: {
    step: 'summary',
    getMessage: (data) => {
      const needs = [];
      if (data.needsComplementaryMedicine) needs.push('Komplementärmedizin');
      if (data.needsDentalCare) needs.push('Zahnbehandlungen');
      if (data.needsGlasses) needs.push('Brillen/Kontaktlinsen');
      if (data.needsFitness) needs.push('Fitness-Abo');
      if (data.needsAbroadCoverage) needs.push('Auslandschutz');

      return `Perfekt! Hier ist eine Zusammenfassung Ihrer Angaben:\n\n` +
        `📍 Wohnkanton: ${data.canton}\n` +
        `🎂 Alter: ${data.age} Jahre\n` +
        `💼 Unfallversicherung durch Arbeitgeber: ${data.hasAccidentInsuranceThroughEmployer ? 'Ja' : 'Nein'}\n` +
        `🏥 Aktuelle Krankenkasse: ${data.currentInsuranceProvider || 'Keine'}\n` +
        `❤️ Gesundheitszustand: ${data.healthStatus}\n` +
        `👨‍⚕️ Arztwahl: ${data.doctorChoice === 'free' ? 'Freie Wahl' : data.doctorChoice === 'limited' ? 'Hausarztmodell OK' : 'Flexibel'}\n` +
        `🏨 Spitalwahl: ${data.hospitalChoice === 'free' ? 'Schweizweit' : data.hospitalChoice === 'limited' ? 'Kantonal' : 'Flexibel'}\n` +
        `✨ Zusatzleistungen: ${needs.length > 0 ? needs.join(', ') : 'Keine'}\n\n` +
        `Soll ich jetzt die besten Angebote für Sie berechnen?`;
    },
    getQuickReplies: () => [
      { id: 'calculate', text: '✅ Ja, berechnen', value: 'calculate' },
      { id: 'modify', text: '✏️ Angaben ändern', value: 'modify' }
    ],
    processInput: () => ({}),
    nextStep: () => 'generating-offers'
  },

  'generating-offers': {
    step: 'generating-offers',
    getMessage: () => 
      '🔍 Ich analysiere jetzt alle verfügbaren Krankenkassen und erstelle Ihre personalisierten Angebote...\n\n' +
      '⏳ Dies dauert nur einen Moment...',
    processInput: () => ({}),
    nextStep: () => 'offers-ready'
  },

  'offers-ready': {
    step: 'offers-ready',
    getMessage: () => 
      '✅ Ihre Angebote sind bereit! Ich habe die 3 besten Optionen für Sie gefunden.\n\n' +
      'Klicken Sie auf den Button unten, um Ihre personalisierten Angebote anzusehen.',
    getQuickReplies: () => [
      { id: 'view-offers', text: '📊 Angebote ansehen', value: 'view-offers' }
    ],
    processInput: () => ({}),
    nextStep: () => 'offers-ready'
  }
};

// Validation helpers
export function validateAge(input: string): { valid: boolean; error?: string } {
  const age = parseInt(input);
  if (isNaN(age)) return { valid: false, error: 'Bitte geben Sie eine gültige Zahl ein.' };
  if (age < 0 || age > 120) return { valid: false, error: 'Bitte geben Sie ein realistisches Alter ein.' };
  return { valid: true };
}

export function getNextStep(currentStep: ChatStep, data: Partial<ChatFormData>): ChatStep {
  const flow = chatFlow[currentStep];
  return flow ? flow.nextStep(data) : 'welcome';
}

export function processUserInput(
  currentStep: ChatStep, 
  input: string, 
  currentData: Partial<ChatFormData>
): { 
  newData: Partial<ChatFormData>; 
  isValid: boolean; 
  error?: string 
} {
  const flow = chatFlow[currentStep];
  if (!flow) return { newData: currentData, isValid: false, error: 'Invalid step' };

  // Validate input if validator exists
  if (flow.validateInput) {
    const validation = flow.validateInput(input);
    if (!validation.valid) {
      return { newData: currentData, isValid: false, error: validation.error };
    }
  }

  // Process input
  const processedData = flow.processInput(input, currentData);
  const newData = { ...currentData, ...processedData };

  return { newData, isValid: true };
}