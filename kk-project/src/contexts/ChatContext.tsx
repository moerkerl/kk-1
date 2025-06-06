import { createContext, useContext, useReducer, ReactNode, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatState, Message, ChatStep, ChatFormData, QuickReplyOption } from '../types/chat';
import { Canton } from '../types/user';
import { chatFlow, processUserInput, getNextStep } from '../utils/chatFlow';
import { generateInsuranceOffers } from '../utils/offerGeneration';
import { InsuranceOffer } from '../types/insurance';

interface ChatContextValue extends ChatState {
  sendMessage: (text: string) => void;
  selectQuickReply: (option: QuickReplyOption) => void;
  resetChat: () => void;
  goToStep: (step: ChatStep) => void;
  generatedOffers: InsuranceOffer[];
}

const ChatContext = createContext<ChatContextValue | null>(null);

type ChatAction =
  | { type: 'ADD_MESSAGE'; message: Message }
  | { type: 'SET_TYPING'; isTyping: boolean }
  | { type: 'SET_STEP'; step: ChatStep }
  | { type: 'UPDATE_DATA'; data: Partial<ChatFormData> }
  | { type: 'SET_OFFERS'; offers: InsuranceOffer[] }
  | { type: 'RESET_CHAT' };

interface ChatStateExtended extends ChatState {
  generatedOffers: InsuranceOffer[];
}

// Create initial welcome message
const createWelcomeMessage = (): Message => {
  const welcomeStep = chatFlow['welcome'];
  return {
    id: `welcome-${Date.now()}`,
    text: welcomeStep.getMessage({}),
    sender: 'assistant',
    timestamp: new Date(),
    options: welcomeStep.getQuickReplies?.()
  };
};

const initialState: ChatStateExtended = {
  messages: [createWelcomeMessage()],
  currentStep: 'welcome',
  collectedData: {},
  isTyping: false,
  generatedOffers: []
};

function chatReducer(state: ChatStateExtended, action: ChatAction): ChatStateExtended {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.message]
      };
    case 'SET_TYPING':
      return {
        ...state,
        isTyping: action.isTyping
      };
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.step
      };
    case 'UPDATE_DATA':
      return {
        ...state,
        collectedData: { ...state.collectedData, ...action.data }
      };
    case 'SET_OFFERS':
      return {
        ...state,
        generatedOffers: action.offers
      };
    case 'RESET_CHAT':
      return initialState;
    default:
      return state;
  }
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const navigate = useNavigate();


  // Listen for test data from Modi system
  useEffect(() => {
    const handleTestData = async (event: CustomEvent) => {
      const testData = event.detail as ChatFormData;
      dispatch({ type: 'UPDATE_DATA', data: testData });
      
      // Create a proper UserProfile from the test data
      const userProfile = {
        id: 'test-user',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        dateOfBirth: new Date(new Date().getFullYear() - (testData.age || 30), 0, 1),
        age: testData.age || 30,
        gender: 'other' as const,
        canton: (testData.canton || 'ZH') as Canton,
        postalCode: '8000',
        city: 'Test City',
        healthStatus: testData.healthStatus || 'good',
        preExistingConditions: [],
        isSmoker: false,
        familyStatus: 'single' as const,
        numberOfChildren: 0,
        employmentStatus: 'employed_fulltime' as const,
        hasAccidentCoverageFromEmployer: testData.hasAccidentInsuranceThroughEmployer || false,
        preferences: {
          preferredModels: testData.doctorChoice === 'free' ? ['standard'] : 
                          testData.doctorChoice === 'limited' ? ['hausarzt', 'telmed'] : 
                          ['hmo', 'telmed'],
          wantsComplementaryMedicine: testData.needsComplementaryMedicine || false,
          wantsDentalCoverage: testData.needsDentalCare || false,
          wantsInternationalCoverage: testData.needsAbroadCoverage || false,
          wantsPreventiveCare: false,
          wantsFitnessContribution: testData.needsFitness || false,
          wantsGlassesContribution: testData.needsGlasses || false,
          preferredHospitalClass: testData.hospitalChoice === 'free' ? 'private' : 
                                 testData.hospitalChoice === 'limited' ? 'semi_private' : 
                                 'general',
          wantsFreeDoctorChoice: testData.doctorChoice === 'free',
          wantsPrivateRoom: testData.hospitalChoice === 'free',
          maxMonthlyPremium: testData.currentMonthlyPremium,
          preferredFranchise: 1000,
          preferredLanguage: 'de' as const,
          wantsOnlineServices: true,
          wantsLocalOffice: false
        },
        currentInsurance: testData.currentInsuranceProvider ? {
          provider: testData.currentInsuranceProvider,
          basicInsuranceModel: 'standard' as const,
          franchise: 1000,
          monthlyPremium: testData.currentMonthlyPremium || 350,
          supplementaryInsurances: [],
          satisfactionLevel: 3 as const,
          reasonsForChange: ['better_price']
        } : undefined,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Generate offers with the complete user profile
      try {
        const offers = generateInsuranceOffers({ userProfile });
        
        if (offers && offers.length > 0) {
          dispatch({ type: 'SET_OFFERS', offers });
          
          // Small delay to ensure state is updated before navigation
          setTimeout(() => {
            navigate('/offers');
          }, 100);
        } else {
          console.error('No offers generated for test profile');
        }
      } catch (error) {
        console.error('Error generating offers for test profile:', error);
      }
    };

    window.addEventListener('apply-test-data', handleTestData as unknown as EventListener);
    return () => {
      window.removeEventListener('apply-test-data', handleTestData as unknown as EventListener);
    };
  }, [navigate]);

  const addMessage = useCallback((text: string, sender: 'user' | 'assistant', options?: QuickReplyOption[]) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      options
    };
    dispatch({ type: 'ADD_MESSAGE', message });
  }, []);

  const processMessage = useCallback(async (text: string) => {
    try {
      // Process user input
      const { newData, isValid, error } = processUserInput(
        state.currentStep,
        text,
        state.collectedData
      );

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 800));
      dispatch({ type: 'SET_TYPING', isTyping: false });

      if (!isValid && error) {
        // Show error message
        addMessage(`❌ ${error}`, 'assistant');
        return;
      }

      // Update collected data
      dispatch({ type: 'UPDATE_DATA', data: newData });

      // Move to next step
      const nextStep = getNextStep(state.currentStep, newData);
      dispatch({ type: 'SET_STEP', step: nextStep });

      // Handle special steps
      if (nextStep === 'generating-offers') {
        // Show generating message
        const generatingStep = chatFlow[nextStep];
        addMessage(generatingStep.getMessage(newData), 'assistant');
        
        try {
          // Generate offers with loading indicator
          await new Promise(resolve => setTimeout(resolve, 2000));
          const offers = generateInsuranceOffers({ userProfile: newData as any });
          
          if (!offers || offers.length === 0) {
            throw new Error('Keine Angebote konnten generiert werden');
          }
          
          dispatch({ type: 'SET_OFFERS', offers });
          
          // Move to offers ready
          dispatch({ type: 'SET_STEP', step: 'offers-ready' });
          const offersStep = chatFlow['offers-ready'];
          addMessage(
            offersStep.getMessage(newData), 
            'assistant',
            offersStep.getQuickReplies?.()
          );
        } catch (offerError) {
          addMessage(
            `❌ Es gab ein Problem beim Generieren der Angebote. Bitte versuchen Sie es später erneut.`, 
            'assistant'
          );
          console.error('Offer generation error:', offerError);
        }
      } else if (nextStep === 'offers-ready' && text.includes('Angebote ansehen')) {
        // Navigate to offers page with generated offers
        navigate('/offers');
      } else {
        // Show next question
        const nextStepFlow = chatFlow[nextStep];
        if (nextStepFlow) {
          addMessage(
            nextStepFlow.getMessage(newData),
            'assistant',
            nextStepFlow.getQuickReplies?.()
          );
        }
      }
    } catch (error) {
      console.error('Error processing message:', error);
      dispatch({ type: 'SET_TYPING', isTyping: false });
      addMessage(
        '❌ Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie unseren Support.',
        'assistant'
      );
    }
  }, [state.currentStep, state.collectedData, addMessage, navigate]);

  const sendMessage = useCallback((text: string) => {
    addMessage(text, 'user');
    dispatch({ type: 'SET_TYPING', isTyping: true });
    processMessage(text);
  }, [addMessage, processMessage]);

  const selectQuickReply = useCallback((option: QuickReplyOption) => {
    sendMessage(option.text);
  }, [sendMessage]);

  const resetChat = useCallback(() => {
    dispatch({ type: 'RESET_CHAT' });
  }, []);

  const goToStep = useCallback((step: ChatStep) => {
    dispatch({ type: 'SET_STEP', step });
  }, []);

  const value: ChatContextValue = {
    ...state,
    generatedOffers: state.generatedOffers,
    sendMessage,
    selectQuickReply,
    resetChat,
    goToStep
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
}