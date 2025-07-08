import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Brain, Users, Star } from 'lucide-react';

interface SafetyRecommendation {
  type: 'warning' | 'success' | 'info';
  title: string;
  description: string;
  action?: string;
}

interface TrustScore {
  overall: number;
  safety: number;
  reliability: number;
  community: number;
  factors: string[];
}

export default function AISafetyAdvisor() {
  const [isOpen, setIsOpen] = useState(false);
  const [recommendations, setRecommendations] = useState<SafetyRecommendation[]>([
    {
      type: 'success',
      title: 'Verified Owner',
      description: 'This owner has completed ID verification and background check',
      action: 'View verification details'
    },
    {
      type: 'info',
      title: 'Family-Friendly Item',
      description: 'This item has been flagged as safe for children by our AI',
      action: 'See safety features'
    },
    {
      type: 'warning',
      title: 'Weather Alert',
      description: 'Heavy rain expected during your rental period. Consider indoor alternatives.',
      action: 'View weather details'
    }
  ]);

  const [trustScore, setTrustScore] = useState<TrustScore>({
    overall: 87,
    safety: 92,
    reliability: 85,
    community: 89,
    factors: [
      'Owner has 4.9/5 rating from 47 reviews',
      'Item has been rented 23 times successfully',
      'Owner responds within 2 hours on average',
      'No safety incidents reported',
      'Verified payment method'
    ]
  });

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating AI Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        <Brain className="w-6 h-6" />
      </button>

      {/* AI Safety Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">AI Safety Advisor</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          {/* Trust Score */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-gray-900">Trust Score</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{trustScore.overall}</div>
                <div className="text-xs text-gray-600">Overall</div>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span>Safety</span>
                  <span className="font-semibold">{trustScore.safety}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Reliability</span>
                  <span className="font-semibold">{trustScore.reliability}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Community</span>
                  <span className="font-semibold">{trustScore.community}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Recommendations */}
          <div className="space-y-3 mb-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              AI Recommendations
            </h4>
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border-l-4 ${
                  rec.type === 'warning'
                    ? 'bg-yellow-50 border-yellow-400'
                    : rec.type === 'success'
                    ? 'bg-green-50 border-green-400'
                    : 'bg-blue-50 border-blue-400'
                }`}
              >
                <div className="flex items-start gap-2">
                  {rec.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  ) : rec.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  ) : (
                    <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 text-sm">{rec.title}</h5>
                    <p className="text-xs text-gray-600 mt-1">{rec.description}</p>
                    {rec.action && (
                      <button className="text-xs text-blue-600 hover:underline mt-1">
                        {rec.action}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Factors */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 text-sm">Trust Factors</h4>
            <div className="space-y-1">
              {trustScore.factors.map((factor, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  {factor}
                </div>
              ))}
            </div>
          </div>

          {/* AI Disclaimer */}
          <div className="mt-4 p-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 text-center">
              AI-powered insights • Updated in real-time • 99.2% accuracy
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 