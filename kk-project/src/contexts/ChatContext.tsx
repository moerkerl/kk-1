import { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';
import { ChatState, Message, ChatStep, ChatFormData, QuickReplyOption } from '../types/chat';

interface ChatContextValue extends ChatState {
  sendMessage: (text: string) => void;
  selectQuickReply: (option: QuickReplyOption) => void;
  resetChat: () => void;
  goToStep: (step: ChatStep) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

type ChatAction =
  | { type: 'ADD_MESSAGE'; message: Message }
  | { type: 'SET_TYPING'; isTyping: boolean }
  | { type: 'SET_STEP'; step: ChatStep }
  | { type: 'UPDATE_DATA'; data: Partial<ChatFormData> }
  | { type: 'RESET_CHAT' };

const initialState: ChatState = {
  messages: [],
  currentStep: 'welcome',
  collectedData: {},
  isTyping: false
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
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
    case 'RESET_CHAT':
      return initialState;
    default:
      return state;
  }
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

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

  const sendMessage = useCallback((text: string) => {
    addMessage(text, 'user');
    dispatch({ type: 'SET_TYPING', isTyping: true });
    
    // Process message will be handled in the ChatPage component
  }, [addMessage]);

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

// Export dispatch for internal use in chat logic
export function useChatDispatch() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatDispatch must be used within ChatProvider');
  }
  return { dispatch, addMessage };
}