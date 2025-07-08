// Location service for handling location-based searches
// In production, this would integrate with mapping APIs like Google Maps or Mapbox

export interface Location {
  id: string;
  name: string;
  type: 'city' | 'zip' | 'county' | 'state';
  state: string;
  county?: string;
  zipCode?: string;
  latitude: number;
  longitude: number;
  population?: number;
}

export interface LocationSearchResult {
  location: Location;
  distance?: number; // in miles
  relevance: number; // 0-1, how well it matches the search
}

export interface LocationFilter {
  type?: 'city' | 'zip' | 'county' | 'state';
  state?: string;
  county?: string;
  zipCode?: string;
  radius?: number; // in miles
  userLatitude?: number;
  userLongitude?: number;
}

// Mock location database - in production this would come from a real API
const locations: Location[] = [
  // Cities
  { id: '1', name: 'Austin', type: 'city', state: 'TX', county: 'Travis', latitude: 30.2672, longitude: -97.7431, population: 978908 },
  { id: '2', name: 'Houston', type: 'city', state: 'TX', county: 'Harris', latitude: 29.7604, longitude: -95.3698, population: 2320268 },
  { id: '3', name: 'Dallas', type: 'city', state: 'TX', county: 'Dallas', latitude: 32.7767, longitude: -96.7970, population: 1343573 },
  { id: '4', name: 'San Antonio', type: 'city', state: 'TX', county: 'Bexar', latitude: 29.4241, longitude: -98.4936, population: 1547253 },
  { id: '5', name: 'Fort Worth', type: 'city', state: 'TX', county: 'Tarrant', latitude: 32.7555, longitude: -97.3308, population: 918915 },
  
  // Zip codes in Austin area
  { id: '6', name: '78701', type: 'zip', state: 'TX', county: 'Travis', zipCode: '78701', latitude: 30.2672, longitude: -97.7431 },
  { id: '7', name: '78702', type: 'zip', state: 'TX', county: 'Travis', zipCode: '78702', latitude: 30.2672, longitude: -97.7431 },
  { id: '8', name: '78703', type: 'zip', state: 'TX', county: 'Travis', zipCode: '78703', latitude: 30.2672, longitude: -97.7431 },
  { id: '9', name: '78704', type: 'zip', state: 'TX', county: 'Travis', zipCode: '78704', latitude: 30.2672, longitude: -97.7431 },
  { id: '10', name: '78705', type: 'zip', state: 'TX', county: 'Travis', zipCode: '78705', latitude: 30.2672, longitude: -97.7431 },
  
  // Counties
  { id: '11', name: 'Travis County', type: 'county', state: 'TX', county: 'Travis', latitude: 30.2672, longitude: -97.7431 },
  { id: '12', name: 'Harris County', type: 'county', state: 'TX', county: 'Harris', latitude: 29.7604, longitude: -95.3698 },
  { id: '13', name: 'Dallas County', type: 'county', state: 'TX', county: 'Dallas', latitude: 32.7767, longitude: -96.7970 },
  { id: '14', name: 'Bexar County', type: 'county', state: 'TX', county: 'Bexar', latitude: 29.4241, longitude: -98.4936 },
  { id: '15', name: 'Tarrant County', type: 'county', state: 'TX', county: 'Tarrant', latitude: 32.7555, longitude: -97.3308 },
  
  // Other cities
  { id: '16', name: 'Round Rock', type: 'city', state: 'TX', county: 'Williamson', latitude: 30.5083, longitude: -97.6789, population: 133372 },
  { id: '17', name: 'Cedar Park', type: 'city', state: 'TX', county: 'Williamson', latitude: 30.5052, longitude: -97.8203, population: 77218 },
  { id: '18', name: 'Pflugerville', type: 'city', state: 'TX', county: 'Travis', latitude: 30.4394, longitude: -97.6200, population: 65952 },
  { id: '19', name: 'Leander', type: 'city', state: 'TX', county: 'Williamson', latitude: 30.5788, longitude: -97.8531, population: 59202 },
  { id: '20', name: 'Georgetown', type: 'city', state: 'TX', county: 'Williamson', latitude: 30.6333, longitude: -97.6778, population: 74331 },
  
  // More zip codes
  { id: '21', name: '78730', type: 'zip', state: 'TX', county: 'Travis', zipCode: '78730', latitude: 30.2672, longitude: -97.7431 },
  { id: '22', name: '78731', type: 'zip', state: 'TX', county: 'Travis', zipCode: '78731', latitude: 30.2672, longitude: -97.7431 },
  { id: '23', name: '78732', type: 'zip', state: 'TX', county: 'Travis', zipCode: '78732', latitude: 30.2672, longitude: -97.7431 },
  { id: '24', name: '78733', type: 'zip', state: 'TX', county: 'Travis', zipCode: '78733', latitude: 30.2672, longitude: -97.7431 },
  { id: '25', name: '78734', type: 'zip', state: 'TX', county: 'Travis', zipCode: '78734', latitude: 30.2672, longitude: -97.7431 },
  
  // More counties
  { id: '26', name: 'Williamson County', type: 'county', state: 'TX', county: 'Williamson', latitude: 30.5083, longitude: -97.6789 },
  { id: '27', name: 'Hays County', type: 'county', state: 'TX', county: 'Hays', latitude: 30.0585, longitude: -97.9907 },
  { id: '28', name: 'Caldwell County', type: 'county', state: 'TX', county: 'Caldwell', latitude: 29.8369, longitude: -97.6183 },
];

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

// Search locations by query
export const searchLocations = async (query: string, filter?: LocationFilter): Promise<LocationSearchResult[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return [];
  
  const results: LocationSearchResult[] = [];
  
  for (const location of locations) {
    let relevance = 0;
    let matches = false;
    
    // Check if location matches the search term
    if (location.name.toLowerCase().includes(searchTerm)) {
      matches = true;
      relevance += 0.8;
      
      // Boost relevance for exact matches
      if (location.name.toLowerCase() === searchTerm) {
        relevance += 0.2;
      }
      
      // Boost relevance for zip codes
      if (location.type === 'zip' && searchTerm.length === 5) {
        relevance += 0.1;
      }
    }
    
    // Check county name
    if (location.county && location.county.toLowerCase().includes(searchTerm)) {
      matches = true;
      relevance += 0.6;
    }
    
    // Check state
    if (location.state.toLowerCase().includes(searchTerm)) {
      matches = true;
      relevance += 0.4;
    }
    
    // Apply filters
    if (filter) {
      if (filter.type && location.type !== filter.type) {
        continue;
      }
      if (filter.state && location.state !== filter.state) {
        continue;
      }
      if (filter.county && location.county !== filter.county) {
        continue;
      }
      if (filter.zipCode && location.zipCode !== filter.zipCode) {
        continue;
      }
    }
    
    if (matches) {
      results.push({
        location,
        relevance
      });
    }
  }
  
  // Sort by relevance
  return results.sort((a, b) => b.relevance - a.relevance);
};

// Get location by coordinates (reverse geocoding)
export const getLocationByCoordinates = async (latitude: number, longitude: number): Promise<Location | null> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Find the closest location
  let closestLocation: Location | null = null;
  let minDistance = Infinity;
  
  for (const location of locations) {
    const distance = calculateDistance(latitude, longitude, location.latitude, location.longitude);
    if (distance < minDistance) {
      minDistance = distance;
      closestLocation = location;
    }
  }
  
  return closestLocation;
};

// Get nearby locations within a radius
export const getNearbyLocations = async (
  latitude: number, 
  longitude: number, 
  radius: number = 10
): Promise<LocationSearchResult[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const results: LocationSearchResult[] = [];
  
  for (const location of locations) {
    const distance = calculateDistance(latitude, longitude, location.latitude, location.longitude);
    if (distance <= radius) {
      results.push({
        location,
        distance,
        relevance: 1 - (distance / radius) // Closer = higher relevance
      });
    }
  }
  
  return results.sort((a, b) => (a.distance || 0) - (b.distance || 0));
};

// Get popular locations (cities with high population)
export const getPopularLocations = async (): Promise<Location[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return locations
    .filter(location => location.type === 'city' && location.population)
    .sort((a, b) => (b.population || 0) - (a.population || 0))
    .slice(0, 10);
};

// Get locations by state
export const getLocationsByState = async (state: string): Promise<Location[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return locations.filter(location => location.state === state);
};

// Get locations by county
export const getLocationsByCounty = async (county: string, state: string): Promise<Location[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return locations.filter(location => 
    location.county === county && location.state === state
  );
};

// Validate zip code format
export const isValidZipCode = (zipCode: string): boolean => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
};

// Get location suggestions for autocomplete
export const getLocationSuggestions = async (query: string): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return [];
  
  const suggestions = new Set<string>();
  
  for (const location of locations) {
    if (location.name.toLowerCase().includes(searchTerm)) {
      suggestions.add(location.name);
    }
    if (location.county && location.county.toLowerCase().includes(searchTerm)) {
      suggestions.add(`${location.county} County, ${location.state}`);
    }
  }
  
  return Array.from(suggestions).slice(0, 8);
}; 