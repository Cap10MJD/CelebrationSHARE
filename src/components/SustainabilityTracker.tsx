import React, { useState } from 'react';
import { Leaf, Heart, DollarSign, Users, TrendingUp, Award } from 'lucide-react';

interface ImpactMetrics {
  environmental: {
    co2Saved: number;
    itemsReused: number;
    wasteReduced: number;
  };
  community: {
    moneySaved: number;
    localEarnings: number;
    connectionsMade: number;
  };
  personal: {
    totalSavings: number;
    itemsRented: number;
    communityRating: number;
  };
}

export default function SustainabilityTracker() {
  const [impactMetrics, setImpactMetrics] = useState<ImpactMetrics>({
    environmental: {
      co2Saved: 127,
      itemsReused: 23,
      wasteReduced: 45
    },
    community: {
      moneySaved: 1240,
      localEarnings: 890,
      connectionsMade: 12
    },
    personal: {
      totalSavings: 340,
      itemsRented: 8,
      communityRating: 4.9
    }
  });

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Leaf className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-bold text-gray-900">Your Impact</h2>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-green-600 hover:text-green-700 text-sm font-medium"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      </div>

      {/* Environmental Impact */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Leaf className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">{impactMetrics.environmental.co2Saved}</div>
          <div className="text-sm text-gray-600">lbs CO₂ saved</div>
          <div className="text-xs text-gray-500 mt-1">vs buying new</div>
        </div>

        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600">{impactMetrics.environmental.itemsReused}</div>
          <div className="text-sm text-gray-600">items reused</div>
          <div className="text-xs text-gray-500 mt-1">extending life</div>
        </div>

        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Heart className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-600">${impactMetrics.community.moneySaved}</div>
          <div className="text-sm text-gray-600">money saved</div>
          <div className="text-xs text-gray-500 mt-1">vs traditional rental</div>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Community Impact */}
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Community Impact
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">${impactMetrics.community.localEarnings}</div>
                <div className="text-sm text-gray-600">Earned by neighbors</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{impactMetrics.community.connectionsMade}</div>
                <div className="text-sm text-gray-600">New connections</div>
              </div>
            </div>
          </div>

          {/* Personal Impact */}
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              Your Contribution
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">${impactMetrics.personal.totalSavings}</div>
                <div className="text-sm text-gray-600">You saved</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{impactMetrics.personal.itemsRented}</div>
                <div className="text-sm text-gray-600">Items rented</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-600">{impactMetrics.personal.communityRating}</div>
                <div className="text-sm text-gray-600">Your rating</div>
              </div>
            </div>
          </div>

          {/* Impact Comparison */}
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Your Impact vs Traditional Rental</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Environmental footprint</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-red-200 rounded-full">
                    <div className="w-4 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-xs text-green-600 font-medium">-85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Cost savings</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-green-200 rounded-full">
                    <div className="w-16 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-xs text-green-600 font-medium">+60%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Community benefit</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-blue-200 rounded-full">
                    <div className="w-20 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="text-xs text-green-600 font-medium">+100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Your Achievements</h3>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                <Leaf className="w-4 h-4" />
                Eco Warrior
              </div>
              <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                <Users className="w-4 h-4" />
                Community Builder
              </div>
              <div className="flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                <DollarSign className="w-4 h-4" />
                Smart Saver
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Every rental helps build a more sustainable, connected community! 🌱
        </p>
      </div>
    </div>
  );
} 