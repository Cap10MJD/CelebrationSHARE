import React from 'react';
import { ArrowLeft, Shield, AlertTriangle, FileText, Users, CreditCard, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TermsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Terms and Conditions</h1>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Important Legal Notice</h3>
                  <p className="text-blue-800 text-sm">
                    By using CelebrationShare, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. 
                    These terms contain important limitations on our liability and your rights.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              These Terms and Conditions ("Terms") govern your use of CelebrationShare ("Platform," "Service," "we," "us," or "our"), 
              a peer-to-peer rental marketplace. By accessing or using our platform, you agree to be bound by these Terms. 
              If you do not agree to these Terms, do not use our Service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
            <p className="mb-4">
              CelebrationShare is a platform that facilitates peer-to-peer rentals of items between community members. 
              We provide the technology platform, payment processing, and basic dispute resolution services. 
              We do not own, rent, or control any items listed on our platform.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities and Disclaimers</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Platform as Intermediary Only</h3>
            <p className="mb-4">
              <strong>DISCLAIMER:</strong> CelebrationShare acts solely as an intermediary platform. We do not:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Own, possess, or control any items listed for rental</li>
              <li>Guarantee the condition, safety, or suitability of any items</li>
              <li>Verify the accuracy of item descriptions or photos</li>
              <li>Ensure the safety or reliability of any items</li>
              <li>Provide insurance coverage for items or users</li>
              <li>Guarantee the character, background, or trustworthiness of users</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 User Verification Disclaimer</h3>
            <p className="mb-4">
              While we offer verification services, we do not guarantee the accuracy of verification results. 
              Verification is provided "as is" and users remain responsible for their own due diligence.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitation of Liability</h2>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-2">Important Liability Limitations</h3>
                  <p className="text-red-800 text-sm">
                    Our liability is strictly limited as outlined below. By using our service, you acknowledge these limitations.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 General Limitation</h3>
            <p className="mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, CELEBRATIONSHARE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, 
              GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Maximum Liability</h3>
            <p className="mb-4">
              IN NO EVENT SHALL CELEBRATIONSHARE'S TOTAL LIABILITY TO YOU FOR ALL CLAIMS EXCEED THE AMOUNT OF FEES 
              PAID BY YOU TO CELEBRATIONSHARE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Specific Exclusions</h3>
            <p className="mb-4">CelebrationShare shall not be liable for:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Damage, loss, or theft of rented items</li>
              <li>Personal injury or property damage during rentals</li>
              <li>Disputes between renters and owners</li>
              <li>Failure of items to function as expected</li>
              <li>Financial losses from rental transactions</li>
              <li>Data breaches or security incidents</li>
              <li>Service interruptions or technical issues</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. User Indemnification</h2>
            <p className="mb-4">
              You agree to indemnify, defend, and hold harmless CelebrationShare, its officers, directors, employees, 
              agents, and affiliates from and against any claims, damages, losses, costs, and expenses (including 
              reasonable attorneys' fees) arising from:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Your use of the platform</li>
              <li>Your violation of these Terms</li>
              <li>Your rental activities (as owner or renter)</li>
              <li>Any damage or injury caused by items you list or rent</li>
              <li>Your violation of any third-party rights</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Rental Terms and Disclaimers</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Owner Responsibilities</h3>
            <p className="mb-4">As an item owner, you acknowledge and agree that:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>You are solely responsible for the condition and safety of your items</li>
              <li>You must accurately describe items and disclose any defects</li>
              <li>You are responsible for ensuring items meet safety standards</li>
              <li>You assume all risks associated with renting your items</li>
              <li>You are responsible for any damage caused by your items</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Renter Responsibilities</h3>
            <p className="mb-4">As a renter, you acknowledge and agree that:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>You rent items at your own risk</li>
              <li>You are responsible for inspecting items before use</li>
              <li>You must use items safely and as intended</li>
              <li>You are liable for damage to items during your rental period</li>
              <li>You must return items in the same condition received</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Payment and Financial Terms</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">7.1 Payment Processing</h3>
            <p className="mb-4">
              We use third-party payment processors. We are not responsible for payment processing errors, 
              delays, or failures. All payment disputes must be resolved through the payment processor.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">7.2 Commission and Fees</h3>
            <p className="mb-4">
              We charge a tiered commission structure: 22% for new users (0-9 completed rentals) and 18% for experienced users (10+ completed rentals). This fee is non-refundable and covers 
              platform maintenance, payment processing, and basic support services.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">7.3 Security Deposits</h3>
            <p className="mb-4">
              Security deposits are held by our payment processor. We are not responsible for deposit 
              disputes or refund delays. Deposit amounts are determined by our algorithm and may vary.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Dispute Resolution</h2>
            <p className="mb-4">
              All disputes between users must be resolved directly between the parties. We provide basic 
              dispute resolution tools but are not responsible for resolving disputes or enforcing agreements.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Privacy and Data</h2>
            <p className="mb-4">
              Your privacy is important to us. Please review our{' '}
              <a href="/privacy" className="text-blue-600 hover:underline font-semibold">Privacy Policy</a> for details on how we 
              collect, use, and protect your information. We are not liable for data breaches or 
              unauthorized access to your information.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Service Availability</h2>
            <p className="mb-4">
              We provide the Service "as is" and "as available." We do not guarantee uninterrupted 
              service or error-free operation. We may modify, suspend, or discontinue the Service at any time.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
            <p className="mb-4">
              We may terminate or suspend your account at any time for violations of these Terms. 
              You may terminate your account at any time. Termination does not relieve you of 
              obligations incurred before termination.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
            <p className="mb-4">
              These Terms are governed by the laws of the jurisdiction where CelebrationShare operates. 
              Any disputes shall be resolved in accordance with applicable local laws.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to Terms</h2>
            <p className="mb-4">
              We may modify these Terms at any time. Continued use of the Service after changes 
              constitutes acceptance of the new Terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Legal Disclaimer</h2>
            <p className="mb-4">
              <strong>IMPORTANT:</strong> These Terms and Conditions are provided for informational purposes only. 
              They have not been reviewed by legal counsel and should not be considered as legal advice. 
              We strongly recommend consulting with a qualified attorney before using these terms in a business context.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Information</h2>
            <p className="mb-4">
              For questions about these Terms, contact us at legal@celebrationshare.com
            </p>

            <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-gray-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Final Acknowledgment</h3>
                  <p className="text-gray-700 text-sm">
                    By using CelebrationShare, you acknowledge that you have read and understood these Terms, 
                    including all limitations of liability and indemnification provisions. You agree to be 
                    bound by these Terms and understand that your use of the platform is at your own risk.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 