import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, MapPin, Star, ArrowRight, CheckCircle, Smartphone } from 'lucide-react';
import QRCodeGenerator from '../components/QRCodeGenerator';

// Determine the correct URL for the QR code
const getQRCodeUrl = () => {
  // Force local IP for dev (set your IP and port here)
  if (process.env.NODE_ENV !== 'production') {
    return 'http://192.168.1.100:5173'; // <-- Replace with your actual local IP and port
  }
  // Default to production URL
  return 'https://celebrationShare.com';
};

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <div style={{ fontSize: 32, color: 'red', textAlign: 'center' }}>test</div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background to-secondary py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 fade-in">
              <span className="text-accent">Event Rentals</span> & <span className="text-mauve-600">Party Supplies</span>
              <br />
              <span className="text-primary">Wedding Equipment</span> & <span className="text-accent">Kids Party Items</span>
            </h1>
            <p className="text-xl text-text mb-8 max-w-3xl mx-auto fade-in">
              Find affordable event rentals, party supplies, wedding equipment, and kids party items near you. 
              Rent tables, chairs, decorations, audio equipment, and more from trusted local owners. 
              Perfect for weddings, birthday parties, corporate events, and family celebrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 fade-in">
              <Link
                to="/browse"
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-mauve-700 transition-colors flex items-center gap-2"
              >
                Browse Items
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/signup"
                className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
              >
                Join the Community
              </Link>
              <Link
                to="/list-item"
                className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
              >
                List Your Item
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-text fade-in">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                <span>Verified Users</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Local Event Rentals & Party Supplies</h2>
            <p className="text-xl text-text">Affordable party equipment rental from trusted neighbors</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-background hover-lift transition-all">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Wedding Rental Equipment</h3>
              <p className="text-text">
                Complete wedding rental services including decorations, tables, chairs, audio systems, and tents.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-secondary hover-lift transition-all">
              <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Kids Party Supplies</h3>
              <p className="text-text">
                Safe, family-friendly party equipment and decorations perfect for children's birthday parties and events.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-rose-100 hover-lift transition-all">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Corporate Event Rentals</h3>
              <p className="text-text">
                Professional audio equipment, tables, chairs, and decorations for corporate events and business functions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">Your Peace of Mind is Our Priority</h2>
            <p className="text-xl text-text mb-8">
              Every rental is protected with our comprehensive security system.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-soft">
                <h3 className="text-lg font-semibold text-primary mb-3">Smart Security Deposits</h3>
                <p className="text-text">
                  Automatic pre-authorization protects your items without charging renters upfront. 
                  Deposits are only collected if damage occurs.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-soft">
                <h3 className="text-lg font-semibold text-primary mb-3">Photo Documentation</h3>
                <p className="text-text">
                  Before and after photos protect both renters and owners, ensuring fair 
                  resolution of any disputes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Event Rental Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Tables & Chairs', image: 'https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { name: 'Party Decorations', image: 'https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { name: 'Audio Equipment', image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { name: 'Linens & Tableware', image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=400' }
            ].map((category, index) => (
              <Link
                key={index}
                to={`/browse?category=${encodeURIComponent(category.name)}`}
                className="group relative overflow-hidden rounded-xl hover-lift transition-all"
              >
                <div className="aspect-square bg-secondary rounded-xl overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-primary bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300 flex items-end">
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App QR Code Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Install Our App</h2>
            <p className="text-xl text-text">Access CelebrationShare on the go with our App</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="flex items-center gap-3 mb-6">
                <Smartphone className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-bold text-primary">Mobile Experience</h3>
              </div>
              
              <div className="space-y-4 text-text">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-primary">Easy Browsing</h4>
                    <p>Find and rent items with just a few taps</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-primary">Quick Listings</h4>
                    <p>List your items in minutes with photo upload</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-primary">Secure Payments</h4>
                    <p>Pay and get paid safely through the app</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-primary">Real-time Updates</h4>
                    <p>Get notifications about rentals and messages</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <p className="text-sm text-text mb-4">
                  <strong>Available for:</strong> iOS and Android devices via browser
                </p>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-2">
                      <span className="text-white text-xs font-bold">Safari</span>
                    </div>
                    <span className="text-xs text-text">Add to Home</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-white text-xs font-bold">Chrome</span>
                    </div>
                    <span className="text-xs text-text">Install App</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div>
                <QRCodeGenerator
                  url={getQRCodeUrl()}
                  title="Scan to Get the CelebrationShare App"
                  subtitle="Scan this code to open or install the CelebrationShare App on your phone"
                  size={250}
                />
                <div className="mt-4 text-center">
                  <a
                    href={getQRCodeUrl()}
                    className="text-primary underline text-base font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Or tap here to open the CelebrationShare App
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO-Optimized Event Rental Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Event Rental Services Near You</h2>
            <p className="text-xl text-text">Find local party rental companies and event equipment suppliers</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-background p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-primary mb-3">Birthday Party Rentals</h3>
              <ul className="text-sm text-text space-y-2">
                <li>• Kids party supplies and decorations</li>
                <li>• Birthday party equipment rental</li>
                <li>• Children's party games and entertainment</li>
                <li>• Family celebration rentals</li>
              </ul>
            </div>
            
            <div className="bg-background p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-primary mb-3">Wedding Rental Equipment</h3>
              <ul className="text-sm text-text space-y-2">
                <li>• Wedding decorations and supplies</li>
                <li>• Wedding reception rental equipment</li>
                <li>• Wedding tent rentals and canopies</li>
                <li>• Wedding audio equipment rental</li>
              </ul>
            </div>
            
            <div className="bg-background p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-primary mb-3">Corporate Event Rentals</h3>
              <ul className="text-sm text-text space-y-2">
                <li>• Business event equipment rental</li>
                <li>• Corporate party supplies</li>
                <li>• Professional audio equipment rental</li>
                <li>• Conference and meeting rentals</li>
              </ul>
            </div>
            
            <div className="bg-background p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-primary mb-3">Special Event Rentals</h3>
              <ul className="text-sm text-text space-y-2">
                <li>• Baby shower supplies and decorations</li>
                <li>• Graduation party rentals</li>
                <li>• Anniversary party equipment</li>
                <li>• Holiday party supplies</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-mauve-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Find Event Rentals & Party Supplies Near You</h2>
          <p className="text-xl text-rose-100 mb-8">
            Affordable party equipment rental from trusted local owners. Perfect for weddings, birthdays, corporate events, and family celebrations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/browse"
              className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors"
            >
              Browse Event Rentals
            </Link>
            <Link
              to="/list-item"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              List Your Equipment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;