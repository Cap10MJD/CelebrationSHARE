import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, MapPin, Star, ArrowRight, CheckCircle, Search, TrendingUp } from 'lucide-react';

const MobileHomePage = () => {
  const quickCategories = [
    { name: 'Tables & Chairs', icon: '🪑', count: '120+ items' },
    { name: 'Decorations', icon: '🎈', count: '85+ items' },
    { name: 'Audio', icon: '🎵', count: '45+ items' },
    { name: 'Linens', icon: '🍽️', count: '90+ items' }
  ];

  const featuredItems = [
    {
      id: 1,
      title: 'Round Table Set',
      price: 25,
      image: 'https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.9,
      distance: '1.2 mi'
    },
    {
      id: 2,
      title: 'Sound System',
      price: 65,
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.8,
      distance: '0.8 mi'
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background to-secondary px-4 pt-6 pb-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-primary mb-3 fade-in">
            The <span className="text-accent">safest</span> way to rent
            <br />
            <span className="text-mauve-600">party supplies</span>
          </h1>
          <p className="text-text mb-6 fade-in">
            Trusted by families in your neighborhood
          </p>
          
          {/* Search Bar */}
          <Link to="/browse" className="block mb-6 fade-in">
            <div className="bg-white rounded-xl shadow-soft p-4 flex items-center gap-3 active:scale-95 transition-transform">
              <Search className="w-5 h-5 text-text" />
              <span className="text-text flex-1 text-left">Search party supplies...</span>
            </div>
          </Link>

          {/* Trust Indicators */}
          <div className="flex justify-center items-center gap-6 text-sm text-text fade-in">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-accent" />
              <span>Verified</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-accent" />
              <span>4.9/5</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="px-4 py-6">
        <h2 className="text-lg font-semibold text-primary mb-4">Browse Categories</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickCategories.map((category, index) => (
            <Link
              key={index}
              to={`/browse?category=${encodeURIComponent(category.name)}`}
              className="bg-white rounded-xl p-4 shadow-soft active:scale-95 transition-transform"
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <h3 className="font-semibold text-primary text-sm">{category.name}</h3>
              <p className="text-xs text-text">{category.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Items */}
      <section className="px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-primary">Near You</h2>
          <Link to="/browse" className="text-accent text-sm font-medium">
            See All
          </Link>
        </div>
        <div className="space-y-3">
          {featuredItems.map((item) => (
            <Link
              key={item.id}
              to={`/item/${item.id}`}
              className="bg-white rounded-xl shadow-soft overflow-hidden flex active:scale-95 transition-transform"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover"
              />
              <div className="flex-1 p-3">
                <h3 className="font-semibold text-primary text-sm mb-1">{item.title}</h3>
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-3 h-3 text-accent fill-current" />
                  <span className="text-xs text-primary">{item.rating}</span>
                  <span className="text-xs text-text">• {item.distance}</span>
                </div>
                <p className="text-accent font-bold text-sm">${item.price}/day</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 py-6 bg-white mx-4 rounded-xl shadow-soft">
        <h2 className="text-lg font-semibold text-primary mb-4 text-center">Why Families Trust Us</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-primary text-sm">Verified Users</h3>
              <p className="text-xs text-text">Background checks & ID verification</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-primary text-sm">Mom Network</h3>
              <p className="text-xs text-text">Connect with trusted families nearby</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-primary text-sm">Local Focus</h3>
              <p className="text-xs text-text">Items right in your neighborhood</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-8">
        <div className="bg-gradient-to-r from-primary to-mauve-800 rounded-xl p-6 text-center text-white">
          <h2 className="text-lg font-bold mb-2">Ready to Get Started?</h2>
          <p className="text-rose-100 mb-4 text-sm">
            Start renting or earning money today
          </p>
          <div className="space-y-3">
            <Link
              to="/browse"
              className="block bg-accent text-white py-3 px-6 rounded-lg font-semibold active:scale-95 transition-transform"
            >
              Browse Items
            </Link>
            <Link
              to="/list-item"
              className="block border-2 border-white text-white py-3 px-6 rounded-lg font-semibold active:scale-95 transition-transform"
            >
              List Your Item
            </Link>
          </div>
        </div>
      </section>

      <button data-testid="mobile-home-signup">Sign Up</button>
      <button data-testid="mobile-home-login">Log In</button>
      <button data-testid="mobile-home-browse">Browse Items</button>
      <div data-testid="mobile-home-featured-item">
        {featuredItems.map((item) => (
          <div key={item.id}>
            <h2 data-testid="mobile-home-featured-title">{item.title}</h2>
            {/* ... rest of the item content ... */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileHomePage;