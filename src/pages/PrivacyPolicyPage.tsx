import React from 'react';
import { Shield, Lock, Eye, Users, Database, Bell, Globe, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">How we protect your information in our community</p>
          <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to CelebrationShare</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            At CelebrationShare, we believe in building trust through transparency. This Privacy Policy explains how we collect, use, and protect your information when you use our neighborhood party rental platform.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            We're committed to protecting your privacy and ensuring you feel safe sharing and renting items within your community. This policy applies to all users of our platform, whether you're renting items, listing items, or just browsing.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Your Privacy Matters</h4>
                <p className="text-blue-800 text-sm">
                  We never sell your personal information to third parties. Your data is used only to provide and improve our community platform.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Information We Collect */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Account Information:</strong> Name, email address, phone number, and profile information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Verification Data:</strong> Government ID, background check information, and social media links</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Payment Information:</strong> Payment method details (processed securely through Stripe)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Location Data:</strong> Your neighborhood and general location for item matching</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Communication Preferences:</strong> Email and notification settings</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage Information</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Platform Activity:</strong> Items you list, rent, reviews, and messages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Device Information:</strong> Browser type, device type, IP address, and operating system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Communication Data:</strong> Messages between renters and owners, support tickets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Search and Browsing:</strong> Items you search for, categories you browse, and preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Transaction History:</strong> Rental history, payment records, and commission earnings</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Log Data:</strong> Access times, pages viewed, and app usage patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Cookies and Similar Technologies:</strong> Session data, preferences, and analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Location Services:</strong> Approximate location for item matching (with your consent)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* How We Use Information */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Platform Operations</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Process rentals and payments securely</li>
                <li>• Verify user identities and backgrounds</li>
                <li>• Match renters with nearby items</li>
                <li>• Facilitate communication between users</li>
                <li>• Provide customer support and assistance</li>
                <li>• Process affiliate program rewards</li>
                <li>• Generate invoices and payment records</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Safety & Security</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Prevent fraud and abuse</li>
                <li>• Investigate disputes and issues</li>
                <li>• Ensure community safety</li>
                <li>• Comply with legal requirements</li>
                <li>• Protect against security threats</li>
                <li>• Monitor platform integrity</li>
                <li>• Enforce community guidelines</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Improving Your Experience</h4>
            <ul className="space-y-1 text-green-800 text-sm">
              <li>• Personalize recommendations and search results</li>
              <li>• Improve our platform features and usability</li>
              <li>• Analyze usage patterns to enhance services</li>
              <li>• Develop new features based on community needs</li>
              <li>• Provide relevant notifications and updates</li>
            </ul>
          </div>
        </div>

        {/* Information Sharing */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Information Sharing</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What We Share</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>With Other Users:</strong> Basic profile info, item listings, and reviews (with your consent)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>With Service Providers:</strong> Payment processors (Stripe), background check services, and hosting providers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>Legal Requirements:</strong> When required by law or to protect rights and safety</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets (with notice)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What We Don't Share</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Your exact address or precise location</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Government ID or sensitive verification documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Payment card details (handled securely by Stripe)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Private messages without your consent</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Personal information to advertisers or marketers</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-900 mb-1">We Never Sell Your Data</h4>
                  <p className="text-red-800 text-sm">
                    Unlike some platforms, we never sell your personal information to third parties for advertising or marketing purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Security */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Protection Measures</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• End-to-end encryption of sensitive data</li>
                <li>• Secure payment processing through Stripe</li>
                <li>• Regular security audits and penetration testing</li>
                <li>• Access controls and monitoring systems</li>
                <li>• Secure data centers with redundancy</li>
                <li>• HTTPS encryption for all communications</li>
                <li>• Multi-factor authentication options</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Responsibilities</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Keep your password secure and unique</li>
                <li>• Don't share account access with others</li>
                <li>• Report suspicious activity immediately</li>
                <li>• Use secure networks when possible</li>
                <li>• Keep the app updated to latest version</li>
                <li>• Log out from shared devices</li>
                <li>• Enable two-factor authentication</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Data Breach Response</h4>
            <p className="text-yellow-800 text-sm">
              In the unlikely event of a data breach, we will notify affected users within 72 hours and take immediate steps to secure accounts and prevent further unauthorized access.
            </p>
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-900">Your Privacy Rights</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Access & Control</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• View and update your profile information</li>
                <li>• Download your data in a portable format</li>
                <li>• Delete your account and associated data</li>
                <li>• Opt out of marketing communications</li>
                <li>• Control privacy settings and preferences</li>
                <li>• Request data correction or updates</li>
                <li>• Restrict processing of your data</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span><strong>Email:</strong> privacy@celebration-share.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span><strong>Phone:</strong> (415) 555-0123</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span><strong>Address:</strong> 123 Community Way, San Francisco, CA 94102</span>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  We respond to privacy requests within 30 days and provide free assistance for all privacy-related inquiries.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* GDPR & CCPA Compliance */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">GDPR & CCPA Compliance</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">GDPR Rights (EU Users)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Right to Access:</strong> Request a copy of your personal data</li>
                <li>• <strong>Right to Rectification:</strong> Correct inaccurate personal data</li>
                <li>• <strong>Right to Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
                <li>• <strong>Right to Portability:</strong> Receive your data in a structured format</li>
                <li>• <strong>Right to Object:</strong> Object to processing of your data</li>
                <li>• <strong>Right to Restriction:</strong> Limit how we process your data</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">CCPA Rights (California Users)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Right to Know:</strong> Request information about data collection and sharing</li>
                <li>• <strong>Right to Delete:</strong> Request deletion of personal information</li>
                <li>• <strong>Right to Opt-Out:</strong> Opt out of sale of personal information</li>
                <li>• <strong>Right to Non-Discrimination:</strong> Equal service regardless of privacy choices</li>
                <li>• <strong>Right to Portability:</strong> Receive data in a portable format</li>
              </ul>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-900 mb-2">How to Exercise Your Rights</h4>
              <p className="text-indigo-800 text-sm mb-3">
                To exercise any of these rights, contact us at privacy@celebration-share.com or call (415) 555-0123. 
                We will respond within the required timeframe and may need to verify your identity before processing your request.
              </p>
              <p className="text-indigo-800 text-sm">
                <strong>Note:</strong> Some rights may be limited where we have a legitimate business need or legal obligation to retain certain information.
              </p>
            </div>
          </div>
        </div>

        {/* Cookies & Tracking */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookies & Tracking Technologies</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Types of Cookies We Use</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Essential Cookies</h4>
                  <p className="text-sm text-gray-700">Required for basic platform functionality, security, and user authentication.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Functional Cookies</h4>
                  <p className="text-sm text-gray-700">Remember your preferences, language settings, and login status.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Analytics Cookies</h4>
                  <p className="text-sm text-gray-700">Help us understand how users interact with our platform to improve services.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Performance Cookies</h4>
                  <p className="text-sm text-gray-700">Monitor platform performance and identify technical issues.</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Third-Party Services</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Stripe:</strong> Payment processing and security</li>
                <li>• <strong>Google Analytics:</strong> Platform usage analytics (anonymized)</li>
                <li>• <strong>Cloudflare:</strong> Content delivery and security</li>
                <li>• <strong>Background Check Services:</strong> User verification</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Cookie Management</h4>
              <p className="text-blue-800 text-sm">
                You can control cookie settings in your browser preferences. However, disabling essential cookies may prevent some platform features from working properly.
              </p>
            </div>
          </div>
        </div>

        {/* Children's Privacy */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Children's Privacy</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              CelebrationShare is not intended for children under 16. We do not knowingly collect personal information from children under 16. If you believe we have collected information from a child under 16, please contact us immediately.
            </p>
            
            <p>
              For users 16-17, we require parental consent for account creation and may have additional restrictions on certain features. Parents or guardians can contact us to review, delete, or refuse further collection of their child's information.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Age Verification</h4>
              <p className="text-yellow-800 text-sm">
                By using our platform, you confirm that you are at least 18 years old or have parental consent if you are 16-17 years old.
              </p>
            </div>
          </div>
        </div>

        {/* Data Retention */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Retention</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              We retain your personal information only as long as necessary to provide our services and fulfill the purposes outlined in this policy:
            </p>
            <ul className="space-y-2 ml-4">
              <li>• <strong>Account Data:</strong> Retained while your account is active and for 2 years after deactivation</li>
              <li>• <strong>Transaction Records:</strong> Retained for 7 years for tax and legal compliance</li>
              <li>• <strong>Communication Data:</strong> Retained for 2 years after account deactivation</li>
              <li>• <strong>Verification Data:</strong> Retained for 5 years for safety and compliance</li>
              <li>• <strong>Analytics Data:</strong> Anonymized after 2 years</li>
            </ul>
            
            <p className="mt-4">
              You can request deletion of your data at any time, subject to legal and safety requirements.
            </p>
          </div>
        </div>

        {/* Changes to Policy */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to This Policy</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:
            </p>
            <ul className="space-y-2 ml-4">
              <li>• Email notification to your registered email address</li>
              <li>• In-app notification when you next access the platform</li>
              <li>• Updated date at the top of this policy</li>
              <li>• Prominent notice on our homepage for significant changes</li>
            </ul>
            
            <p className="mt-4">
              Your continued use of CelebrationShare after changes become effective constitutes acceptance of the updated policy. If you disagree with any changes, you may close your account.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Policy History</h4>
              <p className="text-green-800 text-sm">
                Previous versions of this policy are available upon request. Contact us to review changes made in previous updates.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Privacy?</h2>
          <p className="text-gray-700 mb-6">
            We're here to help! Contact our privacy team with any questions, concerns, or requests regarding your personal information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:privacy@celebration-share.com"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Email Privacy Team
            </a>
            <a
              href="tel:+14155550123"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call (415) 555-0123
            </a>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            We typically respond to privacy inquiries within 24-48 hours during business days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; 