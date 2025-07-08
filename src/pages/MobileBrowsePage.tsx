import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Filter, MapPin, Star, Shield, Heart, SlidersHorizontal, CheckCircle } from 'lucide-react';
import MobileItemCard from '../components/MobileItemCard';
import { getAllItems, type Item } from '../services/itemService';
import LocationSearch from '../components/LocationSearch';
import MomApprovedFilter from '../components/MomApprovedFilter';
import FamilySafetyNotice from '../components/FamilySafetyNotice';
import { type Location } from '../services/locationService';

const MobileBrowsePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedDistance, setSelectedDistance] = useState('5 miles');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [distanceFilter, setDistanceFilter] = useState(10); // miles
  const [momApprovedFilter, setMomApprovedFilter] = useState(false);
  const location = useLocation();

  const categories = [
    { id: 'all', name: 'All', icon: '🎉' },
    { id: 'favorites', name: 'Favorites', icon: '❤️' },
    { id: 'tables-chairs', name: 'Tables', icon: '🪑' },
    { id: 'decorations', name: 'Decor', icon: '🎈' },
    { id: 'audio', name: 'Audio', icon: '🎵' },
    { id: 'linens', name: 'Linens', icon: '🍽️' },
    { id: 'games', name: 'Games', icon: '🎮' }
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

  const handleDistanceChange = (distance: string) => {
    setSelectedDistance(distance);
  };

  const handlePriceChange = (field: 'min' | 'max', value: string) => {
    setPriceRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setSelectedDistance('5 miles');
    setPriceRange({ min: '', max: '' });
    setSearchQuery('');
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

  // Filter items based on category, search query, price range, and location
  const filteredItems = items.filter(item => {
    // Category filter
    let categoryMatch = false;
    if (selectedCategory === 'all') {
      categoryMatch = true;
    } else if (selectedCategory === 'favorites') {
      categoryMatch = favorites.has(item.id);
    } else {
      categoryMatch = item.category.toLowerCase().includes(selectedCategory.replace('-', ' ').toLowerCase());
    }
    
    // Search filter
    const searchMatch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Price range filter
    const priceMatch = (!priceRange.min || item.price >= parseFloat(priceRange.min)) &&
                      (!priceRange.max || item.price <= parseFloat(priceRange.max));
    
    // Mom-approved filter
    const momApprovedMatch = !momApprovedFilter || item.badges.includes('Mom-Approved');
    
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
    
    return categoryMatch && searchMatch && priceMatch && momApprovedMatch && locationMatch;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Family Safety Notice */}
      <FamilySafetyNotice type="banner" />
      
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-50 border-b border-green-200 p-4">
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

      {/* Search Header */}
      <div className="bg-white shadow-soft p-4 sticky top-14 z-40">
        <div className="space-y-3">
          {/* Item Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text w-5 h-5" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-secondary rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent text-base"
              data-testid="mobile-search-input"
            />
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
              data-testid="mobile-search-button"
            >
              <SlidersHorizontal className="w-5 h-5 text-text" />
            </button>
          </div>

          {/* Location Search */}
          <LocationSearch
            onLocationSelect={setSelectedLocation}
            selectedLocation={selectedLocation}
          />

          {/* Distance Filter */}
          {selectedLocation && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-text">Within:</span>
              <select
                value={distanceFilter}
                onChange={(e) => setDistanceFilter(Number(e.target.value))}
                className="flex-1 px-3 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
              >
                <option value={5}>5 miles</option>
                <option value={10}>10 miles</option>
                <option value={25}>25 miles</option>
                <option value={50}>50 miles</option>
              </select>
            </div>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-secondary text-primary'
              }`}
              data-testid={`mobile-category-filter-${category.id}`}
            >
              <span>{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white rounded-t-xl w-full max-h-[70vh] overflow-y-auto">
            <div className="p-4 border-b border-secondary">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-primary">Filters</h3>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="text-text"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-4 space-y-6">
              {/* Mom-Approved Filter */}
              <div>
                <MomApprovedFilter
                  isActive={momApprovedFilter}
                  onToggle={() => setMomApprovedFilter(!momApprovedFilter)}
                  count={items.filter(item => item.badges.includes('Mom-Approved')).length}
                />
              </div>

              <div>
                <h4 className="font-medium text-primary mb-3">Price Range</h4>
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    type="number" 
                    placeholder="Min" 
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    className="px-3 py-2 border border-secondary rounded-lg"
                  />
                  <input 
                    type="number" 
                    placeholder="Max" 
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    className="px-3 py-2 border border-secondary rounded-lg"
                  />
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-primary mb-3">Distance</h4>
                <div className="space-y-2">
                  {['1 mile', '3 miles', '5 miles', '10 miles'].map((distance) => (
                    <label key={distance} className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="distance" 
                        value={distance}
                        checked={selectedDistance === distance}
                        onChange={(e) => handleDistanceChange(e.target.value)}
                        className="text-accent" 
                      />
                      <span className="text-text">{distance}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={clearFilters}
                  className="flex-1 py-3 border border-secondary rounded-lg text-primary"
                >
                  Clear All
                </button>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="flex-1 py-3 bg-primary text-white rounded-lg"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <p className="text-text font-medium">
            {filteredItems.length} items found
          </p>
          <div className="flex items-center gap-1 text-accent">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Within {selectedDistance}</span>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
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
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <MobileItemCard
                key={item.id}
                item={item}
                onFavorite={(id) => handleToggleFavorite(id)}
                onTap={(id) => navigate(`/item/${id}`)}
                isFavorited={favorites.has(item.id)}
                data-testid={`mobile-item-card-${item.id}`}
              >
                <h2 data-testid={`mobile-item-title-${item.id}`} className="text-primary font-medium">{item.title}</h2>
              </MobileItemCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileBrowsePage;