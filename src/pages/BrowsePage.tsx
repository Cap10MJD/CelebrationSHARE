import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Filter, MapPin, Star, Shield, Heart, ChevronDown, CheckCircle, X } from 'lucide-react';
import { getAllItems, type Item } from '../services/itemService';
import LocationSearch from '../components/LocationSearch';
import MomApprovedFilter from '../components/MomApprovedFilter';
import FamilySafetyNotice from '../components/FamilySafetyNotice';
import { type Location } from '../services/locationService';

const BrowsePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Check for category parameter in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, []);
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedDistance, setSelectedDistance] = useState('5 miles');
  const [showDistanceDropdown, setShowDistanceDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [safetyFilter, setSafetyFilter] = useState('all'); // all, verified-only, mom-approved
  const [momApprovedFilter, setMomApprovedFilter] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [distanceFilter, setDistanceFilter] = useState(10); // miles
  const location = useLocation();

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'Weddings & Receptions', name: 'Weddings & Receptions' },
    { id: 'Kids Birthday Parties', name: 'Kids Birthday Parties' },
    { id: 'Corporate Events', name: 'Corporate Events' },
    { id: 'Graduation Parties', name: 'Graduation Parties' },
    { id: 'Baby Showers', name: 'Baby Showers' },
    { id: 'Holiday Celebrations', name: 'Holiday Celebrations' },
    { id: 'Anniversary Parties', name: 'Anniversary Parties' },
    { id: 'Community Events', name: 'Community Events' }
  ];

  // Load items function
  const loadItems = async () => {
    try {
      const allItems = await getAllItems();
      setItems(allItems);
    } catch (error) {
      // Removed all console.error statements for production polish
    } finally {
      setLoading(false);
    }
  };

  // Load items from service
  useEffect(() => {
    loadItems();
  }, []);

  // Check for success message from navigation and refresh items
  useEffect(() => {
    const state = location.state as { message?: string } | null;
    if (state?.message) {
      setShowSuccessMessage(true);
      // Clear the message from navigation state
      navigate(location.pathname, { replace: true });
      // Auto-hide after 5 seconds
      setTimeout(() => setShowSuccessMessage(false), 5000);
      // Refresh items list to show the newly published item
      loadItems();
    }
  }, [location.state, navigate, location.pathname]);

  // Close distance dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.distance-dropdown')) {
        setShowDistanceDropdown(false);
      }
    };

    if (showDistanceDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDistanceDropdown]);

  const handleDistanceSelect = (distance: string) => {
    setSelectedDistance(distance);
    setShowDistanceDropdown(false);
  };

  const handleToggleFavorite = (itemId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Filter items based on category, search query, safety filter, and location
  const filteredItems = items.filter(item => {
    // Category filter
    let categoryMatch = false;
    if (selectedCategory === 'all') {
      categoryMatch = true;
    } else if (selectedCategory === 'favorites') {
      categoryMatch = favorites.has(item.id);
    } else {
      // Direct category name matching
      categoryMatch = item.category === selectedCategory;
    }
    
    // Search filter
    const searchMatch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Safety filter
    let safetyMatch = true;
    if (safetyFilter === 'verified-only') {
      safetyMatch = item.owner.verified;
    } else if (safetyFilter === 'mom-approved') {
      safetyMatch = item.badges.includes('Mom-Approved');
    }
    
    // Mom-approved filter
    if (momApprovedFilter) {
      safetyMatch = safetyMatch && item.badges.includes('Mom-Approved');
    }
    
    // Location filter
    let locationMatch = true;
    if (selectedLocation) {
      const distance = calculateDistance(
        selectedLocation.latitude,
        selectedLocation.longitude,
        item.locationData.latitude,
        item.locationData.longitude
      );
      locationMatch = distance <= distanceFilter;
      // Update the item's distance for display
      item.locationData.distance = Math.round(distance * 10) / 10;
    }
    
    return categoryMatch && searchMatch && safetyMatch && locationMatch;
  });

  // Sort items based on selected sort option
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return b.id - a.id; // Assuming higher ID means newer
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
      default:
        return b.reviews - a.reviews; // More reviews = more popular
    }
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-green-800 font-medium">Success!</p>
                <p className="text-green-700 text-sm">
                  {location.state?.message || 'Item published successfully!'}
                </p>
              </div>
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="ml-auto text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Browse Items</h1>
          <p className="text-text">Find the perfect items for your event from trusted neighbors</p>
        </div>

        {/* Family Safety Notice */}
        <FamilySafetyNotice type="banner" />

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text w-5 h-5" />
              <input
                type="text"
                placeholder="Search for items, brands, or owners..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                data-testid="search-input"
              />
            </div>

            {/* Location Search */}
            <div className="flex-1">
              <LocationSearch
                onLocationSelect={setSelectedLocation}
                selectedLocation={selectedLocation}
              />
            </div>

            {/* Distance Filter */}
            {selectedLocation && (
              <div className="relative">
                <select
                  value={distanceFilter}
                  onChange={(e) => setDistanceFilter(Number(e.target.value))}
                  className="px-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white"
                >
                  <option value={5}>Within 5 miles</option>
                  <option value={10}>Within 10 miles</option>
                  <option value={25}>Within 25 miles</option>
                  <option value={50}>Within 50 miles</option>
                </select>
              </div>
            )}
            <div className="relative distance-dropdown">
              <button
                onClick={() => setShowDistanceDropdown(!showDistanceDropdown)}
                className="flex items-center gap-2 px-4 py-3 border border-secondary rounded-lg hover:bg-background transition-colors"
              >
                <MapPin className="w-5 h-5 text-text" />
                <span className="text-text whitespace-nowrap">Within {selectedDistance}</span>
                <ChevronDown className={`w-4 h-4 text-text transition-transform ${showDistanceDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showDistanceDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-secondary rounded-lg shadow-lg z-10">
                  {['1 mile', '3 miles', '5 miles', '10 miles', '25 miles'].map((distance) => (
                    <button
                      key={distance}
                      onClick={() => handleDistanceSelect(distance)}
                      className={`w-full text-left px-4 py-2 hover:bg-background transition-colors ${
                        selectedDistance === distance ? 'bg-secondary text-primary font-medium' : 'text-text'
                      }`}
                    >
                      {distance}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* Filters Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-mauve-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Categories</h3>
              
              {/* Mom-Approved Filter */}
              <div className="mb-6">
                <MomApprovedFilter
                  isActive={momApprovedFilter}
                  onToggle={() => setMomApprovedFilter(!momApprovedFilter)}
                  count={items.filter(item => item.badges.includes('Mom-Approved')).length}
                />
              </div>

              {/* Safety Filter */}
              <div className="mb-4 pb-4 border-b border-secondary">
                <h4 className="text-sm font-medium text-primary mb-2 flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Safety Filter
                </h4>
                <div className="space-y-1">
                  <button
                    onClick={() => setSafetyFilter('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                      safetyFilter === 'all'
                        ? 'bg-secondary text-primary font-medium'
                        : 'text-text hover:bg-background'
                    }`}
                  >
                    All Items
                  </button>
                  <button
                    onClick={() => setSafetyFilter('verified-only')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm flex items-center gap-2 ${
                      safetyFilter === 'verified-only'
                        ? 'bg-green-100 text-green-800 font-medium'
                        : 'text-text hover:bg-background'
                    }`}
                  >
                    <Shield className="w-3 h-3" />
                    Verified Only
                  </button>
                  <button
                    onClick={() => setSafetyFilter('mom-approved')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm flex items-center gap-2 ${
                      safetyFilter === 'mom-approved'
                        ? 'bg-pink-100 text-pink-800 font-medium'
                        : 'text-text hover:bg-background'
                    }`}
                  >
                    <Heart className="w-3 h-3" />
                    Mom-Approved
                  </button>
                </div>
              </div>
              
              {/* Favorites Filter */}
              <div className="mb-4 pb-4 border-b border-secondary">
                <button
                  onClick={() => setSelectedCategory(selectedCategory === 'favorites' ? 'all' : 'favorites')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    selectedCategory === 'favorites'
                      ? 'bg-secondary text-primary font-medium'
                      : 'text-text hover:bg-background'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${selectedCategory === 'favorites' ? 'fill-current text-red-500' : ''}`} />
                  Favorites ({favorites.size})
                </button>
              </div>
              
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-secondary text-primary font-medium'
                        : 'text-text hover:bg-background'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Items Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <p className="text-text">
                  {sortedItems.length} items found
                </p>
                {selectedLocation && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-sm text-primary">
                      Near {selectedLocation.name}
                    </span>
                    <button
                      onClick={() => setSelectedLocation(null)}
                      className="text-accent hover:text-primary transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-soft overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-soft overflow-hidden hover-lift transition-all">
                    <div className="relative">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <button 
                        onClick={() => handleToggleFavorite(item.id)}
                        className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors ${
                          favorites.has(item.id) 
                            ? 'bg-red-500 text-white hover:bg-red-600' 
                            : 'bg-white text-text hover:bg-background'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${favorites.has(item.id) ? 'fill-current' : ''}`} />
                      </button>
                      {/* Verification Status */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {item.owner.verified && (
                          <div className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            Level {item.verificationLevel}
                          </div>
                        )}
                        {item.badges.includes('Mom-Approved') && (
                          <div className="bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            Mom-Approved
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
                      
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 text-accent fill-current" />
                        <span className="text-sm font-medium text-primary">{item.rating}</span>
                        <span className="text-sm text-text">({item.reviews} reviews)</span>
                      </div>
                      
                      <div className="flex items-center gap-1 mb-3">
                        <MapPin className="w-4 h-4 text-text" />
                        <span className="text-sm text-text">
                          {selectedLocation && item.locationData.distance 
                            ? `${item.locationData.distance} miles away`
                            : item.location
                          }
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.features.map((feature, index) => (
                          <span key={index} className="text-xs bg-secondary text-primary px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <p className="text-lg font-bold text-primary">${item.price}/day</p>
                          <p className="text-sm text-text">${item.deposit} deposit</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-text">by {item.owner.name}</p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => navigate(`/item/${item.id}`)}
                        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-mauve-700 transition-colors font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;