// Mock item service for development
// In production, this would call your actual backend API

export interface Item {
  id: number;
  title: string;
  category: string;
  price: number;
  weeklyRate?: number; // Optional weekly rate
  deposit: number;
  rating: number;
  reviews: number;
  location: string;
  locationData: {
    city: string;
    state: string;
    zipCode: string;
    county: string;
    latitude: number;
    longitude: number;
    distance?: number; // Calculated distance from user
  };
  owner: {
    name: string;
    avatar: string;
    verified: boolean;
    joinDate: string;
    totalRentals: number;
    responseTime: string;
  };
  images: string[];
  features: string[];
  description: string;
  availability: string;
  pickupInstructions: string;
  depositPolicy: string;
  damageProtection: string;
  verificationLevel: number;
  badges: string[];
  // Family safety properties
  isChildSafe?: boolean;
  ageRange?: string;
  safetyNotes?: string[];
  safetyScore?: number;
}

// Demo items database for demonstration purposes
// In production, this would be fetched from a real database
const items: Item[] = [
  {
    id: 1,
    title: 'Professional Sound System Package',
    category: 'Weddings & Receptions',
    price: 65,
    weeklyRate: 350, // 7 days * $50/day discount
    deposit: 200,
    rating: 4.8,
    reviews: 34,
    location: '1.8 miles away',
    locationData: {
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      county: 'Travis',
      latitude: 30.2672,
      longitude: -97.7431
    },
    owner: {
      name: 'Michael K.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true,
      joinDate: 'March 2022',
      totalRentals: 89,
      responseTime: '< 1 hour'
    },
    images: [
      'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1021876/pexels-photo-1021876.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    features: ['Wireless mics', 'Bluetooth', 'Setup included', 'Outdoor use'],
    description: `Professional-grade sound system perfect for outdoor parties, weddings, and family gatherings. Includes 2 wireless microphones, Bluetooth connectivity, and all necessary cables. I provide setup and breakdown service within 5 miles for no additional charge.

The system can easily handle crowds of 50-100 people and works great for both speaking and music. All equipment is regularly maintained and tested before each rental.

Perfect for:
- Birthday parties
- Wedding receptions  
- Family reunions
- Backyard events
- Corporate gatherings`,
    availability: 'Available most weekends',
    pickupInstructions: 'Flexible pickup times between 8 AM - 8 PM. I can also deliver within 5 miles for a small fee.',
    depositPolicy: 'Security deposit is pre-authorized on your card but not charged unless damage occurs. Full refund within 48 hours of return.',
    damageProtection: 'Normal wear and tear is expected. Deposit only applies to significant damage or missing items.',
    verificationLevel: 3,
    badges: ['Background Check', 'ID Verified', 'Social Linked', 'Mom-Approved'],
    isChildSafe: true,
    ageRange: 'All ages',
    safetyNotes: ['Non-toxic materials', 'Sturdy construction', 'Easy to clean', 'No sharp edges'],
    safetyScore: 95
  },
  {
    id: 2,
    title: 'Round Table Set (8 people)',
    category: 'Kids Birthday Parties',
    price: 25,
    weeklyRate: 150, // 7 days * $21.43/day discount
    deposit: 50,
    rating: 4.9,
    reviews: 67,
    location: '2.3 miles away',
    locationData: {
      city: 'Austin',
      state: 'TX',
      zipCode: '78702',
      county: 'Travis',
      latitude: 30.2672,
      longitude: -97.7431
    },
    owner: {
      name: 'Sarah M.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true,
      joinDate: 'January 2023',
      totalRentals: 45,
      responseTime: '< 2 hours'
    },
    images: [
      'https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1395965/pexels-photo-1395965.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1395966/pexels-photo-1395966.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    features: ['Seats 8', 'Outdoor use', 'Easy setup', 'Weather resistant'],
    description: `Beautiful round table set perfect for intimate gatherings and outdoor events. Includes one 60-inch round table and 8 comfortable chairs. Made from durable materials that can withstand outdoor use.

The set is easy to transport and assemble, making it perfect for backyard parties, small weddings, or family gatherings. All pieces are cleaned and inspected before each rental.

Great for:
- Backyard parties
- Small weddings
- Family gatherings
- Outdoor dining
- Garden events`,
    availability: 'Available weekdays and weekends',
    pickupInstructions: 'Pickup available between 9 AM - 6 PM. Delivery available within 3 miles for additional fee.',
    depositPolicy: 'Security deposit covers any damage to table or chairs. Full refund within 24 hours of return.',
    damageProtection: 'Normal wear and tear is expected. Deposit applies to significant damage, stains, or missing pieces.',
    verificationLevel: 2,
    badges: ['Background Check', 'ID Verified', 'Mom-Approved'],
    isChildSafe: true,
    ageRange: '3+ years',
    safetyNotes: ['Stable construction', 'Rounded edges', 'Easy to clean', 'Weather resistant'],
    safetyScore: 88
  },
  {
    id: 3,
    title: 'Balloon Arch Kit',
    category: 'Kids Birthday Parties',
    price: 35,
    deposit: 25,
    rating: 5.0,
    reviews: 89,
    location: '0.9 miles away',
    locationData: {
      city: 'Austin',
      state: 'TX',
      zipCode: '78703',
      county: 'Travis',
      latitude: 30.2672,
      longitude: -97.7431
    },
    owner: {
      name: 'Emma L.',
      avatar: 'https://images.pexels.com/photos/1234567/pexels-photo-1234567.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true,
      joinDate: 'February 2023',
      totalRentals: 156,
      responseTime: '< 30 minutes'
    },
    images: [
      'https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1449774/pexels-photo-1449774.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1449775/pexels-photo-1449775.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    features: ['Various colors', 'Easy assembly', 'Reusable', 'Includes pump'],
    description: `Complete balloon arch kit perfect for any celebration! Includes 100+ balloons in various colors, arch frame, balloon pump, and detailed setup instructions. The arch can be customized to match your event theme.

Professional-quality materials that create stunning visual impact. The arch is approximately 8 feet wide and 6 feet tall when assembled. Perfect for photo backdrops and entrance decorations.

Perfect for:
- Birthday parties
- Baby showers
- Graduation parties
- Wedding receptions
- Corporate events`,
    availability: 'Available most days with advance notice',
    pickupInstructions: 'Flexible pickup times. Setup service available for additional fee.',
    depositPolicy: 'Small deposit covers any missing pieces. Full refund when all items returned.',
    damageProtection: 'Balloons are consumable items. Deposit only applies to missing equipment.',
    verificationLevel: 3,
    badges: ['Background Check', 'ID Verified', 'Social Linked', 'Mom-Approved', 'Top Rated'],
    isChildSafe: true,
    ageRange: 'All ages',
    safetyNotes: ['Latex-free options available', 'Non-toxic materials', 'Easy cleanup', 'Safe for children'],
    safetyScore: 92
  },
  {
    id: 4,
    title: 'Elegant Linen Set',
    category: 'Weddings & Receptions',
    price: 40,
    weeklyRate: 240, // 7 days * $34.29/day discount
    deposit: 75,
    rating: 4.7,
    reviews: 23,
    location: '3.1 miles away',
    locationData: {
      city: 'Austin',
      state: 'TX',
      zipCode: '78704',
      county: 'Travis',
      latitude: 30.2672,
      longitude: -97.7431
    },
    owner: {
      name: 'Jennifer R.',
      avatar: 'https://images.pexels.com/photos/2345678/pexels-photo-2345678.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true,
      joinDate: 'December 2022',
      totalRentals: 78,
      responseTime: '< 1 hour'
    },
    images: [
      'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1395968/pexels-photo-1395968.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1395969/pexels-photo-1395969.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    features: ['Stain resistant', 'Multiple sizes', 'Freshly cleaned', 'Ironed'],
    description: `Beautiful linen set perfect for elegant events and formal gatherings. Includes tablecloths, napkins, and runners in classic white and ivory colors. All linens are professionally cleaned and pressed before each rental.

High-quality, stain-resistant fabric that looks elegant and is easy to maintain. Available in multiple sizes to accommodate different table configurations.

Ideal for:
- Wedding receptions
- Formal dinners
- Corporate events
- Holiday gatherings
- Anniversary parties`,
    availability: 'Available with 48-hour notice',
    pickupInstructions: 'Pickup available 24/7 with advance arrangement. Delivery available.',
    depositPolicy: 'Deposit covers any stains or damage. Full refund when linens returned clean.',
    damageProtection: 'Normal wear and tear is expected. Deposit applies to significant stains or tears.',
    verificationLevel: 2,
    badges: ['Background Check', 'ID Verified', 'Mom-Approved'],
    isChildSafe: true,
    ageRange: 'All ages',
    safetyNotes: ['Hypoallergenic fabric', 'Easy to clean', 'No harmful chemicals', 'Safe for sensitive skin'],
    safetyScore: 85
  },
  {
    id: 5,
    title: 'Outdoor Canopy Tent',
    category: 'Community Events',
    price: 45,
    weeklyRate: 280, // 7 days * $40/day discount
    deposit: 100,
    rating: 4.6,
    reviews: 28,
    location: '2.7 miles away',
    locationData: {
      city: 'Austin',
      state: 'TX',
      zipCode: '78705',
      county: 'Travis',
      latitude: 30.2672,
      longitude: -97.7431
    },
    owner: {
      name: 'David P.',
      avatar: 'https://images.pexels.com/photos/3456789/pexels-photo-3456789.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true,
      joinDate: 'November 2022',
      totalRentals: 34,
      responseTime: '< 2 hours'
    },
    images: [
      'https://images.pexels.com/photos/1187079/pexels-photo-1187079.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1187080/pexels-photo-1187080.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1187081/pexels-photo-1187081.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    features: ['20x20 feet', 'Weather resistant', 'Easy setup', 'Includes stakes'],
    description: `Large outdoor canopy tent perfect for events of all sizes. 20x20 foot coverage provides ample space for tables, chairs, and guests. Made from durable, weather-resistant materials.

Includes all necessary setup equipment: poles, stakes, ropes, and detailed instructions. Can be set up by 2-3 people in about 30 minutes. Perfect for outdoor events in any weather.

Great for:
- Outdoor weddings
- Backyard parties
- Corporate picnics
- Farmers markets
- Outdoor dining`,
    availability: 'Available weekends and holidays',
    pickupInstructions: 'Pickup available Friday-Sunday. Setup service available for additional fee.',
    depositPolicy: 'Deposit covers any damage to tent or equipment. Full refund within 48 hours.',
    damageProtection: 'Normal wear and tear is expected. Deposit applies to tears, broken poles, or missing equipment.',
    verificationLevel: 1,
    badges: ['Background Check', 'ID Verified'],
    isChildSafe: true,
    ageRange: 'All ages',
    safetyNotes: ['Stable construction', 'Weather resistant', 'Safe materials', 'No sharp edges'],
    safetyScore: 78
  },
  {
    id: 6,
    title: 'Kids Party Game Set',
    category: 'Kids Birthday Parties',
    price: 30,
    weeklyRate: 180, // 7 days * $25.71/day discount
    deposit: 35,
    rating: 4.9,
    reviews: 112,
    location: '1.2 miles away',
    locationData: {
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      county: 'Travis',
      latitude: 30.2672,
      longitude: -97.7431
    },
    owner: {
      name: 'Lisa T.',
      avatar: 'https://images.pexels.com/photos/4567890/pexels-photo-4567890.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true,
      joinDate: 'October 2022',
      totalRentals: 203,
      responseTime: '< 1 hour'
    },
    images: [
      'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1170413/pexels-photo-1170413.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1170414/pexels-photo-1170414.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    features: ['Ages 4-12', 'Multiple games', 'Indoor/outdoor', 'Includes prizes'],
    description: `Complete party game set perfect for children's birthday parties and family gatherings. Includes 10+ classic party games suitable for ages 4-12, with all necessary equipment and small prizes.

Games include: Pin the Tail on the Donkey, Musical Chairs, Bean Bag Toss, Ring Toss, and more. All games are safe, fun, and easy to set up. Perfect for keeping kids entertained for hours.

Perfect for:
- Birthday parties
- Family gatherings
- School events
- Community celebrations
- Holiday parties`,
    availability: 'Available most weekends',
    pickupInstructions: 'Flexible pickup times. Can be delivered for small fee.',
    depositPolicy: 'Small deposit covers any missing pieces. Full refund when all items returned.',
    damageProtection: 'Normal wear and tear is expected. Deposit applies to missing or broken pieces.',
    verificationLevel: 3,
    badges: ['Background Check', 'ID Verified', 'Social Linked', 'Mom-Approved', 'Top Rated'],
    isChildSafe: true,
    ageRange: '4-12 years',
    safetyNotes: ['Age-appropriate games', 'No small parts', 'Safe materials', 'Supervised play recommended'],
    safetyScore: 96
  }
];

// Get item by ID
export const getItemById = async (id: string | number): Promise<Item | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const itemId = typeof id === 'string' ? parseInt(id) : id;
  const item = items.find(item => item.id === itemId);
  
  return item || null;
};

// Get all items
export const getAllItems = async (): Promise<Item[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return items;
};

// Get items by category
export const getItemsByCategory = async (category: string): Promise<Item[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  if (category === 'all') {
    return items;
  }
  
  return items.filter(item => item.category.toLowerCase().includes(category.toLowerCase()));
};

// Create new item
export const createItem = async (itemData: Omit<Item, 'id' | 'rating' | 'reviews' | 'verificationLevel' | 'badges'>): Promise<Item> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newItem: Item = {
    ...itemData,
    id: Math.max(...items.map(item => item.id)) + 1,
    rating: 0,
    reviews: 0,
    verificationLevel: 1,
    badges: ['New Item']
  };
  
  items.push(newItem);
  return newItem;
};

// Delete item by ID
export const deleteItem = async (id: number): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items.splice(index, 1);
    return true;
  }
  return false;
}; 