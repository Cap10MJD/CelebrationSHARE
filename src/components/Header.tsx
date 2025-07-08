import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Shield, User, Heart, Bell, Smartphone, MessageSquare, Phone } from 'lucide-react';
import QRCodeGenerator from './QRCodeGenerator';
import ContactSupport from './ContactSupport';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showContactSupport, setShowContactSupport] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-mauve-800 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">CelebrationShare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/browse"
              className={`font-medium transition-colors ${
                isActive('/browse') ? 'text-accent' : 'text-primary hover:text-accent'
              }`}
            >
              Browse Items
            </Link>
            <Link
              to="/list-item"
              className={`font-medium transition-colors ${
                isActive('/list-item') ? 'text-accent' : 'text-primary hover:text-accent'
              }`}
            >
              List Your Item
            </Link>
            <Link
              to="/services"
              className="font-medium text-primary hover:text-accent transition-colors"
            >
              Services
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text w-4 h-4" />
              <input
                type="text"
                placeholder="Search for party supplies, furniture, decor..."
                className="w-full pl-10 pr-4 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowContactSupport(true)}
              className="p-2 text-text hover:text-accent transition-colors"
              title="Contact Support"
            >
              <Phone className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowQRCode(!showQRCode)}
              className="p-2 text-text hover:text-accent transition-colors"
              title="Get Mobile App QR Code"
            >
              <Smartphone className="w-5 h-5" />
            </button>
            
            {/* Auth Buttons - Show when not logged in */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                to="/login"
                className="text-primary hover:text-accent transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-mauve-700 transition-colors font-medium"
              >
                Sign Up
              </Link>
            </div>

            {/* User Profile - Show when logged in */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                to="/chat"
                className="p-2 text-text hover:text-accent transition-colors relative"
                title="Messages"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>
              <button className="p-2 text-text hover:text-accent transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 text-text hover:text-accent transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <Link
                to="/profile"
                className="p-2 text-text hover:text-accent transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-text hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-secondary py-4 fade-in">
            <div className="flex flex-col space-y-4">
              <div className="px-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search items..."
                    className="w-full pl-10 pr-4 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white"
                  />
                </div>
              </div>
              <Link
                to="/browse"
                className="block px-4 py-2 text-primary hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Items
              </Link>
              <Link
                to="/list-item"
                className="block px-4 py-2 text-primary hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                List Your Item
              </Link>
              <Link
                to="/services"
                className="block px-4 py-2 text-primary hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <button
                onClick={() => {
                  setShowContactSupport(true);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-primary hover:text-accent transition-colors"
              >
                Contact Support
              </button>
              <Link
                to="/chat"
                className="block px-4 py-2 text-primary hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Messages
              </Link>
              
              {/* Mobile Auth Links */}
              <div className="border-t border-secondary pt-4 mt-4">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-primary hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 bg-primary text-white mx-4 rounded-lg hover:bg-mauve-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* QR Code Modal */}
        {showQRCode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full">
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
                  subtitle="Point your phone camera at this QR code to open the mobile app"
                  size={200}
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
      </div>
    </header>
  );
};

export default Header;