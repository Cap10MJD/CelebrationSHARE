import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Search, 
  X, 
  Navigation, 
  Globe, 
  Building, 
  Hash,
  ChevronDown,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { 
  searchLocations, 
  getLocationSuggestions, 
  getPopularLocations,
  getLocationByCoordinates,
  type Location,
  type LocationSearchResult
} from '../services/locationService';

interface LocationSearchProps {
  onLocationSelect: (location: Location | null) => void;
  selectedLocation: Location | null;
  className?: string;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ 
  onLocationSelect, 
  selectedLocation, 
  className = '' 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationSearchResult[]>([]);
  const [popularLocations, setPopularLocations] = useState<Location[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'city' | 'zip' | 'county'>('all');
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Load popular locations on mount
  useEffect(() => {
    const loadPopularLocations = async () => {
      try {
        const popular = await getPopularLocations();
        setPopularLocations(popular);
      } catch (error) {
        // Removed console.error('Failed to load popular locations:', error);
      }
    };
    
    loadPopularLocations();
  }, []);

  // Handle search input changes
  useEffect(() => {
    const searchLocationsAsync = async () => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsLoading(true);
      try {
        const filter = filterType !== 'all' ? { type: filterType } : undefined;
        const results = await searchLocations(searchQuery, filter);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        // Removed console.error('Failed to search locations:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchLocationsAsync, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, filterType]);

  // Handle clicks outside suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get user's current location
  const getUserLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setIsLoading(true);
    setLocationError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          enableHighAccuracy: true
        });
      });

      const location = await getLocationByCoordinates(
        position.coords.latitude,
        position.coords.longitude
      );

      if (location) {
        setUserLocation(location);
        onLocationSelect(location);
        setSearchQuery(location.name);
        setShowSuggestions(false);
      } else {
        setLocationError('Could not determine your location');
      }
    } catch (error) {
      // Removed console.error('Geolocation error:', error);
      setLocationError('Unable to get your location. Please check your permissions.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = (location: Location) => {
    onLocationSelect(location);
    setSearchQuery(location.name);
    setShowSuggestions(false);
    setUserLocation(null);
    setLocationError(null);
  };

  const handleClearLocation = () => {
    onLocationSelect(null);
    setSearchQuery('');
    setUserLocation(null);
    setLocationError(null);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'city':
        return <Building className="w-4 h-4" />;
      case 'zip':
        return <Hash className="w-4 h-4" />;
      case 'county':
        return <Globe className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getLocationDisplayName = (location: Location) => {
    switch (location.type) {
      case 'city':
        return `${location.name}, ${location.state}`;
      case 'zip':
        return `${location.name} (${location.county} County, ${location.state})`;
      case 'county':
        return `${location.name}, ${location.state}`;
      default:
        return location.name;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text">
          <MapPin className="w-5 h-5" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search by city, zip code, or county..."
          className="w-full pl-10 pr-20 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
        />
        
        {/* Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 text-text hover:text-accent transition-colors"
          title="Filter by type"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
        
        {/* Clear Button */}
        {selectedLocation && (
          <button
            onClick={handleClearLocation}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-text hover:text-accent transition-colors"
            title="Clear location"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Dropdown */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-secondary rounded-lg shadow-lg z-10">
          <div className="p-2">
            <div className="text-sm font-medium text-primary mb-2">Filter by type:</div>
            <div className="space-y-1">
              {[
                { value: 'all', label: 'All Types', icon: <MapPin className="w-4 h-4" /> },
                { value: 'city', label: 'Cities', icon: <Building className="w-4 h-4" /> },
                { value: 'zip', label: 'Zip Codes', icon: <Hash className="w-4 h-4" /> },
                { value: 'county', label: 'Counties', icon: <Globe className="w-4 h-4" /> }
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => {
                    setFilterType(filter.value as any);
                    setShowFilters(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded text-left hover:bg-gray-50 transition-colors ${
                    filterType === filter.value ? 'bg-accent text-white hover:bg-accent' : 'text-text'
                  }`}
                >
                  {filter.icon}
                  <span className="text-sm">{filter.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-secondary rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto"
        >
          {/* Current Location Option */}
          <div className="p-3 border-b border-secondary">
            <button
              onClick={getUserLocation}
              disabled={isLoading}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <Navigation className="w-4 h-4 text-accent" />
              <div className="text-left">
                <div className="text-sm font-medium text-primary">
                  {isLoading ? 'Getting location...' : 'Use my current location'}
                </div>
                <div className="text-xs text-text">Find items near you</div>
              </div>
            </button>
            
            {locationError && (
              <div className="mt-2 flex items-center gap-2 text-xs text-red-600">
                <AlertCircle className="w-3 h-3" />
                {locationError}
              </div>
            )}
          </div>

          {/* Search Results */}
          {suggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-text mb-2 px-2">Search Results:</div>
              {suggestions.map((result) => (
                <button
                  key={result.location.id}
                  onClick={() => handleLocationSelect(result.location)}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="text-accent">
                    {getLocationIcon(result.location.type)}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-primary">
                      {getLocationDisplayName(result.location)}
                    </div>
                    <div className="text-xs text-text">
                      {result.location.type === 'city' && result.location.population && 
                        `${result.location.population.toLocaleString()} people`
                      }
                      {result.location.type === 'zip' && 
                        `${result.location.county} County`
                      }
                    </div>
                  </div>
                  {selectedLocation?.id === result.location.id && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Popular Locations */}
          {suggestions.length === 0 && searchQuery === '' && (
            <div className="p-2">
              <div className="text-xs font-medium text-text mb-2 px-2">Popular Locations:</div>
              {popularLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="text-accent">
                    {getLocationIcon(location.type)}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-primary">
                      {getLocationDisplayName(location)}
                    </div>
                    <div className="text-xs text-text">
                      {location.population && `${location.population.toLocaleString()} people`}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {suggestions.length === 0 && searchQuery !== '' && !isLoading && (
            <div className="p-4 text-center text-text">
              <div className="text-sm">No locations found</div>
              <div className="text-xs mt-1">Try a different search term</div>
            </div>
          )}

          {/* Loading */}
          {isLoading && searchQuery !== '' && (
            <div className="p-4 text-center text-text">
              <div className="text-sm">Searching...</div>
            </div>
          )}
        </div>
      )}

      {/* Selected Location Display */}
      {selectedLocation && (
        <div className="mt-2 p-2 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-accent" />
            <div className="text-sm">
              <span className="font-medium text-primary">
                {getLocationDisplayName(selectedLocation)}
              </span>
              {userLocation && (
                <span className="text-text ml-2">
                  (your location)
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch; 