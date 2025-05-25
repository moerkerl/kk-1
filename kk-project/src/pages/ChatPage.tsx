import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, ArrowLeft, Bot, User } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';

export default function ChatPage() {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const { messages, isTyping, sendMessage, selectQuickReply } = useChat();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;
    const userInput = inputValue.trim();
    setInputValue('');
    sendMessage(userInput);
  };

  const handleQuickReply = (option: any) => {
    if (isTyping) return;
    selectQuickReply(option);
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
          {messages.map((message) => (
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
                    <Button
                      key={option.id}
                      onClick={() => handleQuickReply(option)}
                      disabled={isTyping}
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                    >
                      {option.text}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
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
              disabled={isTyping}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                       disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
            <Button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              size="lg"
            >
              {isTyping ? (
                <LoadingSpinner size="small" />
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span className="hidden sm:inline">Senden</span>
                </>
              )}
            </Button>
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