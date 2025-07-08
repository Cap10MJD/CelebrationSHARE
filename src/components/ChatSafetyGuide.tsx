import React, { useState } from 'react';
import { Shield, User, MessageSquare, AlertTriangle, CheckCircle, X, Info } from 'lucide-react';

interface ChatSafetyGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatSafetyGuide: React.FC<ChatSafetyGuideProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'tips' | 'reporting'>('overview');

  if (!isOpen) return null;

  const safetyFeatures = [
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: 'Auto-Filtering',
      description: 'All messages are automatically scanned for inappropriate content, profanity, and personal information.',
      status: 'Active'
    },
    {
      icon: <User className="w-6 h-6 text-blue-600" />,
      title: 'Verified Users Only',
      description: 'Chat is restricted to users who have completed our three-step verification process.',
      status: 'Required'
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-purple-600" />,
      title: 'Real-time Moderation',
      description: 'AI-powered content moderation flags concerning messages for human review.',
      status: 'Active'
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
      title: 'Easy Reporting',
      description: 'Report any concerning messages with one tap. Our safety team reviews all reports.',
      status: 'Available'
    }
  ];

  const safetyTips = [
    {
      category: 'Before Meeting',
      tips: [
        'Always verify the user has completed ID verification and background check',
        'Check their safety score and verification badges',
        'Read their profile and rental history',
        'Communicate through the platform until you feel comfortable'
      ]
    },
    {
      category: 'During Communication',
      tips: [
        'Keep conversations focused on the rental transaction',
        'Don\'t share personal information like phone numbers or addresses',
        'Trust your instincts - if something feels off, report it',
        'Use the platform\'s built-in safety features'
      ]
    },
    {
      category: 'Meeting Safely',
      tips: [
        'Meet in public places during daylight hours',
        'Bring a friend or family member if possible',
        'Take photos of the item before and after rental',
        'Use the platform\'s secure payment system'
      ]
    }
  ];

  const reportingSteps = [
    {
      step: 1,
      title: 'Identify the Issue',
      description: 'Look for inappropriate content, harassment, or safety concerns'
    },
    {
      step: 2,
      title: 'Use Report Feature',
      description: 'Tap the flag icon on any concerning message'
    },
    {
      step: 3,
      title: 'Provide Details',
      description: 'Explain why you\'re reporting the message'
    },
    {
      step: 4,
      title: 'Review Process',
      description: 'Our safety team will review within 24 hours'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-accent" />
            <h2 className="text-xl font-bold text-primary">Chat Safety Guide</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text hover:text-accent transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-secondary">
          {[
            { id: 'overview', label: 'Overview', icon: <Info className="w-4 h-4" /> },
            { id: 'features', label: 'Safety Features', icon: <Shield className="w-4 h-4" /> },
            { id: 'tips', label: 'Safety Tips', icon: <CheckCircle className="w-4 h-4" /> },
            { id: 'reporting', label: 'Reporting', icon: <AlertTriangle className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-text hover:text-accent'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-mauve-50 border border-mauve-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-mauve-900 mb-2">Family Safety First</h3>
                    <p className="text-mauve-800 text-sm">
                      Our chat system is designed with families in mind. Every feature is built to protect 
                      parents, children, and the community while facilitating safe rental transactions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-mauve-50 border border-mauve-200 rounded-lg p-4">
                  <h4 className="font-semibold text-mauve-900 mb-2">What We Protect Against</h4>
                  <ul className="text-mauve-800 text-sm space-y-1">
                    <li>• Inappropriate or offensive content</li>
                    <li>• Personal information sharing</li>
                    <li>• Harassment or bullying</li>
                    <li>• Scams or fraudulent activity</li>
                    <li>• Unverified user communication</li>
                  </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">Verification Requirements</h4>
                  <ul className="text-purple-800 text-sm space-y-1">
                    <li>• ID verification required</li>
                    <li>• Background check for item owners</li>
                    <li>• Social verification for enhanced trust</li>
                    <li>• Mom-Approved badge for family users</li>
                    <li>• Safety score tracking</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-2">Important Reminder</h4>
                    <p className="text-yellow-800 text-sm">
                      While we provide comprehensive safety features, always trust your instincts. 
                      If something feels wrong, report it immediately. Your safety and your family's 
                      safety are our top priority.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {safetyFeatures.map((feature, index) => (
                  <div key={index} className="bg-white border border-secondary rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      {feature.icon}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-primary">{feature.title}</h4>
                          <span className="px-2 py-1 bg-mauve-100 text-mauve-800 text-xs rounded-full font-medium">
                            {feature.status}
                          </span>
                        </div>
                        <p className="text-text text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-3">How It Works</h4>
                <div className="space-y-3 text-sm text-text">
                  <p>
                    <strong>1. Message Filtering:</strong> Every message is scanned in real-time for 
                    inappropriate content, personal information, and safety concerns.
                  </p>
                  <p>
                    <strong>2. User Verification:</strong> Only users who have completed our verification 
                    process can send messages, ensuring everyone you chat with is verified.
                  </p>
                  <p>
                    <strong>3. AI Moderation:</strong> Our AI system flags concerning content for human 
                    review, providing an additional layer of protection.
                  </p>
                  <p>
                    <strong>4. Community Reporting:</strong> Users can easily report any concerning 
                    messages, and our safety team reviews all reports promptly.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="space-y-6">
              {safetyTips.map((category, index) => (
                <div key={index} className="bg-white border border-secondary rounded-lg p-4">
                  <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    {category.category}
                  </h4>
                  <ul className="space-y-2">
                    {category.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2 text-sm text-text">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-900 mb-2">Red Flags to Watch For</h4>
                    <ul className="text-red-800 text-sm space-y-1">
                      <li>• Requests to communicate outside the platform</li>
                      <li>• Pressure to meet immediately or in private locations</li>
                      <li>• Requests for personal information or photos</li>
                      <li>• Suspicious payment requests or offers</li>
                      <li>• Aggressive or inappropriate language</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reporting' && (
            <div className="space-y-6">
              <div className="bg-mauve-50 border border-mauve-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-mauve-900 mb-2">When to Report</h4>
                    <p className="text-mauve-800 text-sm">
                      Report any message that makes you feel uncomfortable, unsafe, or violates our 
                      community guidelines. It's better to report something that turns out to be 
                      harmless than to ignore a real safety concern.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {reportingSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h5 className="font-semibold text-primary mb-1">{step.title}</h5>
                      <p className="text-text text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-mauve-50 border border-mauve-200 rounded-lg p-4">
                <h4 className="font-semibold text-mauve-900 mb-2">What Happens After You Report</h4>
                <div className="space-y-2 text-mauve-800 text-sm">
                  <p>• Our safety team reviews the report within 24 hours</p>
                  <p>• If confirmed, the user may be warned, suspended, or banned</p>
                  <p>• You'll receive a notification about the outcome</p>
                  <p>• Your report helps keep the community safe for everyone</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-secondary bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-text">
              Need help? Contact our safety team at <span className="text-accent">safety@celebrationShare.com</span>
            </p>
            <button
              onClick={onClose}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-mauve-700 transition-colors"
            >
              Got It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSafetyGuide; 