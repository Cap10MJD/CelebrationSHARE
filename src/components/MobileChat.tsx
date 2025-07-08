import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Send, 
  MessageSquare, 
  Shield, 
  User, 
  MoreVertical, 
  Flag, 
  Block, 
  ArrowLeft,
  Image as ImageIcon,
  Paperclip,
  CheckCircle,
  AlertTriangle,
  Clock,
  Phone,
  Mail,
  ChevronLeft,
  Search,
  Filter
} from 'lucide-react';
import { 
  getChatRooms, 
  getChatMessages, 
  sendMessage, 
  markMessageAsRead,
  getUserProfile,
  reportMessage,
  blockUser,
  type ChatRoom,
  type ChatMessage,
  type UserChatProfile
} from '../services/chatService';

const MobileChat: React.FC = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [view, setView] = useState<'rooms' | 'chat'>('rooms');
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [otherUser, setOtherUser] = useState<UserChatProfile | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSafetyInfo, setShowSafetyInfo] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = 'user_sarah'; // In real app, this would come from auth

  // Load chat rooms
  useEffect(() => {
    loadChatRooms();
  }, []);

  // Load messages when room changes
  useEffect(() => {
    if (selectedRoom && view === 'chat') {
      loadMessages(selectedRoom.id);
      loadOtherUserProfile();
      markMessagesAsRead();
    }
  }, [selectedRoom, view]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Set selected room from URL params
  useEffect(() => {
    if (roomId && chatRooms.length > 0) {
      const room = chatRooms.find(r => r.id === roomId);
      if (room) {
        setSelectedRoom(room);
        setView('chat');
      }
    }
  }, [roomId, chatRooms]);

  const loadChatRooms = async () => {
    try {
      const rooms = await getChatRooms(currentUserId);
      setChatRooms(rooms);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (roomId: string) => {
    try {
      const roomMessages = await getChatMessages(roomId);
      setMessages(roomMessages);
    }
  };

  const loadOtherUserProfile = async () => {
    if (!selectedRoom) return;
    
    const otherUserId = selectedRoom.participants.find(id => id !== currentUserId);
    if (otherUserId) {
      try {
        const profile = await getUserProfile(otherUserId);
        setOtherUser(profile);
      }
    }
  };

  const markMessagesAsRead = async () => {
    if (selectedRoom) {
      try {
        await markMessageAsRead(selectedRoom.id, currentUserId);
        setChatRooms(prev => prev.map(room => 
          room.id === selectedRoom.id ? { ...room, unreadCount: 0 } : room
        ));
      }
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedRoom || !otherUser) return;

    setSending(true);
    try {
      const otherUserId = selectedRoom.participants.find(id => id !== currentUserId);
      if (!otherUserId) return;

      const message = await sendMessage(
        currentUserId,
        otherUserId,
        newMessage.trim(),
        selectedRoom.id
      );

      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      setChatRooms(prev => prev.map(room => 
        room.id === selectedRoom.id 
          ? { ...room, lastMessage: message, updatedAt: new Date() }
          : room
      ));
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReportMessage = async () => {
    if (!selectedMessage || !reportReason.trim()) return;

    try {
      await reportMessage(selectedMessage.id, currentUserId, reportReason);
      setShowReportModal(false);
      setReportReason('');
      setSelectedMessage(null);
      alert('Message reported successfully. Our safety team will review it.');
    }
  };

  const handleBlockUser = async () => {
    if (!otherUser) return;

    if (confirm(`Are you sure you want to block ${otherUser.displayName}?`)) {
      try {
        await blockUser(currentUserId, otherUser.userId);
        alert('User blocked successfully.');
      }
    }
  };

  const getMessageStatus = (message: ChatMessage) => {
    if (message.moderationStatus === 'blocked') {
      return <AlertTriangle className="w-3 h-3 text-red-500" title="Message blocked" />;
    } else if (message.moderationStatus === 'flagged') {
      return <AlertTriangle className="w-3 h-3 text-yellow-500" title="Message flagged" />;
    } else if (message.isRead) {
      return <CheckCircle className="w-3 h-3 text-green-500" title="Read" />;
    } else {
      return <Clock className="w-3 h-3 text-gray-400" title="Sent" />;
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const filteredRooms = chatRooms.filter(room => {
    if (!searchTerm) return true;
    const otherUserId = room.participants.find(id => id !== currentUserId);
    return otherUserId?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {view === 'rooms' ? (
        // Chat Rooms List View
        <div className="flex flex-col h-screen">
          {/* Header */}
          <div className="bg-white border-b border-secondary p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold text-primary">Messages</h1>
              <button
                onClick={() => setShowSafetyInfo(true)}
                className="p-2 text-text hover:text-accent transition-colors"
              >
                <Shield className="w-5 h-5" />
              </button>
            </div>
            
            {/* Search */}
            <div className="mt-3 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                data-testid="mobile-chat-input"
              />
            </div>
          </div>

          {/* Chat Rooms List */}
          <div className="flex-1 overflow-y-auto">
            {filteredRooms.length === 0 ? (
              <div className="p-6 text-center text-text">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="font-medium">No conversations found</p>
                <p className="text-sm text-gray-500 mt-1">
                  {searchTerm ? 'Try adjusting your search' : 'Start browsing items to connect!'}
                </p>
              </div>
            ) : (
              filteredRooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => {
                    setSelectedRoom(room);
                    setView('chat');
                    navigate(`/chat/${room.id}`);
                  }}
                  className="p-4 border-b border-secondary bg-white active:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      {room.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                          {room.unreadCount}
                        </div>
                      )}
                      {room.safetyStatus === 'warning' && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-primary truncate">
                          {room.participants.find(id => id !== currentUserId) || 'Unknown User'}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {room.lastMessage ? formatTime(room.lastMessage.timestamp) : 'No messages'}
                        </span>
                      </div>
                      {room.lastMessage && (
                        <p className="text-sm text-text truncate mt-1">
                          {room.lastMessage.content}
                        </p>
                      )}
                    </div>
                    <ChevronLeft className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        // Chat View
        <div className="flex flex-col h-screen">
          {/* Chat Header */}
          <div className="bg-white border-b border-secondary p-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setView('rooms');
                  navigate('/chat');
                }}
                className="p-2 text-text hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="relative">
                <img
                  src={otherUser?.avatar || '/images/default-avatar.png'}
                  alt={otherUser?.displayName || 'User'}
                  className="w-10 h-10 rounded-full"
                />
                {otherUser?.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-primary">{otherUser?.displayName || 'Unknown User'}</h2>
                <p className="text-sm text-text">
                  {otherUser?.isOnline ? 'Online' : `Last seen ${otherUser?.lastSeen ? formatTime(otherUser.lastSeen) : 'unknown'}`}
                </p>
              </div>
              <button
                onClick={handleBlockUser}
                className="p-2 text-text hover:text-red-500 transition-colors"
              >
                <Block className="w-5 h-5" />
              </button>
            </div>

            {/* User Verification Badges */}
            {otherUser && (
              <div className="flex flex-wrap gap-1 mt-2">
                {otherUser.badges.map((badge, index) => (
                  <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] ${
                  message.senderId === currentUserId 
                    ? 'bg-primary text-white' 
                    : 'bg-white border border-secondary'
                } rounded-lg p-3 relative`}
                  data-testid={`mobile-chat-message`}
                >
                  
                  <p className={`text-sm ${
                    message.senderId === currentUserId ? 'text-white' : 'text-primary'
                  }`}
                    data-testid={`mobile-chat-message-text`}
                  >
                    {message.content}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs ${
                      message.senderId === currentUserId ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </span>
                    <div className="flex items-center gap-1">
                      {getMessageStatus(message)}
                      {message.senderId !== currentUserId && (
                        <button
                          onClick={() => {
                            setSelectedMessage(message);
                            setShowReportModal(true);
                          }}
                          className="p-1 hover:bg-black/10 rounded"
                        >
                          <Flag className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {message.moderationStatus === 'flagged' && (
                    <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                      ⚠️ This message was flagged for review
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-secondary p-3">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full p-3 border border-secondary rounded-lg resize-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                  rows={1}
                  maxLength={500}
                  data-testid="mobile-chat-input"
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || sending}
                className="bg-primary text-white p-3 rounded-lg hover:bg-mauve-700 transition-colors disabled:opacity-50"
                data-testid="mobile-chat-send"
              >
                {sending ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>Messages are filtered for family safety</span>
              <span>{newMessage.length}/500</span>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-sm p-4">
            <h3 className="text-lg font-semibold text-primary mb-3">Report Message</h3>
            <p className="text-text mb-3 text-sm">
              Help us keep our community safe by reporting inappropriate content.
            </p>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Please describe why you're reporting this message..."
              className="w-full p-3 border border-secondary rounded-lg resize-none focus:ring-2 focus:ring-accent focus:border-transparent mb-3 text-sm"
              rows={3}
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowReportModal(false);
                  setReportReason('');
                  setSelectedMessage(null);
                }}
                className="flex-1 border border-secondary text-primary py-2 rounded-lg hover:bg-background transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReportMessage}
                disabled={!reportReason.trim()}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Safety Info Modal */}
      {showSafetyInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-primary">Safety Features</h3>
              <button
                onClick={() => setShowSafetyInfo(false)}
                className="text-text hover:text-accent transition-colors"
              >
                ×
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-primary">Auto-filtering</p>
                  <p className="text-text">Messages are automatically scanned for inappropriate content</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <User className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-primary">Verified users only</p>
                  <p className="text-text">Chat with users who have completed verification</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Flag className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-primary">Easy reporting</p>
                  <p className="text-text">Report any concerning messages with one tap</p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <Shield className="w-4 h-4 inline mr-1" />
                Your family's safety is our top priority. All conversations are monitored for inappropriate content.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileChat; 