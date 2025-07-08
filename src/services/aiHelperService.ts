// AI Helper Service for FAQs and Customer Support
// Provides instant answers to common questions about the rental platform

export interface FAQCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  relatedQuestions: string[];
}

export interface AIResponse {
  answer: string;
  confidence: number; // 0-1
  source: string;
  relatedQuestions?: string[];
  suggestedActions?: string[];
}

// FAQ Categories
export const faqCategories: FAQCategory[] = [
  {
    id: 'safety',
    name: 'Safety & Verification',
    description: 'Questions about our safety features and verification process',
    icon: '🛡️'
  },
  {
    id: 'rentals',
    name: 'Renting Items',
    description: 'How to rent items, pricing, and rental process',
    icon: '📦'
  },
  {
    id: 'listing',
    name: 'Listing Items',
    description: 'How to list your items for rent',
    icon: '📝'
  },
  {
    id: 'payments',
    name: 'Payments & Fees',
    description: 'Payment methods, fees, and commission structure',
    icon: '💳'
  },
  {
    id: 'chat',
    name: 'Chat & Communication',
    description: 'Using our secure chat system',
    icon: '💬'
  },
  {
    id: 'account',
    name: 'Account & Profile',
    description: 'Managing your account and profile settings',
    icon: '👤'
  },
  {
    id: 'technical',
    name: 'Technical Support',
    description: 'App issues, mobile access, and technical problems',
    icon: '🔧'
  }
];

// FAQ Database
const faqDatabase: FAQItem[] = [
  // Safety & Verification
  {
    id: 'safety-1',
    question: 'How does your verification process work?',
    answer: 'Our three-step verification process includes: 1) ID verification using government-issued documents, 2) Background check for item owners, and 3) Social verification for enhanced trust. Each step adds to your safety score and verification level. Only verified users can rent or list items.',
    category: 'safety',
    tags: ['verification', 'safety', 'background check', 'ID'],
    relatedQuestions: ['safety-2', 'safety-3', 'safety-4']
  },
  {
    id: 'safety-2',
    question: 'What is the Mom-Approved badge?',
    answer: 'The Mom-Approved badge is our highest trust indicator for family-focused users. It\'s awarded to users who have completed all verification steps and have a proven track record of safe, family-friendly interactions. This badge helps parents identify trusted community members.',
    category: 'safety',
    tags: ['mom-approved', 'badge', 'family', 'trust'],
    relatedQuestions: ['safety-1', 'safety-3']
  },
  {
    id: 'safety-3',
    question: 'How do you protect my family\'s safety?',
    answer: 'We protect your family through multiple layers: verified users only, AI-powered message filtering, real-time content moderation, easy reporting system, and comprehensive safety guidelines. All users must complete verification, and our chat system automatically filters inappropriate content.',
    category: 'safety',
    tags: ['family safety', 'protection', 'filtering', 'moderation'],
    relatedQuestions: ['safety-1', 'safety-4', 'chat-1']
  },
  {
    id: 'safety-4',
    question: 'What should I do if I feel unsafe?',
    answer: 'If you feel unsafe, immediately: 1) Stop communication with the user, 2) Report the conversation using the flag icon in chat, 3) Block the user if needed, 4) Contact our safety team at safety@celebrationShare.com. Trust your instincts - it\'s better to report something harmless than ignore a real concern.',
    category: 'safety',
    tags: ['unsafe', 'report', 'block', 'emergency'],
    relatedQuestions: ['safety-3', 'chat-2']
  },

  // Renting Items
  {
    id: 'rentals-1',
    question: 'How do I rent an item?',
    answer: 'To rent an item: 1) Browse items and select one you want, 2) Choose your rental dates, 3) Review the total cost (including deposit), 4) Click "Rent Now" to proceed to checkout, 5) Complete payment securely through our platform, 6) Coordinate pickup with the owner through our secure chat system.',
    category: 'rentals',
    tags: ['rent', 'process', 'checkout', 'payment'],
    relatedQuestions: ['rentals-2', 'rentals-3', 'payments-1']
  },
  {
    id: 'rentals-2',
    question: 'What is the security deposit for?',
    answer: 'The security deposit is a pre-authorization hold (not a charge) that protects the item owner in case of damage or late returns. It\'s typically 20-50% of the item\'s value and is released back to you after the item is returned in good condition. The deposit amount varies by item.',
    category: 'rentals',
    tags: ['deposit', 'security', 'damage', 'protection'],
    relatedQuestions: ['rentals-1', 'rentals-4']
  },
  {
    id: 'rentals-3',
    question: 'How do I know if an item is available?',
    answer: 'Item availability is shown in real-time on each item\'s page. You can see the owner\'s response time and current availability status. When you select rental dates, the system will confirm if the item is available for those dates. You can also message the owner directly to check availability.',
    category: 'rentals',
    tags: ['availability', 'dates', 'calendar', 'booking'],
    relatedQuestions: ['rentals-1', 'chat-1']
  },
  {
    id: 'rentals-4',
    question: 'What happens if I damage an item?',
    answer: 'If you damage an item: 1) Take photos immediately, 2) Contact the owner through our platform, 3) Report the damage in your rental history, 4) Work with the owner to resolve the issue fairly. The security deposit may be used to cover repair costs. We encourage open communication and fair resolution.',
    category: 'rentals',
    tags: ['damage', 'deposit', 'repair', 'resolution'],
    relatedQuestions: ['rentals-2', 'safety-4']
  },

  // Listing Items
  {
    id: 'listing-1',
    question: 'How do I list an item for rent?',
    answer: 'To list an item: 1) Click "List Your Item" in the navigation, 2) Fill out the item details (title, description, photos, category), 3) Set your daily and weekly rates, 4) Add pickup instructions and availability, 5) Complete your verification if you haven\'t already, 6) Submit for review. Your item will be live within 24 hours.',
    category: 'listing',
    tags: ['list', 'item', 'create', 'submit'],
    relatedQuestions: ['listing-2', 'listing-3', 'safety-1']
  },
  {
    id: 'listing-2',
    question: 'How much should I charge for my item?',
    answer: 'Consider these factors when pricing: item value, condition, demand in your area, and similar items on the platform. A good starting point is 5-10% of the item\'s value per day. You can also offer weekly discounts to encourage longer rentals. Check similar items in your area for competitive pricing.',
    category: 'listing',
    tags: ['pricing', 'rates', 'value', 'competition'],
    relatedQuestions: ['listing-1', 'payments-2']
  },
  {
    id: 'listing-3',
    question: 'What types of items can I list?',
    answer: 'You can list any family-friendly items: party supplies, furniture, decor, electronics, sports equipment, tools, and more. Items must be in good condition, safe for use, and appropriate for family events. We don\'t allow dangerous items, weapons, or inappropriate content.',
    category: 'listing',
    tags: ['items', 'allowed', 'family-friendly', 'condition'],
    relatedQuestions: ['listing-1', 'safety-3']
  },
  {
    id: 'listing-4',
    question: 'How do I manage my listings?',
    answer: 'To manage your listings: 1) Go to your profile page, 2) Click on "My Listings" tab, 3) View all your active and inactive items, 4) Edit details, update photos, or adjust pricing, 5) Mark items as unavailable when needed, 6) View rental history and earnings for each item.',
    category: 'listing',
    tags: ['manage', 'listings', 'edit', 'profile'],
    relatedQuestions: ['listing-1', 'payments-3']
  },
  {
    id: 'listing-5',
    question: 'What if someone damages my item?',
    answer: 'If your item is damaged: 1) Document the damage with photos, 2) Contact the renter through our platform, 3) Report the issue in your rental history, 4) Work with the renter to resolve fairly, 5) The security deposit can be used for repairs, 6) Contact support if you need mediation.',
    category: 'listing',
    tags: ['damage', 'repair', 'deposit', 'mediation'],
    relatedQuestions: ['rentals-4', 'payments-3']
  },
  {
    id: 'listing-6',
    question: 'Can I cancel a rental?',
    answer: 'Yes, you can cancel a rental, but please do so as early as possible. Cancellations within 24 hours of pickup may result in a small fee. Always communicate with the renter through our platform and provide a clear reason for cancellation. Frequent cancellations may affect your listing visibility.',
    category: 'listing',
    tags: ['cancel', 'rental', 'policy', 'communication'],
    relatedQuestions: ['listing-1', 'chat-1']
  },
  {
    id: 'listing-7',
    question: 'How do I handle pickup and return?',
    answer: 'For pickup: 1) Agree on a time and location with the renter, 2) Meet in a safe, public location, 3) Verify the renter\'s ID matches their profile, 4) Inspect the item together, 5) Take photos of the item\'s condition. For return: 1) Meet at the same location, 2) Inspect the item for damage, 3) Take photos if there are issues, 4) Release the security deposit if everything is good.',
    category: 'listing',
    tags: ['pickup', 'return', 'meet', 'inspection', 'safety'],
    relatedQuestions: ['listing-5', 'safety-4']
  },
  {
    id: 'listing-8',
    question: 'What should I do if a renter doesn\'t return my item?',
    answer: 'If a renter doesn\'t return your item: 1) Contact them immediately through our platform, 2) Document all communication attempts, 3) Report the issue to our safety team at safety@celebrationShare.com, 4) Provide photos and rental details, 5) We\'ll help mediate and may involve law enforcement if necessary. The security deposit can help cover losses.',
    category: 'listing',
    tags: ['missing', 'stolen', 'non-return', 'safety', 'mediation'],
    relatedQuestions: ['listing-5', 'safety-1']
  },

  // Payments & Fees
  {
    id: 'payments-1',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover) and debit cards. All payments are processed securely through Stripe. We don\'t accept cash payments or bank transfers for security reasons. Your payment information is encrypted and never stored on our servers.',
    category: 'payments',
    tags: ['payment', 'credit card', 'stripe', 'security'],
    relatedQuestions: ['payments-2', 'rentals-1']
  },
  {
    id: 'payments-2',
    question: 'How much commission do you take?',
    answer: 'We have a tiered fee structure: 22% for new users (0-9 rentals) and 18% for experienced users (10+ rentals), with a minimum of $2 and maximum of $50 per transaction. This helps cover platform costs, safety features, insurance, and 24/7 customer support. The fee is automatically calculated and deducted from your earnings.',
    category: 'payments',
    tags: ['commission', 'fees', 'earnings', 'percentage', 'tiered'],
    relatedQuestions: ['payments-1', 'listing-2']
  },
  {
    id: 'payments-3',
    question: 'When do I get paid for my rentals?',
    answer: 'You receive payment 2-3 business days after the rental period ends, assuming the item is returned in good condition. The payment includes your rental fee minus our platform fee (22% for new users, 18% for experienced users). If there are any issues or disputes, payment may be delayed until resolution.',
    category: 'payments',
    tags: ['payment', 'timing', 'earnings', 'schedule'],
    relatedQuestions: ['payments-2', 'rentals-4']
  },
  {
    id: 'payments-4',
    question: 'How does the affiliate program work?',
    answer: 'Our affiliate program lets you earn 2-4% commission by referring friends and neighbors to CelebrationShare. You earn commission on top of the rental fee - item owners still get their full payment. Tiers: Starter (2%): 5 referrals, Pro (3%): 25 referrals, Elite (4%): 50+ referrals. Commissions are paid within 24 hours.',
    category: 'payments',
    tags: ['affiliate', 'commission', 'referral', 'earnings', 'program'],
    relatedQuestions: ['payments-2', 'account-1']
  },

  // Chat & Communication
  {
    id: 'chat-1',
    question: 'How does your secure chat work?',
    answer: 'Our secure chat system includes: auto-filtering for inappropriate content, verified users only, real-time moderation, easy reporting, and message safety scoring. All messages are scanned for personal information, profanity, and safety concerns. You can block users and report any concerning messages.',
    category: 'chat',
    tags: ['chat', 'secure', 'filtering', 'moderation'],
    relatedQuestions: ['chat-2', 'safety-3']
  },
  {
    id: 'chat-2',
    question: 'Can I share my phone number in chat?',
    answer: 'No, we strongly discourage sharing personal information like phone numbers, addresses, or email addresses in chat. Our system automatically filters and blocks personal information for your safety. Keep all communication through our platform until you feel comfortable meeting in person.',
    category: 'chat',
    tags: ['personal info', 'phone', 'safety', 'communication'],
    relatedQuestions: ['chat-1', 'safety-4']
  },

  // Account & Profile
  {
    id: 'account-1',
    question: 'How do I update my profile?',
    answer: 'To update your profile: 1) Go to your profile page, 2) Click "Edit Profile", 3) Update your information, photos, or preferences, 4) Save your changes. You can also update your verification information, safety settings, and notification preferences from your profile.',
    category: 'account',
    tags: ['profile', 'edit', 'update', 'settings'],
    relatedQuestions: ['account-2', 'safety-1']
  },
  {
    id: 'account-2',
    question: 'How do I delete my account?',
    answer: 'To delete your account: 1) Go to your profile settings, 2) Scroll to the bottom, 3) Click "Delete Account", 4) Confirm your decision. Note: This will permanently remove all your data, active listings, and rental history. Make sure to resolve any active rentals first.',
    category: 'account',
    tags: ['delete', 'account', 'permanent', 'data'],
    relatedQuestions: ['account-1']
  },

  // Technical Support
  {
    id: 'technical-1',
    question: 'How do I access the mobile app?',
    answer: 'You can access our mobile app by: 1) Scanning the QR code on our website, 2) Visiting our website on your mobile browser (it\'s fully responsive), 3) Adding our website to your home screen for a native app experience. We\'re working on dedicated iOS and Android apps.',
    category: 'technical',
    tags: ['mobile', 'app', 'QR code', 'access'],
    relatedQuestions: ['technical-2']
  },
  {
    id: 'technical-2',
    question: 'The app is loading slowly, what should I do?',
    answer: 'Try these steps: 1) Check your internet connection, 2) Refresh the page, 3) Clear your browser cache, 4) Try a different browser, 5) Restart your device. If the problem persists, contact our support team with details about your device and browser.',
    category: 'technical',
    tags: ['slow', 'loading', 'performance', 'troubleshoot'],
    relatedQuestions: ['technical-1']
  }
];

// Simple keyword matching for AI responses
const findBestMatch = (userQuestion: string): AIResponse => {
  const question = userQuestion.toLowerCase();
  
  // Direct keyword matching
  for (const faq of faqDatabase) {
    const questionWords = faq.question.toLowerCase().split(' ');
    const tagMatches = faq.tags.filter(tag => question.includes(tag.toLowerCase()));
    const questionMatches = questionWords.filter(word => question.includes(word));
    
    if (tagMatches.length > 0 || questionMatches.length >= 2) {
      return {
        answer: faq.answer,
        confidence: Math.min(0.9, (tagMatches.length * 0.3) + (questionMatches.length * 0.1)),
        source: `FAQ: ${faq.question}`,
        relatedQuestions: faq.relatedQuestions.map(id => 
          faqDatabase.find(f => f.id === id)?.question
        ).filter(Boolean) as string[]
      };
    }
  }

  // Fallback responses for common patterns
  if (question.includes('hello') || question.includes('hi')) {
    return {
      answer: 'Hello! I\'m your AI helper for CelebrationShare. I can answer questions about renting items, safety features, payments, and more. What would you like to know?',
      confidence: 0.8,
      source: 'Greeting response'
    };
  }

  if (question.includes('help') || question.includes('support')) {
    return {
      answer: 'I\'m here to help! I can answer questions about our platform, safety features, rental process, and more. Try asking about specific topics like "How do I rent an item?" or "What is the verification process?"',
      confidence: 0.7,
      source: 'Help response',
      suggestedActions: ['Ask about renting', 'Learn about safety', 'Payment questions', 'Technical support']
    };
  }

  if (question.includes('contact') || question.includes('human') || question.includes('speak to')) {
    return {
      answer: 'I can help with most questions! However, if you need to speak with a human, here are your options:\n\n📧 General Support: support@celebrationShare.com\n🛡️ Safety Concerns: safety@celebrationShare.com\n📞 Phone: Contact us via email for fastest response\n💬 Live Chat: Available on our website during business hours\n\nFor urgent safety issues, email safety@celebrationShare.com and we\'ll respond within 2 hours.',
      confidence: 0.9,
      source: 'Contact information',
      suggestedActions: ['Email support', 'Call us', 'Safety concerns', 'Live chat']
    };
  }

  // Default response
  return {
    answer: 'I\'m not sure I understand your question. Could you try rephrasing it? I can help with topics like renting items, safety features, payments, listing items, and technical support.',
    confidence: 0.3,
    source: 'Default response',
    suggestedActions: ['How to rent items', 'Safety features', 'Payment methods', 'Listing items']
  };
};

// Main AI helper function
export const getAIResponse = async (userQuestion: string): Promise<AIResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return findBestMatch(userQuestion);
};

// Get FAQ categories
export const getFAQCategories = async (): Promise<FAQCategory[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return faqCategories;
};

// Get FAQs by category
export const getFAQsByCategory = async (categoryId: string): Promise<FAQItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return faqDatabase.filter(faq => faq.category === categoryId);
};

// Search FAQs
export const searchFAQs = async (query: string): Promise<FAQItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  const searchTerm = query.toLowerCase();
  
  return faqDatabase.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm) ||
    faq.answer.toLowerCase().includes(searchTerm) ||
    faq.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

// Get popular questions
export const getPopularQuestions = async (): Promise<FAQItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  // Return most commonly asked questions
  return [
    faqDatabase.find(f => f.id === 'safety-1')!,
    faqDatabase.find(f => f.id === 'rentals-1')!,
    faqDatabase.find(f => f.id === 'payments-1')!,
    faqDatabase.find(f => f.id === 'chat-1')!,
    faqDatabase.find(f => f.id === 'listing-1')!
  ];
}; 