import React from 'react';
import { 
  Shield, 
  Heart, 
  Users, 
  TrendingDown, 
  CheckCircle, 
  Info,
  DollarSign,
  Star,
  Zap,
  Globe
} from 'lucide-react';
import { commissionConfig, feeTransparencyConfig } from '../config/stripe';

const PricingPage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "Family Safety First",
      description: "Comprehensive background checks, ID verification, and safety monitoring for every user"
    },
    {
      icon: Heart,
      title: "Community-Driven",
      description: "Neighbor-to-neighbor rentals with local support and trust-building features"
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Round-the-clock customer service and dispute resolution for peace of mind"
    },
    {
      icon: Zap,
      title: "Instant Booking",
      description: "Secure payments and instant confirmations for seamless rental experiences"
    }
  ];

  const feeBreakdown = [
    {
      title: "Insurance Protection",
      description: "Comprehensive damage protection for all rentals",
      percentage: "40%",
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Customer Support",
      description: "24/7 support team and dispute resolution",
      percentage: "30%",
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Platform Security",
      description: "Secure payments, fraud protection, and data security",
      percentage: "20%",
      color: "bg-purple-100 text-purple-800"
    },
    {
      title: "Platform Maintenance",
      description: "App development, safety features, and community tools",
      percentage: "10%",
      color: "bg-orange-100 text-orange-800"
    }
  ];

  const comparisonData = [
    {
      feature: "Average Rental Cost",
      celebrationShare: "$75",
      traditional: "$125",
      savings: "40%"
    },
    {
      feature: "Security Deposit",
      celebrationShare: "$35",
      traditional: "$100",
      savings: "65%"
    },
    {
      feature: "Booking Fee",
      celebrationShare: "$5",
      traditional: "$25",
      savings: "80%"
    },
    {
      feature: "Insurance",
      celebrationShare: "$10",
      traditional: "$30",
      savings: "67%"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transparent Pricing
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Save up to 40% compared to traditional rental companies
            </p>
            <div className="flex items-center justify-center space-x-4 text-lg">
              <TrendingDown className="h-6 w-6" />
              <span>Family-friendly rates with no hidden fees</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Fee Structure */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Our Fee Structure Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in fair, transparent pricing that rewards our community members while keeping our platform safe and sustainable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* New Users */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">New Community Members</h3>
                  <p className="text-gray-600">0-9 completed rentals</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {Math.round(commissionConfig.tiers.newUser * 100)}% Platform Fee
              </div>
              <p className="text-gray-600 mb-4">
                Start earning with our standard rate while building trust in the community.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Full safety features included
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Insurance and support coverage
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Access to all platform tools
                </li>
              </ul>
            </div>

            {/* Experienced Users */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-500">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Experienced Members</h3>
                  <p className="text-gray-600">10+ completed rentals</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {Math.round(commissionConfig.tiers.experiencedUser * 100)}% Platform Fee
              </div>
              <p className="text-gray-600 mb-4">
                Earn more with our reduced rate for trusted community members.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  All safety features included
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Priority customer support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Enhanced visibility in search
                </li>
              </ul>
            </div>
          </div>

          {/* Fee Limits */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Fair Fee Limits</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  ${(commissionConfig.minCommission / 100).toFixed(2)}
                </div>
                <p className="text-gray-600">Minimum Commission</p>
                <p className="text-sm text-gray-500 mt-1">Never pay less than this amount</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  ${(commissionConfig.maxCommission / 100).toFixed(2)}
                </div>
                <p className="text-gray-600">Maximum Commission</p>
                <p className="text-sm text-gray-500 mt-1">Capped to keep costs reasonable</p>
              </div>
            </div>
          </div>
        </div>

        {/* What Your Fee Covers */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Your Platform Fee Covers
            </h2>
            <p className="text-xl text-gray-600">
              Every dollar goes toward making CelebrationShare safer and more reliable for families.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {feeBreakdown.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${item.color}`}>
                  <span className="font-bold text-sm">{item.percentage}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-xl p-8">
            <div className="flex items-start space-x-4">
              <Info className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Why We Charge Platform Fees
                </h3>
                <p className="text-blue-800 mb-4">
                  Our platform fees enable us to provide the safety, support, and reliability that families expect. 
                  Unlike traditional rental companies with high overhead costs, we keep our fees low while maintaining 
                  the highest standards of service and security.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
                  <div>
                    <strong>Safety & Verification:</strong> Background checks, ID verification, and safety monitoring
                  </div>
                  <div>
                    <strong>Customer Support:</strong> 24/7 help desk and dispute resolution services
                  </div>
                  <div>
                    <strong>Payment Security:</strong> Secure payment processing and fraud protection
                  </div>
                  <div>
                    <strong>Platform Development:</strong> Continuous app improvements and new features
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              CelebrationShare vs Traditional Rental Companies
            </h2>
            <p className="text-xl text-gray-600">
              See how much you can save by choosing our community-driven platform.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">CelebrationShare</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Traditional Rental</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Your Savings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-900">{row.celebrationShare}</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-900">{row.traditional}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {row.savings}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-600">
              Beyond just lower prices, we offer a better experience for families.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="bg-blue-100 p-3 rounded-full inline-flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Saving?</h2>
          <p className="text-xl mb-6 text-blue-100">
            Join thousands of families who are already saving money while building community connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Browse Items
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              List Your Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage; 