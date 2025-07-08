import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Shield, User, Heart, Bell, Home, Grid3X3, Plus, Smartphone, MessageSquare, Phone } from 'lucide-react';
import QRCodeGenerator from './QRCodeGenerator';
import ContactSupport from './ContactSupport';

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showContactSupport, setShowContactSupport] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Header */}
      <header className="bg-white shadow-soft sticky top-0 z-50 md:hidden">
        <div className="px-4">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-gradient-to-br from-primary to-mauve-800 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-primary">CelebrationShare</span>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowContactSupport(true)}
                className="p-2 text-text hover:text-accent transition-colors"
                title="Contact Support"
              >
                <Phone className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowQRCode(true)}
                className="p-2 text-text hover:text-accent transition-colors"
                title="Get Mobile App QR Code"
              >
                <Smartphone className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-text hover:text-accent transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link
                to="/chat"
                className="p-2 text-text hover:text-accent transition-colors relative"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>
              <button className="p-2 text-text hover:text-accent transition-colors relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></div>
              </button>
              <Link
                to="/profile"
                className="p-2 text-text hover:text-accent transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="pb-4 fade-in">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search party supplies..."
                  className="w-full pl-10 pr-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white text-base"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-secondary z-50 md:hidden">
        <div className="grid grid-cols-5 h-16">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center space-y-1 ${
              isActive('/') ? 'text-accent' : 'text-text'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </Link>
          
          <Link
            to="/browse"
            className={`flex flex-col items-center justify-center space-y-1 ${
              isActive('/browse') ? 'text-accent' : 'text-text'
            }`}
          >
            <Grid3X3 className="w-5 h-5" />
            <span className="text-xs font-medium">Browse</span>
          </Link>
          
          <Link
            to="/list-item"
            className={`flex flex-col items-center justify-center space-y-1 ${
              isActive('/list-item') ? 'text-accent' : 'text-text'
            }`}
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mb-1">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-medium text-primary">List</span>
          </Link>
          
          <Link
            to="/chat"
            className={`flex flex-col items-center justify-center space-y-1 ${
              isActive('/chat') ? 'text-accent' : 'text-text'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs font-medium">Chat</span>
          </Link>
          
          <Link
            to="/favorites"
            className={`flex flex-col items-center justify-center space-y-1 ${
              isActive('/favorites') ? 'text-accent' : 'text-text'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span className="text-xs font-medium">Saved</span>
          </Link>
        </div>
      </nav>

      {/* QR Code Modal */}
      {showQRCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-sm w-full">
            <div className="flex justify-between items-center p-4 border-b border-secondary">
              <h3 className="text-lg font-semibold text-primary">Get Mobile App</h3>
              <button
                onClick={() => setShowQRCode(false)}
                className="text-text hover:text-accent transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <QRCodeGenerator
                url="http://192.168.6.121:5173"
                title="Scan for Mobile App"
                description="Point your phone camera at this QR code to open the mobile app"
                size={180}
              />
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

export default MobileHeader;