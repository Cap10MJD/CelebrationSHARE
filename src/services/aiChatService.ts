// AI Chat Service for Customer Support
// Handles knowledge base responses, chat analytics, and human escalation

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'system';
  timestamp: Date;
  type?: 'text' | 'quick_reply' | 'escalation';
  category?: string;
  confidence?: number;
}

export interface ChatSession {
  id: string;
  userId?: string;
  messages: ChatMessage[];
  startedAt: Date;
  endedAt?: Date;
  escalated: boolean;
  escalationReason?: string;
  userSatisfaction?: number;
}

export interface KnowledgeBaseEntry {
  id: string;
  category: string;
  keywords: string[];
  question: string;
  answer: string;
  confidence: number;
}

// Knowledge Base for AI Responses
const knowledgeBase: KnowledgeBaseEntry[] = [
  {
    id: 'pricing-1',
    category: 'pricing',
    keywords: ['pricing', 'fee', 'cost', 'price', 'charge', 'rate'],
    question: 'How does pricing work?',
    answer: `Our pricing is simple and transparent! 💰

• **Platform Fee**: 22% for new users, 18% for experienced users (10+ rentals)
• **Security Deposit**: Varies by item (typically $25-$200)
• **Insurance**: Optional damage protection starting at $5/day

You save up to 40% compared to traditional rental companies! The platform fee covers:
✅ Secure payments
✅ 24/7 support
✅ Insurance options
✅ Dispute resolution
✅ Safety verification

Would you like to see our full pricing breakdown?`,
    confidence: 0.95
  },
  {
    id: 'safety-1',
    category: 'safety',
    keywords: ['safety', 'insurance', 'secure', 'protection', 'damage', 'trust'],
    question: 'Safety & insurance',
    answer: `Your safety is our top priority! 🛡️

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

All items are verified and our community is built on trust. We're here to help if anything goes wrong!`,
    confidence: 0.92
  },
  {
    id: 'verification-1',
    category: 'verification',
    keywords: ['verification', 'account', 'setup', 'verify', 'id', 'background'],
    question: 'Account verification',
    answer: `Getting verified is quick and easy! ✅

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

The whole process takes about 5 minutes! Would you like help with any specific step?`,
    confidence: 0.90
  },
  {
    id: 'rental-1',
    category: 'rental_process',
    keywords: ['rental', 'process', 'how to', 'book', 'rent', 'borrow'],
    question: 'Rental process',
    answer: `Here's how renting works on CelebrationShare! 🎉

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

Need help with a specific part of the process?`,
    confidence: 0.88
  },
  {
    id: 'technical-1',
    category: 'technical',
    keywords: ['technical', 'app', 'website', 'bug', 'error', 'login', 'password'],
    question: 'Technical support',
    answer: `I'm here to help with technical issues! 🔧

**Common Solutions:**
• **Can't login?** Try resetting your password
• **App not working?** Try refreshing or reinstalling
• **Payment issues?** Check your payment method
• **Upload problems?** Ensure files are under 10MB

**Still having trouble?** I can connect you with our technical support team who can help with:
• Account access issues
• Payment processing problems
• App functionality bugs
• Data synchronization issues

Would you like me to escalate this to our technical team?`,
    confidence: 0.85
  },
  {
    id: 'affiliate-1',
    category: 'affiliate',
    keywords: ['affiliate', 'referral', 'commission', 'earn', 'money', 'program'],
    question: 'Affiliate program',
    answer: `Earn money by referring friends to CelebrationShare! 💰

**How it works:**
• Share your unique referral link
• Friends sign up and make their first rental
• You earn commission on their rentals

**Commission Tiers:**
• **Bronze**: 2% commission (1-5 referrals)
• **Silver**: 3% commission (6-15 referrals)
• **Gold**: 4% commission (16+ referrals)

**What you earn:**
• Commission on platform fees
• Bonus rewards for high performers
• Early access to new features

Ready to start earning? I can help you get set up!`,
    confidence: 0.87
  }
];

// Chat Analytics Storage
let chatSessions: ChatSession[] = [];
let chatAnalytics = {
  totalSessions: 0,
  totalMessages: 0,
  escalationRate: 0,
  averageSatisfaction: 0,
  commonQuestions: {} as Record<string, number>,
  responseTime: 0
};

// Find the best knowledge base response
export const findBestResponse = (userInput: string): KnowledgeBaseEntry | null => {
  const input = userInput.toLowerCase();
  let bestMatch: KnowledgeBaseEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    
    // Check keyword matches
    for (const keyword of entry.keywords) {
      if (input.includes(keyword)) {
        score += 2;
      }
    }
    
    // Check for exact question matches
    if (input.includes(entry.question.toLowerCase())) {
      score += 5;
    }
    
    // Boost score based on confidence
    score += entry.confidence;
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  // Only return if we have a good match (score > 3)
  return bestScore > 3 ? bestMatch : null;
};

// Generate AI response
export const generateAIResponse = async (userInput: string): Promise<string> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const bestMatch = findBestResponse(userInput);
  
  if (bestMatch) {
    return bestMatch.answer;
  }
  
  // Fallback response
  return `I'm here to help! 🤝

I can assist with:
• **Pricing & fees** - Learn about our transparent pricing
• **Safety & insurance** - Understand our safety features
• **Account verification** - Get verified quickly
• **Rental process** - How renting works
• **Technical support** - Account or app issues

Or you can always talk to a real person! Just let me know what you need help with.`;
};

// Track chat session
export const startChatSession = (userId?: string): string => {
  const sessionId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const session: ChatSession = {
    id: sessionId,
    userId,
    messages: [],
    startedAt: new Date(),
    escalated: false
  };
  
  chatSessions.push(session);
  chatAnalytics.totalSessions++;
  
  return sessionId;
};

// Add message to session
export const addMessageToSession = (sessionId: string, message: ChatMessage) => {
  const session = chatSessions.find(s => s.id === sessionId);
  if (session) {
    session.messages.push(message);
    chatAnalytics.totalMessages++;
    
    // Track common questions
    if (message.sender === 'user') {
      const category = findBestResponse(message.text)?.category || 'other';
      chatAnalytics.commonQuestions[category] = (chatAnalytics.commonQuestions[category] || 0) + 1;
    }
  }
};

// End chat session
export const endChatSession = (sessionId: string, escalated: boolean = false, satisfaction?: number) => {
  const session = chatSessions.find(s => s.id === sessionId);
  if (session) {
    session.endedAt = new Date();
    session.escalated = escalated;
    if (satisfaction) {
      session.userSatisfaction = satisfaction;
    }
    
    // Update analytics
    if (escalated) {
      chatAnalytics.escalationRate = (chatAnalytics.escalationRate * (chatAnalytics.totalSessions - 1) + 1) / chatAnalytics.totalSessions;
    }
    
    if (satisfaction) {
      const currentAvg = chatAnalytics.averageSatisfaction;
      const totalSatisfied = currentAvg * (chatAnalytics.totalSessions - 1);
      chatAnalytics.averageSatisfaction = (totalSatisfied + satisfaction) / chatAnalytics.totalSessions;
    }
  }
};

// Get chat analytics
export const getChatAnalytics = () => {
  return {
    ...chatAnalytics,
    recentSessions: chatSessions.slice(-10), // Last 10 sessions
    topQuestions: Object.entries(chatAnalytics.commonQuestions)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([category, count]) => ({ category, count }))
  };
};

// Escalate to human support
export const escalateToHuman = async (sessionId: string, userData: {
  name: string;
  email: string;
  orderId?: string;
  issue?: string;
}) => {
  const session = chatSessions.find(s => s.id === sessionId);
  if (session) {
    session.escalated = true;
    session.escalationReason = userData.issue || 'User requested human support';
    
    // In a real implementation, this would send to your support system
    const supportTicket = {
      id: `ticket_${Date.now()}`,
      sessionId,
      userData,
      chatHistory: session.messages,
      createdAt: new Date(),
      priority: 'normal'
    };
    
    // Simulate sending to support system
    console.log('Support ticket created:', supportTicket);
    
    return supportTicket.id;
  }
  
  return null;
};

// Export knowledge base for admin panel
export const getKnowledgeBase = () => knowledgeBase;

// Add new knowledge base entry (for admin use)
export const addKnowledgeBaseEntry = (entry: Omit<KnowledgeBaseEntry, 'id'>) => {
  const newEntry: KnowledgeBaseEntry = {
    ...entry,
    id: `kb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  };
  knowledgeBase.push(newEntry);
  return newEntry;
}; 