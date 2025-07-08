import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Search, 
  Bot, 
  User, 
  ChevronDown, 
  ChevronUp,
  HelpCircle,
  Shield,
  CreditCard,
  Package,
  Settings,
  Smartphone,
  FileText,
  Phone
} from 'lucide-react';
import ContactSupport from './ContactSupport';
import { 
  getAIResponse, 
  getFAQCategories, 
  getFAQsByCategory, 
  searchFAQs, 
  getPopularQuestions,
  type AIResponse,
  type FAQCategory,
  type FAQItem
} from '../services/aiHelperService';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  response?: AIResponse;
}

const AIHelper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [popularQuestions, setPopularQuestions] = useState<FAQItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FAQItem[]>([]);
  const [showContactSupport, setShowContactSupport] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      loadInitialData();
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadInitialData = async () => {
    try {
      const [categoriesData, popularData] = await Promise.all([
        getFAQCategories(),
        getPopularQuestions()
      ]);
      setCategories(categoriesData);
      setPopularQuestions(popularData);
      
      // Add welcome message
      if (messages.length === 0) {
        setMessages([{
          id: 'welcome',
          text: 'Hello! I\'m your AI helper for CelebrationShare. I can answer questions about renting items, safety features, payments, and more. How can I help you today?',
          isUser: false,
          timestamp: new Date(),
          response: {
            answer: 'Hello! I\'m your AI helper for CelebrationShare. I can answer questions about renting items, safety features, payments, and more. How can I help you today?',
            confidence: 1,
            source: 'Welcome message',
            suggestedActions: ['How to rent items', 'Safety features', 'Payment methods', 'Listing items', 'Technical support']
          }
        }]);
      }
    } catch (error) {
      console.error('Failed to load initial data:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await getAIResponse(inputValue.trim());
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.answer,
        isUser: false,
        timestamp: new Date(),
        response
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I\'m having trouble processing your request. Please try again or contact our support team.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = async (question: string) => {
    setInputValue(question);
    // Trigger send after a brief delay to show the question being typed
    setTimeout(() => {
      setInputValue('');
      handleSendMessage();
    }, 100);
  };

  const handleCategorySelect = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    try {
      const categoryFaqs = await getFAQsByCategory(categoryId);
      setFaqs(categoryFaqs);
    } catch (error) {
      console.error('Failed to load category FAQs:', error);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      try {
        const results = await searchFAQs(query);
        setSearchResults(results);
      } catch (error) {
        console.error('Failed to search FAQs:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      safety: <Shield className="w-4 h-4" />,
      rentals: <Package className="w-4 h-4" />,
      listing: <FileText className="w-4 h-4" />,
      payments: <CreditCard className="w-4 h-4" />,
      chat: <MessageCircle className="w-4 h-4" />,
      account: <Settings className="w-4 h-4" />,
      technical: <Smartphone className="w-4 h-4" />
    };
    return icons[categoryId] || <HelpCircle className="w-4 h-4" />;
  };

  return (
    <>
      {/* Floating AI Helper Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-mauve-700 transition-colors z-40 flex items-center justify-center"
        title="AI Helper"
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* AI Helper Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end z-50 p-4">
          <div className="bg-white rounded-t-xl w-full max-w-md h-[600px] flex flex-col shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-secondary">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">AI Helper</h3>
                  <p className="text-xs text-text">Ask me anything about CelebrationShare</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowContactSupport(true)}
                  className="p-2 text-text hover:text-accent transition-colors"
                  title="Contact Human Support"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-text hover:text-accent transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-secondary">
              <button
                onClick={() => setShowFAQ(false)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  !showFAQ ? 'text-accent border-b-2 border-accent' : 'text-text hover:text-accent'
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setShowFAQ(true)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  showFAQ ? 'text-accent border-b-2 border-accent' : 'text-text hover:text-accent'
                }`}
              >
                FAQ
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              {!showFAQ ? (
                // Chat Interface
                <div className="flex flex-col h-full">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] ${
                          message.isUser 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-100 text-primary'
                        } rounded-lg p-3`}>
                          <p className="text-sm">{message.text}</p>
                          
                          {/* Related Questions */}
                          {message.response?.relatedQuestions && message.response.relatedQuestions.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <p className="text-xs text-gray-500 mb-2">Related questions:</p>
                              <div className="space-y-1">
                                {message.response.relatedQuestions.slice(0, 3).map((question, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleQuickQuestion(question)}
                                    className="block text-xs text-blue-600 hover:text-blue-800 text-left"
                                  >
                                    {question}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Suggested Actions */}
                          {message.response?.suggestedActions && message.response.suggestedActions.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <p className="text-xs text-gray-500 mb-2">Try asking about:</p>
                              <div className="flex flex-wrap gap-1">
                                {message.response.suggestedActions.map((action, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleQuickQuestion(action)}
                                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                                  >
                                    {action}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 text-primary rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <div className="animate-pulse">●</div>
                            <div className="animate-pulse delay-100">●</div>
                            <div className="animate-pulse delay-200">●</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Questions */}
                  {messages.length === 1 && (
                    <div className="p-4 border-t border-secondary">
                      <p className="text-xs text-text mb-3">Popular questions:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {popularQuestions.slice(0, 4).map((faq) => (
                          <button
                            key={faq.id}
                            onClick={() => handleQuickQuestion(faq.question)}
                            className="text-xs bg-gray-100 text-primary p-2 rounded text-left hover:bg-gray-200 transition-colors line-clamp-2"
                          >
                            {faq.question}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 border-t border-secondary">
                    <div className="flex gap-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything..."
                        className="flex-1 px-3 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                        disabled={isTyping}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping}
                        className="bg-primary text-white p-2 rounded-lg hover:bg-mauve-700 transition-colors disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // FAQ Interface
                <div className="flex flex-col h-full">
                  {/* Search */}
                  <div className="p-4 border-b border-secondary">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search FAQs..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="p-4 border-b border-secondary">
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategorySelect(category.id)}
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            selectedCategory === category.id
                              ? 'bg-accent text-white'
                              : 'bg-gray-100 text-primary hover:bg-gray-200'
                          }`}
                        >
                          <span>{category.icon}</span>
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* FAQ List */}
                  <div className="flex-1 overflow-y-auto p-4">
                    {(searchQuery ? searchResults : faqs).map((faq) => (
                      <div key={faq.id} className="mb-4">
                        <button
                          onClick={() => handleQuickQuestion(faq.question)}
                          className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <h4 className="font-medium text-primary text-sm mb-1">{faq.question}</h4>
                          <p className="text-xs text-text line-clamp-2">{faq.answer}</p>
                        </button>
                      </div>
                    ))}
                    
                    {searchQuery && searchResults.length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-text text-sm">No FAQs found for "{searchQuery}"</p>
                        <p className="text-xs text-gray-500 mt-1">Try different keywords or browse categories</p>
                      </div>
                    )}
                    
                    {!searchQuery && !selectedCategory && (
                      <div className="text-center py-8">
                        <p className="text-text text-sm">Select a category or search to browse FAQs</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contact Support Modal */}
      <ContactSupport 
        isOpen={showContactSupport} 
        onClose={() => setShowContactSupport(false)} 
      />
    </>
  );
};

export default AIHelper; 