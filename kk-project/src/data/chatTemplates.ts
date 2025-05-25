// Chat templates and conversation data
import { ChatTemplate, QuickReply, ChatConfiguration } from '../types';

export const chatTemplates: ChatTemplate[] = [
  // German templates
  {
    id: 'greeting-de',
    intent: 'greeting',
    language: 'de',
    templates: [
      'Grüezi! Ich bin Ihr persönlicher Krankenkassen-Assistent. Ich helfe Ihnen, die beste Krankenversicherung für Ihre Bedürfnisse zu finden. 😊',
      'Willkommen beim KrankenkassenAssistent! Schön, dass Sie da sind. Gemeinsam finden wir die optimale Versicherungslösung für Sie.',
      'Hallo! Ich bin hier, um Ihnen bei der Suche nach der perfekten Krankenversicherung zu helfen. Lassen Sie uns gemeinsam Ihre Optionen durchgehen.'
    ],
    followUpQuestions: [
      'Möchten Sie Ihre aktuelle Versicherung optimieren oder suchen Sie eine neue Krankenversicherung?',
      'Was ist Ihnen bei Ihrer Krankenversicherung am wichtigsten?'
    ],
    quickReplies: [
      { id: 'optimize', text: 'Versicherung optimieren', value: 'optimize_current', icon: '📊' },
      { id: 'new', text: 'Neue Versicherung', value: 'find_new', icon: '🔍' },
      { id: 'info', text: 'Mehr erfahren', value: 'more_info', icon: 'ℹ️' }
    ]
  },
  {
    id: 'collect-personal-de',
    intent: 'collect_personal_info',
    language: 'de',
    templates: [
      'Um Ihnen die besten Angebote zeigen zu können, benötige ich einige Informationen über Sie. Keine Sorge, Ihre Daten sind bei mir sicher! 🔒',
      'Lassen Sie uns mit ein paar grundlegenden Informationen beginnen.',
      'Für eine personalisierte Beratung brauche ich zunächst einige Angaben von Ihnen.'
    ],
    variables: ['firstName'],
    followUpQuestions: [
      'Wie ist Ihr Vorname?',
      'In welchem Kanton wohnen Sie?',
      'Was ist Ihr Geburtsdatum?'
    ]
  },
  {
    id: 'collect-health-de',
    intent: 'collect_health_info',
    language: 'de',
    templates: [
      'Vielen Dank, {{firstName}}! Nun einige Fragen zu Ihrer Gesundheit. Diese Informationen helfen mir, passende Zusatzversicherungen zu finden.',
      'Super! Als nächstes möchte ich Ihren Gesundheitsstatus verstehen, um die optimalen Versicherungsoptionen zu ermitteln.',
      'Danke für diese Informationen! Lassen Sie uns über Ihre gesundheitliche Situation sprechen.'
    ],
    variables: ['firstName'],
    quickReplies: [
      { id: 'excellent', text: 'Ausgezeichnet', value: 'health_excellent', icon: '💪' },
      { id: 'good', text: 'Gut', value: 'health_good', icon: '😊' },
      { id: 'fair', text: 'Durchschnittlich', value: 'health_fair', icon: '😐' },
      { id: 'poor', text: 'Nicht so gut', value: 'health_poor', icon: '😔' }
    ]
  },
  {
    id: 'explain-models-de',
    intent: 'explain_models',
    language: 'de',
    templates: [
      'Gerne erkläre ich Ihnen die verschiedenen Versicherungsmodelle:\n\n📱 **Telmed**: Erste Beratung immer telefonisch (bis zu 20% Rabatt)\n🏥 **HMO**: Behandlung im HMO-Zentrum (bis zu 25% Rabatt)\n👨‍⚕️ **Hausarzt**: Ihr Hausarzt als erste Anlaufstelle (bis zu 15% Rabatt)\n💊 **Apotheken**: Erste Beratung in der Apotheke (bis zu 15% Rabatt)\n🎯 **Standard**: Freie Arztwahl (kein Rabatt)',
      'Die Sparmodelle unterscheiden sich hauptsächlich darin, wen Sie zuerst kontaktieren müssen...',
      'Hier eine Übersicht der Grundversicherungsmodelle und ihre Vorteile...'
    ],
    quickReplies: [
      { id: 'telmed-info', text: 'Mehr zu Telmed', value: 'explain_telmed', icon: '📱' },
      { id: 'hmo-info', text: 'Mehr zu HMO', value: 'explain_hmo', icon: '🏥' },
      { id: 'hausarzt-info', text: 'Mehr zu Hausarzt', value: 'explain_hausarzt', icon: '👨‍⚕️' }
    ]
  },
  {
    id: 'present-recommendations-de',
    intent: 'present_recommendations',
    language: 'de',
    templates: [
      '🎯 Basierend auf Ihren Angaben habe ich die {{count}} besten Angebote für Sie gefunden!',
      '✨ Hier sind Ihre personalisierten Versicherungsempfehlungen:',
      '📊 Ich habe alle Krankenkassen verglichen. Diese {{count}} Optionen passen am besten zu Ihnen:'
    ],
    variables: ['count']
  },
  
  // French templates
  {
    id: 'greeting-fr',
    intent: 'greeting',
    language: 'fr',
    templates: [
      'Bonjour! Je suis votre assistant personnel pour l\'assurance maladie. Je vous aide à trouver la meilleure assurance pour vos besoins. 😊',
      'Bienvenue chez KrankenkassenAssistent! Ravi de vous voir. Ensemble, nous trouverons la solution d\'assurance optimale pour vous.',
      'Salut! Je suis là pour vous aider à trouver l\'assurance maladie parfaite. Explorons vos options ensemble.'
    ],
    followUpQuestions: [
      'Souhaitez-vous optimiser votre assurance actuelle ou recherchez-vous une nouvelle assurance maladie?',
      'Qu\'est-ce qui est le plus important pour vous dans votre assurance maladie?'
    ],
    quickReplies: [
      { id: 'optimize', text: 'Optimiser l\'assurance', value: 'optimize_current', icon: '📊' },
      { id: 'new', text: 'Nouvelle assurance', value: 'find_new', icon: '🔍' },
      { id: 'info', text: 'En savoir plus', value: 'more_info', icon: 'ℹ️' }
    ]
  },
  
  // Italian templates
  {
    id: 'greeting-it',
    intent: 'greeting',
    language: 'it',
    templates: [
      'Ciao! Sono il tuo assistente personale per l\'assicurazione malattia. Ti aiuto a trovare la migliore assicurazione per le tue esigenze. 😊',
      'Benvenuto in KrankenkassenAssistent! Piacere di averti qui. Insieme troveremo la soluzione assicurativa ottimale per te.',
      'Salve! Sono qui per aiutarti a trovare l\'assicurazione malattia perfetta. Esploriamo insieme le tue opzioni.'
    ],
    followUpQuestions: [
      'Vuoi ottimizzare la tua assicurazione attuale o stai cercando una nuova assicurazione malattia?',
      'Cosa è più importante per te nella tua assicurazione malattia?'
    ],
    quickReplies: [
      { id: 'optimize', text: 'Ottimizzare assicurazione', value: 'optimize_current', icon: '📊' },
      { id: 'new', text: 'Nuova assicurazione', value: 'find_new', icon: '🔍' },
      { id: 'info', text: 'Maggiori informazioni', value: 'more_info', icon: 'ℹ️' }
    ]
  },
  
  // English templates
  {
    id: 'greeting-en',
    intent: 'greeting',
    language: 'en',
    templates: [
      'Hello! I\'m your personal health insurance assistant. I\'ll help you find the best insurance for your needs. 😊',
      'Welcome to KrankenkassenAssistent! Great to have you here. Together we\'ll find the optimal insurance solution for you.',
      'Hi! I\'m here to help you find the perfect health insurance. Let\'s explore your options together.'
    ],
    followUpQuestions: [
      'Would you like to optimize your current insurance or are you looking for new health insurance?',
      'What\'s most important to you in your health insurance?'
    ],
    quickReplies: [
      { id: 'optimize', text: 'Optimize insurance', value: 'optimize_current', icon: '📊' },
      { id: 'new', text: 'New insurance', value: 'find_new', icon: '🔍' },
      { id: 'info', text: 'Learn more', value: 'more_info', icon: 'ℹ️' }
    ]
  }
];

export const defaultChatConfiguration: ChatConfiguration = {
  welcomeMessage: 'Grüezi! Ich bin Ihr persönlicher Krankenkassen-Assistent. Ich helfe Ihnen, die beste Krankenversicherung für Ihre Bedürfnisse zu finden. 😊',
  farewellMessage: 'Vielen Dank für Ihr Vertrauen! Falls Sie weitere Fragen haben, bin ich jederzeit für Sie da. Ich wünsche Ihnen alles Gute! 👋',
  timeoutMinutes: 30,
  maxMessagesPerSession: 100,
  enableQuickReplies: true,
  enableVoiceInput: false,
  enableFileUpload: true,
  dataCollectionMode: 'mixed',
  personalityTraits: {
    formality: 'friendly',
    helpfulness: 95,
    proactiveness: 80,
    patience: 90
  }
};

// Quick replies for common actions
export const commonQuickReplies: Record<string, QuickReply[]> = {
  yesNo: [
    { id: 'yes', text: 'Ja', value: 'yes', icon: '✅' },
    { id: 'no', text: 'Nein', value: 'no', icon: '❌' }
  ],
  familyStatus: [
    { id: 'single', text: 'Ledig', value: 'single', icon: '👤' },
    { id: 'married', text: 'Verheiratet', value: 'married', icon: '💑' },
    { id: 'family', text: 'Familie mit Kindern', value: 'family', icon: '👨‍👩‍👧‍👦' }
  ],
  employmentStatus: [
    { id: 'employed', text: 'Angestellt', value: 'employed_fulltime', icon: '💼' },
    { id: 'self-employed', text: 'Selbständig', value: 'self_employed', icon: '🏢' },
    { id: 'student', text: 'Student/in', value: 'student', icon: '🎓' },
    { id: 'retired', text: 'Pensioniert', value: 'retired', icon: '🏖️' }
  ],
  importantFeatures: [
    { id: 'price', text: 'Günstige Prämien', value: 'low_premium', icon: '💰' },
    { id: 'coverage', text: 'Umfassende Leistungen', value: 'comprehensive_coverage', icon: '🛡️' },
    { id: 'service', text: 'Guter Service', value: 'good_service', icon: '⭐' },
    { id: 'digital', text: 'Digitale Services', value: 'digital_services', icon: '📱' }
  ]
};