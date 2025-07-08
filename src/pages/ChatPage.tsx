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
  Settings,
  ArrowLeft,
  Image as ImageIcon,
  Paperclip,
  Smile,
  CheckCircle,
  AlertTriangle,
  Clock,
  Phone,
  Mail
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

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [otherUser, setOtherUser] = useState<UserChatProfile | null>(null);
  const [showSafetySettings, setShowSafetySettings] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = 'user_sarah'; // In real app, this would come from auth

  // Load chat rooms
  useEffect(() => {
    loadChatRooms();
  }, []);

  // Load messages when room changes
  useEffect(() => {
    if (selectedRoom) {
      loadMessages(selectedRoom.id);
      loadOtherUserProfile();
      markMessagesAsRead();
    }
  }, [selectedRoom]);

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
      }
    } else if (chatRooms.length > 0 && !selectedRoom) {
      setSelectedRoom(chatRooms[0]);
    }
  }, [roomId, chatRooms]);

  const loadChatRooms = async () => {
    try {
      const rooms = await getChatRooms(currentUserId);
      setChatRooms(rooms);
    } catch (error) {
      // console.error('Failed to load chat rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (roomId: string) => {
    try {
      const roomMessages = await getChatMessages(roomId);
      setMessages(roomMessages);
    } catch (error) {
      // console.error('Failed to load messages:', error);
    }
  };

  const loadOtherUserProfile = async () => {
    if (!selectedRoom) return;
    
    const otherUserId = selectedRoom.participants.find(id => id !== currentUserId);
    if (otherUserId) {
      try {
        const profile = await getUserProfile(otherUserId);
        setOtherUser(profile);
      } catch (error) {
        // console.error('Failed to load user profile:', error);
      }
    }
  };

  const markMessagesAsRead = async () => {
    if (selectedRoom) {
      try {
        await markMessageAsRead(selectedRoom.id, currentUserId);
        // Update local state
        setChatRooms(prev => prev.map(room => 
          room.id === selectedRoom.id ? { ...room, unreadCount: 0 } : room
        ));
      } catch (error) {
        // console.error('Failed to mark messages as read:', error);
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
      
      // Update chat room with new message
      setChatRooms(prev => prev.map(room => 
        room.id === selectedRoom.id 
          ? { ...room, lastMessage: message, updatedAt: new Date() }
          : room
      ));
    } catch (error) {
      // console.error('Failed to send message:', error);
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
      // Show success message
      alert('Message reported successfully. Our safety team will review it.');
    } catch (error) {
      // console.error('Failed to report message:', error);
    }
  };

  const handleBlockUser = async () => {
    if (!otherUser) return;

    if (confirm(`Are you sure you want to block ${otherUser.displayName}? You won't be able to receive messages from them.`)) {
      try {
        await blockUser(currentUserId, otherUser.userId);
        // Update UI to show blocked status
        alert('User blocked successfully.');
      } catch (error) {
        // console.error('Failed to block user:', error);
      }
    }
  };

  const getMessageStatus = (message: ChatMessage) => {
    if (message.moderationStatus === 'blocked') {
      return <AlertTriangle className="w-4 h-4 text-red-500" title="Message blocked" />;
    } else if (message.moderationStatus === 'flagged') {
      return <AlertTriangle className="w-4 h-4 text-yellow-500" title="Message flagged" />;
    } else if (message.isRead) {
      return <CheckCircle className="w-4 h-4 text-green-500" title="Read" />;
    } else {
      return <Clock className="w-4 h-4 text-gray-400" title="Sent" />;
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Chat Rooms Sidebar */}
        <div className="w-80 bg-white border-r border-secondary flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-secondary">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-primary">Messages</h1>
              <button
                onClick={() => setShowSafetySettings(true)}
                className="p-2 text-text hover:text-accent transition-colors"
                title="Safety Settings"
              >
                <Shield className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Rooms List */}
          <div className="flex-1 overflow-y-auto">
            {chatRooms.length === 0 ? (
              <div className="p-4 text-center text-text">
                <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>No conversations yet</p>
                <p className="text-sm">Start browsing items to connect with owners!</p>
              </div>
            ) : (
              chatRooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => {
                    setSelectedRoom(room);
                    navigate(`/chat/${room.id}`);
                  }}
                  className={`p-4 border-b border-secondary cursor-pointer hover:bg-background transition-colors ${
                    selectedRoom?.id === room.id ? 'bg-secondary' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      {room.safetyStatus === 'warning' && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full"></div>
                      )}
                      {room.safetyStatus === 'blocked' && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-primary truncate">
                          {room.participants.find(id => id !== currentUserId) || 'Unknown User'}
                        </h3>
                        {room.unreadCount > 0 && (
                          <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                            {room.unreadCount}
                          </span>
                        )}
                      </div>
                      {room.lastMessage && (
                        <p className="text-sm text-text truncate">
                          {room.lastMessage.content}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        {room.lastMessage ? formatTime(room.lastMessage.timestamp) : 'No messages'}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedRoom ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-secondary p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => navigate('/browse')}
                      className="md:hidden p-2 text-text hover:text-accent transition-colors"
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
                    <div>
                      <h2 className="font-semibold text-primary">{otherUser?.displayName || 'Unknown User'}</h2>
                      <div className="flex items-center gap-2 text-sm text-text">
                        {otherUser?.isOnline ? (
                          <span className="text-green-600">Online</span>
                        ) : (
                          <span>Last seen {otherUser?.lastSeen ? formatTime(otherUser.lastSeen) : 'unknown'}</span>
                        )}
                        <span>•</span>
                        <span>Responds in {otherUser?.responseTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleBlockUser}
                      className="p-2 text-text hover:text-red-500 transition-colors"
                      title="Block User"
                    >
                      <Block className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-text hover:text-accent transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
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
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${
                      message.senderId === currentUserId 
                        ? 'bg-primary text-white' 
                        : 'bg-white border border-secondary'
                    } rounded-lg p-3 relative group`}>
                      
                      {/* Message Content */}
                      <p className={`text-sm ${
                        message.senderId === currentUserId ? 'text-white' : 'text-primary'
                      }`}>
                        {message.content}
                      </p>

                      {/* Message Footer */}
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
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-black/10 rounded"
                            >
                              <Flag className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Safety Warning */}
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
              <div className="bg-white border-t border-secondary p-4">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="w-full p-3 border border-secondary rounded-lg resize-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      rows={1}
                      maxLength={500}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-text hover:text-accent transition-colors">
                      <ImageIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-text hover:text-accent transition-colors">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || sending}
                      className="bg-primary text-white p-3 rounded-lg hover:bg-mauve-700 transition-colors disabled:opacity-50"
                    >
                      {sending ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>Messages are filtered for family safety</span>
                  <span>{newMessage.length}/500</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-primary mb-2">Select a Conversation</h3>
                <p className="text-text">Choose a conversation from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Report Message</h3>
            <p className="text-text mb-4">
              Help us keep our community safe by reporting inappropriate content.
            </p>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Please describe why you're reporting this message..."
              className="w-full p-3 border border-secondary rounded-lg resize-none focus:ring-2 focus:ring-accent focus:border-transparent mb-4"
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

      {/* Safety Settings Modal */}
      {showSafetySettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Safety Settings</h3>
              <button
                onClick={() => setShowSafetySettings(false)}
                className="text-text hover:text-accent transition-colors"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-primary">Auto-filter messages</p>
                  <p className="text-sm text-text">Automatically filter inappropriate content</p>
                </div>
                <div className="w-12 h-6 bg-green-500 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-primary">Block unverified users</p>
                  <p className="text-sm text-text">Only allow messages from verified users</p>
                </div>
                <div className="w-12 h-6 bg-green-500 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-primary">Image moderation</p>
                  <p className="text-sm text-text">Scan images for inappropriate content</p>
                </div>
                <div className="w-12 h-6 bg-green-500 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>
            </div>
            <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <Shield className="w-4 h-4 inline mr-1" />
                All messages are automatically scanned for safety. Our AI helps protect families from inappropriate content.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage; 