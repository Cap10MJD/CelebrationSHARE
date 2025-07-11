import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import QRCodeGenerator from './components/QRCodeGenerator';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import SignupPage from './pages/SignupPage';
import VerificationPage from './pages/VerificationPage';
import AffiliateProgramPage from './pages/AffiliateProgramPage';
import AdminFeePage from './pages/AdminFeePage';
import PricingPage from './pages/PricingPage';
import ChatAnalyticsPage from './pages/ChatAnalyticsPage';
import AffiliateDashboard from './components/AffiliateDashboard';
import AISafetyAdvisor from './components/AISafetyAdvisor';
import CommunityRecommendations from './components/CommunityRecommendations';
import SustainabilityTracker from './components/SustainabilityTracker';
import MomApprovedFilter from './components/MomApprovedFilter';
import CustomerSupportChat from './components/CustomerSupportChat';

// Simple placeholder components with enhanced styling
const HomePage = () => (
  <div className="min-h-screen">
    <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 lg:py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-200 rounded-full opacity-20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Neighborhood Party Rental Community - Share, Save & Celebrate Life's Special Moments Together
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Rent from Your Neighbors. Support your community. Earn extra income and help your neighbors celebrate life's special moments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/browse"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🏠 Browse Neighbor Items
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              👥 Join Your Community
            </Link>
            <Link
              to="/list-item"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all transform hover:scale-105"
            >
              💰 Earn from Your Stuff
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-green-500">✅</span>
              <span>Verified Users</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-blue-500">🔒</span>
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-yellow-500">⭐</span>
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose CelebrationShare?</h2>
          <p className="text-xl text-gray-600">The smart way to rent and share party equipment</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all border border-blue-200 transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">💒</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Wedding & Events</h3>
            <p className="text-gray-700 leading-relaxed">
              Complete wedding rental services including decorations, tables, chairs, audio systems, and elegant tents.
            </p>
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all border border-purple-200 transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">🎈</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Kids Parties</h3>
            <p className="text-gray-700 leading-relaxed">
              Safe, family-friendly party equipment and decorations perfect for children's birthday parties and events.
            </p>
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 hover:shadow-xl transition-all border border-pink-200 transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">👨‍👩‍👧‍👦</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Stay-at-Home Parents</h3>
            <p className="text-gray-700 leading-relaxed">
              Perfect for parents looking to earn extra income! List your party items and earn money while helping neighbors celebrate special moments.
            </p>
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all border border-green-200 transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">💰</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Affiliate Program</h3>
            <p className="text-gray-700 leading-relaxed">
              Earn up to 4% commission by referring neighbors to CelebrationShare! Build your community and your income at the same time.
            </p>
            <Link to="/affiliate" className="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all">
              Learn More →
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* How it works */}
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Simple steps to start sharing and saving</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">1</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">List Your Items</h3>
            <p className="text-gray-600">Turn your garage treasures into income - that wedding arch needs a new life!</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">2</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Connect with Neighbors</h3>
            <p className="text-gray-600">Meet trusted neighbors in your community through safe, verified rentals</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">3</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Earn & Celebrate</h3>
            <p className="text-gray-600">Make money while helping neighbors create unforgettable memories</p>
          </div>
        </div>
      </div>
    </section>

    {/* Mobile App QR Code Section */}
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">📱 Install Our App</h2>
          <p className="text-xl text-gray-600">Access CelebrationShare on the go with our App</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📱</span>
              <h3 className="text-2xl font-bold text-gray-900">Mobile Experience</h3>
            </div>
            
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✅</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Easy Browsing</h4>
                  <p>Find and rent items with just a few taps</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✅</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Quick Listings</h4>
                  <p>List your items in minutes with photo upload</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✅</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Real-time Chat</h4>
                  <p>Message renters and owners instantly</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✅</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Location Services</h4>
                  <p>Find items near you with GPS integration</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <span className="text-2xl">🌐</span>
                <div className="text-left">
                  <div className="text-xs">Install via</div>
                  <div className="text-sm font-bold">Safari Browser</div>
                </div>
              </button>
              <button className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <span className="text-2xl">📱</span>
                <div className="text-left">
                  <div className="text-xs">Install via</div>
                  <div className="text-sm font-bold">Chrome Browser</div>
                </div>
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <QRCodeGenerator 
              url="https://celebrationShare.com"
              size={200}
              title="Scan to get the CelebrationShare App"
              subtitle="CelebrationShare Mobile App"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
);

const BrowsePage = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">🎉 Browse Amazing Rentals</h1>
        <p className="text-xl text-gray-600">Find the perfect items for your next celebration</p>
      </div>
      
      {/* Search and filters */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Search items..." 
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Categories</option>
            <option>Tables & Chairs</option>
            <option>Decorations</option>
            <option>Audio Equipment</option>
            <option>Party Supplies</option>
          </select>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
            🔍 Search
          </button>
        </div>
        
        {/* Mom-Approved Filter */}
        <div className="mt-6">
          <MomApprovedFilter />
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: "Elegant Wedding Chairs", price: 25, image: "https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=400", category: "Furniture" },
          { name: "Party Decoration Set", price: 15, image: "https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&w=400", category: "Decorations" },
          { name: "Professional Sound System", price: 45, image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400", category: "Audio" },
          { name: "Kids Party Package", price: 20, image: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=400", category: "Party Supplies" },
          { name: "Wedding Arch & Decor", price: 35, image: "https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=400", category: "Decorations" },
          { name: "Portable Tables Set", price: 30, image: "https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&w=400", category: "Furniture" }
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                {item.category}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">Perfect for any celebration</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">${item.price}/day</span>
                <Link to={`/item/${index + 1}`} className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ItemDetailPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="h-96 md:h-full bg-gradient-to-br from-blue-100 to-purple-100 relative">
              <img
                src="https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Elegant Wedding Chairs"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full">
                Premium Quality
              </div>
            </div>
          </div>
          <div className="md:w-1/2 p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Elegant Wedding Chairs</h1>
              <p className="text-gray-600 mb-4">Beautiful, comfortable chairs perfect for your special day</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                <span className="text-gray-600">(24 reviews)</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                <span className="text-gray-700 font-medium">Daily Rate:</span>
                <span className="text-3xl font-bold text-blue-600">$25</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl">
                <span className="text-gray-700 font-medium">Weekly Rate:</span>
                <span className="text-2xl font-semibold text-purple-600">$150</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                <span className="text-gray-700 font-medium">Security Deposit:</span>
                <span className="text-xl font-semibold text-green-600">$50</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-gray-900">Features:</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span className="text-gray-600">Comfortable seating</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span className="text-gray-600">Elegant design</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span className="text-gray-600">Easy setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span className="text-gray-600">Weather resistant</span>
                </div>
              </div>
            </div>
            
            <Link to="/checkout" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all text-center block text-lg">
              🎉 Rent Now - $25/day
            </Link>
          </div>
        </div>
        
        {/* Community Recommendations Section */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl">
          <CommunityRecommendations />
        </div>
      </div>
    </div>
  </div>
);

const ListItemPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">📝 List Your Item</h1>
        <p className="text-xl text-gray-600">Share your items with the community and earn money</p>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Item Name *</label>
            <input type="text" placeholder="e.g., Elegant Wedding Chairs" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Select Category</option>
              <option>Furniture</option>
              <option>Decorations</option>
              <option>Audio Equipment</option>
              <option>Party Supplies</option>
              <option>Lighting</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea rows={4} placeholder="Describe your item, its condition, and any special features..." className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Daily Rate ($) *</label>
              <input type="number" placeholder="25" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Rate ($)</label>
              <input type="number" placeholder="150" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photos</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <span className="text-gray-500">📷 Click to upload photos or drag and drop</span>
            </div>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all text-lg">
            🚀 List My Item
          </button>
        </form>
      </div>
    </div>
  </div>
);

const LoginPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back! 👋</h1>
        <p className="text-gray-600">Sign in to your CelebrationShare account</p>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input type="email" placeholder="Enter your email address" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input type="password" placeholder="Enter your password" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-700">Forgot password?</a>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all">
            🔐 Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
            Don't have an account? Sign up here
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const CheckoutPage = () => {
  // Calculate commission and fees
  const subtotal = 75; // $25/day × 3 days
  // Use tiered commission structure - this will be calculated dynamically based on user tier
  const getCommissionRate = (userTier: 'newUser' | 'experiencedUser') => {
    return userTier === 'experiencedUser' ? 0.18 : 0.22; // 18% for experienced, 22% for new users
  };
  // For demo purposes, using new user rate (22%)
  const commissionRate = getCommissionRate('newUser');
  const commission = subtotal * commissionRate;
  const securityDeposit = 50;
  const total = subtotal + commission + securityDeposit;
  const ownerEarnings = subtotal - commission;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">💳 Complete Your Rental</h1>
          <p className="text-xl text-gray-600">Secure checkout for your celebration items</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                <img src="https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Wedding Chairs" className="w-16 h-16 rounded-lg object-cover mr-4" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Elegant Wedding Chairs</h3>
                  <p className="text-gray-600">3 days rental</p>
                </div>
                <span className="text-xl font-bold text-blue-600">${subtotal}</span>
              </div>
              
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">${subtotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Platform Commission (22%):</span>
                  <span className="font-semibold text-orange-600">-${commission}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Owner receives:</span>
                  <span className="font-semibold text-green-600">${ownerEarnings}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Security Deposit:</span>
                  <span className="font-semibold">${securityDeposit}</span>
                </div>
                <div className="border-t pt-3 flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">${total}</span>
                </div>
              </div>
              
              {/* Commission Breakdown */}
              <div className="bg-blue-50 p-4 rounded-xl mt-4">
                <h3 className="font-semibold text-gray-900 mb-2">💡 How it works:</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>• You pay: <span className="font-semibold">${total}</span> (includes 22% platform fee)</div>
                  <div>• Owner receives: <span className="font-semibold text-green-600">${ownerEarnings}</span></div>
                  <div>• Platform fee: <span className="font-semibold text-orange-600">${commission}</span> (keeps the community safe)</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                  <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                  <input type="text" placeholder="123" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all text-lg">
                💳 Pay ${total}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">👤 Your Profile</h1>
        <p className="text-xl text-gray-600">Manage your account, verification, and listings</p>
      </div>
      
      {/* Verification Status */}
      <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Verification Status</h2>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">⚠️</span>
            <span className="text-yellow-600 font-semibold">Verification Required</span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Email Verified</h3>
                <p className="text-sm text-gray-600">Your email has been verified</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 border border-yellow-200 rounded-xl bg-yellow-50">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 text-sm">!</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Phone Verification</h3>
                <p className="text-sm text-gray-600">Click to verify your phone number</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                Verify
              </button>
            </div>
            
            <div className="flex items-center gap-3 p-4 border border-yellow-200 rounded-xl bg-yellow-50">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 text-sm">!</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">ID Verification</h3>
                <p className="text-sm text-gray-600">Upload a photo ID for security</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                Upload
              </button>
            </div>
            
            <div className="flex items-center gap-3 p-4 border border-yellow-200 rounded-xl bg-yellow-50">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 text-sm">!</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Background Check</h3>
                <p className="text-sm text-gray-600">Complete background verification</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                Start
              </button>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-4">Why Verify?</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Build trust with your neighbors</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Get verified badge on your profile</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Increase your rental success rate</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Access to premium features</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" placeholder="Enter your full name" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" placeholder="Enter your email address" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input type="tel" placeholder="Enter your phone number" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all">
                💾 Update Profile
              </button>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Listings</h2>
            <div className="space-y-4">
              <div className="flex items-center p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <img src="https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Wedding Chairs" className="w-16 h-16 rounded-lg object-cover mr-4" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Elegant Wedding Chairs</h3>
                  <p className="text-gray-600">$25/day • 3 active rentals</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">Edit</button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm">Delete</button>
                </div>
              </div>
              <Link to="/list-item" className="block w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all text-center">
                ➕ Add New Item
              </Link>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">$450</div>
                <div className="text-sm text-gray-600">Total Earnings</div>
                <div className="text-xs text-gray-500 mt-1">After platform fees</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-sm text-gray-600">Successful Rentals</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">4.9⭐</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
            
            {/* Commission Info */}
            <div className="mt-4 p-3 bg-orange-50 rounded-xl">
              <div className="text-sm text-gray-700">
                <div className="font-semibold text-orange-600 mb-1">Platform Fee: 22% (New) / 18% (Experienced)</div>
                <div className="text-xs text-gray-600">
                  • Keeps the community safe and verified<br/>
                  • Covers payment processing<br/>
                  • Supports customer service<br/>
                  • Includes insurance and 24/7 support
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">New rental: Wedding Chairs</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Payment received: $75</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600">5-star review received</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Affiliate Dashboard */}
        <div className="mt-8">
          <AffiliateDashboard />
        </div>
        
        {/* Sustainability & Impact Tracker */}
        <div className="mt-8">
          <SustainabilityTracker />
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Simple Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">C</span>
                </div>
                <span className="text-xl font-bold text-gray-900">CelebrationShare</span>
              </Link>
              <div className="hidden md:block text-center flex-1 mx-8">
                <h1 className="text-lg font-semibold text-gray-800">
                  Rent from Your Neighbors
                </h1>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
                <Link to="/browse" className="text-gray-700 hover:text-blue-600 transition-colors">Browse</Link>
                <Link to="/list-item" className="text-gray-700 hover:text-blue-600 transition-colors">List Item</Link>
                <Link to="/affiliate" className="text-gray-700 hover:text-blue-600 transition-colors">💰 Earn</Link>
                <Link to="/signup" className="text-gray-700 hover:text-blue-600 transition-colors">Sign Up</Link>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">Login</Link>
              </nav>
            </div>
          </div>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/item/:id" element={<ItemDetailPage />} />
            <Route path="/list-item" element={<ListItemPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/affiliate" element={<AffiliateProgramPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/admin/fees" element={<AdminFeePage />} />
            <Route path="/admin/chat-analytics" element={<ChatAnalyticsPage />} />
            <Route path="/verification" element={<VerificationPage />} />
            <Route path="/test" element={<div>Test route works!</div>} />
          </Routes>
        </main>
        
        {/* AI Safety Advisor - Available on all pages */}
        <AISafetyAdvisor />
        
        {/* Customer Support Chat - Available on all pages */}
        <CustomerSupportChat />
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">C</span>
                  </div>
                  <span className="text-xl font-bold">CelebrationShare</span>
                </div>
                <p className="text-gray-300 mb-4">
                  Your neighborhood party rental community. Share, save, and celebrate life's special moments together.
                </p>
                <div className="flex space-x-4">
                  <a href="mailto:support@celebration-share.com" className="text-gray-300 hover:text-white transition-colors">
                    support@celebration-share.com
                  </a>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-300">(415) 555-0123</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                  <li><Link to="/browse" className="text-gray-300 hover:text-white transition-colors">Browse Items</Link></li>
                  <li><Link to="/list-item" className="text-gray-300 hover:text-white transition-colors">List Your Item</Link></li>
                  <li><Link to="/affiliate" className="text-gray-300 hover:text-white transition-colors">Affiliate Program</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
                  <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} CelebrationShare. All rights reserved. Building stronger communities through sharing.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;