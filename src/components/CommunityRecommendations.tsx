import React, { useState } from 'react';
import { Users, Heart, MapPin, Star, MessageCircle, Share2, Award } from 'lucide-react';

interface CommunityRecommendation {
  id: string;
  type: 'neighbor' | 'local_expert' | 'verified_reviewer';
  name: string;
  avatar: string;
  location: string;
  recommendation: string;
  rating: number;
  trustLevel: 'verified' | 'expert' | 'neighbor';
  distance: string;
  mutualConnections?: number;
}

export default function CommunityRecommendations() {
  const [recommendations, setRecommendations] = useState<CommunityRecommendation[]>([
    {
      id: '1',
      type: 'neighbor',
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      location: '2 blocks away',
      recommendation: 'Rented these chairs for my daughter\'s graduation party. Perfect condition and the owner was so helpful with setup tips!',
      rating: 5,
      trustLevel: 'verified',
      distance: '0.3 miles',
      mutualConnections: 3
    },
    {
      id: '2',
      type: 'local_expert',
      name: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
      location: 'Event Planner',
      recommendation: 'As a local event planner, I\'ve used this equipment multiple times. Professional quality and reliable service.',
      rating: 5,
      trustLevel: 'expert',
      distance: '1.2 miles'
    },
    {
      id: '3',
      type: 'verified_reviewer',
      name: 'Lisa Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      location: 'Verified Community Member',
      recommendation: 'Great for family events! The owner even included extra decorations when I mentioned it was for my son\'s birthday.',
      rating: 5,
      trustLevel: 'neighbor',
      distance: '0.8 miles',
      mutualConnections: 1
    }
  ]);

  const getTrustBadge = (level: string) => {
    switch (level) {
      case 'verified':
        return <Award className="w-4 h-4 text-blue-600" />;
      case 'expert':
        return <Star className="w-4 h-4 text-yellow-500" />;
      case 'neighbor':
        return <Users className="w-4 h-4 text-green-600" />;
      default:
        return null;
    }
  };

  const getTrustLabel = (level: string) => {
    switch (level) {
      case 'verified':
        return 'Verified Neighbor';
      case 'expert':
        return 'Local Expert';
      case 'neighbor':
        return 'Community Member';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">Community Recommendations</h2>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <img
                src={rec.avatar}
                alt={rec.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{rec.name}</h3>
                  {getTrustBadge(rec.trustLevel)}
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {getTrustLabel(rec.trustLevel)}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>{rec.location}</span>
                  <span>•</span>
                  <span>{rec.distance}</span>
                  {rec.mutualConnections && (
                    <>
                      <span>•</span>
                      <span className="text-blue-600">{rec.mutualConnections} mutual connections</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rec.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">({rec.rating}/5)</span>
                </div>

                <p className="text-gray-700 text-sm mb-3">{rec.recommendation}</p>

                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm">
                    <Heart className="w-4 h-4" />
                    Helpful
                  </button>
                  <button className="flex items-center gap-1 text-gray-600 hover:text-gray-700 text-sm">
                    <MessageCircle className="w-4 h-4" />
                    Ask Question
                  </button>
                  <button className="flex items-center gap-1 text-gray-600 hover:text-gray-700 text-sm">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-red-500" />
          <h3 className="font-semibold text-gray-900">Why Community Recommendations?</h3>
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• <strong>Local Knowledge:</strong> Get insights from people who know your neighborhood</p>
          <p>• <strong>Trusted Connections:</strong> See mutual connections and verified neighbors</p>
          <p>• <strong>Real Experiences:</strong> Authentic reviews from people who actually used the items</p>
          <p>• <strong>Expert Insights:</strong> Recommendations from local event planners and professionals</p>
        </div>
      </div>
    </div>
  );
} 