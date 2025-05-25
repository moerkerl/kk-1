import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, ArrowLeft, Bot, User } from 'lucide-react';
import { ChatState, Message, ChatStep, ChatFormData, QuickReplyOption } from '../types/chat';
import { chatFlow, processUserInput, getNextStep } from '../utils/chatFlow';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ChatPage() {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    currentStep: 'welcome',
    collectedData: {},
    isTyping: false
  });

  // Initialize chat with welcome message
  useEffect(() => {
    const welcomeStep = chatFlow['welcome'];
    const welcomeMessage: Message = {
      id: 'welcome-1',
      text: welcomeStep.getMessage({}),
      sender: 'assistant',
      timestamp: new Date(),
      options: welcomeStep.getQuickReplies?.()
    };
    setChatState(prev => ({
      ...prev,
      messages: [welcomeMessage]
    }));
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatState.messages]);

  const addMessage = (text: string, sender: 'user' | 'assistant', options?: QuickReplyOption[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      options
    };
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));
  };

  const handleUserInput = async (input: string) => {
    // Add user message
    addMessage(input, 'user');
    
    // Show typing indicator
    setChatState(prev => ({ ...prev, isTyping: true }));

    // Process input
    const { newData, isValid, error } = processUserInput(
      chatState.currentStep,
      input,
      chatState.collectedData
    );

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!isValid && error) {
      // Show error message
      setChatState(prev => ({ ...prev, isTyping: false }));
      addMessage(`❌ ${error}`, 'assistant');
      return;
    }

    // Update collected data
    setChatState(prev => ({
      ...prev,
      collectedData: newData,
      isTyping: false
    }));

    // Move to next step
    const nextStep = getNextStep(chatState.currentStep, newData);
    setChatState(prev => ({ ...prev, currentStep: nextStep }));

    // Handle special steps
    if (nextStep === 'generating-offers') {
      // Show generating message
      const generatingStep = chatFlow[nextStep];
      addMessage(generatingStep.getMessage(newData), 'assistant');
      
      // Simulate calculation time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Move to offers ready
      setChatState(prev => ({ ...prev, currentStep: 'offers-ready' }));
      const offersStep = chatFlow['offers-ready'];
      addMessage(
        offersStep.getMessage(newData), 
        'assistant',
        offersStep.getQuickReplies?.()
      );
    } else if (nextStep === 'offers-ready' && input.includes('Angebote ansehen')) {
      // Navigate to offers page with collected data
      navigate('/offers', { state: { formData: newData } });
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
  };

  const handleSend = () => {
    if (!inputValue.trim() || chatState.isTyping) return;
    const userInput = inputValue.trim();
    setInputValue('');
    handleUserInput(userInput);
  };

  const handleQuickReply = (option: QuickReplyOption) => {
    if (chatState.isTyping) return;
    handleUserInput(option.text);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center">
          <button
            onClick={() => navigate('/')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold">Krankenkassen-Assistent</h1>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {chatState.messages.map((message) => (
            <div key={message.id}>
              <div
                className={`flex items-start gap-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary-600" />
                  </div>
                )}
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-900 shadow-sm border border-gray-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
                {message.sender === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                )}
              </div>
              
              {/* Quick Reply Options */}
              {message.options && message.sender === 'assistant' && (
                <div className="mt-3 flex flex-wrap gap-2 ml-11">
                  {message.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleQuickReply(option)}
                      disabled={chatState.isTyping}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-full 
                               text-sm font-medium text-gray-700 hover:bg-gray-50 
                               hover:border-primary-500 hover:text-primary-600 
                               transition-all disabled:opacity-50 disabled:cursor-not-allowed
                               shadow-sm"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* Typing Indicator */}
          {chatState.isTyping && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary-600" />
              </div>
              <div className="bg-white text-gray-900 shadow-sm border border-gray-100 px-4 py-3 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ihre Antwort eingeben..."
              disabled={chatState.isTyping}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                       disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || chatState.isTyping}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg 
                       hover:bg-primary-700 transition-colors flex items-center gap-2
                       disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {chatState.isTyping ? (
                <LoadingSpinner size="small" />
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span className="hidden sm:inline">Senden</span>
                </>
              )}
            </button>
          </form>
          
          {/* Helper text */}
          <p className="mt-2 text-xs text-gray-500 text-center">
            💡 Tipp: Sie können auch die Schnellantwort-Buttons verwenden
          </p>
        </div>
      </div>
    </div>
  );
}