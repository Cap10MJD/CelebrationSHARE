import React, { useState } from 'react';
import { 
  Heart, 
  Shield, 
  Users, 
  X, 
  Info,
  Lock,
  Eye
} from 'lucide-react';

interface FamilySafetyNoticeProps {
  type?: 'banner' | 'card' | 'modal';
  onDismiss?: () => void;
  showDismiss?: boolean;
}

const FamilySafetyNotice: React.FC<FamilySafetyNoticeProps> = ({ 
  type = 'banner',
  onDismiss,
  showDismiss = true
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const safetyFeatures = [
    {
      icon: <Shield className="w-4 h-4" />,
      title: 'Background Checked',
      description: 'All owners verified'
    },
    {
      icon: <Users className="w-4 h-4" />,
      title: 'Family Verified',
      description: 'Mom-approved community'
    },
    {
      icon: <Lock className="w-4 h-4" />,
      title: 'Secure Payments',
      description: 'Protected transactions'
    },
    {
      icon: <Eye className="w-4 h-4" />,
      title: '24/7 Monitoring',
      description: 'Always watching out for you'
    }
  ];

  if (type === 'banner') {
    return (
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 border-b border-pink-200 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-pink-800">Family Safety First</h3>
              <p className="text-sm text-pink-700">
                Every owner is background checked and family verified. Your safety is our priority.
              </p>
            </div>
          </div>
          {showDismiss && (
            <button
              onClick={handleDismiss}
              className="text-pink-600 hover:text-pink-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="bg-white rounded-xl shadow-soft p-6 border border-pink-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary">Family Safety Guarantee</h3>
            <p className="text-sm text-text">Your family's safety is our top priority</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {safetyFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
              <div className="text-pink-600">
                {feature.icon}
              </div>
              <div>
                <div className="font-medium text-primary text-sm">{feature.title}</div>
                <div className="text-xs text-text">{feature.description}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <strong>Need help?</strong> Our safety team is available 24/7 at{' '}
              <a href="mailto:safety@celebrationShare.com" className="underline">
                safety@celebrationShare.com
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'modal') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full">
          <div className="flex items-center justify-between p-6 border-b border-secondary">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">Family Safety</h2>
                <p className="text-sm text-text">How we protect your family</p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="p-2 text-text hover:text-accent transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <p className="text-text">
                We understand that as a mom, your family's safety is your top priority. 
                That's why we've built multiple layers of protection into our platform.
              </p>

              <div className="space-y-3">
                {safetyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-pink-600">
                      {feature.icon}
                    </div>
                    <div>
                      <div className="font-medium text-primary">{feature.title}</div>
                      <div className="text-sm text-text">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                <h4 className="font-medium text-pink-800 mb-2">Mom-Approved Community</h4>
                <p className="text-sm text-pink-700">
                  Our community is built by moms, for moms. Every item and owner is 
                  carefully vetted to ensure your family's safety and peace of mind.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleDismiss}
                  className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-mauve-700 transition-colors"
                >
                  Got it, thanks!
                </button>
                <button className="flex-1 border border-secondary text-primary py-2 rounded-lg hover:bg-background transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default FamilySafetyNotice; 