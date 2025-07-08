import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Minimize2, Maximize2, Send, User, Bot, Mail } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'system';
  timestamp: Date;
  type?: 'text' | 'quick_reply' | 'escalation';
}

interface QuickReply {
  id: string;
  text: string;
  action: string;
}

const CustomerSupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your CelebrationShare assistant. How can I help you today? 😊",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEscalationForm, setShowEscalationForm] = useState(false);
  const [escalationData, setEscalationData] = useState({
    name: '',
    email: '',
    orderId: '',
    issue: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies: QuickReply[] = [
    { id: '1', text: 'How does pricing work?', action: 'pricing' },
    { id: '2', text: 'Safety & insurance', action: 'safety' },
    { id: '3', text: 'Account verification', action: 'verification' },
    { id: '4', text: 'Rental process', action: 'rental_process' },
    { id: '5', text: 'Talk to a person', action: 'escalate' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, sender: 'user' | 'ai' | 'system', type: 'text' | 'quick_reply' | 'escalation' = 'text') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleQuickReply = (action: string) => {
    const quickReply = quickReplies.find(qr => qr.action === action);
    if (quickReply) {
      addMessage(quickReply.text, 'user', 'quick_reply');
      handleAIResponse(action);
    }
  };

  const handleAIResponse = async (userInput: string) => {
    setIsTyping(true);
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    let response = '';
    const input = userInput.toLowerCase();

    if (input.includes('pricing') || input.includes('fee') || input.includes('cost')) {
      response = `Our pricing is simple and transparent! 💰

• **Platform Fee**: 22% for new users, 18% for experienced users (10+ rentals)
• **Security Deposit**: Varies by item (typically $25-$200)
• **Insurance**: Optional damage protection starting at $5/day

You save up to 40% compared to traditional rental companies! The platform fee covers:
✅ Secure payments
✅ 24/7 support
✅ Insurance options
✅ Dispute resolution
✅ Safety verification

Would you like to see our full pricing breakdown?`;
    } else if (input.includes('safety') || input.includes('insurance') || input.includes('secure')) {
      response = `Your safety is our top priority! 🛡️

**Safety Features:**
✅ Background checks on all users
✅ ID verification required
✅ Secure payment processing
✅ Optional damage insurance
✅ 24/7 support team
✅ Dispute resolution system

**Insurance Options:**
• Basic coverage: $5/day
• Comprehensive: $10/day
• Covers accidental damage up to $500

All items are verified and our community is built on trust. We're here to help if anything goes wrong!`;
    } else if (input.includes('verification') || input.includes('account') || input.includes('setup')) {
      response = `Getting verified is quick and easy! ✅

**Verification Steps:**
1. **Email Verification** - Confirm your email address
2. **Phone Verification** - Add your phone number
3. **ID Verification** - Upload a government ID (optional but recommended)
4. **Background Check** - Quick background verification
5. **Social Verification** - Link social media accounts

**Benefits of Verification:**
• Higher trust score
• Lower platform fees (18% vs 22%)
• Priority customer support
• Access to premium features

The whole process takes about 5 minutes! Would you like help with any specific step?`;
    } else if (input.includes('rental') || input.includes('process') || input.includes('how to')) {
      response = `Here's how renting works on CelebrationShare! 🎉

**For Renters:**
1. **Browse** - Find items in your area
2. **Book** - Select dates and pay securely
3. **Pickup** - Meet the owner or get delivery
4. **Enjoy** - Use the item for your event
5. **Return** - Return in good condition
6. **Review** - Leave a review for the community

**For Owners:**
1. **List** - Upload photos and details
2. **Verify** - Complete safety verification
3. **Respond** - Answer renter questions quickly
4. **Handoff** - Meet renters or arrange delivery
5. **Earn** - Get paid after successful rental

**Safety Tips:**
• Always meet in public places
• Take photos before/after
• Communicate through our platform
• Use our insurance options

Need help with a specific part of the process?`;
    } else if (input.includes('escalate') || input.includes('person') || input.includes('human')) {
      response = `I'd be happy to connect you with our support team! 👥

Our real people are here to help with:
• Complex issues
• Account problems
• Dispute resolution
• Special requests
• Technical support

Would you like me to collect some information and send you to our support team?`;
      setShowEscalationForm(true);
    } else {
      response = `I'm here to help! 🤝

I can assist with:
• **Pricing & fees** - Learn about our transparent pricing
• **Safety & insurance** - Understand our safety features
• **Account verification** - Get verified quickly
• **Rental process** - How renting works
• **Technical support** - Account or app issues

Or you can always talk to a real person! Just let me know what you need help with.`;
    }

    addMessage(response, 'ai');
    setIsTyping(false);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText;
    setInputText('');
    addMessage(userMessage, 'user');
    await handleAIResponse(userMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEscalation = async () => {
    if (!escalationData.name || !escalationData.email) {
      addMessage('Please provide your name and email to connect you with our support team.', 'system');
      return;
    }

    addMessage('Connecting you to our support team...', 'system');
    
    try {
      // Import the email service
      const { createSupportTicket } = await import('../services/emailService');
      
      // Create support ticket
      const ticket = await createSupportTicket(
        `chat_${Date.now()}`,
        {
          name: escalationData.name,
          email: escalationData.email,
          orderId: escalationData.orderId || undefined,
          issue: escalationData.issue || 'General inquiry'
        },
        messages
      );
      
      addMessage(`Perfect! I've sent your information to our support team. You'll receive an email at ${escalationData.email} within 1 hour with next steps.

**Support Ticket Created:**
• Ticket ID: ${ticket.id}
• Name: ${escalationData.name}
• Email: ${escalationData.email}
• Order ID: ${escalationData.orderId || 'N/A'}
• Issue: ${escalationData.issue || 'General inquiry'}
• Priority: ${ticket.priority}

Our team will review your chat history and get back to you soon! 📧`, 'ai');
      
    } catch (error) {
      addMessage('I apologize, but there was an issue creating your support ticket. Please try again or contact us directly at support@celebration-share.com', 'system');
    }
    
    setShowEscalationForm(false);
    setEscalationData({ name: '', email: '', orderId: '', issue: '' });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary hover:bg-mauve-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          aria-label="Open customer support chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)]">
      {/* Chat Header */}
      <div className="bg-primary text-white rounded-t-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold">CelebrationShare Support</h3>
            <p className="text-xs opacity-90">We're here to help! 💬</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label={isMinimized ? 'Maximize chat' : 'Minimize chat'}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Chat Messages */}
          <div className="bg-white border-l border-r border-gray-200 h-96 overflow-y-auto">
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'ai' && (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-xl p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-white'
                        : message.sender === 'system'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-xl p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && !isTyping && (
            <div className="bg-gray-50 border-l border-r border-gray-200 p-3">
              <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    onClick={() => handleQuickReply(reply.action)}
                    className="bg-white border border-gray-200 rounded-full px-3 py-1 text-xs hover:bg-gray-50 transition-colors"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Escalation Form */}
          {showEscalationForm && (
            <div className="bg-gray-50 border-l border-r border-gray-200 p-4">
              <h4 className="font-semibold text-sm mb-3">Connect with our team</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={escalationData.name}
                  onChange={(e) => setEscalationData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={escalationData.email}
                  onChange={(e) => setEscalationData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Order ID (optional)"
                  value={escalationData.orderId}
                  onChange={(e) => setEscalationData(prev => ({ ...prev, orderId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <textarea
                  placeholder="Brief description of your issue"
                  value={escalationData.issue}
                  onChange={(e) => setEscalationData(prev => ({ ...prev, issue: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={2}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleEscalation}
                    className="flex-1 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-mauve-700 transition-colors"
                  >
                    <Mail className="w-4 h-4 mr-2 inline" />
                    Send to Support
                  </button>
                  <button
                    onClick={() => setShowEscalationForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Input Area */}
          {!showEscalationForm && (
            <div className="bg-white border-l border-r border-b border-gray-200 rounded-b-xl p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="bg-primary text-white p-2 rounded-lg hover:bg-mauve-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerSupportChat; 