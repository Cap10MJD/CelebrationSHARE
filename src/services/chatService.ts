// Secure chat service for family-focused rental marketplace
// Includes safety features, message filtering, and verification requirements

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  messageType: 'text' | 'image' | 'system' | 'safety_alert';
  timestamp: Date;
  isRead: boolean;
  isFlagged: boolean;
  safetyScore: number; // 0-100, lower = more concerning
  moderationStatus: 'pending' | 'approved' | 'flagged' | 'blocked';
  attachments?: {
    type: 'image' | 'document';
    url: string;
    filename: string;
    size: number;
  }[];
}

export interface ChatRoom {
  id: string;
  participants: string[];
  itemId?: string; // If chat is about a specific item
  lastMessage?: ChatMessage;
  unreadCount: number;
  isActive: boolean;
  safetyStatus: 'safe' | 'warning' | 'blocked';
  verificationRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserChatProfile {
  userId: string;
  displayName: string;
  avatar: string;
  verificationLevel: number;
  safetyScore: number;
  isOnline: boolean;
  lastSeen: Date;
  responseTime: string;
  badges: string[];
}

export interface SafetySettings {
  autoFilter: boolean;
  profanityFilter: boolean;
  personalInfoFilter: boolean;
  imageModeration: boolean;
  blockUnverifiedUsers: boolean;
  requireVerification: boolean;
  reportThreshold: number;
}

// Mock chat database
const chatRooms: Map<string, ChatRoom> = new Map();
const messages: Map<string, ChatMessage[]> = new Map();
const userProfiles: Map<string, UserChatProfile> = new Map();

// Initialize with some sample data
const initializeChatData = () => {
  // Sample user profiles
  userProfiles.set('user_sarah', {
    userId: 'user_sarah',
    displayName: 'Sarah M.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    verificationLevel: 3,
    safetyScore: 95,
    isOnline: true,
    lastSeen: new Date(),
    responseTime: '< 1 hour',
    badges: ['ID Verified', 'Background Check', 'Mom-Approved']
  });

  userProfiles.set('user_michael', {
    userId: 'user_michael',
    displayName: 'Michael K.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    verificationLevel: 3,
    safetyScore: 98,
    isOnline: false,
    lastSeen: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    responseTime: '< 2 hours',
    badges: ['ID Verified', 'Background Check', 'Social Linked', 'Mom-Approved']
  });

  // Sample chat room
  const chatRoomId = 'chat_1';
  chatRooms.set(chatRoomId, {
    id: chatRoomId,
    participants: ['user_sarah', 'user_michael'],
    itemId: 'item_1',
    unreadCount: 2,
    isActive: true,
    safetyStatus: 'safe',
    verificationRequired: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date()
  });

  // Sample messages
  const roomMessages: ChatMessage[] = [
    {
      id: 'msg_1',
      senderId: 'user_sarah',
      receiverId: 'user_michael',
      content: 'Hi! I\'m interested in renting your sound system for my daughter\'s birthday party this weekend. Is it still available?',
      messageType: 'text',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: true,
      isFlagged: false,
      safetyScore: 95,
      moderationStatus: 'approved'
    },
    {
      id: 'msg_2',
      senderId: 'user_michael',
      receiverId: 'user_sarah',
      content: 'Yes, it\'s available! I\'d be happy to help with your daughter\'s party. What day were you thinking?',
      messageType: 'text',
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
      isRead: true,
      isFlagged: false,
      safetyScore: 98,
      moderationStatus: 'approved'
    },
    {
      id: 'msg_3',
      senderId: 'user_sarah',
      receiverId: 'user_michael',
      content: 'Perfect! It\'s this Saturday from 2-6 PM. Do you provide setup service?',
      messageType: 'text',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isRead: false,
      isFlagged: false,
      safetyScore: 95,
      moderationStatus: 'approved'
    }
  ];

  messages.set(chatRoomId, roomMessages);
};

initializeChatData();

// Safety and moderation functions
const profanityList = [
  // Add common profanity words here
  'bad_word_1', 'bad_word_2'
];

const personalInfoPatterns = [
  /\b\d{3}-\d{3}-\d{4}\b/g, // Phone numbers
  /\b\d{5}(-\d{4})?\b/g, // ZIP codes
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, // Email addresses
  /\b\d{3}-\d{2}-\d{4}\b/g, // SSN
];

const filterMessage = (content: string): { filteredContent: string; safetyScore: number; flags: string[] } => {
  let filteredContent = content;
  let safetyScore = 100;
  const flags: string[] = [];

  // Check for profanity
  const hasProfanity = profanityList.some(word => 
    content.toLowerCase().includes(word.toLowerCase())
  );
  if (hasProfanity) {
    safetyScore -= 30;
    flags.push('profanity');
    filteredContent = filteredContent.replace(/\b\w*\b/g, (match) => {
      return profanityList.includes(match.toLowerCase()) ? '*'.repeat(match.length) : match;
    });
  }

  // Check for personal information
  const hasPersonalInfo = personalInfoPatterns.some(pattern => pattern.test(content));
  if (hasPersonalInfo) {
    safetyScore -= 40;
    flags.push('personal_info');
    filteredContent = '[Personal information removed for safety]';
  }

  // Check for aggressive language
  const aggressiveWords = ['hate', 'stupid', 'idiot', 'shut up'];
  const hasAggressiveLanguage = aggressiveWords.some(word => 
    content.toLowerCase().includes(word.toLowerCase())
  );
  if (hasAggressiveLanguage) {
    safetyScore -= 20;
    flags.push('aggressive_language');
  }

  // Check message length (very long messages might be spam)
  if (content.length > 500) {
    safetyScore -= 10;
    flags.push('long_message');
  }

  return { filteredContent, safetyScore: Math.max(0, safetyScore), flags };
};

// Chat service functions
export const getChatRooms = async (userId: string): Promise<ChatRoom[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const userRooms: ChatRoom[] = [];
  for (const room of chatRooms.values()) {
    if (room.participants.includes(userId)) {
      userRooms.push(room);
    }
  }
  
  return userRooms.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
};

export const getChatMessages = async (chatRoomId: string): Promise<ChatMessage[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return messages.get(chatRoomId) || [];
};

export const sendMessage = async (
  senderId: string,
  receiverId: string,
  content: string,
  chatRoomId?: string,
  attachments?: ChatMessage['attachments']
): Promise<ChatMessage> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Safety filtering
  const { filteredContent, safetyScore, flags } = filterMessage(content);
  
  // Check if sender is verified
  const senderProfile = userProfiles.get(senderId);
  if (!senderProfile) {
    throw new Error('User profile not found');
  }
  
  // Determine moderation status based on safety score
  let moderationStatus: ChatMessage['moderationStatus'] = 'approved';
  if (safetyScore < 50) {
    moderationStatus = 'blocked';
  } else if (safetyScore < 70) {
    moderationStatus = 'flagged';
  }
  
  const message: ChatMessage = {
    id: `msg_${Date.now()}`,
    senderId,
    receiverId,
    content: filteredContent,
    messageType: 'text',
    timestamp: new Date(),
    isRead: false,
    isFlagged: flags.length > 0,
    safetyScore,
    moderationStatus,
    attachments
  };
  
  // Create or get chat room
  let roomId = chatRoomId;
  if (!roomId) {
    roomId = `chat_${Date.now()}`;
    const newRoom: ChatRoom = {
      id: roomId,
      participants: [senderId, receiverId],
      unreadCount: 1,
      isActive: true,
      safetyStatus: safetyScore < 70 ? 'warning' : 'safe',
      verificationRequired: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    chatRooms.set(roomId, newRoom);
    messages.set(roomId, []);
  }
  
  // Add message to room
  const roomMessages = messages.get(roomId) || [];
  roomMessages.push(message);
  messages.set(roomId, roomMessages);
  
  // Update room
  const room = chatRooms.get(roomId);
  if (room) {
    room.lastMessage = message;
    room.updatedAt = new Date();
    room.unreadCount += 1;
  }
  
  // Send safety alert if needed
  if (moderationStatus === 'flagged' || moderationStatus === 'blocked') {
    const alertMessage: ChatMessage = {
      id: `alert_${Date.now()}`,
      senderId: 'system',
      receiverId: senderId,
      content: `Your message was ${moderationStatus === 'blocked' ? 'blocked' : 'flagged'} for safety reasons. Please review our community guidelines.`,
      messageType: 'safety_alert',
      timestamp: new Date(),
      isRead: false,
      isFlagged: false,
      safetyScore: 100,
      moderationStatus: 'approved'
    };
    
    const alertRoomId = `alert_${senderId}`;
    const alertMessages = messages.get(alertRoomId) || [];
    alertMessages.push(alertMessage);
    messages.set(alertRoomId, alertMessages);
  }
  
  return message;
};

export const markMessageAsRead = async (chatRoomId: string, userId: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const roomMessages = messages.get(chatRoomId);
  if (roomMessages) {
    roomMessages.forEach(message => {
      if (message.receiverId === userId && !message.isRead) {
        message.isRead = true;
      }
    });
  }
  
  // Reset unread count
  const room = chatRooms.get(chatRoomId);
  if (room) {
    room.unreadCount = 0;
  }
};

export const getUserProfile = async (userId: string): Promise<UserChatProfile | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return userProfiles.get(userId) || null;
};

export const reportMessage = async (
  messageId: string,
  reporterId: string,
  reason: string
): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find the message and mark it as flagged
  for (const roomMessages of messages.values()) {
    const message = roomMessages.find(msg => msg.id === messageId);
    if (message) {
      message.isFlagged = true;
      message.moderationStatus = 'flagged';
      break;
    }
  }
  
  // In a real app, you'd also:
  // - Send notification to moderators
  // - Log the report
  // - Potentially auto-block the sender if multiple reports
  console.log(`Message ${messageId} reported by ${reporterId} for: ${reason}`);
};

export const blockUser = async (blockerId: string, blockedUserId: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // In a real app, you'd:
  // - Add to blocked users list
  // - Prevent future messages
  // - Update chat room status
  console.log(`User ${blockerId} blocked user ${blockedUserId}`);
};

export const getSafetySettings = async (userId: string): Promise<SafetySettings> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    autoFilter: true,
    profanityFilter: true,
    personalInfoFilter: true,
    imageModeration: true,
    blockUnverifiedUsers: true,
    requireVerification: true,
    reportThreshold: 3
  };
};

export const updateSafetySettings = async (
  userId: string,
  settings: Partial<SafetySettings>
): Promise<SafetySettings> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // In a real app, you'd save these settings to the database
  console.log(`Safety settings updated for user ${userId}:`, settings);
  
  return {
    autoFilter: true,
    profanityFilter: true,
    personalInfoFilter: true,
    imageModeration: true,
    blockUnverifiedUsers: true,
    requireVerification: true,
    reportThreshold: 3,
    ...settings
  };
};

// Real-time chat simulation (in a real app, this would use WebSockets)
export const subscribeToMessages = (
  chatRoomId: string,
  callback: (message: ChatMessage) => void
): (() => void) => {
  // Simulate real-time updates
  const interval = setInterval(() => {
    const roomMessages = messages.get(chatRoomId);
    if (roomMessages && roomMessages.length > 0) {
      const lastMessage = roomMessages[roomMessages.length - 1];
      if (lastMessage.timestamp.getTime() > Date.now() - 5000) { // Last 5 seconds
        callback(lastMessage);
      }
    }
  }, 1000);
  
  return () => clearInterval(interval);
}; 