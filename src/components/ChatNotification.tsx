import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Shield, X } from 'lucide-react';
import { getChatRooms } from '../services/chatService';

interface ChatNotificationProps {
  userId: string;
  className?: string;
}

const ChatNotification: React.FC<ChatNotificationProps> = ({ userId, className = '' }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [safetyAlerts, setSafetyAlerts] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChatData();
    
    // Refresh every 30 seconds
    const interval = setInterval(loadChatData, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  const loadChatData = async () => {
    try {
      const rooms = await getChatRooms(userId);
      const totalUnread = rooms.reduce((sum, room) => sum + room.unreadCount, 0);
      const alerts = rooms.filter(room => room.safetyStatus === 'warning' || room.safetyStatus === 'blocked').length;
      
      setUnreadCount(totalUnread);
      setSafetyAlerts(alerts);
      
      // Show notification if there are new messages and user hasn't dismissed
      if (totalUnread > 0 && !showNotification) {
        setShowNotification(true);
      }
    } catch (error) {
      // ... removed all console.error statements ...
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <>
      {/* Chat Icon with Badge */}
      <Link
        to="/chat"
        className={`relative p-2 text-text hover:text-accent transition-colors ${className}`}
        title="Messages"
      >
        <MessageSquare className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center font-medium">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
        {safetyAlerts > 0 && (
          <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </Link>

      {/* Floating Notification */}
      {showNotification && unreadCount > 0 && (
        <div className="fixed bottom-20 right-4 bg-white border border-secondary rounded-lg shadow-lg p-4 max-w-sm z-50 animate-slide-up">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-accent" />
              <h4 className="font-semibold text-primary">New Messages</h4>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-text hover:text-accent transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-text mb-3">
            You have {unreadCount} unread message{unreadCount > 1 ? 's' : ''} from verified users.
          </p>
          {safetyAlerts > 0 && (
            <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800 mb-3">
              <Shield className="w-4 h-4" />
              <span>{safetyAlerts} conversation{safetyAlerts > 1 ? 's' : ''} flagged for review</span>
            </div>
          )}
          <Link
            to="/chat"
            onClick={() => setShowNotification(false)}
            className="block w-full bg-primary text-white text-center py-2 rounded-lg hover:bg-mauve-700 transition-colors text-sm font-medium"
          >
            View Messages
          </Link>
        </div>
      )}
    </>
  );
};

export default ChatNotification; 