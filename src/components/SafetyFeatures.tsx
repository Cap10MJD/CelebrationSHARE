import React, { useState } from 'react';
import { 
  Shield, 
  Heart, 
  Users, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle, 
  AlertTriangle,
  Phone,
  MessageCircle,
  Camera,
  FileText,
  Lock,
  Eye,
  Bell,
  Info
} from 'lucide-react';

interface SafetyFeaturesProps {
  itemId: number;
  ownerVerified: boolean;
  verificationLevel: number;
  badges: string[];
  responseTime: string;
  totalRentals: number;
  rating: number;
  reviews: number;
  joinDate: string;
  safetyScore?: number;
}

const SafetyFeatures: React.FC<SafetyFeaturesProps> = ({
  itemId,
  ownerVerified,
  verificationLevel,
  badges,
  responseTime,
  totalRentals,
  rating,
  reviews,
  joinDate,
  safetyScore = 85
}) => {
  const [showSafetyGuide, setShowSafetyGuide] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const getVerificationIcon = (level: number) => {
    switch (level) {
      case 1:
        return <Shield className="w-4 h-4 text-mauve-500" />;
      case 2:
        return <Shield className="w-4 h-4 text-mauve-600" />;
      case 3:
        return <Shield className="w-4 h-4 text-mauve-700" />;
      default:
        return <Shield className="w-4 h-4 text-taupe-600" />;
    }
  };

  const getVerificationText = (level: number) => {
    switch (level) {
      case 1:
        return 'Basic Verification';
      case 2:
        return 'Enhanced Verification';
      case 3:
        return 'Premium Verification';
      default:
        return 'Not Verified';
    }
  };

  const getSafetyScoreColor = (score: number) => {
    if (score >= 90) return 'text-mauve-700';
    if (score >= 80) return 'text-mauve-500';
    if (score >= 70) return 'text-mauve-600';
    return 'text-rose-700';
  };

  const getSafetyScoreText = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    return 'Needs Attention';
  };

  return (
    <>
      {/* Safety Features Section */}
      <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-primary">Family Safety Features</h3>
        </div>

        {/* Safety Score */}
        <div className="mb-6 p-4 bg-gradient-to-r from-secondary/50 to-mauve-100 rounded-lg border border-secondary">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              <span className="font-semibold text-primary">Safety Score</span>
            </div>
            <div className={`text-2xl font-bold ${getSafetyScoreColor(safetyScore)}`}>
              {safetyScore}%
            </div>
          </div>
          <p className="text-sm text-text mb-3">
            {getSafetyScoreText(safetyScore)} - This owner has passed our family safety checks
          </p>
          <div className="w-full bg-mauve-50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-accent to-mauve-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${safetyScore}%` }}
            ></div>
          </div>
        </div>

        {/* Verification Status */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 border border-secondary rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              {getVerificationIcon(verificationLevel)}
              <span className="font-medium text-primary">Verification Level</span>
            </div>
            <p className="text-sm text-text mb-1">{getVerificationText(verificationLevel)}</p>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((level) => (
                <div
                  key={level}
                  className={`w-2 h-2 rounded-full ${
                    level <= verificationLevel ? 'bg-accent' : 'bg-mauve-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-4 border border-secondary rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-mauve-500" />
              <span className="font-medium text-primary">Community Trust</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{rating}/5</span>
              <span className="text-sm text-text">({reviews} reviews)</span>
            </div>
            <p className="text-sm text-text">{totalRentals} successful rentals</p>
          </div>
        </div>

        {/* Safety Badges */}
        <div className="mb-6">
          <h4 className="font-medium text-primary mb-3">Safety Badges</h4>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-3 py-1 bg-mauve-50 text-mauve-800 rounded-full text-sm font-medium"
              >
                <CheckCircle className="w-3 h-3" />
                {badge}
              </div>
            ))}
            {badges.includes('Mom-Approved') && (
              <div className="flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">
                <Heart className="w-3 h-3" />
                Mom-Approved
              </div>
            )}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-mauve-50 border border-mauve-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-mauve-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-mauve-900 mb-2">Safety Tips for Moms</h4>
              <ul className="text-sm text-mauve-800 space-y-1">
                <li>• Always meet in a safe, public location</li>
                <li>• Bring a friend or family member with you</li>
                <li>• Take photos of the item before and after rental</li>
                <li>• Keep all communication through our platform</li>
                <li>• Trust your instincts - if something feels off, don't proceed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowSafetyGuide(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-mauve-700 transition-colors"
          >
            <Shield className="w-4 h-4" />
            View Safety Guide
          </button>
          <button
            onClick={() => setShowReportModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-rose-400 text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
          >
            <AlertTriangle className="w-4 h-4" />
            Report Concern
          </button>
        </div>
      </div>

      {/* Safety Guide Modal */}
      {showSafetyGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-secondary">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary">Family Safety Guide</h2>
                  <p className="text-sm text-text">Tips for safe and secure rentals</p>
                </div>
              </div>
              <button
                onClick={() => setShowSafetyGuide(false)}
                className="p-2 text-text hover:text-accent transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="space-y-6">
                {/* Before Meeting */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Before Meeting
                  </h3>
                  <ul className="space-y-2 text-text">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5" />
                      <span>Verify the owner's profile and reviews</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5" />
                      <span>Check their verification level and safety badges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5" />
                      <span>Communicate through our secure chat system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5" />
                      <span>Agree on a safe, public meeting location</span>
                    </li>
                  </ul>
                </div>

                {/* During Meeting */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    During Meeting
                  </h3>
                  <ul className="space-y-2 text-text">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5" />
                      <span>Meet in a well-lit, public area (coffee shop, library, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5" />
                      <span>Bring a friend or family member with you</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5" />
                      <span>Inspect the item thoroughly before accepting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5" />
                      <span>Take photos of the item's condition</span>
                    </li>
                  </ul>
                </div>

                {/* Safety Features */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Our Safety Features
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-mauve-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="w-4 h-4 text-accent" />
                        <span className="font-medium text-accent">Secure Payments</span>
                      </div>
                      <p className="text-sm text-accent">All payments are processed securely through Stripe</p>
                    </div>
                    <div className="p-3 bg-mauve-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="w-4 h-4 text-mauve-500" />
                        <span className="font-medium text-mauve-800">Background Checks</span>
                      </div>
                      <p className="text-sm text-mauve-700">Owners undergo verification and background checks</p>
                    </div>
                    <div className="p-3 bg-mauve-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageCircle className="w-4 h-4 text-mauve-600" />
                        <span className="font-medium text-mauve-800">Safe Communication</span>
                      </div>
                      <p className="text-sm text-mauve-700">All messages are monitored for safety</p>
                    </div>
                    <div className="p-3 bg-accent rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="w-4 h-4 text-accent" />
                        <span className="font-medium text-accent">24/7 Support</span>
                      </div>
                      <p className="text-sm text-accent">Report any concerns immediately</p>
                    </div>
                  </div>
                </div>

                {/* Emergency Contacts */}
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-rose-800 mb-3">Emergency Contacts</h3>
                  <div className="space-y-2 text-sm text-rose-700">
                    <p><strong>Safety Team:</strong> safety@celebrationShare.com or contact us via email</p>
                    <p><strong>Support:</strong> support@celebrationShare.com (24-hour response)</p>
                    <p><strong>Phone:</strong> Contact us via email for fastest response</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-secondary">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-rose-600 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary">Report Safety Concern</h2>
                  <p className="text-sm text-text">Help keep our community safe</p>
                </div>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-2 text-text hover:text-accent transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <p className="text-text">
                  If you have a safety concern about this item or owner, please report it immediately. 
                  Our safety team will investigate within 2 hours.
                </p>
                
                <div className="space-y-3">
                  <button className="w-full p-3 border border-rose-400 text-rose-600 rounded-lg hover:bg-rose-50 transition-colors text-left">
                    <div className="font-medium">Report Suspicious Activity</div>
                    <div className="text-sm">Unusual behavior or red flags</div>
                  </button>
                  
                  <button className="w-full p-3 border border-rose-400 text-rose-600 rounded-lg hover:bg-rose-50 transition-colors text-left">
                    <div className="font-medium">Report Item Issues</div>
                    <div className="text-sm">Damaged, unsafe, or misrepresented items</div>
                  </button>
                  
                  <button className="w-full p-3 border border-rose-400 text-rose-600 rounded-lg hover:bg-rose-50 transition-colors text-left">
                    <div className="font-medium">Report Communication Problems</div>
                    <div className="text-sm">Inappropriate messages or harassment</div>
                  </button>
                </div>

                <div className="bg-rose-50 border border-rose-200 rounded-lg p-3">
                  <p className="text-sm text-rose-600">
                    <strong>Emergency:</strong> safety@celebrationShare.com or contact us via email
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SafetyFeatures; 