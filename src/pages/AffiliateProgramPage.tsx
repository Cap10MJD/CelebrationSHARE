import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AffiliateProgramPage: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<'starter' | 'pro' | 'elite'>('starter');
  const [referralCode, setReferralCode] = useState('NEIGHBOR2024');

  const tiers = {
    starter: {
      name: 'Community Starter',
      commission: '2%',
      requirements: '5 successful referrals',
      benefits: ['Basic tracking dashboard', 'Email support', 'Standard marketing materials']
    },
    pro: {
      name: 'Neighborhood Pro',
      commission: '3%',
      requirements: '25 successful referrals',
      benefits: ['Advanced analytics', 'Priority support', 'Custom referral links', 'Social media toolkit']
    },
    elite: {
      name: 'Community Elite',
      commission: '4%',
      requirements: '50+ successful referrals',
      benefits: ['Highest commission rate', 'Dedicated account manager', 'Exclusive events', 'Brand ambassador status']
    }
  };

  const marketingMaterials = [
    {
      title: 'Social Media Posts',
      description: 'Ready-to-use posts for Instagram, Facebook, and TikTok',
      icon: '📱'
    },
    {
      title: 'Email Templates',
      description: 'Professional email templates for your network',
      icon: '📧'
    },
    {
      title: 'Flyers & Posters',
      description: 'Printable materials for local community boards',
      icon: '📄'
    },
    {
      title: 'Video Content',
      description: 'Shareable videos explaining the platform',
      icon: '🎥'
    }
  ];

  const successStories = [
    {
      name: 'Sarah M.',
      location: 'Austin, TX',
      earnings: '$2,400',
      story: 'Started sharing with my mom group and now I earn extra income while helping neighbors!'
    },
    {
      name: 'Mike R.',
      location: 'Portland, OR',
      earnings: '$1,800',
      story: 'Perfect side hustle for a stay-at-home dad. The community aspect is amazing.'
    },
    {
      name: 'Lisa K.',
      location: 'Denver, CO',
      earnings: '$3,200',
      story: 'I love connecting people in my neighborhood. It feels like I\'m building something special.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="text-xl font-bold text-gray-900">CelebrationShare</span>
            </Link>
            <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              🎉 Earn While Building Community
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join our affiliate program and earn up to 4% commission by helping your neighbors discover CelebrationShare. 
              Turn your community connections into income!
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 How Commissions Work</h3>
              <p className="text-blue-800 text-sm">
                When someone rents through your referral link, you earn a commission on the rental fee. 
                This is <strong>additional income</strong> for you and helps grow our community!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                🚀 Join Affiliate Program
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all">
                📊 View Your Dashboard
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">$50K+</div>
              <div className="text-gray-600">Total Paid to Affiliates</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Active Affiliates</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">4%</div>
              <div className="text-gray-600">Max Commission Rate</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">24hr</div>
              <div className="text-gray-600">Commission Payout</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to start earning</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Your Link</h3>
              <p className="text-gray-600">Sign up and get your unique referral link to share with friends and neighbors</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Share & Connect</h3>
              <p className="text-gray-600">Share your link on social media, in community groups, or with your network</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Earn Commissions</h3>
              <p className="text-gray-600">Earn up to 4% commission on every rental your referrals complete</p>
            </div>
          </div>
        </div>
      </div>

      {/* Commission Structure Explanation */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">💰 How Commissions Work</h2>
            <p className="text-xl text-gray-600">Clear, transparent earnings for everyone</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-3xl mb-4">👤</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Item Owner</h3>
              <p className="text-gray-600 text-sm">Gets their full rental fee (no deduction for affiliate commissions)</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-3xl mb-4">🎉</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Affiliate</h3>
              <p className="text-gray-600 text-sm">Earns commission on top of the rental fee (additional income)</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="text-3xl mb-4">🏢</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Platform</h3>
              <p className="text-gray-600 text-sm">Maintains our tiered platform fee (22%/18%) to keep the community safe</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Example: $100 Rental (New User - 22% Platform Fee)</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">$78</div>
                <div className="text-sm text-gray-600">Item Owner Receives</div>
                <div className="text-xs text-gray-500">(78% after platform fee)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">$4</div>
                <div className="text-sm text-gray-600">Affiliate Earns</div>
                <div className="text-xs text-gray-500">(4% commission)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">$18</div>
                <div className="text-sm text-gray-600">Platform Keeps</div>
                <div className="text-xs text-gray-500">(18% after affiliate)</div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 mt-4">
              <strong>Total:</strong> $100 rental fee = $78 to owner + $4 to affiliate + $18 to platform
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Example: $100 Rental (Experienced User - 18% Platform Fee)</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">$82</div>
                <div className="text-sm text-gray-600">Item Owner Receives</div>
                <div className="text-xs text-gray-500">(82% after platform fee)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">$4</div>
                <div className="text-sm text-gray-600">Affiliate Earns</div>
                <div className="text-xs text-gray-500">(4% commission)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">$14</div>
                <div className="text-sm text-gray-600">Platform Keeps</div>
                <div className="text-xs text-gray-500">(14% after affiliate)</div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 mt-4">
              <strong>Total:</strong> $100 rental fee = $82 to owner + $4 to affiliate + $14 to platform
            </p>
          </div>
        </div>
      </div>

      {/* Commission Tiers */}
      <div className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Commission Tiers</h2>
            <p className="text-xl text-gray-600">Earn more as you grow your community</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(tiers).map(([key, tier]) => (
              <div
                key={key}
                className={`bg-white p-8 rounded-2xl shadow-lg border-2 transition-all cursor-pointer ${
                  selectedTier === key ? 'border-blue-500 shadow-xl' : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedTier(key as any)}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{tier.commission}</div>
                  <div className="text-gray-600">Commission Rate</div>
                </div>
                
                <div className="mb-6">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Requirements:</div>
                  <div className="text-gray-600">{tier.requirements}</div>
                </div>
                
                <div className="mb-6">
                  <div className="text-sm font-semibold text-gray-700 mb-3">Benefits:</div>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all">
                  Join {tier.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Your Referral Code */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Referral Code</h2>
            <p className="text-xl text-gray-600">Share this code with your community</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-4">Your Unique Code</div>
              <div className="bg-white p-4 rounded-xl border-2 border-dashed border-blue-300 mb-6">
                <div className="text-3xl font-bold text-blue-600 font-mono">{referralCode}</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all">
                  📋 Copy Code
                </button>
                <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all">
                  🔗 Copy Link
                </button>
                <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all">
                  📱 Share on Social
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marketing Materials */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Marketing Materials</h2>
            <p className="text-xl text-gray-600">Everything you need to promote CelebrationShare</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketingMaterials.map((material, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <div className="text-4xl mb-4">{material.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{material.title}</h3>
                <p className="text-gray-600 mb-4">{material.description}</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Real people earning real money</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{story.name}</div>
                    <div className="text-sm text-gray-600">{story.location}</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600 mb-3">${story.earnings}</div>
                <p className="text-gray-700 italic">"{story.story}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Earning?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of community members who are already earning by sharing CelebrationShare
          </p>
          <div className="bg-white/10 rounded-xl p-4 mb-8 max-w-2xl mx-auto">
            <p className="text-blue-100 text-sm">
              <strong>Example:</strong> If someone rents a $100 item through your link, you earn $4 (4% commission) 
              while the item owner still gets their full rental fee! Platform fees vary by user experience level.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg">
              🚀 Start Earning Today
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all">
              📞 Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateProgramPage; 