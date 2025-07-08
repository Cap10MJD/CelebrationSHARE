import React, { useState } from 'react';
import { Heart, Shield, Baby, Users, Star, CheckCircle } from 'lucide-react';

interface MomApprovedItem {
  id: string;
  name: string;
  category: string;
  safetyRating: number;
  childFriendly: boolean;
  momReviews: number;
  safetyFeatures: string[];
  image: string;
  price: number;
}

export default function MomApprovedFilter() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const safetyFilters = [
    { id: 'child-safe', label: 'Child Safe', icon: Baby },
    { id: 'non-toxic', label: 'Non-Toxic Materials', icon: Shield },
    { id: 'sturdy', label: 'Sturdy Construction', icon: CheckCircle },
    { id: 'easy-clean', label: 'Easy to Clean', icon: Star },
    { id: 'no-sharp-edges', label: 'No Sharp Edges', icon: Heart }
  ];

  const momApprovedItems: MomApprovedItem[] = [
    {
      id: '1',
      name: 'Soft Play Mat',
      category: 'Children',
      safetyRating: 5,
      childFriendly: true,
      momReviews: 47,
      safetyFeatures: ['Non-toxic', 'Easy to clean', 'Soft edges'],
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg',
      price: 15
    },
    {
      id: '2',
      name: 'Kid-Friendly Table Set',
      category: 'Furniture',
      safetyRating: 5,
      childFriendly: true,
      momReviews: 32,
      safetyFeatures: ['Rounded corners', 'Sturdy', 'Wipeable'],
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg',
      price: 25
    }
  ];

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-pink-100 rounded-full">
            <Heart className="w-6 h-6 text-pink-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Parent-Approved Safety Filter</h3>
            <p className="text-sm text-gray-600">Find items that parents trust for their families</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-pink-600 hover:text-pink-700"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {/* Safety Filters */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Safety Features</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {safetyFilters.map(filter => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => toggleFilter(filter.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                      selectedFilters.includes(filter.id)
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{filter.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Parent-Approved Items */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Parent-Approved Items</h4>
            <div className="grid gap-4">
              {momApprovedItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900">{item.name}</h5>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-yellow-400">
                        {[...Array(item.safetyRating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({item.momReviews} parent reviews)</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.safetyFeatures.map(feature => (
                        <span key={feature} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">${item.price}/day</div>
                    <div className="text-sm text-green-600 font-medium">Parent-Approved ✓</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Tips */}
          <div className="bg-blue-50 p-4 rounded-xl">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Parent Safety Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Always check for small parts that could be choking hazards</li>
              <li>• Look for items with rounded corners and soft edges</li>
              <li>• Choose items made from non-toxic, easy-to-clean materials</li>
              <li>• Read reviews from other parents before renting</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
} 